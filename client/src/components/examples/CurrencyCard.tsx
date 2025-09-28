import CurrencyCard from '../CurrencyCard';
import type { Currency, PurchasePack } from '@shared/schema';

export default function CurrencyCardExample() {
  //todo: remove mock functionality
  const mockCurrency: Currency & { purchasePacks: PurchasePack[] } = {
    id: "1",
    gameId: "1", 
    name: "V-Bucks",
    symbol: "🌟",
    purchasePacks: [
      {
        id: "1",
        currencyId: "1",
        name: "Starter Pack",
        realWorldPrice: "3.99",
        currencyAmount: 600
      },
      {
        id: "2", 
        currencyId: "1",
        name: "Deep Freeze Bundle",
        realWorldPrice: "29.99",
        currencyAmount: 1000
      },
      {
        id: "3",
        currencyId: "1", 
        name: "The Last Laugh Bundle",
        realWorldPrice: "11.99",
        currencyAmount: 1000
      }
    ]
  };

  const handleAddPack = () => {
    console.log('Add pack triggered for currency:', mockCurrency.name);
  };

  const handleViewPacks = () => {
    console.log('View packs triggered for currency:', mockCurrency.name);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-md">
        <CurrencyCard 
          currency={mockCurrency}
          onAddPack={handleAddPack}
          onViewPacks={handleViewPacks}
        />
      </div>
    </div>
  );
}