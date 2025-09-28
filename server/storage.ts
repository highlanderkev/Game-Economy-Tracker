import { type Game, type InsertGame, type Currency, type InsertCurrency, type PurchasePack, type InsertPurchasePack, type GameWithCurrencies } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // Games
  getGame(id: string): Promise<Game | undefined>;
  getAllGames(): Promise<Game[]>;
  createGame(game: InsertGame): Promise<Game>;
  updateGame(id: string, game: Partial<InsertGame>): Promise<Game | undefined>;
  deleteGame(id: string): Promise<boolean>;

  // Currencies
  getCurrency(id: string): Promise<Currency | undefined>;
  getCurrenciesByGameId(gameId: string): Promise<Currency[]>;
  createCurrency(currency: InsertCurrency): Promise<Currency>;
  updateCurrency(id: string, currency: Partial<InsertCurrency>): Promise<Currency | undefined>;
  deleteCurrency(id: string): Promise<boolean>;

  // Purchase Packs
  getPurchasePack(id: string): Promise<PurchasePack | undefined>;
  getPurchasePacksByCurrencyId(currencyId: string): Promise<PurchasePack[]>;
  createPurchasePack(pack: InsertPurchasePack): Promise<PurchasePack>;
  updatePurchasePack(id: string, pack: Partial<InsertPurchasePack>): Promise<PurchasePack | undefined>;
  deletePurchasePack(id: string): Promise<boolean>;

  // Complex queries
  getGamesWithCurrencies(): Promise<GameWithCurrencies[]>;
}

export class MemStorage implements IStorage {
  private games: Map<string, Game>;
  private currencies: Map<string, Currency>;
  private purchasePacks: Map<string, PurchasePack>;

  constructor() {
    this.games = new Map();
    this.currencies = new Map();
    this.purchasePacks = new Map();
  }

  // Games
  async getGame(id: string): Promise<Game | undefined> {
    return this.games.get(id);
  }

  async getAllGames(): Promise<Game[]> {
    return Array.from(this.games.values());
  }

  async createGame(insertGame: InsertGame): Promise<Game> {
    const id = randomUUID();
    const game: Game = { 
      ...insertGame, 
      id,
      description: insertGame.description || null
    };
    this.games.set(id, game);
    return game;
  }

  async updateGame(id: string, gameData: Partial<InsertGame>): Promise<Game | undefined> {
    const existing = this.games.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...gameData };
    this.games.set(id, updated);
    return updated;
  }

  async deleteGame(id: string): Promise<boolean> {
    return this.games.delete(id);
  }

  // Currencies
  async getCurrency(id: string): Promise<Currency | undefined> {
    return this.currencies.get(id);
  }

  async getCurrenciesByGameId(gameId: string): Promise<Currency[]> {
    return Array.from(this.currencies.values()).filter(c => c.gameId === gameId);
  }

  async createCurrency(insertCurrency: InsertCurrency): Promise<Currency> {
    const id = randomUUID();
    const currency: Currency = { ...insertCurrency, id };
    this.currencies.set(id, currency);
    return currency;
  }

  async updateCurrency(id: string, currencyData: Partial<InsertCurrency>): Promise<Currency | undefined> {
    const existing = this.currencies.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...currencyData };
    this.currencies.set(id, updated);
    return updated;
  }

  async deleteCurrency(id: string): Promise<boolean> {
    return this.currencies.delete(id);
  }

  // Purchase Packs
  async getPurchasePack(id: string): Promise<PurchasePack | undefined> {
    return this.purchasePacks.get(id);
  }

  async getPurchasePacksByCurrencyId(currencyId: string): Promise<PurchasePack[]> {
    return Array.from(this.purchasePacks.values()).filter(p => p.currencyId === currencyId);
  }

  async createPurchasePack(insertPack: InsertPurchasePack): Promise<PurchasePack> {
    const id = randomUUID();
    const pack: PurchasePack = { ...insertPack, id };
    this.purchasePacks.set(id, pack);
    return pack;
  }

  async updatePurchasePack(id: string, packData: Partial<InsertPurchasePack>): Promise<PurchasePack | undefined> {
    const existing = this.purchasePacks.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...packData };
    this.purchasePacks.set(id, updated);
    return updated;
  }

  async deletePurchasePack(id: string): Promise<boolean> {
    return this.purchasePacks.delete(id);
  }

  // Complex queries
  async getGamesWithCurrencies(): Promise<GameWithCurrencies[]> {
    const games = await this.getAllGames();
    
    return Promise.all(games.map(async (game) => {
      const currencies = await this.getCurrenciesByGameId(game.id);
      
      const currenciesWithPacks = await Promise.all(currencies.map(async (currency) => {
        const purchasePacks = await this.getPurchasePacksByCurrencyId(currency.id);
        
        // Calculate best value
        let bestValue;
        if (purchasePacks.length > 0) {
          const packsWithValue = purchasePacks.map(pack => ({
            ...pack,
            costPerUnit: parseFloat(pack.realWorldPrice) / pack.currencyAmount
          }));
          const bestPack = packsWithValue.reduce((best, current) => 
            current.costPerUnit < best.costPerUnit ? current : best
          );
          bestValue = {
            packName: bestPack.name,
            costPerUnit: bestPack.costPerUnit
          };
        }
        
        return {
          ...currency,
          purchasePacks,
          bestValue
        };
      }));
      
      return {
        ...game,
        currencies: currenciesWithPacks
      };
    }));
  }
}

export const storage = new MemStorage();
