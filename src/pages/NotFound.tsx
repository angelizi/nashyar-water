import { Link } from "react-router-dom";
import { FloatingHomeButton } from "@/components/FloatingHomeButton";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center pb-20 lg:pb-8">
      <FloatingHomeButton />
      <div className="text-center space-y-6 px-4">
        <div className="text-9xl font-bold text-primary">404</div>
        <h1 className="text-4xl font-bold text-foreground">Page Not Found</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button size="lg" className="gap-2">
            <Home className="w-5 h-5" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
