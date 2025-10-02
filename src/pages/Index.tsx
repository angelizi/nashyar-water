import { Header } from "@/components/Header";
import { PlantCard } from "@/components/PlantCard";
import { ProductCard } from "@/components/ProductCard";
import { FloatingHomeButton } from "@/components/FloatingHomeButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Truck, Clock, Shield } from "lucide-react";
import waterPlant1 from "@/assets/water-plant-1.jpg";
import waterPlant2 from "@/assets/water-plant-2.jpg";
import waterPlant3 from "@/assets/water-plant-3.jpg";
import waterPlant4 from "@/assets/water-plant-4.jpg";
import bubbleCanPlain from "@/assets/bubble-can-plain.png";
import bubbleCanWithTap from "@/assets/bubble-can-with-tap.png";
import coolingCan from "@/assets/cooling-can.png";
import bottle1L from "@/assets/1l-bottle.jpg";
import bottle2L from "@/assets/2l-bottle.jpg";

const Index = () => {
  // Mock data for water plants
  const waterPlants = [
    {
      name: "Aqua Pure Waters",
      rating: 4.5,
      deliveryTime: "30-45 mins",
      image: waterPlant1,
      products: ["Bubble Can", "1L Bottle"],
      minOrder: 50,
    },
    {
      name: "Crystal Springs", 
      rating: 4.3,
      deliveryTime: "25-40 mins",
      image: waterPlant2,
      products: ["Tapped Bubble", "2L Bottle"],
      minOrder: 40,
    },
    {
      name: "Blue Horizon Water",
      rating: 4.7,
      deliveryTime: "35-50 mins", 
      image: waterPlant3,
      products: ["Bubble Can", "1L Bottle", "2L Bottle"],
      minOrder: 60,
    },
    {
      name: "Fresh Flow Waters",
      rating: 4.4,
      deliveryTime: "20-35 mins",
      image: waterPlant4, 
      products: ["Tapped Bubble", "1L Bottle"],
      minOrder: 45,
    },
  ];

  // Mock data for products
  const products = [
    {
      id: "1",
      name: "20L Bubble Can",
      price: 13,
      description: "Standard 20L water can for home and office",
      image: bubbleCanPlain,
      inStock: true,
    },
    {
      id: "2", 
      name: "20L Bubble with Tap",
      price: 18,
      description: "20L can with convenient dispenser tap",
      image: bubbleCanWithTap,
      inStock: true,
    },
    {
      id: "3",
      name: "20L Cooling Can",
      price: 24,
      description: "Temperature-controlled cooling water can",
      image: coolingCan,
      inStock: true,
    },
    {
      id: "4",
      name: "1L Water Bottle",
      price: 10,
      description: "Convenient 1L bottle for on-the-go", 
      image: bottle1L,
      inStock: true,
    },
    {
      id: "5",
      name: "2L Water Bottle",
      price: 15,
      description: "Large 2L bottle for families",
      image: bottle2L,
      inStock: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <Header />
      <FloatingHomeButton />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Fresh Water, Delivered Fast
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Order premium drinking water from trusted local plants in Repalle. 
            Fast delivery, quality assured.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { icon: Droplets, label: "Pure Water" },
              { icon: Truck, label: "Fast Delivery" },  
              { icon: Clock, label: "Time Slots" },
              { icon: Shield, label: "Quality Assured" },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center gap-2 p-4 bg-card rounded-lg">
                <feature.icon className="w-8 h-8 text-primary" />
                <span className="text-sm font-medium text-card-foreground">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="plants" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="plants">Water Plants</TabsTrigger>
            <TabsTrigger value="products">All Products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="plants" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Water Plants Near You
              </h2>
              <p className="text-muted-foreground">
                Choose from trusted local water plants in Repalle
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {waterPlants.map((plant, index) => (
                <PlantCard key={index} {...plant} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Popular Products
              </h2>
              <p className="text-muted-foreground">
                Browse all available water products
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
