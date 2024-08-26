CREATE TABLE `login_users` (
	`username` text,
	`password_hash` text
);
--> statement-breakpoint
CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`isCompleted` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `login_users_username_unique` ON `login_users` (`username`);