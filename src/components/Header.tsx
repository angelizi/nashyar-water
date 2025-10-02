import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CartButton } from "@/components/CartButton";
import { SearchDialog } from "@/components/SearchDialog";
import { Search, MapPin, Bell, Droplets } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { toggleSidebar } = useSidebar();
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Logo */}
            <button 
              onClick={toggleSidebar}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Droplets className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-primary hidden sm:inline">Nashyar</span>
            </button>

            {/* Location - Hide on mobile when cart has items */}
            <div className={`items-center gap-2 text-sm ${totalItems > 0 ? 'hidden md:flex' : 'flex'}`}>
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground hidden sm:inline">Repalle, Andhra Pradesh</span>
            </div>

            {/* Search Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="flex-1 md:flex-none md:max-w-md justify-start"
            >
              <Search className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{t("search")}</span>
            </Button>

            {/* Cart and User Actions */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/notifications")}
                className="relative"
                aria-label={t("notifications")}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </Button>
              
              <CartButton />
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleLanguage}
                className="whitespace-nowrap"
              >
                {language === "en" ? t("toTelugu") : t("toEnglish")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}