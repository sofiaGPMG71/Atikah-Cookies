import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, CartItem, Product } from '../types';
import { translations } from '../translations';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('sofia_cookies_lang');
    return (saved === 'ms' || saved === 'en') ? saved : 'en';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sofia_cookies_cart');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('sofia_cookies_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('sofia_cookies_cart', JSON.stringify(cart));
  }, [cart]);

  // Handle active section scrolling detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'products', 'why-choose-us', 'testimonials', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 160; // Offset for navbar

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Toast utilities
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Translation function with English fallback
  const t = (key: string, params?: Record<string, string | number>): string => {
    const langDict = translations[language];
    const fallbackDict = translations['en'];
    
    // Attempt current language, then English fallback, then return the key itself
    let translated = langDict[key as keyof typeof langDict] || fallbackDict[key as keyof typeof fallbackDict] || key;
    
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        translated = translated.replace(`{${k}}`, String(v));
      });
    }
    return translated;
  };

  // Cart operations
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        addToast(t('toast.addedToCart', { name: t(product.nameKey) }), 'success');
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      addToast(t('toast.addedToCart', { name: t(product.nameKey) }), 'success');
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    if (item) {
      addToast(t('toast.removedFromCart', { name: t(item.product.nameKey) }), 'info');
    }
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    addToast(t('toast.cartCleared'), 'info');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        toasts,
        addToast,
        removeToast,
        t,
        activeSection,
        setActiveSection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
