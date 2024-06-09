import { Hono } from 'hono';

import { auth } from '../../middlewares/auth';

const app = new Hono();

app.get('/', auth, (c) => c.body('hello world'));

export default app;
