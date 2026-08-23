import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedPromo,
    applyPromo,
    removePromo,
    formatPrice,
    setIsCheckoutOpen,
    navigateTo
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 500;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) setPromoInput('');
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        id="cart-backdrop"
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbf9f5] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#d2c4ba] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1b1c1a]" />
              <h2 className="font-serif text-xl tracking-wider text-[#1b1c1a] font-medium">
                Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#5f5e5e] hover:text-[#1b1c1a] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#f0ebe3] px-6 py-3 border-b border-[#d2c4ba]/50 text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-[#5f5e5e] mb-1.5 font-medium">
                Add <span className="text-[#1b1c1a] font-bold">{formatPrice(remainingForFreeShipping)}</span> more for <strong className="text-[#715a44]">Complimentary Global Delivery</strong>
              </p>
            ) : (
              <p className="text-[#715a44] font-semibold mb-1.5 flex items-center gap-1">
                <span>✨</span> You've unlocked Complimentary Express Delivery!
              </p>
            )}
            <div className="w-full bg-[#d2c4ba]/50 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#c4a78d] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#f0ebe3] flex items-center justify-center mb-4 text-[#715a44]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-lg text-[#1b1c1a] mb-2 font-medium">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#5f5e5e] max-w-xs mb-6 leading-relaxed">
                  Explore our curated seasonal collections and elevate your everyday wardrobe with timeless essentials.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="luxury-btn-primary px-6 py-3 text-xs tracking-widest font-semibold"
                >
                  Discover Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  className="flex gap-4 pb-6 border-b border-[#d2c4ba]/40 last:border-none"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover object-center bg-[#f0ebe3] shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('product', { productId: item.product.id });
                    }}
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] tracking-widest text-[#715a44] uppercase font-semibold">
                            {item.product.brand}
                          </p>
                          <h4 
                            onClick={() => {
                              setIsCartOpen(false);
                              navigateTo('product', { productId: item.product.id });
                            }}
                            className="font-serif text-sm font-medium text-[#1b1c1a] hover:text-[#c4a78d] transition-colors cursor-pointer"
                          >
                            {item.product.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#999] hover:text-[#b22222] transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#5f5e5e] mt-1">
                        Shade: <span className="text-[#1b1c1a] font-medium">{item.selectedColor}</span> • Size: <span className="text-[#1b1c1a] font-medium">{item.selectedSize}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#d2c4ba] bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[#5f5e5e] hover:text-[#1b1c1a] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-[#1b1c1a]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#5f5e5e] hover:text-[#1b1c1a] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-medium text-[#1b1c1a]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#d2c4ba] bg-[#f5f3ef] space-y-4">
              {/* Promo Code Form */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-[#e8e4dc] px-3 py-2 text-xs">
                    <div className="flex items-center gap-1.5 text-[#715a44] font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-xs text-[#999] hover:text-[#1b1c1a] underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo Code (e.g. VELORA10)"
                      className="flex-1 bg-white border border-[#d2c4ba] px-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:border-[#1b1c1a]"
                    />
                    <button
                      type="submit"
                      className="luxury-btn-ghost px-4 py-2 text-[11px] font-semibold"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMessage && (
                  <p className={`text-[11px] mt-1 ${promoMessage.isError ? 'text-red-700' : 'text-emerald-700'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Cost Summary Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5f5e5e]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1b1c1a] font-medium">{formatPrice(cartSubtotal)}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-[#715a44]">
                    <span>Privilege Discount</span>
                    <span>-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-[#1b1c1a] font-medium">
                    {cartShipping === 0 ? 'Complimentary' : formatPrice(cartShipping)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1b1c1a] pt-2 border-t border-[#d2c4ba]">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                id="drawer-checkout-cta"
                onClick={handleCheckoutClick}
                className="w-full luxury-btn-primary py-4 text-xs font-semibold tracking-[0.2em] flex items-center justify-center gap-2"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#777] uppercase tracking-wider pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#715a44]" />
                <span>Encrypted 256-Bit SSL Checkout • Authentic Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
