import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface CartButtonProps {
  onClick: () => void;
}

export function CartButton({ onClick }: CartButtonProps) {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) {
    return null;
  }

  return (
    <Button
      onClick={onClick}
      className="relative bg-primary hover:bg-primary/90 text-primary-foreground"
      size="sm"
    >
      <ShoppingCart className="w-4 h-4 mr-2" />
      View Cart (₹{totalPrice})
      <Badge 
        variant="secondary" 
        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-warning text-warning-foreground"
      >
        {totalItems}
      </Badge>
    </Button>
  );
}