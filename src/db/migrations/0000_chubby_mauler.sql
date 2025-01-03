CREATE TYPE "public"."status" AS ENUM('open', 'paid', 'void', 'uncollabled');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"createTs" timestamp DEFAULT now() NOT NULL,
	"value" integer NOT NULL,
	"user_id" text NOT NULL,
	"description" text NOT NULL,
	"status" "status" NOT NULL
);
