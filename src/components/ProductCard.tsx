import React from 'react';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { navigateTo, formatPrice, toggleWishlist, isInWishlist, openQuickView, addToCart } = useShop();
  const isSaved = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo('product', { productId: product.id });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.colors[0]?.name || 'Default', product.sizes[0] || 'One Size', 1);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col bg-[#fbf9f5] transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ebe7e0]">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="product-image-zoom h-full w-full object-cover object-center"
        />

        {/* Secondary image on hover if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="bg-[#1b1c1a] text-white text-[10px] uppercase font-semibold tracking-widest px-2.5 py-1">
              New Arrival
            </span>
          )}
          {product.isSale && (
            <span className="bg-[#8b4513] text-white text-[10px] uppercase font-semibold tracking-widest px-2.5 py-1">
              Privileged Sale
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="bg-[#c4a78d] text-white text-[10px] uppercase font-semibold tracking-widest px-2.5 py-1">
              Iconic
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={handleWishlistClick}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 ${
            isSaved 
              ? 'bg-[#1b1c1a] text-white' 
              : 'bg-white/80 text-[#1b1c1a] hover:bg-white backdrop-blur-sm shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick Action Buttons Bar */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex items-center gap-2 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            id={`quick-add-${product.id}`}
            onClick={handleQuickAdd}
            className="flex-1 bg-[#1b1c1a]/90 hover:bg-[#1b1c1a] text-white text-[11px] font-medium tracking-wider uppercase py-2.5 px-3 backdrop-blur-sm transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Quick Bag
          </button>
          <button
            id={`quick-view-${product.id}`}
            onClick={handleQuickView}
            className="w-10 h-10 bg-white/90 hover:bg-white text-[#1b1c1a] flex items-center justify-center backdrop-blur-sm transition-colors shadow-sm"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-4 pb-2 flex flex-col flex-grow">
        <div className="flex items-center justify-between text-[11px] tracking-widest text-[#715a44] uppercase mb-1 font-medium">
          <span>{product.brand}</span>
          {product.colors && product.colors.length > 1 && (
            <span className="text-[#888]">{product.colors.length} shades</span>
          )}
        </div>

        <h3 className="font-serif text-[16px] leading-snug text-[#1b1c1a] group-hover:text-[#c4a78d] transition-colors mb-1.5 line-clamp-1 font-medium">
          {product.name}
        </h3>

        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="font-medium text-[15px] text-[#1b1c1a]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[13px] text-[#999] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2.5">
            {product.colors.slice(0, 4).map((c, i) => (
              <span
                key={i}
                title={c.name}
                className="w-2.5 h-2.5 rounded-full border border-[#d2c4ba]"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-[#777] ml-0.5">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
