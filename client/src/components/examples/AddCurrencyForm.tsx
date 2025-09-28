import AddCurrencyForm from '../AddCurrencyForm';
import type { InsertCurrency } from '@shared/schema';

export default function AddCurrencyFormExample() {
  const handleSubmit = (currency: InsertCurrency) => {
    console.log('Currency submitted:', currency);
  };

  const handleCancel = () => {
    console.log('Form cancelled');
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="flex justify-center">
        <AddCurrencyForm 
          gameId="1"
          gameTitle="Genshin Impact"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}