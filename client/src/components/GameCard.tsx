import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gamepad, Coins, TrendingDown, Plus } from "lucide-react";
import type { GameWithCurrencies } from "@shared/schema";

interface GameCardProps {
  game: GameWithCurrencies;
  onAddCurrency?: () => void;
  onViewDetails?: () => void;
}

export default function GameCard({ game, onAddCurrency, onViewDetails }: GameCardProps) {
  const totalCurrencies = game.currencies.length;
  const bestDeals = game.currencies
    .filter(c => c.bestValue)
    .sort((a, b) => (a.bestValue?.costPerUnit || 0) - (b.bestValue?.costPerUnit || 0));

  return (
    <Card className="hover-elevate transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="p-2 rounded-md bg-sidebar-accent/20">
              <Gamepad className="h-5 w-5 text-sidebar-accent" data-testid="icon-game" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg font-semibold truncate" data-testid="text-game-title">
                {game.title}
              </CardTitle>
              {game.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2" data-testid="text-game-description">
                  {game.description}
                </p>
              )}
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={onAddCurrency}
            className="shrink-0"
            data-testid="button-add-currency"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Currencies:</span>
            <Badge variant="secondary" data-testid="text-currency-count">
              {totalCurrencies}
            </Badge>
          </div>
        </div>

        {bestDeals.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingDown className="h-4 w-4 text-primary" />
              <span>Best Value:</span>
            </div>
            <div className="space-y-1">
              {bestDeals.slice(0, 2).map((currency) => (
                <div
                  key={currency.id}
                  className="flex items-center justify-between text-sm"
                  data-testid={`best-deal-${currency.id}`}
                >
                  <span className="font-medium text-foreground">
                    {currency.symbol} {currency.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {currency.bestValue?.packName}
                    </span>
                    <span className="font-mono font-medium text-primary">
                      ${currency.bestValue?.costPerUnit.toFixed(4)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={onViewDetails}
          className="w-full"
          data-testid="button-view-details"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}