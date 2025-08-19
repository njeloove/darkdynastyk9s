import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean } from "drizzle-orm/pg-core";
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
