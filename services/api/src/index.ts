import { Hono } from 'hono';
import { serve } from '@hono/node-server';

import { PORT } from './env';

const app = new Hono();

app.get('/', (c) => {
    return c.text('Hello Hono!');
});

serve({
    fetch: app.fetch,
    port: Number(PORT),
}).on('listening', () => {
    console.log(`Server is running on port ${PORT}`);
});
