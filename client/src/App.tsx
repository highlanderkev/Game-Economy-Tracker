import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotFound from "@/pages/not-found";
import Dashboard from "@/components/Dashboard";
import type { GameWithCurrencies } from "@shared/schema";

// Mock data for prototype demonstration
//todo: remove mock functionality
const mockGames: GameWithCurrencies[] = [
  {
    id: "1",
    title: "Fortnite",
    description: "Battle royale game with cosmetic items and battle pass progression",
    currencies: [
      {
        id: "1",
        gameId: "1",
        name: "V-Bucks",
        symbol: "🌟",
        purchasePacks: [
          { id: "1", currencyId: "1", name: "Starter Pack", realWorldPrice: "3.99", currencyAmount: 600 },
          { id: "2", currencyId: "1", name: "Deep Freeze Bundle", realWorldPrice: "29.99", currencyAmount: 1000 },
          { id: "3", currencyId: "1", name: "The Last Laugh Bundle", realWorldPrice: "11.99", currencyAmount: 1000 }
        ],
        bestValue: {
          packName: "Starter Pack",
          costPerUnit: 0.00665
        }
      }
    ]
  },
  {
    id: "2", 
    title: "Genshin Impact",
    description: "Open-world action RPG with gacha mechanics and premium currency systems",
    currencies: [
      {
        id: "2",
        gameId: "2",
        name: "Primogems",
        symbol: "💎",
        purchasePacks: [
          { id: "4", currencyId: "2", name: "Blessing of the Welkin Moon", realWorldPrice: "4.99", currencyAmount: 3000 },
          { id: "5", currencyId: "2", name: "Genesis Crystal Pack", realWorldPrice: "99.99", currencyAmount: 8080 },
          { id: "6", currencyId: "2", name: "Monthly Card", realWorldPrice: "4.99", currencyAmount: 2700 }
        ],
        bestValue: {
          packName: "Welkin Moon",
          costPerUnit: 0.00166
        }
      },
      {
        id: "3",
        gameId: "2", 
        name: "Genesis Crystals",
        symbol: "💠",
        purchasePacks: [
          { id: "7", currencyId: "3", name: "Small Pack", realWorldPrice: "0.99", currencyAmount: 60 },
          { id: "8", currencyId: "3", name: "Large Pack", realWorldPrice: "49.99", currencyAmount: 3280 }
        ],
        bestValue: {
          packName: "Large Pack",
          costPerUnit: 0.01524
        }
      }
    ]
  },
  {
    id: "3",
    title: "League of Legends", 
    description: "MOBA with champion skins and cosmetic content available for purchase",
    currencies: [
      {
        id: "4",
        gameId: "3",
        name: "Riot Points",
        symbol: "⚡",
        purchasePacks: [
          { id: "9", currencyId: "4", name: "RP 650", realWorldPrice: "5.00", currencyAmount: 650 },
          { id: "10", currencyId: "4", name: "RP 1380", realWorldPrice: "10.00", currencyAmount: 1380 },
          { id: "11", currencyId: "4", name: "RP 2800", realWorldPrice: "20.00", currencyAmount: 2800 }
        ],
        bestValue: {
          packName: "RP 2800",
          costPerUnit: 0.00714
        }
      }
    ]
  },
  {
    id: "4",
    title: "Apex Legends",
    description: "Battle royale with seasonal battle passes and cosmetic upgrades",
    currencies: [
      {
        id: "5",
        gameId: "4",
        name: "Apex Coins",
        symbol: "🔸",
        purchasePacks: [],
      }
    ]
  }
];

function Router() {
  const handleAddGame = (gameData: any) => {
    console.log('Add game triggered:', gameData);
  };

  const handleAddCurrency = (gameId: string) => {
    console.log('Add currency triggered for game:', gameId);
  };

  const handleViewGameDetails = (gameId: string) => {
    console.log('View game details triggered for game:', gameId);
  };

  return (
    <Switch>
      <Route path="/" component={() => 
        <Dashboard 
          games={mockGames}
          onAddGame={handleAddGame}
          onAddCurrency={handleAddCurrency}
          onViewGameDetails={handleViewGameDetails}
        />
      } />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
              <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/20">
                    <span className="text-2xl">🎮</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Game Economy Tracker</h1>
                    <p className="text-xs text-muted-foreground">
                      Analyze in-game currency economics
                    </p>
                  </div>
                </div>
                <ThemeToggle />
              </div>
            </header>
            
            <main className="container mx-auto max-w-7xl">
              <Router />
            </main>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
