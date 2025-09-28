import { Header } from "@/components/Header";
import { PlantCard } from "@/components/PlantCard";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Truck, Clock, Shield } from "lucide-react";

const Index = () => {
  // Mock data for water plants
  const waterPlants = [
    {
      name: "Amulya Water Plant",
      rating: 4.5,
      deliveryTime: "30-45 mins",
      image: "/placeholder.svg",
      products: ["Bubble Can", "Cooling Can", "1L Bottle"],
      minOrder: 50,
    },
    {
      name: "Sujala Water Plant", 
      rating: 4.3,
      deliveryTime: "25-40 mins",
      image: "/placeholder.svg",
      products: ["Tapped Bubble", "2L Bottle", "Cooling Can"],
      minOrder: 40,
    },
    {
      name: "Ashta Lakshmi Water",
      rating: 4.7,
      deliveryTime: "35-50 mins", 
      image: "/placeholder.svg",
      products: ["Bubble Can", "1L Bottle", "2L Bottle"],
      minOrder: 60,
    },
    {
      name: "Sri Krishna Water",
      rating: 4.4,
      deliveryTime: "20-35 mins",
      image: "/placeholder.svg", 
      products: ["Cooling Can", "Tapped Bubble", "1L Bottle"],
      minOrder: 45,
    },
  ];

  // Mock data for products
  const products = [
    {
      id: "1",
      name: "Bubble Can",
      price: 15,
      description: "Fresh mineral water in 20L bubble can",
      image: "/placeholder.svg",
      inStock: true,
    },
    {
      id: "2", 
      name: "Tapped Bubble",
      price: 20,
      description: "Premium 20L water can with tap facility",
      image: "/placeholder.svg",
      inStock: true,
    },
    {
      id: "3",
      name: "Cooling Can", 
      price: 25,
      description: "Special cooling water can for summer",
      image: "/placeholder.svg",
      inStock: true,
    },
    {
      id: "4",
      name: "1L Water Bottle",
      price: 10,
      description: "Pure drinking water in 1 liter bottle", 
      image: "/placeholder.svg",
      inStock: true,
    },
    {
      id: "5",
      name: "2L Water Bottle",
      price: 20,
      description: "Family pack 2 liter water bottle",
      image: "/placeholder.svg",
      inStock: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
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
