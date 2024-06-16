import { int, mysqlTable, text } from 'drizzle-orm/mysql-core';

const processings = mysqlTable('processings', {
    id: int('id').primaryKey().autoincrement(),
    status: text('status', {
        enum: [
            'created',
            'dataset-uploading',
            'dataset-uploaded',
            'merging',
            'merged',
            'distributing',
            'distributed',
        ],
    }),
});
