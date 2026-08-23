import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, PageRoute, OrderDetails, AppUser } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  // Navigation
  activeRoute: PageRoute;
  currentRoute: PageRoute;
  selectedProductId: string | null;
  selectedCollectionId: string | null;
  selectedArticleId: string | null;
  selectedCategorySlug: string | null;
  navigateTo: (route: PageRoute, params?: { productId?: string; collectionId?: string; articleId?: string; categorySlug?: string }) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color: string, size: string, quantity?: number) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;

  // Promo
  appliedPromo: { code: string; discountPercent: number } | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastOrder: OrderDetails | null;
  setLastOrder: (order: OrderDetails | null) => void;

  // Currency
  currency: 'USD' | 'EUR' | 'GBP';
  setCurrency: (cur: 'USD' | 'EUR' | 'GBP') => void;
  formatPrice: (amount: number) => string;

  // Auth
  user: AppUser | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (fullName: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;

  // Notifications Toast
  toast: { title: string; desc: string; type: 'cart' | 'wishlist' | 'info' } | null;
  showToast: (title: string, desc: string, type?: 'cart' | 'wishlist' | 'info') => void;
  hideToast: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
};

const API_BASE_URL = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const apiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state
  const [activeRoute, setActiveRoute] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('sofia-silk-blouse');
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('velora_cart');
      return saved ? JSON.parse(saved) : [
        // Seed default item in cart for quick demonstration
        {
          id: 'sofia-silk-blouse-Ivory-S',
          product: PRODUCTS[0],
          selectedColor: 'Ivory',
          selectedSize: 'S',
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('velora_wishlist');
      return saved ? JSON.parse(saved) : [PRODUCTS[1], PRODUCTS[6]];
    } catch {
      return [];
    }
  });

  // Promo code
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);

  // Currency
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');

  // Auth
  const [user, setUser] = useState<AppUser | null>(null);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);

  // Toast
  const [toast, setToast] = useState<{ title: string; desc: string; type: 'cart' | 'wishlist' | 'info' } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('velora_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('velora_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    const savedToken = localStorage.getItem('velora_token');
    const savedUser = localStorage.getItem('velora_user');

    if (!savedToken || !savedUser) {
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser) as AppUser;
      setUser(parsedUser);
    } catch {
      localStorage.removeItem('velora_token');
      localStorage.removeItem('velora_user');
    }
  }, []);

  const showToast = (title: string, desc: string, type: 'cart' | 'wishlist' | 'info' = 'cart') => {
    setToast({ title, desc, type });
    setTimeout(() => {
      setToast((curr) => (curr?.title === title ? null : curr));
    }, 4000);
  };

  const hideToast = () => setToast(null);

  const navigateTo = (
    route: PageRoute, 
    params?: { productId?: string; collectionId?: string; articleId?: string; categorySlug?: string }
  ) => {
    setActiveRoute(route);
    if (params?.productId) setSelectedProductId(params.productId);
    if (params?.collectionId) setSelectedCollectionId(params.collectionId);
    if (params?.articleId) setSelectedArticleId(params.articleId);
    if (params?.categorySlug !== undefined) setSelectedCategorySlug(params.categorySlug);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, color: string, size: string, quantity = 1) => {
    const itemKey = `${product.id}-${color}-${size}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemKey, product, selectedColor: color, selectedSize: size, quantity }];
    });

    showToast(
      'Added to Shopping Bag',
      `${product.name} (${color}, ${size}) added.`,
      'cart'
    );
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast('Removed from Wishlist', `${product.name} removed from your saved items.`, 'wishlist');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast('Saved to Wishlist', `${product.name} added to your personal wishlist.`, 'wishlist');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'VELORA10') {
      setAppliedPromo({ code: 'VELORA10', discountPercent: 10 });
      return { success: true, message: '10% Privileged discount applied!' };
    }
    if (clean === 'ELEGANCE20') {
      setAppliedPromo({ code: 'ELEGANCE20', discountPercent: 20 });
      return { success: true, message: '20% VIP Atelier discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try VELORA10 or ELEGANCE20.' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Price calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartDiscount = appliedPromo ? (cartSubtotal * appliedPromo.discountPercent) / 100 : 0;
  const cartShipping = cartSubtotal > 500 || cartSubtotal === 0 ? 0 : 35;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const formatPrice = (amount: number) => {
    const { symbol, rate } = CURRENCY_RATES[currency];
    const converted = amount * rate;
    return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || 'Login failed.' };
      }

      localStorage.setItem('velora_token', data.token);
      localStorage.setItem('velora_user', JSON.stringify(data.user));
      setUser(data.user as AppUser);
      showToast('Welcome back', `Hi ${data.user.fullName}!`, 'info');
      return { success: true, message: data.message || 'Login successful.' };
    } catch {
      return { success: false, message: 'Unable to connect to the server. Please start the backend.' };
    }
  };

  const signup = async (fullName: string, email: string, password: string) => {
    try {
      const response = await fetch(apiUrl('/api/auth/signup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || 'Signup failed.' };
      }

      localStorage.setItem('velora_token', data.token);
      localStorage.setItem('velora_user', JSON.stringify(data.user));
      setUser(data.user as AppUser);
      showToast('Account created', `Welcome ${data.user.fullName}!`, 'info');
      return { success: true, message: data.message || 'Account created.' };
    } catch {
      return { success: false, message: 'Unable to connect to the server. Please start the backend.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('velora_token');
    localStorage.removeItem('velora_user');
    setUser(null);
    setActiveRoute('home');
    showToast('Logged out', 'You have been signed out.', 'info');
  };

  return (
    <ShopContext.Provider
      value={{
        activeRoute,
        currentRoute: activeRoute,
        selectedProductId,
        selectedCollectionId,
        selectedArticleId,
        selectedCategorySlug,
        navigateTo,

        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,

        appliedPromo,
        applyPromo,
        removePromo,

        wishlist,
        toggleWishlist,
        isInWishlist,

        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastOrder,
        setLastOrder,

        currency,
        setCurrency,
        formatPrice,

        user,
        login,
        signup,
        logout,

        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
