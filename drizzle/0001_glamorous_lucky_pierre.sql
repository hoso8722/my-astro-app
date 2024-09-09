DROP INDEX IF EXISTS `user_username_unique`;--> statement-breakpoint
ALTER TABLE `user` ADD `name` text;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `username`;