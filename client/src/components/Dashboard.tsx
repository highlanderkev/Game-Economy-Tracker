import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Gamepad2, 
  Coins, 
  TrendingDown, 
  Search, 
  Plus,
  BarChart3,
  DollarSign 
} from "lucide-react";
import GameCard from "./GameCard";
import AddGameForm from "./AddGameForm";
import type { GameWithCurrencies } from "@shared/schema";

interface DashboardProps {
  games?: GameWithCurrencies[];
  onAddGame?: (game: any) => void;
  onAddCurrency?: (gameId: string) => void;
  onViewGameDetails?: (gameId: string) => void;
}

export default function Dashboard({ 
  games = [], 
  onAddGame, 
  onAddCurrency, 
  onViewGameDetails 
}: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Calculate dashboard stats
  const totalGames = games.length;
  const totalCurrencies = games.reduce((acc, game) => acc + game.currencies.length, 0);
  const bestValueCurrencies = games.flatMap(game => 
    game.currencies.filter(c => c.bestValue)
  ).sort((a, b) => (a.bestValue?.costPerUnit || 0) - (b.bestValue?.costPerUnit || 0));

  // Filter games based on search
  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddGame = (gameData: any) => {
    onAddGame?.(gameData);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-dashboard-title">
            Game Economy Tracker
          </h1>
          <p className="text-muted-foreground">
            Track and analyze in-game currency values across your favorite games
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="gap-2"
          data-testid="button-add-game"
        >
          <Plus className="h-4 w-4" />
          Add Game
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Games</CardTitle>
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-games">
              {totalGames}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Currencies</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-currencies">
              {totalCurrencies}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Value</CardTitle>
            <TrendingDown className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            {bestValueCurrencies.length > 0 ? (
              <div>
                <div className="text-2xl font-bold font-mono text-primary" data-testid="text-best-value">
                  ${bestValueCurrencies[0].bestValue?.costPerUnit.toFixed(4)}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {bestValueCurrencies[0].symbol} {bestValueCurrencies[0].name}
                </p>
              </div>
            ) : (
              <div className="text-2xl font-bold text-muted-foreground">-</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {bestValueCurrencies.length > 0 ? (
              <div className="text-2xl font-bold font-mono" data-testid="text-average-value">
                ${(bestValueCurrencies.reduce((sum, c) => sum + (c.bestValue?.costPerUnit || 0), 0) / bestValueCurrencies.length).toFixed(4)}
              </div>
            ) : (
              <div className="text-2xl font-bold text-muted-foreground">-</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search"
          />
        </div>
      </div>

      {/* Add Game Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" data-testid="modal-add-game">
          <AddGameForm
            onSubmit={handleAddGame}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {/* Games Grid */}
      <div className="space-y-4">
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onAddCurrency={() => onAddCurrency?.(game.id)}
                onViewDetails={() => onViewGameDetails?.(game.id)}
              />
            ))}
          </div>
        ) : searchQuery ? (
          <Card className="p-8 text-center">
            <div className="text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-4 opacity-50" />
              <p>No games found matching "{searchQuery}"</p>
            </div>
          </Card>
        ) : (
          <Card className="p-8 text-center">
            <div className="text-muted-foreground">
              <Gamepad2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No games added yet</h3>
              <p className="mb-4">Start tracking your game economies by adding your first game!</p>
              <Button onClick={() => setShowAddForm(true)} data-testid="button-add-first-game">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Game
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}