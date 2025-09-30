import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { CartButton } from "@/components/CartButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Clock, Truck } from "lucide-react";
import waterPlant1 from "@/assets/water-plant-1.jpg";
import waterPlant2 from "@/assets/water-plant-2.jpg";
import waterPlant3 from "@/assets/water-plant-3.jpg";
import waterPlant4 from "@/assets/water-plant-4.jpg";
import bubbleCan from "@/assets/bubble-can.jpg";
import tappedBubble from "@/assets/tapped-bubble.jpg";
import bottle1L from "@/assets/1l-bottle.jpg";
import bottle2L from "@/assets/2l-bottle.jpg";

const PlantMenu = () => {
  const { plantName } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app this would come from API/database
  const plantDetails = {
    "aqua-pure-waters": {
      name: "Aqua Pure Waters",
      rating: 4.5,
      deliveryTime: "30-45 mins",
      image: waterPlant1,
      minOrder: 50,
      address: "Main Road, Repalle, Guntur",
      isOpen: true,
      products: [
        {
          id: "1",
          name: "Bubble Can",
          price: 15,
          description: "Fresh mineral water in 20L bubble can",
          image: bubbleCan,
          inStock: true,
        },
        {
          id: "3",
          name: "1L Water Bottle",
          price: 10,
          description: "Pure drinking water in 1 liter bottle",
          image: bottle1L,
          inStock: true,
        }
      ]
    },
    "crystal-springs": {
      name: "Crystal Springs",
      rating: 4.3,
      deliveryTime: "25-40 mins",
      image: waterPlant2,
      minOrder: 40,
      address: "Market Street, Repalle, Guntur",
      isOpen: true,
      products: [
        {
          id: "2",
          name: "Tapped Bubble",
          price: 20,
          description: "Premium 20L water can with tap facility",
          image: tappedBubble,
          inStock: true,
        },
        {
          id: "4",
          name: "2L Water Bottle",
          price: 20,
          description: "Family pack 2 liter water bottle",
          image: bottle2L,
          inStock: true,
        }
      ]
    },
    "blue-horizon-water": {
      name: "Blue Horizon Water",
      rating: 4.7,
      deliveryTime: "35-50 mins",
      image: waterPlant3,
      minOrder: 60,
      address: "Station Road, Repalle, Guntur",
      isOpen: true,
      products: [
        {
          id: "1",
          name: "Bubble Can",
          price: 15,
          description: "Fresh mineral water in 20L bubble can",
          image: bubbleCan,
          inStock: true,
        },
        {
          id: "3",
          name: "1L Water Bottle",
          price: 10,
          description: "Pure drinking water in 1 liter bottle",
          image: bottle1L,
          inStock: true,
        },
        {
          id: "4",
          name: "2L Water Bottle",
          price: 20,
          description: "Family pack 2 liter water bottle",
          image: bottle2L,
          inStock: true,
        }
      ]
    },
    "fresh-flow-waters": {
      name: "Fresh Flow Waters",
      rating: 4.4,
      deliveryTime: "20-35 mins",
      image: waterPlant4,
      minOrder: 45,
      address: "Temple Street, Repalle, Guntur",
      isOpen: true,
      products: [
        {
          id: "2",
          name: "Tapped Bubble",
          price: 20,
          description: "Premium 20L water can with tap facility",
          image: tappedBubble,
          inStock: true,
        },
        {
          id: "3",
          name: "1L Water Bottle",
          price: 10,
          description: "Pure drinking water in 1 liter bottle",
          image: bottle1L,
          inStock: true,
        }
      ]
    }
  };

  const plant = plantDetails[plantName as keyof typeof plantDetails];

  if (!plant) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Plant Not Found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Plant Header */}
      <section className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Plants
          </Button>
          
          <div className="flex flex-col md:flex-row gap-6">
            <img 
              src={plant.image} 
              alt={plant.name}
              className="w-full md:w-48 h-48 object-cover rounded-lg"
            />
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-card-foreground">{plant.name}</h1>
                <Badge variant={plant.isOpen ? "default" : "secondary"} className="bg-success text-success-foreground">
                  {plant.isOpen ? "Open" : "Closed"}
                </Badge>
              </div>
              
              <p className="text-muted-foreground mb-4">{plant.address}</p>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="font-medium">{plant.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{plant.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  <span>₹{plant.minOrder} min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Menu */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Available Products
            </h2>
            <p className="text-muted-foreground">
              Choose from our fresh water products
            </p>
          </div>
          <CartButton />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plant.products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        {plant.products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products available at the moment.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PlantMenu;