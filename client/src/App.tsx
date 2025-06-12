import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/theme-provider';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/toaster';
import Studio from './pages/studio';
import NotFound from './pages/not-found';
import ErrorBoundary from './components/error-boundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="ai-studio-theme">
          <TooltipProvider>
            <div className="min-h-screen bg-background">
              <Router>
                <Routes>
                  <Route path="/" component={Studio} />
                  <Route path="/studio" component={Studio} />
                  <Route component={NotFound} />
                </Routes>
              </Router>
              <Toaster />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;