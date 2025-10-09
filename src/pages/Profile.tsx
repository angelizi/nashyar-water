import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { FloatingBackButton } from "@/components/FloatingBackButton";
import { FloatingHomeButton } from "@/components/FloatingHomeButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

export default function Profile() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [canEdit, setCanEdit] = useState(true);
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [profile, setProfile] = useState({
    username: "",
    phone_number: "",
    full_name: "",
    address: "",
    last_profile_update: null as string | null,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('username, phone_number, full_name, address, last_profile_update')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile({
          username: data.username || "",
          phone_number: data.phone_number || "",
          full_name: data.full_name || "",
          address: data.address || "",
          last_profile_update: data.last_profile_update,
        });

        // Check if user can edit (14 days since last update)
        if (data.last_profile_update) {
          const lastUpdate = new Date(data.last_profile_update);
          const now = new Date();
          const daysSinceUpdate = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
          const daysLeft = 14 - daysSinceUpdate;
          
          if (daysLeft > 0) {
            setCanEdit(false);
            setDaysRemaining(daysLeft);
          }
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInitiateSave = () => {
    if (!canEdit) {
      toast({
        title: "Cannot Update",
        description: `You can update your profile again in ${daysRemaining} days.`,
        variant: "destructive",
      });
      return;
    }
    setShowWarning(true);
  };

  const handleConfirmSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          phone_number: profile.phone_number,
          full_name: profile.full_name,
          address: profile.address,
          last_profile_update: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      setShowWarning(false);
      setCanEdit(false);
      setDaysRemaining(14);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully. You can update it again in 14 days.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <Header />
      <FloatingBackButton />
      <FloatingHomeButton />
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <Button variant="outline">Change Photo</Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={profile.username}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  disabled={loading || !canEdit}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profile.phone_number}
                  onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
                  disabled={loading || !canEdit}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  disabled={loading || !canEdit}
                  placeholder="Enter your delivery address"
                  className="min-h-[100px]"
                />
              </div>
            </div>

            {!canEdit && (
              <p className="text-sm text-muted-foreground">
                You can update your profile again in {daysRemaining} days.
              </p>
            )}

            <Button onClick={handleInitiateSave} disabled={loading || !canEdit}>
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      </main>

      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Profile Settings?</AlertDialogTitle>
            <AlertDialogDescription>
              You can update your settings only once every 14 days. Continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSave}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
