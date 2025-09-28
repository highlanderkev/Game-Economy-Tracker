import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { currenciesApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { gameKeys } from "./useGames";
import type { InsertCurrency } from "@shared/schema";

// Query keys
export const currencyKeys = {
  byGame: (gameId: string) => ['currencies', 'game', gameId] as const,
};

// Get currencies by game ID
export function useCurrencies(gameId: string) {
  return useQuery({
    queryKey: currencyKeys.byGame(gameId),
    queryFn: () => currenciesApi.getByGameId(gameId),
    enabled: !!gameId,
  });
}

// Create currency mutation
export function useCreateCurrency() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (currency: InsertCurrency) => currenciesApi.create(currency),
    onSuccess: (newCurrency) => {
      queryClient.invalidateQueries({ queryKey: currencyKeys.byGame(newCurrency.gameId) });
      queryClient.invalidateQueries({ queryKey: gameKeys.all });
      toast({
        title: "Currency added successfully",
        description: `${newCurrency.name} has been added.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to add currency",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Update currency mutation
export function useUpdateCurrency() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, currency }: { id: string; currency: Partial<InsertCurrency> }) => 
      currenciesApi.update(id, currency),
    onSuccess: (updatedCurrency) => {
      queryClient.invalidateQueries({ queryKey: currencyKeys.byGame(updatedCurrency.gameId) });
      queryClient.invalidateQueries({ queryKey: gameKeys.all });
      toast({
        title: "Currency updated successfully",
        description: `${updatedCurrency.name} has been updated.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update currency",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Delete currency mutation
export function useDeleteCurrency() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, gameId }: { id: string; gameId: string }) => 
      currenciesApi.delete(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: currencyKeys.byGame(variables.gameId) });
      queryClient.invalidateQueries({ queryKey: gameKeys.all });
      toast({
        title: "Currency deleted successfully",
        description: "The currency has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete currency",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}