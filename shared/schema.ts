import { sql } from "drizzle-orm";
import { pgTable, text, varchar, numeric, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const games = pgTable("games", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
});

export const currencies = pgTable("currencies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  gameId: varchar("game_id").notNull(),
  name: text("name").notNull(),
  symbol: text("symbol").notNull(),
});

export const purchasePacks = pgTable("purchase_packs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  currencyId: varchar("currency_id").notNull(),
  name: text("name").notNull(),
  realWorldPrice: numeric("real_world_price", { precision: 10, scale: 2 }).notNull(),
  currencyAmount: integer("currency_amount").notNull(),
});

export const insertGameSchema = createInsertSchema(games).omit({
  id: true,
});

export const insertCurrencySchema = createInsertSchema(currencies).omit({
  id: true,
});

export const insertPurchasePackSchema = createInsertSchema(purchasePacks).omit({
  id: true,
});

export type InsertGame = z.infer<typeof insertGameSchema>;
export type Game = typeof games.$inferSelect;

export type InsertCurrency = z.infer<typeof insertCurrencySchema>;
export type Currency = typeof currencies.$inferSelect;

export type InsertPurchasePack = z.infer<typeof insertPurchasePackSchema>;
export type PurchasePack = typeof purchasePacks.$inferSelect;

// Extended types for UI
export type GameWithCurrencies = Game & {
  currencies: (Currency & {
    purchasePacks: PurchasePack[];
    bestValue?: {
      packName: string;
      costPerUnit: number;
    };
  })[];
};