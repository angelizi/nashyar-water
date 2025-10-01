import { Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function FloatingHomeButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on home page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <Button
      onClick={() => navigate("/")}
      size="icon"
      variant="secondary"
      className="fixed top-20 right-4 z-40 rounded-full shadow-lg"
      aria-label="Go home"
    >
      <Home className="w-5 h-5" />
    </Button>
  );
}
