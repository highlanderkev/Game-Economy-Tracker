import PurchasePackCard from '../PurchasePackCard';
import type { PurchasePack } from '@shared/schema';

export default function PurchasePackCardExample() {
  //todo: remove mock functionality
  const mockPack: PurchasePack = {
    id: "1",
    currencyId: "1",
    name: "Blessing of the Welkin Moon",
    realWorldPrice: "4.99",
    currencyAmount: 3000
  };

  const handleEdit = () => {
    console.log('Edit pack triggered:', mockPack.name);
  };

  const handleDelete = () => {
    console.log('Delete pack triggered:', mockPack.name);
  };

  return (
    <div className="p-6 bg-background min-h-screen space-y-4">
      <div className="max-w-md">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Best Value Pack</h3>
        <PurchasePackCard 
          pack={mockPack}
          currencySymbol="💎"
          isHighlighted={true}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      
      <div className="max-w-md">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Regular Pack</h3>
        <PurchasePackCard 
          pack={{
            id: "2",
            currencyId: "1", 
            name: "Genesis Crystal Pack",
            realWorldPrice: "99.99",
            currencyAmount: 8080
          }}
          currencySymbol="💎"
          isHighlighted={false}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}