import path from 'node:path';
import fs from 'node:fs/promises';

import { Hono } from 'hono';
import { PythonShell } from 'python-shell';

import { auth } from '@/middlewares/auth';
import { logger } from '@/logger';
import { db } from '@/db';
import { processings } from '@/schema';
import { eq } from 'drizzle-orm';

const app = new Hono();

// app.use('*', auth);

app.get('/', async (c) => {
    const procs = await db.select().from(processings);

    return c.json(procs);
});

app.post('/', async (c) => {
    await db.insert(processings).values({ status: 'created' });
});

app.get('/:id', async (c) => {
    const id = c.req.param('id');

    const [proc] = await db
        .select()
        .from(processings)
        .where(eq(processings.id, Number(id)));

    return c.json(proc);
});

app.post('/:id/dataset', async (c) => {
    const id = c.req.param('id');

    const body: {
        merger: File;
        mainCosts: File;
        squares: File;
        servCodes: File;
        pays: File[];
    } = await c.req.parseBody({ all: true });

    /** Не самый элегантный трюк для сохранения порядка файлов */
    const { merger, mainCosts, squares, servCodes, pays } = body;
    const files = [merger, mainCosts, squares, servCodes, ...pays];

    await db
        .update(processings)
        .set({ status: 'dataset-uploading' })
        .where(eq(processings.id, Number(id)));

    await Promise.all(
        files.map(async (file) => {
            await fs.writeFile(
                path.join(`/mnt/bucket/${id}`, file.name),
                Buffer.from(await file.arrayBuffer()),
            );
        }),
    );

    await db
        .update(processings)
        .set({ status: 'dataset-uploaded' })
        .where(eq(processings.id, Number(id)));

    return c.json({ message: 'successful' }, 201);
});

app.post('/:id/merge', async (c) => {
    const id = c.req.param('id');

    await db
        .update(processings)
        .set({ status: 'merging' })
        .where(eq(processings.id, Number(id)));

    await new Promise<void>((resolve, reject) => {
        const py = new PythonShell('merge.py', {
            mode: 'text',
            scriptPath: path.join(import.meta.dirname, '../../../ml'),
            pythonOptions: ['-u'],
            args: [id],
        });

        py.on('message', console.log);
        py.on('close', resolve);
        py.on('error', reject);
        py.on('pythonError', reject);
    });

    await db
        .update(processings)
        .set({ status: 'merged' })
        .where(eq(processings.id, Number(id)));

    return c.json({ message: 'successful' }, 200);
});

app.get('/:id/features', async (c) => {
    const id = c.req.param('id');

    const [json] = await PythonShell.run('unpickle.py', {
        mode: 'text',
        scriptPath: path.join(import.meta.dirname, '../../../ml'),
        args: [`/mnt/bucket/${id}/features.pkl`],
    });

    const features = JSON.parse(json);

    return c.json(features);
});

app.post('/:id/graph', async (c) => {
    const id = c.req.param('id');

    const graph = await c.req.json();

    await fs.writeFile(`/mnt/bucket/${id}/graph.json`, JSON.stringify(graph));

    return c.json({ message: 'successful' }, 201);
});

app.post('/:id/distribution', async (c) => {
    const id = c.req.param('id');

    await db
        .update(processings)
        .set({ status: 'distributing' })
        .where(eq(processings.id, Number(id)));

    await new Promise<void>((resolve, reject) => {
        const py = new PythonShell('distribute.py', {
            mode: 'text',
            scriptPath: path.join(import.meta.dirname, '../../../ml'),
            pythonOptions: ['-u'],
            args: [id],
        });

        py.on('message', (msg) => logger.debug(msg));
        py.on('close', resolve);
        py.on('error', reject);
        py.on('pythonError', reject);
    });

    await db
        .update(processings)
        .set({ status: 'distributed' })
        .where(eq(processings.id, Number(id)));

    return c.json({ messsage: 'successful' }, 201);
});

app.post('/:id/forecast', async (c) => {
    const id = c.req.param('id');

    const checkid = c.req.query('checkid')!;

    await db
        .update(processings)
        .set({ status: 'forecasting' })
        .where(eq(processings.id, Number(id)));

    await new Promise<void>((resolve, reject) => {
        const py = new PythonShell('forecast.py', {
            mode: 'text',
            scriptPath: path.join(import.meta.dirname, '../../../ml'),
            pythonOptions: ['-u'],
            args: [id, checkid],
        });

        py.on('message', (msg) => logger.debug(msg));
        py.on('close', resolve);
        py.on('error', reject);
        py.on('pythonError', reject);
    });

    await new Promise<void>((resolve, reject) => {
        const py = new PythonShell('forecast_plots.py', {
            mode: 'text',
            scriptPath: path.join(import.meta.dirname, '../../../ml'),
            pythonOptions: ['-u'],
            args: [id, checkid],
        });

        py.on('message', (msg) => logger.debug(msg));
        py.on('close', resolve);
        py.on('error', reject);
        py.on('pythonError', reject);
    });

    await db
        .update(processings)
        .set({ status: 'done' })
        .where(eq(processings.id, Number(id)));

    return c.json({ messsage: 'successful' }, 201);
});

export default app;
