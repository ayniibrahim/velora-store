import React from 'react';
import { useShop } from '../context/ShopContext';
import { Check, Heart, ShoppingBag, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, hideToast, setIsCartOpen, setIsWishlistOpen } = useShop();

  if (!toast) return null;

  return (
    <div 
      id="velora-toast-notification"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#1b1c1a] text-white p-4 shadow-2xl border border-[#c4a78d]/30 transition-all duration-300 flex items-start gap-3.5"
    >
      <div className="w-8 h-8 rounded-full bg-[#c4a78d]/20 text-[#c4a78d] flex items-center justify-center shrink-0 mt-0.5">
        {toast.type === 'cart' ? (
          <ShoppingBag className="w-4 h-4" />
        ) : toast.type === 'wishlist' ? (
          <Heart className="w-4 h-4 fill-current" />
        ) : (
          <Check className="w-4 h-4" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold tracking-wider uppercase text-[#c4a78d]">
          {toast.title}
        </h4>
        <p className="text-xs text-[#d2c4ba] mt-0.5 leading-relaxed line-clamp-2">
          {toast.desc}
        </p>
        
        <div className="mt-2.5 flex items-center gap-3">
          {toast.type === 'cart' && (
            <button
              onClick={() => {
                hideToast();
                setIsCartOpen(true);
              }}
              className="text-[11px] font-semibold uppercase tracking-wider text-white underline underline-offset-4 hover:text-[#c4a78d]"
            >
              View Bag & Checkout
            </button>
          )}
          {toast.type === 'wishlist' && (
            <button
              onClick={() => {
                hideToast();
                setIsWishlistOpen(true);
              }}
              className="text-[11px] font-semibold uppercase tracking-wider text-white underline underline-offset-4 hover:text-[#c4a78d]"
            >
              View Saved Items
            </button>
          )}
        </div>
      </div>

      <button
        onClick={hideToast}
        className="text-[#999] hover:text-white transition-colors p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastContainer = Toast;

