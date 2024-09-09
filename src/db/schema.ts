import { reference } from 'astro:content';
import { Table, relations } from 'drizzle-orm';
import { text, integer, sqliteTable, uniqueIndex, index  } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name'),
  isCompleted: integer('isCompleted', { mode: 'boolean' }).notNull().default(false),
});

export const login_users = sqliteTable('login_users', {
    user: text('user').unique(),
    username: text('username').unique(),
    password_hash: text('password_hash'),
    session: text('session'),
  }
);

export const user = sqliteTable("user", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  mailAddress: text("mail_address"),
  hashedPassword: text("hashed_password")
}, (table) => {
  return {
    nameIdx: index("name_idx").on(table.name),
    emailIdx: uniqueIndex("email_idx").on(table.mailAddress),
  };
});

// export const userRelations = relations(user, ({ one }) => ({
//   profileInfo: one(profileInfo),
// }));


// export const profileInfo = sqliteTable('profile_info', {
//   id: integer('id').primaryKey(),
//   userId: integer("user_id").unique().references(() => user.id),
//   metadata: text("metadata"),
// });

export const userRelations = relations(user, ({ one }) => ({
  session: one(session),
}));

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  userId: integer("user_id")
    .unique()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

// export const oauth_account = sqliteTable("oauth_account", {
//   providerId: text("provider_id").notNull(),
//   providerUserId: text("provider_user_id").notNull(),
//   userId: text("user_id")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),
// })