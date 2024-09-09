CREATE TABLE `login_users` (
	`user` text,
	`username` text,
	`password_hash` text,
	`session` text
);
--> statement-breakpoint
CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`isCompleted` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`mail_address` text NOT NULL,
	`username` text NOT NULL,
	`hashed_password` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `login_users_user_unique` ON `login_users` (`user`);--> statement-breakpoint
CREATE UNIQUE INDEX `login_users_username_unique` ON `login_users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_mail_address_unique` ON `user` (`mail_address`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);