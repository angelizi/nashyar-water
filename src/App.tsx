import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BottomNav } from "@/components/BottomNav";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import PlantMenu from "./pages/PlantMenu";
import Cart from "./pages/Cart";
import Terms from "./pages/Terms";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import OrderHistory from "./pages/OrderHistory";
import MonthlySpend from "./pages/MonthlySpend";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Favorites from "./pages/Favorites";
import PartyOrders from "./pages/PartyOrders";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light">
      <LanguageProvider>
        <FavoritesProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <SidebarProvider>
                  <div className="flex min-h-screen w-full">
                    <AppSidebar />
                    <div className="flex-1">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/plant/:plantName" element={<PlantMenu />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/orders" element={<OrderHistory />} />
                        <Route path="/spend" element={<MonthlySpend />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/party-orders" element={<PartyOrders />} />
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                      <BottomNav />
                    </div>
                  </div>
                </SidebarProvider>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </FavoritesProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
