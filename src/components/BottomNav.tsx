import { Home, Heart, ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function BottomNav() {
  const { totalItems } = useCart();
  const { favorites } = useFavorites();
  const { t } = useLanguage();

  const navItems = [
    { icon: Home, label: t("home"), path: "/" },
    { icon: Heart, label: t("favorites"), path: "/favorites", badge: favorites.length },
    { icon: ShoppingCart, label: t("cart"), path: "/cart", badge: totalItems },
    { icon: User, label: t("profile"), path: "/profile" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full gap-1 relative ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            <div className="relative">
              <item.icon className="w-5 h-5" />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
