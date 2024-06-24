import path from 'node:path';
import fs from 'node:fs/promises';

import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { PythonShell } from 'python-shell';
import { desc, eq } from 'drizzle-orm';

import { auth } from '@/middlewares/auth';
import { logger } from '@/logger';
import { db } from '@/db';
import { processings } from '@/schema';

const app = new OpenAPIHono();

const ProcessingStatus = z
    .enum([
        'created',
        'dataset-uploading',
        'dataset-uploaded',
        'merging',
        'merged',
        'distributing',
        'distributed',
        'forecasting',
        'generating-plots',
        'done',
    ])
    .openapi('ProcessingStatus');

const Processing = z
    .object({
        id: z.number().int(),
        status: ProcessingStatus.nullable(),
        createdAt: z.date(),
    })
    .openapi('Processing');

const Message = z.object({ message: z.string() }).openapi('Message');

// app.use('*', auth);

app.openapi(
    createRoute({
        method: 'get',
        path: '/',
        tags: ['processings'],
        responses: {
            200: {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: z.array(Processing),
                    },
                },
            },
        },
        description: 'Retrieve processings history',
    }),
    async (c) => {
        const procs = await db.select().from(processings);

        return c.json(procs);
    },
);

app.openapi(
    createRoute({
        method: 'post',
        path: '/',
        tags: ['processings'],
        responses: {
            201: {
                description: 'Created',
                content: {
                    'application/json': {
                        schema: Processing,
                    },
                },
            },
        },
        description: 'Create processings order',
    }),
    async (c) => {
        await db.insert(processings).values({ status: 'created' });

        const [proc] = await db
            .select()
            .from(processings)
            .orderBy(desc(processings.createdAt))
            .limit(1);

        await fs.mkdir(`/mnt/bucket/${proc.id}`);

        return c.json(proc, 201);
    },
);

app.openapi(
    createRoute({
        method: 'get',
        path: '/{id}',
        request: {
            params: z.object({
                id: z.string().openapi({
                    param: { name: 'id', in: 'path' },
                    example: '1',
                }),
            }),
        },
        tags: ['processings'],
        responses: {
            200: {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: Processing,
                    },
                },
            },
        },
        description: 'Get info about processing order',
    }),
    async (c) => {
        const id = c.req.param('id');

        const [proc] = await db
            .select()
            .from(processings)
            .where(eq(processings.id, Number(id)));

        return c.json(proc);
    },
);

app.openapi(
    createRoute({
        method: 'post',
        path: '/{id}/dataset',
        request: {
            params: z.object({
                id: z.string().openapi({
                    param: { name: 'id', in: 'path' },
                    example: '1',
                }),
            }),
        },
        requestBody: {
            required: true,
            content: {
                'multipart/form-data': {
                    schema: {
                        type: 'object',
                        required: [
                            'merger',
                            'mainCosts',
                            'squares',
                            'servCodes',
                            'pays',
                        ],
                        properties: {
                            merger: {
                                type: 'string',
                                format: 'binary',
                            },
                            mainCosts: {
                                type: 'string',
                                format: 'binary',
                            },
                            squares: {
                                type: 'string',
                                format: 'binary',
                            },
                            servCodes: {
                                type: 'string',
                                format: 'binary',
                            },
                            pays: {
                                type: 'array',
                                items: {
                                    type: 'string',
                                    format: 'binary',
                                },
                            },
                        },
                    },
                },
            },
        },
        tags: ['processings'],
        responses: {
            201: {
                description: 'Uploaded',
                content: {
                    'application/json': {
                        schema: Message,
                    },
                },
            },
        },
        description: 'Upload and preprocess dataset',
    }),
    async (c) => {
        const id = c.req.param('id');

        const body: {
            merger: File;
            mainCosts: File;
            squares: File;
            servCodes: File;
            pays: File[] | File;
        } = await c.req.parseBody({ all: true });

        /** Не самый элегантный трюк для сохранения порядка файлов */
        const { merger, mainCosts, squares, servCodes, pays } = body;
        const files = [merger, mainCosts, squares, servCodes];

        if (Array.isArray(pays)) {
            files.push(...pays);
        } else {
            files.push(pays);
        }

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

        return c.json({ message: 'successful' }, 201);
    },
);

app.openapi(
    createRoute({
        method: 'get',
        path: '/{id}/features',
        request: {
            params: z.object({
                id: z.string().openapi({
                    param: { name: 'id', in: 'path' },
                    example: '1',
                }),
            }),
        },
        tags: ['processings'],
        responses: {
            200: {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: z.array(
                            z.tuple([z.string(), z.string(), z.string()]),
                        ),
                    },
                },
            },
        },
        description: 'Get dataset features',
    }),
    async (c) => {
        const id = c.req.param('id');

        const [json] = await PythonShell.run('unpickle.py', {
            mode: 'text',
            scriptPath: path.join(import.meta.dirname, '../../../ml'),
            args: [`/mnt/bucket/${id}/features.pkl`],
        });

        const features = JSON.parse(json);

        return c.json(features);
    },
);

app.openapi(
    createRoute({
        method: 'post',
        path: '/{id}/graph',
        request: {
            params: z.object({
                id: z.string().openapi({
                    param: { name: 'id', in: 'path' },
                    example: '1',
                }),
            }),
        },
        tags: ['processings'],
        responses: {
            201: {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: Message,
                    },
                },
            },
        },
        description: 'Save processing DAG',
    }),
    async (c) => {
        const id = c.req.param('id');

        const graph = await c.req.json();

        await fs.writeFile(
            `/mnt/bucket/${id}/graph.json`,
            JSON.stringify(graph),
        );

        return c.json({ message: 'successful' }, 201);
    },
);

app.openapi(
    createRoute({
        method: 'post',
        path: '/{id}/distribution',
        request: {
            params: z.object({
                id: z.string().openapi({
                    param: { name: 'id', in: 'path' },
                    example: '1',
                }),
            }),
        },
        tags: ['processings'],
        responses: {
            201: {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: Message,
                    },
                },
            },
        },
        description: 'Run distribution processing',
    }),
    async (c) => {
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

        return c.json({ message: 'successful' }, 201);
    },
);

app.openapi(
    createRoute({
        method: 'post',
        path: '/{id}/forecast',
        request: {
            params: z.object({
                id: z.string().openapi({
                    param: { name: 'id', in: 'path' },
                    example: '1',
                }),
            }),
        },
        tags: ['processings'],
        responses: {
            201: {
                description: 'Success',
                content: {
                    'application/json': {
                        schema: Message,
                    },
                },
            },
        },
        description: 'Run forecasting processing',
    }),
    async (c) => {
        const id = c.req.param('id');

        const assetid = c.req.query('assetid')!;

        try {
            await db
                .update(processings)
                .set({ status: 'forecasting' })
                .where(eq(processings.id, Number(id)));

            await new Promise<void>((resolve, reject) => {
                const py = new PythonShell('forecast.py', {
                    mode: 'text',
                    scriptPath: path.join(import.meta.dirname, '../../../ml'),
                    pythonOptions: ['-u'],
                    args: [id, assetid],
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
                    args: [id, assetid],
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
        } catch (error) {
            await db
                .update(processings)
                .set({ status: 'distributed' })
                .where(eq(processings.id, Number(id)));

            throw error;
        }

        return c.json({ message: 'successful' }, 201);
    },
);

export default app;
