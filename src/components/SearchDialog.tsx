import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Building2, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock data for search
const waterPlants = [
  { name: "Aqua Pure Waters", slug: "aqua-pure-waters" },
  { name: "Crystal Springs", slug: "crystal-springs" },
  { name: "Blue Horizon Water", slug: "blue-horizon-water" },
  { name: "Fresh Flow Waters", slug: "fresh-flow-waters" },
];

const products = [
  { id: "1", name: "Bubble Can", plant: "Aqua Pure Waters", price: 15 },
  { id: "2", name: "Tapped Bubble", plant: "Crystal Springs", price: 20 },
  { id: "3", name: "Cooling Can", plant: "Blue Horizon Water", price: 25 },
  { id: "4", name: "1L Water Bottle", plant: "Aqua Pure Waters", price: 10 },
  { id: "5", name: "2L Water Bottle", plant: "Fresh Flow Waters", price: 20 },
];

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"plants" | "products">("plants");
  const navigate = useNavigate();

  const filteredPlants = waterPlants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlantClick = (slug: string) => {
    navigate(`/plant/${slug}`);
    onOpenChange(false);
    setSearchQuery("");
  };

  const handleProductClick = (productId: string) => {
    // For now, navigate to the plant that has this product
    const product = products.find((p) => p.id === productId);
    if (product) {
      const plant = waterPlants.find((p) => p.name === product.plant);
      if (plant) {
        navigate(`/plant/${plant.slug}`);
        onOpenChange(false);
        setSearchQuery("");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Tabs value={searchType} onValueChange={(v) => setSearchType(v as "plants" | "products")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="plants" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Water Plants
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Products
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${searchType}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {searchType === "plants" ? (
              filteredPlants.length > 0 ? (
                filteredPlants.map((plant) => (
                  <button
                    key={plant.slug}
                    onClick={() => handlePlantClick(plant.slug)}
                    className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors flex items-center gap-3"
                  >
                    <Building2 className="w-5 h-5 text-primary" />
                    <span className="font-medium">{plant.name}</span>
                  </button>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No plants found
                </p>
              )
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.plant}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">₹{product.price}</Badge>
                  </div>
                </button>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No products found
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
