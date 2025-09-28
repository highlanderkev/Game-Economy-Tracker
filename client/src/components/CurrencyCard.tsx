import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp, TrendingDown, Plus, Package } from "lucide-react";
import type { Currency, PurchasePack } from "@shared/schema";

interface CurrencyCardProps {
  currency: Currency & { purchasePacks: PurchasePack[] };
  onAddPack?: () => void;
  onViewPacks?: () => void;
}

export default function CurrencyCard({ currency, onAddPack, onViewPacks }: CurrencyCardProps) {
  // Calculate best and worst value packs
  const packsWithValue = currency.purchasePacks.map(pack => ({
    ...pack,
    costPerUnit: parseFloat(pack.realWorldPrice) / pack.currencyAmount
  }));

  const bestPack = packsWithValue.reduce((best, current) => 
    current.costPerUnit < best.costPerUnit ? current : best, packsWithValue[0]);
  
  const worstPack = packsWithValue.reduce((worst, current) => 
    current.costPerUnit > worst.costPerUnit ? current : worst, packsWithValue[0]);

  const averageCostPerUnit = packsWithValue.length > 0 
    ? packsWithValue.reduce((sum, pack) => sum + pack.costPerUnit, 0) / packsWithValue.length 
    : 0;

  return (
    <Card className="hover-elevate transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="text-2xl" data-testid="text-currency-symbol">
              {currency.symbol}
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg font-semibold" data-testid="text-currency-name">
                {currency.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {currency.purchasePacks.length} pack{currency.purchasePacks.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={onAddPack}
            className="shrink-0"
            data-testid="button-add-pack"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {currency.purchasePacks.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Best Value:</span>
                </div>
                <div className="font-mono font-medium text-primary" data-testid="text-best-value">
                  ${bestPack?.costPerUnit.toFixed(6)}
                </div>
                <div className="text-xs text-muted-foreground" data-testid="text-best-pack">
                  {bestPack?.name}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-destructive" />
                  <span className="text-muted-foreground">Worst Value:</span>
                </div>
                <div className="font-mono font-medium text-destructive" data-testid="text-worst-value">
                  ${worstPack?.costPerUnit.toFixed(6)}
                </div>
                <div className="text-xs text-muted-foreground" data-testid="text-worst-pack">
                  {worstPack?.name}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Average Cost:</span>
                <span className="font-mono font-medium" data-testid="text-average-cost">
                  ${averageCostPerUnit.toFixed(6)} per unit
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onViewPacks}
              className="w-full"
              data-testid="button-view-packs"
            >
              View All Packs
            </Button>
          </>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No purchase packs added yet</p>
            <p className="text-xs">Add packs to see cost analysis</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}