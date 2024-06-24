import { OpenAPIHono } from '@hono/zod-openapi';
import { showRoutes } from 'hono/dev';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { swaggerUI } from '@hono/swagger-ui';

import { PORT } from '@/env';
import { logger } from '@/logger';
import { v1Routes } from '@/routes/v1';
import { migrateDb } from '@/db';

export const app = new OpenAPIHono();

app.use('*', cors());

app.onError((error, c) => {
    logger.error(error);
    return c.json({ message: error }, 500);
});

app.get('/health', (c) => c.body('OK'));
app.get('/docs', swaggerUI({ url: '/openapi' }));
app.doc('/openapi', {
    info: { title: 'РаспределAI', version: 'v1' },
    openapi: '3.1.0',
    servers: [
        {
            url: new URL('https://api.xn--80aicbulygci4n.xn--p1ai').origin,
            description: 'production',
        },
    ],
});
app.route('/v1', v1Routes);

const run = async () => {
    await migrateDb();

    serve({
        fetch: app.fetch,
        port: Number(PORT),
    }).on('listening', () => {
        logger.info(`Server is running on port ${PORT}`);
        showRoutes(app, { verbose: true, colorize: true });
    });
};

run();
