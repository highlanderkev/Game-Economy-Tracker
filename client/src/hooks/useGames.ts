import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { gamesApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { InsertGame } from "@shared/schema";

// Query keys
export const gameKeys = {
  all: ['games'] as const,
  detail: (id: string) => ['games', id] as const,
};

// Get all games with currencies
export function useGames() {
  return useQuery({
    queryKey: gameKeys.all,
    queryFn: gamesApi.getAll,
  });
}

// Get single game
export function useGame(id: string) {
  return useQuery({
    queryKey: gameKeys.detail(id),
    queryFn: () => gamesApi.getById(id),
    enabled: !!id,
  });
}

// Create game mutation
export function useCreateGame() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (game: InsertGame) => gamesApi.create(game),
    onSuccess: (newGame) => {
      queryClient.invalidateQueries({ queryKey: gameKeys.all });
      toast({
        title: "Game added successfully",
        description: `${newGame.title} has been added to your tracker.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to add game",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Update game mutation
export function useUpdateGame() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, game }: { id: string; game: Partial<InsertGame> }) => 
      gamesApi.update(id, game),
    onSuccess: (updatedGame) => {
      queryClient.invalidateQueries({ queryKey: gameKeys.all });
      queryClient.invalidateQueries({ queryKey: gameKeys.detail(updatedGame.id) });
      toast({
        title: "Game updated successfully",
        description: `${updatedGame.title} has been updated.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to update game",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Delete game mutation
export function useDeleteGame() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: gamesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: gameKeys.all });
      toast({
        title: "Game deleted successfully",
        description: "The game has been removed from your tracker.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to delete game",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}