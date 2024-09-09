CREATE TABLE `profile_info` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer,
	`metadata` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
