const { mysqlTable, int, varchar, text, datetime, index } = require('drizzle-orm/mysql-core');

const users = mysqlTable('users', {
    id: int('id').autoincrement().primaryKey(),
    username: varchar('username', { length: 255 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
});

const sessions = mysqlTable(
    'sessions',
    {
        sid: varchar('sid', { length: 128 }).primaryKey(),
        data: text('data').notNull(),
        expiresAt: datetime('expires_at').notNull(),
    },
    (table) => [index('sessions_expires_at_idx').on(table.expiresAt)],
);

module.exports = { users, sessions };
