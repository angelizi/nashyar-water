import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calendar } from "lucide-react";

const mockSpendData = [
  {
    plant: "Aqua Pure Waters",
    currentMonth: 850,
    lastMonth: 720,
    orders: 12,
  },
  {
    plant: "Crystal Springs",
    currentMonth: 450,
    lastMonth: 380,
    orders: 7,
  },
  {
    plant: "Blue Horizon Water",
    currentMonth: 320,
    lastMonth: 500,
    orders: 5,
  },
  {
    plant: "Fresh Flow Waters",
    currentMonth: 180,
    lastMonth: 150,
    orders: 3,
  },
];

export default function MonthlySpend() {
  const totalCurrent = mockSpendData.reduce((sum, item) => sum + item.currentMonth, 0);
  const totalLast = mockSpendData.reduce((sum, item) => sum + item.lastMonth, 0);
  const totalOrders = mockSpendData.reduce((sum, item) => sum + item.orders, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Monthly Spend by Plant</h1>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">₹{totalCurrent}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Last Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹{totalLast}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Orders This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">{totalOrders}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Breakdown by Water Plant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSpendData.map((plant) => {
                const change = plant.currentMonth - plant.lastMonth;
                const isPositive = change > 0;
                
                return (
                  <div key={plant.plant} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{plant.plant}</h3>
                      <div className="text-right">
                        <p className="font-bold text-primary">₹{plant.currentMonth}</p>
                        <p className="text-xs text-muted-foreground">{plant.orders} orders</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Last month: ₹{plant.lastMonth}</span>
                      <span className={isPositive ? "text-success" : "text-destructive"}>
                        <TrendingUp className={`w-3 h-3 inline ${isPositive ? "" : "rotate-180"}`} />
                        {isPositive ? "+" : ""}₹{Math.abs(change)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
