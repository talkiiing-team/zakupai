import { mysqlTable, int, text, timestamp } from 'drizzle-orm/mysql-core';

export const processings = mysqlTable('processings', {
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
            'forecasting',
            'generating-plots',
            'done',
        ],
    }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});
