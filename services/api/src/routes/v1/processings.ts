import path from 'node:path';
import fs from 'node:fs/promises';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { PythonShell } from 'python-shell';
import { z } from 'zod';

import { auth } from '@/middlewares/auth';

const app = new Hono();

// app.use('*', auth);

app.get('/', async (c) => {
    const files = await fs.readdir('/mnt/bucket');

    return c.body(files.join('\n'));
});

app.post('/dataset', async (c) => {
    const body = (await c.req.parseBody({ all: true })) as {
        merger: File;
        mainCosts: File;
        squares: File;
        servCodes: File;
        pays: File[];
    };

    /** Не самый элегантный трюк для сохранения порядка файлов */
    const { merger, mainCosts, squares, servCodes, pays } = body;
    const files = [merger, mainCosts, squares, servCodes, ...pays];

    const written = await Promise.all(
        files.map(async (file) => {
            const filePath = path.join('/mnt/bucket', file.name);
            await fs.writeFile(
                path.join('/mnt/bucket', file.name),
                Buffer.from(await file.arrayBuffer()),
            );
            return filePath;
        }),
    );

    const res = await PythonShell.run('merge.py', {
        mode: 'text',
        scriptPath: path.join(import.meta.dirname, '../../../ml'),
        args: written,
    });

    console.log('finished python');

    return c.body(res as unknown as string);
});

export default app;
