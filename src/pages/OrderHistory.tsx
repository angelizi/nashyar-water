import { Header } from "@/components/Header";
import { FloatingBackButton } from "@/components/FloatingBackButton";
import { FloatingHomeButton } from "@/components/FloatingHomeButton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, CheckCircle } from "lucide-react";

const mockOrders = [
  {
    id: "ORD001",
    date: "2025-09-28",
    items: [
      { name: "Bubble Can", quantity: 2, plant: "Aqua Pure Waters" },
      { name: "1L Water Bottle", quantity: 5, plant: "Aqua Pure Waters" },
    ],
    total: 80,
    status: "delivered",
    deliverySlot: "Morning Slot: 09AM - 12PM"
  },
  {
    id: "ORD002",
    date: "2025-09-29",
    items: [
      { name: "Tapped Bubble", quantity: 1, plant: "Crystal Springs" },
    ],
    total: 20,
    status: "in-transit",
    deliverySlot: "Afternoon Slot: 01PM - 04PM"
  },
  {
    id: "ORD003",
    date: "2025-09-30",
    items: [
      { name: "2L Water Bottle", quantity: 3, plant: "Blue Horizon Water" },
    ],
    total: 60,
    status: "pending",
    deliverySlot: "Evening Slot: 05PM - 08PM"
  },
];

const statusConfig = {
  delivered: { label: "Delivered", icon: CheckCircle, color: "bg-success text-success-foreground" },
  "in-transit": { label: "Out for Delivery", icon: Package, color: "bg-info text-info-foreground" },
  pending: { label: "Processing", icon: Clock, color: "bg-warning text-warning-foreground" },
};

export default function OrderHistory() {
  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <Header />
      <FloatingBackButton />
      <FloatingHomeButton />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Order History</h1>
        
        <div className="space-y-4">
          {mockOrders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            
            return (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                    <div>
                      <p className="font-semibold text-lg">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                      <p className="text-sm text-muted-foreground">{order.deliverySlot}</p>
                    </div>
                    <Badge className={status.color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>
                          {item.name} x{item.quantity}
                          <span className="text-muted-foreground text-xs ml-2 italic">from {item.plant}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{order.total}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
