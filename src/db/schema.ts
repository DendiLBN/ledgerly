import { AVAILABLE_STATUSES } from "@/data/invoices";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export type Status = (typeof AVAILABLE_STATUSES)[number]["id"];

const statuses = AVAILABLE_STATUSES.map(({ id }) => id) as Array<Status>;

export const statusEnum = pgEnum(
  "status",
  statuses as [Status, ...Array<Status>]
);

export const Invoices = pgTable("invoices", {
  id: serial("id").primaryKey().notNull(),
  createTs: timestamp("createTs").defaultNow().notNull(),
  value: integer("value").notNull(),
  userId: text("user_id").notNull(),
  organizationId: text("organizationId"),
  description: text("description").notNull(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => Customers.id),
  status: statusEnum("status").notNull(),
});

export const Customers = pgTable("customers", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createTs: timestamp("createTs").defaultNow().notNull(),
  userId: text("user_id").notNull(),
  organizationId: text("organizationId"),
});
