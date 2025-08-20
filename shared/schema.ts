import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const puppies = pgTable("puppies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  breed: text("breed").notNull(),
  age: text("age").notNull(),
  weight: text("weight").notNull(),
  gender: text("gender").notNull(),
  price: integer("price").notNull(),
  color: text("color").notNull(),
  description: text("description"),
  images: text("images").array().notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
  healthStatus: text("health_status").notNull().default("100% Healthy"),
  isVaccinated: boolean("is_vaccinated").notNull().default(true),
  isInsured: boolean("is_insured").notNull().default(true),
  freeDelivery: boolean("free_delivery").notNull().default(true),
});

export const insertPuppySchema = createInsertSchema(puppies).omit({
  id: true,
});

export type InsertPuppy = z.infer<typeof insertPuppySchema>;
export type Puppy = typeof puppies.$inferSelect;

// Visitor tracking table
export const visitors = pgTable("visitors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ipAddress: text("ip_address").notNull(),
  userAgent: text("user_agent"),
  country: text("country"),
  city: text("city"),
  visitTime: timestamp("visit_time").defaultNow().notNull(),
  pageVisited: text("page_visited").notNull().default('/'),
});

export const insertVisitorSchema = createInsertSchema(visitors).omit({
  id: true,
});

export type InsertVisitor = z.infer<typeof insertVisitorSchema>;
export type Visitor = typeof visitors.$inferSelect;
