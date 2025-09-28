import GameCard from '../GameCard';
import type { GameWithCurrencies } from '@shared/schema';

export default function GameCardExample() {
  //todo: remove mock functionality
  const mockGame: GameWithCurrencies = {
    id: "1",
    title: "Genshin Impact",
    description: "Open-world action RPG with gacha mechanics and premium currency systems",
    currencies: [
      {
        id: "1",
        gameId: "1",
        name: "Primogems",
        symbol: "💎",
        purchasePacks: [
          { id: "1", currencyId: "1", name: "Blessing of the Welkin Moon", realWorldPrice: "4.99", currencyAmount: 3000 },
          { id: "2", currencyId: "1", name: "Genesis Crystal Pack", realWorldPrice: "99.99", currencyAmount: 8080 }
        ],
        bestValue: {
          packName: "Welkin Moon",
          costPerUnit: 0.00166
        }
      },
      {
        id: "2", 
        gameId: "1",
        name: "Genesis Crystals",
        symbol: "💠",
        purchasePacks: [
          { id: "3", currencyId: "2", name: "Small Pack", realWorldPrice: "0.99", currencyAmount: 60 },
          { id: "4", currencyId: "2", name: "Large Pack", realWorldPrice: "49.99", currencyAmount: 3280 }
        ],
        bestValue: {
          packName: "Large Pack", 
          costPerUnit: 0.01524
        }
      }
    ]
  };

  const handleAddCurrency = () => {
    console.log('Add currency triggered for game:', mockGame.title);
  };

  const handleViewDetails = () => {
    console.log('View details triggered for game:', mockGame.title);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-md">
        <GameCard 
          game={mockGame} 
          onAddCurrency={handleAddCurrency}
          onViewDetails={handleViewDetails}
        />
      </div>
    </div>
  );
}