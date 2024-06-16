import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/schema.ts',
    dialect: 'mysql',
    dbCredentials: {
        host: process.env.MYSQL_HOST!,
        user: process.env.MYSQL_USER!,
        password: process.env.MYSQL_PASSWORD!,
        database: process.env.MYSQL_DATABASE!,
    },
    verbose: true,
    strict: true,
});
