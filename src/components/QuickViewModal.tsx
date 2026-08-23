import React, { useState } from 'react';
import { X, ShoppingBag, Heart, Check, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    navigateTo,
    setIsSizeGuideOpen
  } = useShop();

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  // Sync selection when product changes
  React.useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors[0]?.name || 'Default');
      setSelectedSize(quickViewProduct.sizes[0] || 'One Size');
      setSelectedImageIndex(0);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isSaved = isInWishlist(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedColor, selectedSize, quantity);
    closeQuickView();
  };

  const handleGoToFullPage = () => {
    closeQuickView();
    navigateTo('product', { productId: quickViewProduct.id });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        id="quickview-backdrop"
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeQuickView}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-4xl bg-[#fbf9f5] shadow-2xl border border-[#d2c4ba] overflow-hidden flex flex-col md:flex-row">
          {/* Close */}
          <button
            id="close-quickview-btn"
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-[#1b1c1a] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Image Gallery */}
          <div className="w-full md:w-1/2 bg-[#ebe7e0] p-6 flex flex-col justify-between">
            <div className="aspect-[3/4] w-full overflow-hidden bg-white mb-4">
              <img
                src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-14 h-16 border overflow-hidden ${
                      selectedImageIndex === idx ? 'border-[#1b1c1a] ring-1 ring-[#1b1c1a]' : 'border-[#d2c4ba] opacity-70'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Actions */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-[11px] tracking-widest text-[#715a44] uppercase font-semibold mb-1">
                {quickViewProduct.brand}
              </p>
              <h2 className="font-serif text-2xl text-[#1b1c1a] font-medium mb-2">
                {quickViewProduct.name}
              </h2>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-medium text-[#1b1c1a]">
                  {formatPrice(quickViewProduct.price)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-base text-[#999] line-through">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
                {quickViewProduct.isNew && (
                  <span className="bg-[#1b1c1a] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5">
                    New Arrival
                  </span>
                )}
              </div>

              <p className="text-xs text-[#5f5e5e] leading-relaxed mb-6">
                {quickViewProduct.description}
              </p>

              {/* Color Selection */}
              {quickViewProduct.colors.length > 0 && (
                <div className="mb-5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1b1c1a] mb-2">
                    Shade: <span className="font-normal text-[#5f5e5e]">{selectedColor}</span>
                  </label>
                  <div className="flex gap-2">
                    {quickViewProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`px-3 py-1.5 text-xs border flex items-center gap-2 transition-all ${
                          selectedColor === c.name 
                            ? 'border-[#1b1c1a] bg-[#1b1c1a] text-white font-medium' 
                            : 'border-[#d2c4ba] bg-white text-[#1b1c1a] hover:border-[#1b1c1a]'
                        }`}
                      >
                        <span 
                          className="w-2.5 h-2.5 rounded-full border border-white/40" 
                          style={{ backgroundColor: c.hex }} 
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {quickViewProduct.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#1b1c1a]">
                      Size: <span className="font-normal text-[#5f5e5e]">{selectedSize}</span>
                    </label>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs text-[#715a44] underline hover:text-[#1b1c1a]"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`w-12 h-9 text-xs border transition-all flex items-center justify-center ${
                          selectedSize === s
                            ? 'border-[#1b1c1a] bg-[#1b1c1a] text-white font-semibold'
                            : 'border-[#d2c4ba] bg-white text-[#1b1c1a] hover:border-[#1b1c1a]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#d2c4ba]">
              <div className="flex gap-3">
                <button
                  id="quickview-add-to-bag"
                  onClick={handleAdd}
                  className="flex-1 luxury-btn-primary py-3.5 text-xs font-semibold tracking-widest flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO SHOPPING BAG</span>
                </button>
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                    isSaved ? 'bg-[#1b1c1a] border-[#1b1c1a] text-white' : 'border-[#d2c4ba] text-[#1b1c1a] hover:border-[#1b1c1a]'
                  }`}
                  title={isSaved ? 'In Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleGoToFullPage}
                className="w-full text-center text-xs tracking-widest uppercase font-semibold text-[#715a44] hover:text-[#1b1c1a] flex items-center justify-center gap-1.5 py-1"
              >
                <span>View Full Atelier Product Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
