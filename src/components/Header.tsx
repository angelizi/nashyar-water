import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CartButton } from "@/components/CartButton";
import { SearchDialog } from "@/components/SearchDialog";
import { Search, MapPin } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useSidebar } from "@/components/ui/sidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/splash-logo.png";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { toggleSidebar } = useSidebar();
  const { t } = useLanguage();

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
              <img src={logo} alt="Nashyar" className="h-8 w-auto" />
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
              <span className="hidden sm:inline">Search...</span>
            </Button>

            {/* Cart and User Actions */}
            <div className="flex items-center gap-2">
              <CartButton />
            </div>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}