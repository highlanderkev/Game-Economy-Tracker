import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, DollarSign, Coins, TrendingUp, TrendingDown, Edit, Trash2 } from "lucide-react";
import type { PurchasePack } from "@shared/schema";

interface PurchasePackCardProps {
  pack: PurchasePack;
  currencySymbol: string;
  isHighlighted?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PurchasePackCard({ 
  pack, 
  currencySymbol, 
  isHighlighted, 
  onEdit, 
  onDelete 
}: PurchasePackCardProps) {
  const costPerUnit = parseFloat(pack.realWorldPrice) / pack.currencyAmount;
  const formattedPrice = parseFloat(pack.realWorldPrice).toFixed(2);
  const formattedAmount = pack.currencyAmount.toLocaleString();

  return (
    <Card className={`hover-elevate transition-all duration-200 ${
      isHighlighted ? 'ring-2 ring-primary shadow-lg' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`p-2 rounded-md ${
              isHighlighted ? 'bg-primary/20' : 'bg-muted'
            }`}>
              <Package className={`h-5 w-5 ${
                isHighlighted ? 'text-primary' : 'text-muted-foreground'
              }`} />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg font-semibold truncate" data-testid="text-pack-name">
                {pack.name}
              </CardTitle>
              {isHighlighted && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  Best Value
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            {onEdit && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onEdit}
                data-testid="button-edit-pack"
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onDelete}
                data-testid="button-delete-pack"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Real Price:</span>
            </div>
            <div className="text-lg font-semibold" data-testid="text-real-price">
              ${formattedPrice}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Currency:</span>
            </div>
            <div className="text-lg font-semibold" data-testid="text-currency-amount">
              {currencySymbol} {formattedAmount}
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {costPerUnit < 0.01 ? (
                <TrendingDown className="h-4 w-4 text-primary" />
              ) : (
                <TrendingUp className="h-4 w-4 text-orange-500" />
              )}
              <span className="text-sm text-muted-foreground">Cost per unit:</span>
            </div>
            <div className={`font-mono font-bold text-lg ${
              isHighlighted ? 'text-primary' : 'text-foreground'
            }`} data-testid="text-cost-per-unit">
              ${costPerUnit.toFixed(6)}
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          <span className="font-mono">
            ${formattedPrice} ÷ {formattedAmount} = ${costPerUnit.toFixed(6)} per unit
          </span>
        </div>
      </CardContent>
    </Card>
  );
}