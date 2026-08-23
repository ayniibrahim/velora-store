import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';

export const CategoriesPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#715a44] font-semibold">
          Departments & Ateliers
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1b1c1a] mt-2 mb-4">
          Curated Categories
        </h1>
        <p className="text-xs sm:text-sm text-[#5f5e5e] leading-relaxed">
          From Italian cashmere outerwear to Mulberry silk silhouettes and architectural leather, explore our specialized design departments.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="space-y-16">
        {CATEGORIES.map((cat, idx) => {
          const sampleProducts = PRODUCTS.filter((p) => p.category === cat.slug).slice(0, 3);
          const isEven = idx % 2 === 0;

          return (
            <div 
              key={cat.id}
              className="bg-[#f5f3ef] border border-[#d2c4ba] overflow-hidden"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                {/* Hero Category Image */}
                <div className={`lg:col-span-5 relative aspect-[4/3] lg:aspect-auto min-h-[380px] bg-[#e0dacf] ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
                  <div className="absolute bottom-6 left-6 text-white lg:hidden">
                    <h3 className="font-serif text-2xl font-medium">{cat.name}</h3>
                    <p className="text-xs text-[#d2c4ba]">{cat.tagline}</p>
                  </div>
                </div>

                {/* Details & Featured Samples */}
                <div className={`lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#715a44] font-bold">
                      {cat.itemCount} Atelier Creations
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#1b1c1a] font-medium mt-1 mb-2">
                      {cat.name}
                    </h2>
                    <p className="text-xs text-[#715a44] font-medium uppercase tracking-wider mb-3">
                      {cat.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-[#5f5e5e] leading-relaxed mb-6">
                      {cat.description}
                    </p>

                    {/* Mini Featured Previews */}
                    {sampleProducts.length > 0 && (
                      <div>
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#1b1c1a] mb-3">
                          Featured In This Department:
                        </span>
                        <div className="grid grid-cols-3 gap-3">
                          {sampleProducts.map((p) => (
                            <div 
                              key={p.id}
                              onClick={() => navigateTo('product', { productId: p.id })}
                              className="group/item cursor-pointer"
                            >
                              <div className="aspect-[3/4] bg-[#ebe7e0] overflow-hidden mb-1.5">
                                <img
                                  src={p.images[0]}
                                  alt={p.name}
                                  className="w-full h-full object-cover group-hover/item:scale-105 transition-transform"
                                />
                              </div>
                              <p className="font-serif text-xs text-[#1b1c1a] truncate group-hover/item:text-[#c4a78d]">
                                {p.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-8 mt-6 border-t border-[#d2c4ba]">
                    <button
                      onClick={() => navigateTo('shop', { categorySlug: cat.slug })}
                      className="luxury-btn-primary px-8 py-3.5 text-xs font-semibold tracking-widest flex items-center gap-2"
                    >
                      <span>SHOP {cat.name.toUpperCase()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
