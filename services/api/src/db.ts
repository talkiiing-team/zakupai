import path from 'node:path';

import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';

import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER } from '@/env';

const pool = mysql.createPool({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
});

export const db = drizzle(pool);

export const migrateDb = async () => {
    await migrate(db, {
        migrationsFolder: path.resolve(import.meta.dirname, '../migrations'),
    });
};
