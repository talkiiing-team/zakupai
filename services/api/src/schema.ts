import { int, mysqlTable } from 'drizzle-orm/mysql-core';

const processings = mysqlTable('processings', {
    id: int('id').primaryKey().autoincrement(),
});
