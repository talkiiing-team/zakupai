import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { serve } from '@hono/node-server';
import { swaggerUI } from '@hono/swagger-ui';

import { PORT } from '@/env';
import { logger } from '@/logger';
import { v1Routes } from '@/routes/v1';

export const app = new Hono();

app.get('/docs', swaggerUI({ url: '/' }));

app.get('/health', (c) => c.body('OK'));

app.route('/v1', v1Routes);

serve({
    fetch: app.fetch,
    port: Number(PORT),
}).on('listening', () => {
    logger.info(`Server is running on port ${PORT}`);
    showRoutes(app, { verbose: true, colorize: true });
});
