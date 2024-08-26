import { text, integer, sqliteTable, uniqueIndex  } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name'),
  isCompleted: integer('isCompleted', { mode: 'boolean' }).notNull().default(false),
});

export const login_users = sqliteTable('login_users', {
    user: text('user').unique(),
    username: text('username').unique(),
    password_hash: text('password_hash'),
    session: text('settion'),
  }
);