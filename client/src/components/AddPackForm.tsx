import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, X, Plus } from "lucide-react";
import type { InsertPurchasePack } from "@shared/schema";

interface AddPackFormProps {
  currencyId: string;
  currencyName?: string;
  currencySymbol?: string;
  onSubmit?: (pack: InsertPurchasePack) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function AddPackForm({ 
  currencyId, 
  currencyName, 
  currencySymbol,
  onSubmit, 
  onCancel, 
  isLoading 
}: AddPackFormProps) {
  const [name, setName] = useState("");
  const [realWorldPrice, setRealWorldPrice] = useState("");
  const [currencyAmount, setCurrencyAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !realWorldPrice || !currencyAmount) return;
    
    const price = parseFloat(realWorldPrice);
    const amount = parseInt(currencyAmount);
    
    if (isNaN(price) || isNaN(amount) || price <= 0 || amount <= 0) return;
    
    onSubmit?.({
      currencyId,
      name: name.trim(),
      realWorldPrice: price.toFixed(2),
      currencyAmount: amount
    });
    
    // Reset form
    setName("");
    setRealWorldPrice("");
    setCurrencyAmount("");
  };

  const handleCancel = () => {
    setName("");
    setRealWorldPrice("");
    setCurrencyAmount("");
    onCancel?.();
  };

  // Calculate cost per unit in real-time
  const price = parseFloat(realWorldPrice) || 0;
  const amount = parseInt(currencyAmount) || 0;
  const costPerUnit = amount > 0 ? price / amount : 0;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary/20">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Add Purchase Pack</CardTitle>
              {currencyName && (
                <p className="text-sm text-muted-foreground">
                  for {currencySymbol} {currencyName}
                </p>
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
            <Label htmlFor="pack-name">Pack Name *</Label>
            <Input
              id="pack-name"
              type="text"
              placeholder="e.g., Starter Pack, Large Bundle"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              data-testid="input-pack-name"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="real-price">Real Price *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="real-price"
                  type="number"
                  placeholder="4.99"
                  value={realWorldPrice}
                  onChange={(e) => setRealWorldPrice(e.target.value)}
                  step="0.01"
                  min="0"
                  required
                  className="pl-8"
                  data-testid="input-real-price"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency-amount">Currency Amount *</Label>
              <Input
                id="currency-amount"
                type="number"
                placeholder="1000"
                value={currencyAmount}
                onChange={(e) => setCurrencyAmount(e.target.value)}
                min="1"
                required
                data-testid="input-currency-amount"
              />
            </div>
          </div>

          {costPerUnit > 0 && (
            <div className="p-3 bg-muted/50 rounded-md">
              <div className="text-sm text-muted-foreground">Cost per unit:</div>
              <div className="font-mono font-bold text-lg text-primary" data-testid="text-cost-preview">
                ${costPerUnit.toFixed(6)}
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                ${price.toFixed(2)} ÷ {amount.toLocaleString()} = ${costPerUnit.toFixed(6)}
              </div>
            </div>
          )}
          
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              disabled={!name.trim() || !realWorldPrice || !currencyAmount || isLoading}
              className="flex-1"
              data-testid="button-submit"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isLoading ? "Adding..." : "Add Pack"}
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