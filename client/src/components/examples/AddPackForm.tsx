import AddPackForm from '../AddPackForm';
import type { InsertPurchasePack } from '@shared/schema';

export default function AddPackFormExample() {
  const handleSubmit = (pack: InsertPurchasePack) => {
    console.log('Pack submitted:', pack);
  };

  const handleCancel = () => {
    console.log('Form cancelled');
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="flex justify-center">
        <AddPackForm 
          currencyId="1"
          currencyName="V-Bucks"
          currencySymbol="🌟"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}