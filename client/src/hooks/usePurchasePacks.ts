import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { purchasePacksApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { gameKeys } from "./useGames";
import { currencyKeys } from "./useCurrencies";
import type { InsertPurchasePack } from "@shared/schema";

// Query keys
export const purchasePackKeys = {
  byCurrency: (currencyId: string) => ['purchase-packs', 'currency', currencyId] as const,
};

// Get purchase packs by currency ID
export function usePurchasePacks(currencyId: string) {
  return useQuery({
    queryKey: purchasePackKeys.byCurrency(currencyId),
    queryFn: () => purchasePacksApi.getByCurrencyId(currencyId),
    enabled: !!currencyId,
  });
}

// Create purchase pack mutation
export function useCreatePurchasePack() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (pack: InsertPurchasePack) => purchasePacksApi.create(pack),
    onSuccess: (newPack) => {
      queryClient.invalidateQueries({ queryKey: purchasePackKeys.byCurrency(newPack.currencyId) });
      queryClient.invalidateQueries({ queryKey: gameKeys.all });
      toast({
        title: "Purchase pack added successfully",
        description: `${newPack.name} has been added.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to add purchase pack",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Update purchase pack mutation
export function useUpdatePurchasePack() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, pack }: { id: string; pack: Partial<InsertPurchasePack> }) => 
      purchasePacksApi.update(id, pack),
    onSuccess: (updatedPack) => {
      queryClient.invalidateQueries({ queryKey: purchasePackKeys.byCurrency(updatedPack.currencyId) });
      queryClient.invalidateQueries({ queryKey: gameKeys.all });
      toast({
        title: "Purchase pack updated successfully",
        description: `${updatedPack.name} has been updated.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update purchase pack",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Delete purchase pack mutation
export function useDeletePurchasePack() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, currencyId }: { id: string; currencyId: string }) => 
      purchasePacksApi.delete(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: purchasePackKeys.byCurrency(variables.currencyId) });
      queryClient.invalidateQueries({ queryKey: gameKeys.all });
      toast({
        title: "Purchase pack deleted successfully",
        description: "The purchase pack has been removed.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete purchase pack",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}