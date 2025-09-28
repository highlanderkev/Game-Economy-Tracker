import Dashboard from '../Dashboard';
import type { GameWithCurrencies } from '@shared/schema';

export default function DashboardExample() {
  //todo: remove mock functionality
  const mockGames: GameWithCurrencies[] = [
    {
      id: "1",
      title: "Fortnite",
      description: "Battle royale game with V-Bucks currency system",
      currencies: [
        {
          id: "1",
          gameId: "1",
          name: "V-Bucks",
          symbol: "🌟",
          purchasePacks: [
            { id: "1", currencyId: "1", name: "Starter Pack", realWorldPrice: "3.99", currencyAmount: 600 },
            { id: "2", currencyId: "1", name: "Deep Freeze Bundle", realWorldPrice: "29.99", currencyAmount: 1000 }
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
      description: "Open-world action RPG with gacha mechanics",
      currencies: [
        {
          id: "2",
          gameId: "2",
          name: "Primogems",
          symbol: "💎",
          purchasePacks: [
            { id: "3", currencyId: "2", name: "Welkin Moon", realWorldPrice: "4.99", currencyAmount: 3000 },
            { id: "4", currencyId: "2", name: "Genesis Pack", realWorldPrice: "99.99", currencyAmount: 8080 }
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
            { id: "5", currencyId: "3", name: "Small Pack", realWorldPrice: "0.99", currencyAmount: 60 }
          ],
          bestValue: {
            packName: "Small Pack",
            costPerUnit: 0.0165
          }
        }
      ]
    },
    {
      id: "3",
      title: "League of Legends", 
      description: "MOBA with Riot Points premium currency",
      currencies: [
        {
          id: "4",
          gameId: "3",
          name: "Riot Points",
          symbol: "⚡",
          purchasePacks: [],
        }
      ]
    }
  ];

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
    <div className="bg-background min-h-screen">
      <Dashboard 
        games={mockGames}
        onAddGame={handleAddGame}
        onAddCurrency={handleAddCurrency}
        onViewGameDetails={handleViewGameDetails}
      />
    </div>
  );
}