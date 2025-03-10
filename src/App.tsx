
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import SuperintendentLayout from "./components/layout/SuperintendentLayout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Tenants from "./pages/Tenants";
import Maintenance from "./pages/Maintenance";
import Communications from "./pages/Communications";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import MapView from "./pages/MapView";
import SuperintendentDashboard from "./pages/SuperintendentDashboard";
import SuperintendentCalendar from "./pages/SuperintendentCalendar";
import Calendar from "./pages/Calendar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          {/* Admin/Property Manager Routes */}
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/leads" element={<AppLayout><Leads /></AppLayout>} />
          <Route path="/applications" element={<AppLayout><PlaceholderPage /></AppLayout>} />
          <Route path="/tenants" element={<AppLayout><Tenants /></AppLayout>} />
          <Route path="/rent" element={<AppLayout><PlaceholderPage /></AppLayout>} />
          <Route path="/maintenance" element={<AppLayout><Maintenance /></AppLayout>} />
          <Route path="/calendar" element={<AppLayout><Calendar /></AppLayout>} />
          <Route path="/map" element={<AppLayout><MapView /></AppLayout>} />
          <Route path="/communications" element={<AppLayout><Communications /></AppLayout>} />
          <Route path="/reports" element={<AppLayout><PlaceholderPage /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><PlaceholderPage /></AppLayout>} />
          
          {/* Superintendent Routes */}
          <Route path="/super" element={<SuperintendentLayout><SuperintendentDashboard /></SuperintendentLayout>} />
          <Route path="/super/calendar" element={<SuperintendentLayout><SuperintendentCalendar /></SuperintendentLayout>} />
          <Route path="/super/map" element={<SuperintendentLayout><MapView /></SuperintendentLayout>} />
          <Route path="/super/settings" element={<SuperintendentLayout><PlaceholderPage /></SuperintendentLayout>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
