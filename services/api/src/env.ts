import dotenv from 'dotenv';

import { logger } from '@/logger';

dotenv.config();

if (typeof process.env.PORT !== 'string') {
    process.env.PORT = '3000';
}

if (typeof process.env.JWT_SECRET !== 'string') {
    logger.fatal('JWT_SECRET env is not provided');
    process.exit(1);
}

if (typeof process.env.MYSQL_HOST !== 'string') {
    logger.fatal('MYSQL_HOST env is not provided');
    process.exit(1);
}

if (typeof process.env.MYSQL_USER !== 'string') {
    logger.fatal('MYSQL_USER env is not provided');
    process.exit(1);
}

if (typeof process.env.MYSQL_PASSWORD !== 'string') {
    logger.fatal('MYSQL_PASSWORD env is not provided');
    process.exit(1);
}

if (typeof process.env.MYSQL_DATABASE !== 'string') {
    logger.fatal('MYSQL_DATABASE env is not provided');
    process.exit(1);
}

export const {
    PORT,
    JWT_SECRET,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
} = process.env;
