import AddGameForm from '../AddGameForm';
import type { InsertGame } from '@shared/schema';

export default function AddGameFormExample() {
  const handleSubmit = (game: InsertGame) => {
    console.log('Game submitted:', game);
  };

  const handleCancel = () => {
    console.log('Form cancelled');
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="flex justify-center">
        <AddGameForm 
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}