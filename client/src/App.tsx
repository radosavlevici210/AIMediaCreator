import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Studio from "./pages/studio";
import NotFound from "./pages/not-found";

// © 2025 Ervin Radosavlevici - All Rights Reserved

function Router() {
  return (
    <Switch>
      <Route path="/" component={Studio} />
      <Route component={Studio} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;