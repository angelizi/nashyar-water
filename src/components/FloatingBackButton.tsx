import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function FloatingBackButton() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Button
      onClick={() => navigate(-1)}
      size="icon"
      className="fixed top-20 left-4 z-40 rounded-full shadow-lg"
      aria-label={t("goBack")}
    >
      <ArrowLeft className="w-5 h-5" />
    </Button>
  );
}
