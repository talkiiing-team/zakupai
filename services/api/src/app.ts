import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { serve } from '@hono/node-server';
import { ClickHouseClient, createClient } from '@clickhouse/client';

import { CLICKHOUSE_URL, PORT } from '@/env';
import { logger } from '@/logger';
import { v1Routes } from '@/routes/v1';

type Variables = {
    clickhouse: ClickHouseClient;
};

export const app = new Hono<{ Variables: Variables }>();

app.use('*', async (c, next) => {
    const client = createClient({ url: CLICKHOUSE_URL });

    c.set('clickhouse', client);

    await next();
});

app.get('/health', (c) => c.body('OK'));

app.route('/v1', v1Routes);

serve({
    fetch: app.fetch,
    port: Number(PORT),
}).on('listening', () => {
    logger.info(`Server is running on port ${PORT}`);
    showRoutes(app, { verbose: true, colorize: true });
});
