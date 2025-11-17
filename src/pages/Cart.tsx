import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { FloatingBackButton } from "@/components/FloatingBackButton";
import { FloatingHomeButton } from "@/components/FloatingHomeButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, Plus, Minus, Trash2, Tag, ShoppingBag, Clock, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [deliverySlot, setDeliverySlot] = useState("morning");
  const [address, setAddress] = useState("");
  const [showAddressAlert, setShowAddressAlert] = useState(false);

  const finalTotal = totalPrice - discount;

  useEffect(() => {
    const loadProfileAddress = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("address")
          .eq("id", user.id)
          .maybeSingle();
        
        if (profile?.address) {
          setAddress(profile.address);
        }
      }
    };
    
    loadProfileAddress();
  }, []);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleApplyPromo = () => {
    // Mock promo codes
    const promoCodes = {
      "FIRST10": { discount: totalPrice * 0.1, description: "10% off first order" },
      "SAVE20": { discount: 20, description: "₹20 off" },
      "WELCOME15": { discount: 15, description: "₹15 off your order" }
    };

    const promo = promoCodes[promoCode.toUpperCase() as keyof typeof promoCodes];
    if (promo) {
      setAppliedPromo(promoCode.toUpperCase());
      setDiscount(promo.discount);
    } else {
      setAppliedPromo(null);
      setDiscount(0);
    }
  };

  const handleProceedToPayment = () => {
    // Validate address before proceeding
    if (!address.trim()) {
      setShowAddressAlert(true);
      return;
    }
    
    // Placeholder for payment flow
    console.log("Proceeding to payment with items:", items, "Address:", address);
    navigate("/checkout"); // Will create this later
  };

  if (items.length === 0) {
  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <Header />
      <FloatingBackButton />
      <FloatingHomeButton />
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
          
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some water products to get started!</p>
            <Button onClick={() => navigate("/")}>
              Start Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl">Your Cart ({totalItems} items)</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg hover:border-primary/50 transition-colors">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                      {item.plantName && (
                        <p className="text-xs text-muted-foreground mb-2">from {item.plantName}</p>
                      )}
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-sm font-medium text-muted-foreground">₹{item.price} each</span>
                        <div className="flex items-center gap-2 bg-muted/50 rounded-md px-2 py-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="h-7 w-7 p-0 hover:bg-background"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </Button>
                          
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                            className="h-7 w-14 text-center p-1 bg-background border-0 font-medium"
                          />
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="h-7 w-7 p-0 hover:bg-background"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2 ml-auto">
                      <p className="text-lg font-bold text-primary whitespace-nowrap">₹{item.price * item.quantity}</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 px-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Delivery Time Slot */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Select Delivery Time
                  </Label>
                  <RadioGroup value={deliverySlot} onValueChange={setDeliverySlot}>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                      <RadioGroupItem value="morning" id="morning" />
                      <Label htmlFor="morning" className="flex-1 cursor-pointer">
                        <div className="font-medium">Morning Slot</div>
                        <div className="text-sm text-muted-foreground">09:00 AM - 12:00 PM</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                      <RadioGroupItem value="afternoon" id="afternoon" />
                      <Label htmlFor="afternoon" className="flex-1 cursor-pointer">
                        <div className="font-medium">Afternoon Slot</div>
                        <div className="text-sm text-muted-foreground">01:00 PM - 04:00 PM</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/50 cursor-pointer">
                      <RadioGroupItem value="evening" id="evening" />
                      <Label htmlFor="evening" className="flex-1 cursor-pointer">
                        <div className="font-medium">Evening Slot</div>
                        <div className="text-sm text-muted-foreground">05:00 PM - 08:00 PM</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Promo Code</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleApplyPromo}
                    >
                      <Tag className="w-4 h-4 mr-1" />
                      Apply
                    </Button>
                  </div>
                  {appliedPromo && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        {appliedPromo} Applied
                      </Badge>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>

                <Separator />

                {/* Delivery Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Delivery Address *
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete delivery address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    This address will be used for delivery. You can also update this in your{" "}
                    <Link to="/profile" className="text-primary hover:underline">
                      profile settings
                    </Link>.
                  </p>
                </div>

                <Button 
                  className="w-full"
                  size="lg"
                  onClick={handleProceedToPayment}
                >
                  Proceed to Payment
                </Button>

                <div className="text-xs text-muted-foreground text-center break-words">
                  <p>
                    By proceeding, you agree to our{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      terms & conditions
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Address Required Alert Dialog */}
      <AlertDialog open={showAddressAlert} onOpenChange={setShowAddressAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Address Required</AlertDialogTitle>
            <AlertDialogDescription>
              Please enter your address information before proceeding to payment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAddressAlert(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Cart;