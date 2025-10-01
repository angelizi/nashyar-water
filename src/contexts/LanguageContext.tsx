import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "te";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    cart: "Cart",
    profile: "Profile",
    favorites: "Favorites",
    search: "Search...",
    login: "Login",
    logout: "Logout",
    settings: "Settings",
    notifications: "Notifications",
    orderHistory: "Order History",
    customerSupport: "Customer Support",
    darkMode: "Dark Mode",
    partyOrders: "Party Orders",
  },
  te: {
    home: "హోమ్",
    cart: "కార్ట్",
    profile: "ప్రొఫైల్",
    favorites: "ఇష్టమైనవి",
    search: "వెతకండి...",
    login: "లాగిన్",
    logout: "లాగౌట్",
    settings: "సెట్టింగ్‌లు",
    notifications: "నోటిఫికేషన్‌లు",
    orderHistory: "ఆర్డర్ చరిత్ర",
    customerSupport: "కస్టమర్ సపోర్ట్",
    darkMode: "డార్క్ మోడ్",
    partyOrders: "పార్టీ ఆర్డర్‌లు",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
