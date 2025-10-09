import { Header } from "@/components/Header";
import { FloatingBackButton } from "@/components/FloatingBackButton";
import { FloatingHomeButton } from "@/components/FloatingHomeButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const { addItem } = useCart();

  const handleOrder = (item: any) => {
    addItem(item);
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <Header />
      <FloatingBackButton />
      <FloatingHomeButton />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Favorite Items</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No favorites yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Add items to your favorites for quick reordering
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {favorites.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      {item.plantName && (
                        <p className="text-sm text-muted-foreground">{item.plantName}</p>
                      )}
                      <p className="text-lg font-bold text-primary mt-2">₹{item.price}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleOrder(item)}
                        className="gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Order
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFavorite(item.id)}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
