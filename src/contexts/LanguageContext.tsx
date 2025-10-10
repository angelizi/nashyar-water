import { createContext, useContext, ReactNode } from "react";

interface LanguageContextType {
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, string> = {
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
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ t }}>
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
