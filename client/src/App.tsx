import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Switch, Route } from "wouter";
import Studio from "./pages/studio";
import NotFound from "./pages/not-found";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";

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