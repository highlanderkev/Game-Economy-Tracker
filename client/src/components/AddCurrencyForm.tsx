import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, X, Plus } from "lucide-react";
import type { InsertCurrency } from "@shared/schema";

interface AddCurrencyFormProps {
  gameId: string;
  gameTitle?: string;
  onSubmit?: (currency: InsertCurrency) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function AddCurrencyForm({ 
  gameId, 
  gameTitle, 
  onSubmit, 
  onCancel, 
  isLoading 
}: AddCurrencyFormProps) {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !symbol.trim()) return;
    
    onSubmit?.({
      gameId,
      name: name.trim(),
      symbol: symbol.trim()
    });
    
    // Reset form
    setName("");
    setSymbol("");
  };

  const handleCancel = () => {
    setName("");
    setSymbol("");
    onCancel?.();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-sidebar-accent/20">
              <Coins className="h-5 w-5 text-sidebar-accent" />
            </div>
            <div>
              <CardTitle className="text-lg">Add Currency</CardTitle>
              {gameTitle && (
                <p className="text-sm text-muted-foreground">to {gameTitle}</p>
              )}
            </div>
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
            <Label htmlFor="currency-name">Currency Name *</Label>
            <Input
              id="currency-name"
              type="text"
              placeholder="e.g., V-Bucks, Primogems"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              data-testid="input-currency-name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currency-symbol">Symbol *</Label>
            <Input
              id="currency-symbol"
              type="text"
              placeholder="e.g., 🌟, 💎, ⚡"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              required
              maxLength={10}
              data-testid="input-currency-symbol"
            />
            <p className="text-xs text-muted-foreground">
              Use emoji or short text (max 10 characters)
            </p>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              disabled={!name.trim() || !symbol.trim() || isLoading}
              className="flex-1"
              data-testid="button-submit"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isLoading ? "Adding..." : "Add Currency"}
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