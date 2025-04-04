
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Observatory from "./pages/Observatory";
import BioeconomicVocationPage from "./pages/BioeconomicVocation";
import BioeconomicHubPage from "./pages/BioeconomicHub";
import ValueChainPage from "./pages/ValueChain";
import BioeconomicStrategiesPage from "./pages/BioeconomicStrategies";
import Reports from "./pages/Reports";

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/observatory" element={<Observatory />} />
              <Route path="/vocation" element={<BioeconomicVocationPage />} />
              <Route path="/hub" element={<BioeconomicHubPage />} />
              <Route path="/valuechain" element={<ValueChainPage />} />
              <Route path="/strategies" element={<BioeconomicStrategiesPage />} />
              <Route path="/reports" element={<Reports />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
