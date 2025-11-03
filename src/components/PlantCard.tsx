import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PlantCardProps {
  name: string;
  rating: number;
  deliveryTime: string;
  image: string;
  products: string[];
  minOrder: number;
}

export function PlantCard({ name, rating, deliveryTime, image, products, minOrder }: PlantCardProps) {
  const navigate = useNavigate();
  
  const handleViewProducts = () => {
    const plantSlug = name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/plant/${plantSlug}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-40 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-success text-success-foreground">
          Open
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-2">{name}</h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Truck className="w-4 h-4" />
            <span>₹{minOrder} min</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {products.slice(0, 3).map((product, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {product}
            </Badge>
          ))}
          {products.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{products.length - 3} more
            </Badge>
          )}
        </div>
        
        <Button 
          className="w-full" 
          size="sm"
          onClick={handleViewProducts}
        >
          View Products
        </Button>
      </CardContent>
    </Card>
  );
}