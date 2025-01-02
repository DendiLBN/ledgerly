import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "open",
  "paid",
  "void",
  "uncollabled",
]);

export const Invoices = pgTable("invoices", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createTs: timestamp("createTs").defaultNow().notNull(),
  value: integer("value").notNull(),
  userId: text("user_id").notNull(),
  description: text("description").notNull(),
  status: statusEnum("status").notNull(),
});
