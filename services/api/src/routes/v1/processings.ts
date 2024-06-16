import path from 'node:path';
import fs from 'node:fs/promises';

import { Hono } from 'hono';
import { PythonShell } from 'python-shell';

import { auth } from '@/middlewares/auth';

const app = new Hono();

// app.use('*', auth);

app.post('/dataset', async (c) => {
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

    await Promise.all(
        files.map(async (file) => {
            await fs.writeFile(
                path.join('/mnt/bucket', file.name),
                Buffer.from(await file.arrayBuffer()),
            );
        }),
    );
});

app.post('/merge', async (c) => {
    await new Promise<void>((resolve, reject) => {
        const py = new PythonShell('merge.py', {
            mode: 'text',
            scriptPath: path.join(import.meta.dirname, '../../../ml'),
            pythonOptions: ['-u'],
        });

        py.on('message', console.log);
        py.on('close', resolve);
        py.on('error', reject);
        py.on('pythonError', reject);
    });
});

app.get('/features', async (c) => {
    const [json] = await PythonShell.run('unpickle.py', {
        mode: 'text',
        scriptPath: path.join(import.meta.dirname, '../../../ml'),
        args: ['/mnt/bucket/features.pkl'],
    });

    const features = JSON.parse(json);

    return c.json(features);
});

app.post('/graph', async (c) => {
    const graph = await c.req.json();

    await fs.writeFile('/mnt/bucket/graph.json', JSON.stringify(graph));
});

app.post('/distribution', async (c) => {
    await new Promise<void>((resolve, reject) => {
        const py = new PythonShell('distribute.py', {
            mode: 'text',
            scriptPath: path.join(import.meta.dirname, '../../../ml'),
            pythonOptions: ['-u'],
        });

        py.on('message', console.log);
        py.on('close', resolve);
        py.on('error', reject);
        py.on('pythonError', reject);
    });
});

export default app;
