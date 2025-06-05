import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SummaryView from "./pages/SummaryView";
import FlashcardsStudy from "./pages/FlashcardsStudy";
import MindMapView from "./pages/MindMapView";
import StudyHistory from "./pages/StudyHistory";
import Achievements from "./pages/Achievements";
import Notifications from "./pages/Notifications";
import Subscription from "./pages/Subscription";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/summary/:id" element={<SummaryView />} />
          <Route path="/flashcards/:id" element={<FlashcardsStudy />} />
          <Route path="/mindmap/:id" element={<MindMapView />} />
          <Route path="/history" element={<StudyHistory />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
