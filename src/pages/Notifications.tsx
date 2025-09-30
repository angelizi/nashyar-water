import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, CheckCircle, Truck, Bell } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    type: "delivery",
    title: "Order Delivered",
    message: "Your order #ORD001 has been delivered successfully",
    time: "2 hours ago",
    read: false,
    icon: CheckCircle,
    color: "text-success",
  },
  {
    id: 2,
    type: "in-transit",
    title: "Out for Delivery",
    message: "Order #ORD002 is out for delivery. Expected by 3 PM",
    time: "5 hours ago",
    read: false,
    icon: Truck,
    color: "text-info",
  },
  {
    id: 3,
    type: "order",
    title: "Order Confirmed",
    message: "Your order #ORD003 has been confirmed and is being prepared",
    time: "1 day ago",
    read: true,
    icon: Package,
    color: "text-primary",
  },
  {
    id: 4,
    type: "promo",
    title: "Special Offer!",
    message: "Get 20% off on your next order from Aqua Pure Waters",
    time: "2 days ago",
    read: true,
    icon: Bell,
    color: "text-warning",
  },
];

export default function Notifications() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <Badge variant="secondary">{mockNotifications.filter(n => !n.read).length} unread</Badge>
        </div>
        
        <div className="space-y-3">
          {mockNotifications.map((notification) => {
            const Icon = notification.icon;
            
            return (
              <Card key={notification.id} className={notification.read ? "opacity-60" : ""}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className={`flex-shrink-0 ${notification.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{notification.title}</h3>
                        {!notification.read && (
                          <Badge variant="default" className="flex-shrink-0 h-2 w-2 p-0 rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
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
