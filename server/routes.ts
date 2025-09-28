import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameSchema, insertCurrencySchema, insertPurchasePackSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Games API
  app.get("/api/games", async (req, res) => {
    try {
      const games = await storage.getGamesWithCurrencies();
      res.json(games);
    } catch (error) {
      console.error("Error fetching games:", error);
      res.status(500).json({ error: "Failed to fetch games" });
    }
  });

  app.get("/api/games/:id", async (req, res) => {
    try {
      const game = await storage.getGame(req.params.id);
      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }
      res.json(game);
    } catch (error) {
      console.error("Error fetching game:", error);
      res.status(500).json({ error: "Failed to fetch game" });
    }
  });

  app.post("/api/games", async (req, res) => {
    try {
      const gameData = insertGameSchema.parse(req.body);
      const game = await storage.createGame(gameData);
      res.status(201).json(game);
    } catch (error) {
      console.error("Error creating game:", error);
      res.status(400).json({ error: "Invalid game data" });
    }
  });

  app.put("/api/games/:id", async (req, res) => {
    try {
      const gameData = insertGameSchema.partial().parse(req.body);
      const game = await storage.updateGame(req.params.id, gameData);
      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }
      res.json(game);
    } catch (error) {
      console.error("Error updating game:", error);
      res.status(400).json({ error: "Invalid game data" });
    }
  });

  app.delete("/api/games/:id", async (req, res) => {
    try {
      const success = await storage.deleteGame(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Game not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting game:", error);
      res.status(500).json({ error: "Failed to delete game" });
    }
  });

  // Currencies API
  app.get("/api/games/:gameId/currencies", async (req, res) => {
    try {
      const currencies = await storage.getCurrenciesByGameId(req.params.gameId);
      res.json(currencies);
    } catch (error) {
      console.error("Error fetching currencies:", error);
      res.status(500).json({ error: "Failed to fetch currencies" });
    }
  });

  app.post("/api/currencies", async (req, res) => {
    try {
      const currencyData = insertCurrencySchema.parse(req.body);
      const currency = await storage.createCurrency(currencyData);
      res.status(201).json(currency);
    } catch (error) {
      console.error("Error creating currency:", error);
      res.status(400).json({ error: "Invalid currency data" });
    }
  });

  app.put("/api/currencies/:id", async (req, res) => {
    try {
      const currencyData = insertCurrencySchema.partial().parse(req.body);
      const currency = await storage.updateCurrency(req.params.id, currencyData);
      if (!currency) {
        return res.status(404).json({ error: "Currency not found" });
      }
      res.json(currency);
    } catch (error) {
      console.error("Error updating currency:", error);
      res.status(400).json({ error: "Invalid currency data" });
    }
  });

  app.delete("/api/currencies/:id", async (req, res) => {
    try {
      const success = await storage.deleteCurrency(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Currency not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting currency:", error);
      res.status(500).json({ error: "Failed to delete currency" });
    }
  });

  // Purchase Packs API
  app.get("/api/currencies/:currencyId/packs", async (req, res) => {
    try {
      const packs = await storage.getPurchasePacksByCurrencyId(req.params.currencyId);
      res.json(packs);
    } catch (error) {
      console.error("Error fetching purchase packs:", error);
      res.status(500).json({ error: "Failed to fetch purchase packs" });
    }
  });

  app.post("/api/purchase-packs", async (req, res) => {
    try {
      const packData = insertPurchasePackSchema.parse(req.body);
      const pack = await storage.createPurchasePack(packData);
      res.status(201).json(pack);
    } catch (error) {
      console.error("Error creating purchase pack:", error);
      res.status(400).json({ error: "Invalid purchase pack data" });
    }
  });

  app.put("/api/purchase-packs/:id", async (req, res) => {
    try {
      const packData = insertPurchasePackSchema.partial().parse(req.body);
      const pack = await storage.updatePurchasePack(req.params.id, packData);
      if (!pack) {
        return res.status(404).json({ error: "Purchase pack not found" });
      }
      res.json(pack);
    } catch (error) {
      console.error("Error updating purchase pack:", error);
      res.status(400).json({ error: "Invalid purchase pack data" });
    }
  });

  app.delete("/api/purchase-packs/:id", async (req, res) => {
    try {
      const success = await storage.deletePurchasePack(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Purchase pack not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting purchase pack:", error);
      res.status(500).json({ error: "Failed to delete purchase pack" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
