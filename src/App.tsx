
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Tenants from "./pages/Tenants";
import Maintenance from "./pages/Maintenance";
import Communications from "./pages/Communications";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import MapView from "./pages/MapView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/leads" element={<AppLayout><Leads /></AppLayout>} />
          <Route path="/applications" element={<AppLayout><PlaceholderPage /></AppLayout>} />
          <Route path="/tenants" element={<AppLayout><Tenants /></AppLayout>} />
          <Route path="/rent" element={<AppLayout><PlaceholderPage /></AppLayout>} />
          <Route path="/maintenance" element={<AppLayout><Maintenance /></AppLayout>} />
          <Route path="/calendar" element={<AppLayout><PlaceholderPage /></AppLayout>} />
          <Route path="/map" element={<AppLayout><MapView /></AppLayout>} />
          <Route path="/communications" element={<AppLayout><Communications /></AppLayout>} />
          <Route path="/reports" element={<AppLayout><PlaceholderPage /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><PlaceholderPage /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
