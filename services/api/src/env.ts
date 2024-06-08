import { Logger } from 'tslog';

const logger = new Logger();

if (typeof process.env.PORT !== 'string') {
    process.env.PORT = '3000';
}

if (typeof process.env.CLICKHOUSE_URL !== 'string') {
    logger.fatal('CLICKHOUSE_URL env is not provided');
    process.exit(1);
}

export const { PORT, CLICKHOUSE_URL } = process.env;
