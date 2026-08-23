import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo, formatPrice } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  const trendingTags = ['Silk Blouse', 'Camel Coat', 'Tweed Blazer', 'Leather Loafers', 'French Linen', 'Gold Vermeil', 'Cashmere'];

  const searchResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];
    return PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.subcategory.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        (p.collection && p.collection.toLowerCase().includes(term))
      );
    });
  }, [searchTerm]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        id="search-backdrop"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative min-h-screen flex flex-col items-center pt-16 sm:pt-24 px-4 pb-12">
        <div className="relative w-full max-w-3xl bg-[#fbf9f5] shadow-2xl p-6 sm:p-10 border border-[#d2c4ba]">
          {/* Close Button */}
          <button
            id="close-search-modal-btn"
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-5 right-5 p-2 text-[#5f5e5e] hover:text-[#1b1c1a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Search Input */}
          <div className="relative border-b-2 border-[#1b1c1a] pb-3 mb-6">
            <div className="flex items-center gap-3">
              <Search className="w-6 h-6 text-[#715a44]" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, materials, silhouettes..."
                className="w-full bg-transparent text-lg sm:text-xl font-serif text-[#1b1c1a] placeholder:text-[#999] focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="p-1 text-[#999] hover:text-[#1b1c1a]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Trending Searches */}
          {!searchTerm && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#715a44] mb-3">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="bg-[#f0ebe3] hover:bg-[#e4ddcf] text-[#1b1c1a] px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Curated Recommendations */}
              <div className="mt-8 pt-6 border-t border-[#d2c4ba]/50">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#715a44] mb-4">
                  Curated Highlights
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {PRODUCTS.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateTo('product', { productId: item.id });
                      }}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-[3/4] bg-[#f0ebe3] overflow-hidden mb-2">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <p className="font-serif text-xs text-[#1b1c1a] group-hover:text-[#c4a78d] transition-colors line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-[#715a44] font-medium mt-0.5">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results List */}
          {searchTerm && (
            <div>
              <p className="text-xs text-[#5f5e5e] mb-4">
                Found <strong>{searchResults.length}</strong> results for "{searchTerm}"
              </p>

              {searchResults.length === 0 ? (
                <div className="py-12 text-center text-[#777]">
                  <p className="font-serif text-base text-[#1b1c1a] mb-1">No products found</p>
                  <p className="text-xs">Try searching for broader terms like "silk", "coat", "dress", or "leather".</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigateTo('product', { productId: item.id });
                      }}
                      className="flex gap-3 p-2 bg-[#f5f3ef] hover:bg-[#ede8df] cursor-pointer transition-colors items-center"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-14 h-16 object-cover bg-white shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] uppercase tracking-wider text-[#715a44] font-bold">
                          {item.brand}
                        </span>
                        <h4 className="font-serif text-xs font-semibold text-[#1b1c1a] truncate">
                          {item.name}
                        </h4>
                        <span className="text-xs font-medium text-[#1b1c1a]">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#999] shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
