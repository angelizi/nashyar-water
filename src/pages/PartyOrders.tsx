import { Header } from "@/components/Header";
import { FloatingBackButton } from "@/components/FloatingBackButton";
import { FloatingHomeButton } from "@/components/FloatingHomeButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import bottleImage from "@/assets/1l-bottle.jpg";

const partyProducts = [
  {
    id: "party-500ml",
    name: "500ml Water Bottle",
    basePrice: 15,
    image: bottleImage,
  },
  {
    id: "party-750ml",
    name: "750ml Water Bottle",
    basePrice: 20,
    image: bottleImage,
  },
];

export default function PartyOrders() {
  const { addItem } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [temperatures, setTemperatures] = useState<Record<string, "normal" | "cooling">>({});

  const handleQuantityChange = (id: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change),
    }));
  };

  const handleTemperatureChange = (id: string, temp: "normal" | "cooling") => {
    setTemperatures((prev) => ({
      ...prev,
      [id]: temp,
    }));
  };

  const handleAddToCart = (product: typeof partyProducts[0]) => {
    const quantity = quantities[product.id] || 0;
    if (quantity === 0) {
      toast.error("Please select quantity");
      return;
    }

    const temperature = temperatures[product.id] || "normal";
    const price = temperature === "cooling" ? product.basePrice + 5 : product.basePrice;

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: `${product.id}-${temperature}-${Date.now()}-${i}`,
        name: `${product.name} (${temperature === "cooling" ? "Cooling" : "Normal"})`,
        price,
        image: product.image,
        plantName: "Party Orders",
      });
    }

    toast.success(`Added ${quantity}x ${product.name} to cart`);
    setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <Header />
      <FloatingBackButton />
      <FloatingHomeButton />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Party Orders</h1>
        <p className="text-muted-foreground mb-6">
          Order in bulk for your events and parties
        </p>
        
        <div className="grid gap-6">
          {partyProducts.map((product) => {
            const quantity = quantities[product.id] || 0;
            const temperature = temperatures[product.id] || "normal";
            const finalPrice = temperature === "cooling" ? product.basePrice + 5 : product.basePrice;

            return (
              <Card key={product.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="text-2xl font-bold text-primary mt-2">
                          ₹{finalPrice} <span className="text-sm text-muted-foreground">per bottle</span>
                        </p>
                      </div>

                      <div>
                        <Label className="mb-2 block">Temperature</Label>
                        <RadioGroup
                          value={temperature}
                          onValueChange={(value) => handleTemperatureChange(product.id, value as "normal" | "cooling")}
                        >
                          <div className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="normal" id={`${product.id}-normal`} />
                              <Label htmlFor={`${product.id}-normal`}>Normal (₹{product.basePrice})</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="cooling" id={`${product.id}-cooling`} />
                              <Label htmlFor={`${product.id}-cooling`}>Cooling (₹{product.basePrice + 5})</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="flex items-center gap-4">
                        <Label>Quantity:</Label>
                        <div className="flex items-center gap-2 bg-muted rounded-md">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="h-10 w-10 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-medium min-w-[3ch] text-center">
                            {quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className="h-10 w-10 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full sm:w-auto"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h2 className="font-semibold mb-2">Bulk Order Benefits</h2>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Orders above 50 bottles get 10% discount</li>
            <li>• Orders above 100 bottles get 15% discount</li>
            <li>• Free delivery for orders above 30 bottles</li>
            <li>• Choose between normal and cooling temperature</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
