import { createMiddleware } from 'hono/factory';
import { jwt } from 'hono/jwt';

import { JWT_SECRET } from '@/env';

export const auth = createMiddleware((c, next) => {
    const jwtMiddleware = jwt({
        secret: JWT_SECRET,
    });

    return jwtMiddleware(c, next);
});
