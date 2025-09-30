import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
  plantName?: string;
}

export function ProductCard({ id, name, price, description, image, inStock, plantName }: ProductCardProps) {
  const { addItem, updateQuantity, getItemQuantity } = useCart();
  const quantity = getItemQuantity(id);

  const handleAddToCart = () => {
    addItem({ id, name, price, image, plantName });
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(0, quantity + change);
    updateQuantity(id, newQuantity);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground">{name}</h3>
              {!inStock && (
                <Badge variant="destructive" className="text-xs">
                  Out of Stock
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">₹{price}</span>
              
              {inStock && (
                <div className="flex items-center gap-2">
                  {quantity === 0 ? (
                    <Button
                      size="sm"
                      onClick={handleAddToCart}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 bg-primary rounded-md">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleQuantityChange(-1)}
                        className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-primary-foreground font-medium min-w-[2ch] text-center">
                        {quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleQuantityChange(1)}
                        className="h-8 w-8 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="w-20 h-20 relative">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-md"
            />
            {!inStock && (
              <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-medium">Unavailable</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}