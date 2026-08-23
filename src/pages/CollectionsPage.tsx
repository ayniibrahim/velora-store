import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { COLLECTIONS } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const CollectionsPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#715a44] font-semibold">
          Curated Lookbooks
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1b1c1a] mt-2 mb-4">
          Seasonal Collections
        </h1>
        <p className="text-xs sm:text-sm text-[#5f5e5e] leading-relaxed">
          Capsule collections envisioned around distinct narratives—from the tactile warmth of autumn cashmeres to the sun-bleached ease of French linen.
        </p>
      </div>

      {/* Collections Sections */}
      <div className="space-y-24">
        {COLLECTIONS.map((col) => {
          const colProducts = PRODUCTS.filter(
            (p) => p.collection?.toLowerCase().includes(col.name.toLowerCase()) || p.isFeatured
          ).slice(0, 4);

          return (
            <div key={col.id} className="border-b border-[#d2c4ba] pb-20 last:border-none">
              {/* Collection Banner */}
              <div className="relative aspect-[21/9] min-h-[320px] bg-[#e0dacf] overflow-hidden mb-12 shadow-lg">
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
                <div className="absolute inset-0 p-8 sm:p-14 flex flex-col justify-center max-w-xl text-white">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#c4a78d] font-semibold flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    {col.season}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-normal mb-3 leading-tight">
                    {col.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#d2c4ba] leading-relaxed mb-6 font-light">
                    {col.description}
                  </p>
                  <div>
                    <button
                      onClick={() => navigateTo('shop')}
                      className="luxury-btn-primary px-6 py-3 text-xs font-semibold tracking-widest inline-flex items-center gap-2"
                    >
                      <span>SHOP THE EDIT</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Garments in this capsule */}
              <div>
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#715a44] font-bold">
                      Curated Wardrobe Staples
                    </span>
                    <h3 className="font-serif text-xl font-medium text-[#1b1c1a]">
                      Key Pieces from {col.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="text-xs uppercase tracking-wider font-semibold text-[#715a44] hover:text-[#1b1c1a] flex items-center gap-1"
                  >
                    <span>View All In This Drop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {colProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
