CREATE TABLE IF NOT EXISTS "audits" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now()
);
