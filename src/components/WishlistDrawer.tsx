import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    formatPrice,
    navigateTo
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        id="wishlist-backdrop"
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbf9f5] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#d2c4ba] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#c4a78d] fill-current" />
              <h2 className="font-serif text-xl tracking-wider text-[#1b1c1a] font-medium">
                Saved Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              id="close-wishlist-drawer-btn"
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-[#5f5e5e] hover:text-[#1b1c1a] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#f0ebe3] flex items-center justify-center mb-4 text-[#715a44]">
                  <Heart className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-serif text-lg text-[#1b1c1a] mb-2 font-medium">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-[#5f5e5e] max-w-xs mb-6 leading-relaxed">
                  Save pieces you love by clicking the heart icon on any garment or accessory.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    navigateTo('shop');
                  }}
                  className="luxury-btn-primary px-6 py-3 text-xs tracking-widest font-semibold"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div 
                  key={product.id}
                  id={`wishlist-item-${product.id}`}
                  className="flex gap-4 pb-6 border-b border-[#d2c4ba]/40 last:border-none"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-24 object-cover object-center bg-[#f0ebe3] shrink-0 cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      navigateTo('product', { productId: product.id });
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-[10px] tracking-widest text-[#715a44] uppercase font-semibold">
                            {product.brand}
                          </p>
                          <h4 
                            onClick={() => {
                              setIsWishlistOpen(false);
                              navigateTo('product', { productId: product.id });
                            }}
                            className="font-serif text-sm font-medium text-[#1b1c1a] hover:text-[#c4a78d] transition-colors cursor-pointer"
                          >
                            {product.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-[#999] hover:text-[#b22222] transition-colors p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs font-semibold text-[#1b1c1a] mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product, product.colors[0]?.name || 'Default', product.sizes[0] || 'One Size', 1);
                        toggleWishlist(product);
                      }}
                      className="mt-3 w-full bg-[#1b1c1a] hover:bg-[#c4a78d] text-white py-2 px-3 text-[11px] font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Move to Bag
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {wishlist.length > 0 && (
            <div className="p-6 border-t border-[#d2c4ba] bg-[#f5f3ef]">
              <button
                onClick={() => {
                  wishlist.forEach((prod) => {
                    addToCart(prod, prod.colors[0]?.name || 'Default', prod.sizes[0] || 'One Size', 1);
                  });
                  setIsWishlistOpen(false);
                }}
                className="w-full luxury-btn-primary py-3.5 text-xs font-semibold tracking-[0.2em] flex items-center justify-center gap-2"
              >
                <span>MOVE ALL TO SHOPPING BAG</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
