import path from 'node:path';
import fs from 'node:fs/promises';

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { PythonShell } from 'python-shell';

import { auth } from '@/middlewares/auth';

const app = new Hono();

// app.use('*', auth);

app.get('/', async (c) => {
    const files = await fs.readdir('/mnt/bucket');

    c.body(files.join('\n'));
});

app.post('/dataset', async (c) => {
    const body = await c.req.parseBody();

    const res = await PythonShell.run('merge.py', {
        mode: 'text',
        scriptPath: path.join(import.meta.dirname, '../../../ml'),
        args: [
            '/data/1/merger.xlsx',
            '/data/1/main_costs.xlsx',
            '/data/1/squares.xlsx',
            '/data/1/serv_codes.xlsx',
            '/data/1/pays1.xlsx',
            '/data/1/pays2.xlsx',
            '/data/1/pays2.xlsx',
        ],
    });

    console.log(res);
});

export default app;
