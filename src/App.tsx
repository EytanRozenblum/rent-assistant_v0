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
import MapView from "./pages/MapView";
import SuperintendentCalendar from "./pages/SuperintendentCalendar";
import SuperintendentMap from "./pages/SuperintendentMap";
import Calendar from "./pages/Calendar";
import SuperintendentDashboard from "./pages/SuperintendentDashboard";
import SuperintendentMyDay from "./pages/SuperintendentMyDay";
import SuperintendentCommunication from "./pages/SuperintendentCommunication";
import TenantLayout from "./components/layout/TenantLayout";
import TenantLeasing from "./pages/tenant/TenantLeasing";
import TenantOperations from "./pages/tenant/TenantOperations";
import TenantMaintenance from "./pages/tenant/TenantMaintenance";
import LeasingAgentLayout from "./components/layout/LeasingAgentLayout";
import LeasingAgentMyDay from "./pages/LeasingAgentMyDay";
import PropertyManagerLayout from "./components/layout/PropertyManagerLayout";
import PropertyManagerMyDay from "./pages/PropertyManagerMyDay";
import ApplicationPage from "./pages/ApplicationPage";
import RentPage from "./pages/RentPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import PropertyManagerTenants from "./pages/PropertyManagerTenants";
import PropertyManagerRent from "./pages/PropertyManagerRent";
import LeasingAgentLeads from "./pages/LeasingAgentLeads";
import LeasingAgentApplications from "./pages/LeasingAgentApplications";
import LeasingAgentCalendar from "./pages/LeasingAgentCalendar";
import LoginPage from "./pages/LoginPage";
import LeasingAgentCommunication from "./pages/LeasingAgentCommunication";
import LandingPage from "./pages/LandingPage";
import AskPage from "@/pages/AskPage";
import MyReportsPage from "@/pages/MyReportsPage";
import LeasingAgentAskPage from "@/pages/LeasingAgentAskPage";
import PropertyManagerAskPage from "@/pages/PropertyManagerAskPage";
import SuperintendentAskPage from "@/pages/SuperintendentAskPage";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Admin/Property Manager Routes */}
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/leads" element={<AppLayout><Leads /></AppLayout>} />
          <Route path="/applications" element={<AppLayout><ApplicationPage /></AppLayout>} />
          <Route path="/tenants" element={<AppLayout><Tenants /></AppLayout>} />
          <Route path="/rent" element={<AppLayout><RentPage /></AppLayout>} />
          <Route path="/maintenance" element={<AppLayout><Maintenance /></AppLayout>} />
          <Route path="/calendar" element={<AppLayout><Calendar /></AppLayout>} />
          <Route path="/map" element={<AppLayout><MapView /></AppLayout>} />
          <Route path="/communications" element={<AppLayout><Communications /></AppLayout>} />
          <Route path="/reports" element={<AppLayout><ReportsPage /></AppLayout>} />
          <Route path="/ask" element={<AppLayout><AskPage /></AppLayout>} />
          <Route path="/myreports" element={<AppLayout><MyReportsPage /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
          
          {/* Property Manager Routes */}
          <Route path="/manager" element={<PropertyManagerLayout><PropertyManagerMyDay /></PropertyManagerLayout>} />
          <Route path="/manager/tenants" element={<PropertyManagerLayout><PropertyManagerTenants /></PropertyManagerLayout>} />
          <Route path="/manager/communication" element={<PropertyManagerLayout><PropertyManagerRent /></PropertyManagerLayout>} />
          <Route path="/manager/settings" element={<PropertyManagerLayout><PlaceholderPage /></PropertyManagerLayout>} />
          <Route path="/manager/ask" element={<PropertyManagerLayout><PropertyManagerAskPage /></PropertyManagerLayout>} />

          {/* Superintendent Routes */}
          <Route path="/super" element={<SuperintendentLayout><SuperintendentMyDay /></SuperintendentLayout>} />
          <Route path="/super/dashboard" element={<SuperintendentLayout><SuperintendentDashboard /></SuperintendentLayout>} />
          <Route path="/super/calendar" element={<SuperintendentLayout><SuperintendentCalendar /></SuperintendentLayout>} />
          <Route path="/super/map" element={<SuperintendentLayout><SuperintendentMap /></SuperintendentLayout>} />
          <Route path="/super/communication" element={<SuperintendentLayout><SuperintendentCommunication /></SuperintendentLayout>} />
          <Route path="/super/settings" element={<SuperintendentLayout><PlaceholderPage /></SuperintendentLayout>} />
          <Route path="/super/ask" element={<SuperintendentLayout><SuperintendentAskPage /></SuperintendentLayout>} />

          {/* Leasing Agent Routes */}
          <Route path="/agent" element={<LeasingAgentLayout><LeasingAgentMyDay /></LeasingAgentLayout>} />
          <Route path="/agent/leads" element={<LeasingAgentLayout><LeasingAgentLeads /></LeasingAgentLayout>} />
          <Route path="/agent/applications" element={<LeasingAgentLayout><LeasingAgentApplications /></LeasingAgentLayout>} />
          <Route path="/agent/calendar" element={<LeasingAgentLayout><LeasingAgentCalendar /></LeasingAgentLayout>} />
          <Route path="/agent/communication" element={<LeasingAgentLayout><LeasingAgentCommunication /></LeasingAgentLayout>} />
          <Route path="/agent/settings" element={<LeasingAgentLayout><PlaceholderPage /></LeasingAgentLayout>} />
          <Route path="/agent/ask" element={<LeasingAgentLayout><LeasingAgentAskPage /></LeasingAgentLayout>} />

          {/* Tenant Interface Routes */}
          <Route path="/tenant" element={<TenantLayout><TenantLeasing scenario="lead" /></TenantLayout>} />
          <Route path="/tenant/leasing/:scenario" element={<TenantLayout><TenantLeasing /></TenantLayout>} />
          <Route path="/tenant/leasing/application" element={<TenantLayout><TenantLeasing scenario="application" /></TenantLayout>} />
          <Route path="/tenant/leasing/signing" element={<TenantLayout><TenantLeasing scenario="signing" /></TenantLayout>} />
          <Route path="/tenant/leasing/premove" element={<TenantLayout><TenantLeasing scenario="premove" /></TenantLayout>} />
          <Route path="/tenant/leasing/onboarding" element={<TenantLayout><TenantLeasing scenario="onboarding" /></TenantLayout>} />
          
          <Route path="/tenant/operations/rent" element={<TenantLayout><TenantOperations scenario="rent" /></TenantLayout>} />
          <Route path="/tenant/operations/renewal" element={<TenantLayout><TenantOperations scenario="renewal" /></TenantLayout>} />
          <Route path="/tenant/operations/moveout-notice" element={<TenantLayout><TenantOperations scenario="moveout-notice" /></TenantLayout>} />
          <Route path="/tenant/operations/moveout-coordination" element={<TenantLayout><TenantOperations scenario="moveout-coordination" /></TenantLayout>} />
          
          <Route path="/tenant/maintenance/request" element={<TenantLayout><TenantMaintenance scenario="request" /></TenantLayout>} />
          <Route path="/tenant/maintenance/workorder" element={<TenantLayout><TenantMaintenance scenario="workorder" /></TenantLayout>} />
          <Route path="/tenant/maintenance/scheduling" element={<TenantLayout><TenantMaintenance scenario="scheduling" /></TenantLayout>} />
          <Route path="/tenant/maintenance/relationship" element={<TenantLayout><TenantMaintenance scenario="relationship" /></TenantLayout>} />
          
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
