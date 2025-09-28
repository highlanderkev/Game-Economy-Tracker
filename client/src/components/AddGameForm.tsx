import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Gamepad2, X, Plus } from "lucide-react";
import type { InsertGame } from "@shared/schema";

interface AddGameFormProps {
  onSubmit?: (game: InsertGame) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function AddGameForm({ onSubmit, onCancel, isLoading }: AddGameFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit?.({
      title: title.trim(),
      description: description.trim() || undefined
    });
    
    // Reset form
    setTitle("");
    setDescription("");
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    onCancel?.();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary/20">
              <Gamepad2 className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Add New Game</CardTitle>
          </div>
          {onCancel && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancel}
              data-testid="button-cancel"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="game-title">Game Title *</Label>
            <Input
              id="game-title"
              type="text"
              placeholder="Enter game title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              data-testid="input-game-title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="game-description">Description</Label>
            <Textarea
              id="game-description"
              placeholder="Brief description of the game (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              data-testid="input-game-description"
            />
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              disabled={!title.trim() || isLoading}
              className="flex-1"
              data-testid="button-submit"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isLoading ? "Adding..." : "Add Game"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                data-testid="button-cancel-form"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}