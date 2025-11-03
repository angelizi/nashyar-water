import { Header } from "@/components/Header";
import { FloatingBackButton } from "@/components/FloatingBackButton";
import { FloatingHomeButton } from "@/components/FloatingHomeButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Shield, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSave = () => {
    toast({
      title: t("settingsSaved"),
      description: t("preferencesUpdated"),
    });
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <Header />
      <FloatingBackButton />
      <FloatingHomeButton />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t("settings")}</h1>
        
        <div className="space-y-6 max-w-2xl">
          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                {t("appearance")}
              </CardTitle>
              <CardDescription>Customize your app appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">{t("darkMode")}</Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle dark mode theme
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t("preferences")}
              </CardTitle>
              <CardDescription>Manage your app preferences</CardDescription>
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
              <CardTitle className="flex items-center gap-2">
                <LogOut className="w-5 h-5" />
                Account
              </CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleLogout} variant="destructive" className="w-full">
                Log Out
              </Button>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full">{t("saveSettings")}</Button>
        </div>
      </main>
    </div>
  );
}
