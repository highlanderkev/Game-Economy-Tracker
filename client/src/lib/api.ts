import type { Game, GameWithCurrencies, InsertGame, Currency, InsertCurrency, PurchasePack, InsertPurchasePack } from "@shared/schema";

// Base API function with error handling
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`/api${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Games API
export const gamesApi = {
  getAll: (): Promise<GameWithCurrencies[]> => 
    apiRequest('/games'),
  
  getById: (id: string): Promise<Game> => 
    apiRequest(`/games/${id}`),
  
  create: (game: InsertGame): Promise<Game> => 
    apiRequest('/games', {
      method: 'POST',
      body: JSON.stringify(game),
    }),
  
  update: (id: string, game: Partial<InsertGame>): Promise<Game> => 
    apiRequest(`/games/${id}`, {
      method: 'PUT',
      body: JSON.stringify(game),
    }),
  
  delete: (id: string): Promise<void> => 
    apiRequest(`/games/${id}`, {
      method: 'DELETE',
    }),
};

// Currencies API
export const currenciesApi = {
  getByGameId: (gameId: string): Promise<Currency[]> => 
    apiRequest(`/games/${gameId}/currencies`),
  
  create: (currency: InsertCurrency): Promise<Currency> => 
    apiRequest('/currencies', {
      method: 'POST',
      body: JSON.stringify(currency),
    }),
  
  update: (id: string, currency: Partial<InsertCurrency>): Promise<Currency> => 
    apiRequest(`/currencies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(currency),
    }),
  
  delete: (id: string): Promise<void> => 
    apiRequest(`/currencies/${id}`, {
      method: 'DELETE',
    }),
};

// Purchase Packs API
export const purchasePacksApi = {
  getByCurrencyId: (currencyId: string): Promise<PurchasePack[]> => 
    apiRequest(`/currencies/${currencyId}/packs`),
  
  create: (pack: InsertPurchasePack): Promise<PurchasePack> => 
    apiRequest('/purchase-packs', {
      method: 'POST',
      body: JSON.stringify(pack),
    }),
  
  update: (id: string, pack: Partial<InsertPurchasePack>): Promise<PurchasePack> => 
    apiRequest(`/purchase-packs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pack),
    }),
  
  delete: (id: string): Promise<void> => 
    apiRequest(`/purchase-packs/${id}`, {
      method: 'DELETE',
    }),
};