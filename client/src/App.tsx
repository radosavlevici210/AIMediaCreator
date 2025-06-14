import { Router, Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import ErrorBoundary from "@/components/error-boundary";
import Studio from "@/pages/studio";
import AdminPanel from "@/components/admin-panel";
import RootUserPanel from "@/components/root-user-panel";
import ProtectionSystem from "@/components/protection-system";
import ModernLanding from "@/components/modern-landing";
import AIStudio from "@/components/ai-studio";
import EnhancedAIStudio from "@/components/enhanced-ai-studio";
import RealTimeDashboard from "@/components/real-time-dashboard";
import NotFound from "@/pages/not-found";
import { Suspense } from "react";
import CopyrightProtection from "@/components/copyright-protection";

// 🚀 AI STUDIO PRO+ - PRODUCTION READY APPLICATION
// COPYRIGHT © ERVIN REMUS RADOSAVLEVICI - ALL RIGHTS RESERVED
// Enterprise-grade AI-powered media generation platform
// All features unlocked - Ready for global deployment
// PRIVATE PROPERTY - UNAUTHORIZED USE STRICTLY PROHIBITED

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <Router>
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <Switch>
                <Route path="/" component={ModernLanding} />
                <Route path="/studio" component={Studio} />
                <Route path="/ai-studio" component={AIStudio} />
                <Route path="/enhanced-studio" component={EnhancedAIStudio} />
                <Route path="/dashboard" component={RealTimeDashboard} />
                <Route path="/admin" component={AdminPanel} />
                <Route path="/root" component={RootUserPanel} />
                <Route path="/protection" component={ProtectionSystem} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </Router>
          <Toaster />
          <CopyrightProtection />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;