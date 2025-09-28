import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotFound from "@/pages/not-found";
import Dashboard from "@/components/Dashboard";
import type { GameWithCurrencies } from "@shared/schema";

function Router() {

  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
              <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/20">
                    <span className="text-2xl">🎮</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Game Economy Tracker</h1>
                    <p className="text-xs text-muted-foreground">
                      Analyze in-game currency economics
                    </p>
                  </div>
                </div>
                <ThemeToggle />
              </div>
            </header>
            
            <main className="container mx-auto max-w-7xl">
              <Router />
            </main>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
