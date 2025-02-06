ALTER TABLE "jobs" ADD COLUMN "progress" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "error" json;--> statement-breakpoint
ALTER TABLE "jobs" ADD COLUMN "module_statuses" json DEFAULT '{}'::json NOT NULL;