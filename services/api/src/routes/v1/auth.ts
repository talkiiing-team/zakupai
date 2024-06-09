import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { HTTPException } from 'hono/http-exception';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

import { JWT_SECRET } from '@/env';

const app = new Hono();

app.post(
    '/signin',
    zValidator(
        'json',
        z.object({
            email: z.string().email(),
            password: z.string().min(8).max(32),
        }),
    ),
    async (c) => {
        const { email, password } = c.req.valid('json');

        if (email !== 'nerlihmax@yandex-team.ru' || password !== 'helloworld') {
            throw new HTTPException(403);
        }

        const token = await sign(
            {
                email,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 48, // 48h
            },
            JWT_SECRET,
            'HS256',
        );

        return c.json(token);
    },
);

export default app;
