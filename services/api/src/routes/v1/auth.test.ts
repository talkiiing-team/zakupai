import { describe, test, expect } from 'vitest';
import { verify } from 'hono/jwt';

import { app } from '@/app';
import { JWT_SECRET } from '@/env';

describe('/v1/auth/signin', () => {
    test('gives token by valid credentials', async () => {
        const res = await app.request('/v1/auth/signin', {
            method: 'POST',
            body: JSON.stringify({
                email: 'nerlihmax@yandex-team.ru',
                password: 'helloworld',
            }),
            headers: {
                'Content-type': 'application/json',
            },
        });

        const contentType = res.headers.get('Content-Type');

        expect(res.status).toBe(200);
        expect(contentType?.includes('application/json')).toBeTruthy();

        const token = await res.json();

        await expect(verify(token, JWT_SECRET, 'HS256')).resolves.toBeTruthy();
    });

    test('fails by invalid credentials', async () => {
        const res = await app.request('/v1/auth/signin', {
            method: 'POST',
            body: JSON.stringify({
                email: 'nerlihmax@yandex-team.ru',
                password: 'aboba228',
            }),
            headers: {
                'Content-type': 'application/json',
            },
        });

        expect(res.status).toBe(403);
    });
});
