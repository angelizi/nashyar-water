import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="order-updates">Order Updates</Label>
                <Switch id="order-updates" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="promotions">Promotions & Offers</Label>
                <Switch id="promotions" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="delivery-alerts">Delivery Alerts</Label>
                <Switch id="delivery-alerts" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-reorder">Auto-reorder Favorites</Label>
                <Switch id="auto-reorder" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="save-address">Remember Delivery Address</Label>
                <Switch id="save-address" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Language</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant="default">English</Button>
                <Button variant="outline">తెలుగు</Button>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full">Save Settings</Button>
        </div>
      </main>
    </div>
  );
}
