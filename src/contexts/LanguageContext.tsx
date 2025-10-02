import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "en" | "te";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
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
    toTelugu: "To Telugu",
    toEnglish: "To English",
    
    // Common
    goBack: "Go Back",
    goHome: "Go Home",
    save: "Save",
    cancel: "Cancel",
    confirm: "Confirm",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    remove: "Remove",
    viewAll: "View All",
    
    // Products
    products: "Products",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    price: "Price",
    quantity: "Quantity",
    total: "Total",
    
    // Cart
    yourCart: "Your Cart",
    emptyCart: "Your cart is empty",
    checkout: "Checkout",
    continueShopping: "Continue Shopping",
    removeFromCart: "Remove from Cart",
    
    // Profile
    myProfile: "My Profile",
    name: "Name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    updateProfile: "Update Profile",
    
    // Settings
    appearance: "Appearance",
    language: "Language",
    teluguLanguage: "Telugu Language",
    switchToTelugu: "Switch to Telugu interface",
    preferences: "Preferences",
    notificationSettings: "Notification Settings",
    saveSettings: "Save Settings",
    settingsSaved: "Settings Saved",
    preferencesUpdated: "Your preferences have been updated.",
    
    // Notifications
    noNotifications: "No notifications yet",
    markAllRead: "Mark all as read",
    
    // Orders
    orders: "Orders",
    orderDetails: "Order Details",
    orderStatus: "Order Status",
    pending: "Pending",
    confirmed: "Confirmed",
    outForDelivery: "Out for Delivery",
    delivered: "Delivered",
    
    // Party Orders
    partyOrdersTitle: "Party Orders",
    partyOrdersDesc: "Order in bulk for parties and events",
    bottleSize: "Bottle Size",
    temperature: "Temperature",
    cooling: "Cooling",
    normal: "Normal",
    
    // Support
    support: "Support",
    contactUs: "Contact Us",
    helpCenter: "Help Center",
    sendMessage: "Send Message",
    
    // Plant Menu
    selectPlant: "Select a Plant",
    viewMenu: "View Menu",
    
    // Favorites
    myFavorites: "My Favorites",
    noFavorites: "No favorites yet",
    addToFavorites: "Add to Favorites",
    removeFromFavorites: "Remove from Favorites",
    quickReorder: "Quick Reorder",
  },
  te: {
    // Navigation
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
    toTelugu: "తెలుగులోకి",
    toEnglish: "ఇంగ్లీషులోకి",
    
    // Common
    goBack: "వెనక్కి వెళ్ళు",
    goHome: "హోమ్‌కి వెళ్ళు",
    save: "సేవ్",
    cancel: "రద్దు చేయి",
    confirm: "నిర్ధారించు",
    delete: "తొలగించు",
    edit: "సవరించు",
    add: "జోడించు",
    remove: "తీసివేయి",
    viewAll: "అన్నీ చూడు",
    
    // Products
    products: "ఉత్పత్తులు",
    addToCart: "కార్ట్‌కి జోడించు",
    buyNow: "ఇప్పుడే కొనుగోలు చేయండి",
    price: "ధర",
    quantity: "పరిమాణం",
    total: "మొత్తం",
    
    // Cart
    yourCart: "మీ కార్ట్",
    emptyCart: "మీ కార్ట్ ఖాళీగా ఉంది",
    checkout: "చెక్అవుట్",
    continueShopping: "షాపింగ్ కొనసాగించండి",
    removeFromCart: "కార్ట్ నుండి తీసివేయి",
    
    // Profile
    myProfile: "నా ప్రొఫైల్",
    name: "పేరు",
    email: "ఇమెయిల్",
    phone: "ఫోన్",
    address: "చిరునామా",
    updateProfile: "ప్రొఫైల్ నవీకరించు",
    
    // Settings
    appearance: "రూపం",
    language: "భాష",
    teluguLanguage: "తెలుగు భాష",
    switchToTelugu: "తెలుగు ఇంటర్‌ఫేస్‌కి మారండి",
    preferences: "ప్రాధాన్యతలు",
    notificationSettings: "నోటిఫికేషన్ సెట్టింగ్‌లు",
    saveSettings: "సెట్టింగ్‌లు సేవ్ చేయి",
    settingsSaved: "సెట్టింగ్‌లు సేవ్ చేయబడ్డాయి",
    preferencesUpdated: "మీ ప్రాధాన్యతలు నవీకరించబడ్డాయి.",
    
    // Notifications
    noNotifications: "ఇంకా నోటిఫికేషన్‌లు లేవు",
    markAllRead: "అన్నింటినీ చదివినట్లు గుర్తించు",
    
    // Orders
    orders: "ఆర్డర్‌లు",
    orderDetails: "ఆర్డర్ వివరాలు",
    orderStatus: "ఆర్డర్ స్థితి",
    pending: "పెండింగ్",
    confirmed: "నిర్ధారించబడింది",
    outForDelivery: "డెలివరీ కోసం బయలుదేరింది",
    delivered: "డెలివరీ చేయబడింది",
    
    // Party Orders
    partyOrdersTitle: "పార్టీ ఆర్డర్‌లు",
    partyOrdersDesc: "పార్టీలు మరియు కార్యక్రమాల కోసం పెద్ద మొత్తంలో ఆర్డర్ చేయండి",
    bottleSize: "బాటిల్ పరిమాణం",
    temperature: "ఉష్ణోగ్రత",
    cooling: "శీతలీకరణ",
    normal: "సాధారణ",
    
    // Support
    support: "సపోర్ట్",
    contactUs: "మమ్మల్ని సంప్రదించండి",
    helpCenter: "సహాయ కేంద్రం",
    sendMessage: "సందేశం పంపండి",
    
    // Plant Menu
    selectPlant: "ప్లాంట్ ఎంచుకోండి",
    viewMenu: "మెనూ చూడండి",
    
    // Favorites
    myFavorites: "నా ఇష్టమైనవి",
    noFavorites: "ఇంకా ఇష్టమైనవి లేవు",
    addToFavorites: "ఇష్టమైనవికి జోడించు",
    removeFromFavorites: "ఇష్టమైనవి నుండి తీసివేయి",
    quickReorder: "త్వరిత పునఃక్రమం",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("app-language");
    return (saved === "te" || saved === "en") ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("app-language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "te" : "en");
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
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
