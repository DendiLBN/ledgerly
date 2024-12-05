CREATE TYPE "public"."status" AS ENUM('open', 'paid', 'void', 'uncollabled');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"create_ts" timestamp NOT NULL,
	"value" integer NOT NULL,
	"description" text NOT NULL,
	"status" "status" NOT NULL
);
