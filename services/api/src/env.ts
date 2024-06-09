import dotenv from 'dotenv';

import { logger } from '@/logger';

dotenv.config();

if (typeof process.env.PORT !== 'string') {
    process.env.PORT = '3000';
}

if (typeof process.env.CLICKHOUSE_URL !== 'string') {
    logger.fatal('CLICKHOUSE_URL env is not provided');
    process.exit(1);
}

if (typeof process.env.JWT_SECRET !== 'string') {
    logger.fatal('JWT_SECRET env is not provided');
    process.exit(1);
}

export const { PORT, CLICKHOUSE_URL, JWT_SECRET } = process.env;
