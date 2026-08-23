import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Grid, List, X, Search, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC = () => {
  const { selectedCategorySlug, navigateTo, formatPrice } = useShop();

  // Filters State
  const [categoryFilter, setCategoryFilter] = useState<string>(selectedCategorySlug || 'all');
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [colorFilter, setColorFilter] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [onlySale, setOnlySale] = useState<boolean>(false);
  const [onlyNew, setOnlyNew] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // Sync category filter if selectedCategorySlug changes
  React.useEffect(() => {
    if (selectedCategorySlug) {
      setCategoryFilter(selectedCategorySlug);
    }
  }, [selectedCategorySlug]);

  const categories = [
    { slug: 'all', label: 'All Atelier Pieces' },
    { slug: 'women', label: "Women's Runway & Silk" },
    { slug: 'men', label: "Men's Tailoring" },
    { slug: 'outerwear', label: 'Coats & Outerwear' },
    { slug: 'knitwear', label: 'Cashmere & Knitwear' },
    { slug: 'leather', label: 'Handbags & Leather' },
    { slug: 'shoes', label: 'Italian Footwear' },
    { slug: 'accessories', label: 'Fine Jewelry & Accents' },
    { slug: 'beauty', label: 'Velora Beauté' },
  ];

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', '38R', '40R', '42R', '38 EU', '40 EU', '42 EU'];
  const availableColors = [
    { name: 'Ivory / White', value: 'ivory', hex: '#F5F5DC' },
    { name: 'Noir Black', value: 'noir', hex: '#1B1C1A' },
    { name: 'Camel Tan', value: 'camel', hex: '#C4A78D' },
    { name: 'Espresso Brown', value: 'brown', hex: '#4A3728' },
    { name: 'Olive Green', value: 'olive', hex: '#6E7658' },
    { name: 'Gold Vermeil', value: 'gold', hex: '#E5C158' }
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (categoryFilter !== 'all' && product.category !== categoryFilter) {
        return false;
      }
      // Size filter
      if (sizeFilter !== 'all' && !product.sizes.includes(sizeFilter)) {
        return false;
      }
      // Color filter
      if (colorFilter !== 'all') {
        const matchesColor = product.colors.some((c) =>
          c.name.toLowerCase().includes(colorFilter.toLowerCase())
        );
        if (!matchesColor) return false;
      }
      // Max price
      if (product.price > maxPrice) {
        return false;
      }
      // Sale only
      if (onlySale && !product.isSale) {
        return false;
      }
      // New only
      if (onlyNew && !product.isNew) {
        return false;
      }
      // Search term
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.brand.toLowerCase().includes(q) ||
          product.subcategory.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // recommended
    });
  }, [categoryFilter, sizeFilter, colorFilter, maxPrice, onlySale, onlyNew, searchQuery, sortBy]);

  const activeFiltersCount = [
    categoryFilter !== 'all',
    sizeFilter !== 'all',
    colorFilter !== 'all',
    maxPrice < 600,
    onlySale,
    onlyNew,
    searchQuery.trim().length > 0
  ].filter(Boolean).length;

  const handleResetFilters = () => {
    setCategoryFilter('all');
    setSizeFilter('all');
    setColorFilter('all');
    setMaxPrice(600);
    setOnlySale(false);
    setOnlyNew(false);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Top Breadcrumb & Title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-[#715a44] uppercase tracking-wider mb-2">
          <button onClick={() => navigateTo('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-[#1b1c1a] font-semibold">Atelier Catalog</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1b1c1a] font-normal">
              {categoryFilter === 'all' 
                ? 'Curated Haute Collection' 
                : categories.find(c => c.slug === categoryFilter)?.label}
            </h1>
            <p className="text-xs sm:text-sm text-[#5f5e5e] mt-1 max-w-xl">
              Timeless garments and fine accessories crafted from noble European natural fibers.
            </p>
          </div>

          <span className="text-xs text-[#715a44] font-medium tracking-wide">
            Showing <strong>{filteredProducts.length}</strong> of <strong>{PRODUCTS.length}</strong> creations
          </span>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-[#f0ebe3] p-4 border border-[#d2c4ba] mb-8 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Filter Toggle & Search */}
        <div className="flex items-center gap-3 flex-1 min-w-[240px]">
          <button
            id="mobile-filter-btn"
            onClick={() => setIsFilterDrawerOpen(true)}
            className="lg:hidden luxury-btn-ghost px-4 py-2 text-xs flex items-center gap-2 bg-white"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          <div className="relative flex-1 max-w-xs">
            <Search className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in catalog..."
              className="w-full bg-white border border-[#d2c4ba] pl-9 pr-3 py-1.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#1b1c1a]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Sort & Grid View */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#5f5e5e] font-medium hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#d2c4ba] px-3 py-1.5 text-xs text-[#1b1c1a] font-medium focus:outline-none"
            >
              <option value="recommended">Featured Atelier</option>
              <option value="newest">New Season First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="hidden sm:flex items-center border border-[#d2c4ba] bg-white">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-[#1b1c1a] text-white' : 'text-[#5f5e5e]'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-[#1b1c1a] text-white' : 'text-[#5f5e5e]'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
          <span className="text-[#715a44] font-semibold uppercase tracking-wider">Active Filters:</span>

          {categoryFilter !== 'all' && (
            <span className="bg-[#f0ebe3] border border-[#d2c4ba] px-2.5 py-1 flex items-center gap-1.5 text-[#1b1c1a]">
              Category: {categories.find((c) => c.slug === categoryFilter)?.label}
              <button onClick={() => setCategoryFilter('all')}><X className="w-3 h-3" /></button>
            </span>
          )}

          {sizeFilter !== 'all' && (
            <span className="bg-[#f0ebe3] border border-[#d2c4ba] px-2.5 py-1 flex items-center gap-1.5 text-[#1b1c1a]">
              Size: {sizeFilter}
              <button onClick={() => setSizeFilter('all')}><X className="w-3 h-3" /></button>
            </span>
          )}

          {colorFilter !== 'all' && (
            <span className="bg-[#f0ebe3] border border-[#d2c4ba] px-2.5 py-1 flex items-center gap-1.5 text-[#1b1c1a]">
              Shade: {colorFilter}
              <button onClick={() => setColorFilter('all')}><X className="w-3 h-3" /></button>
            </span>
          )}

          {maxPrice < 600 && (
            <span className="bg-[#f0ebe3] border border-[#d2c4ba] px-2.5 py-1 flex items-center gap-1.5 text-[#1b1c1a]">
              Max Price: {formatPrice(maxPrice)}
              <button onClick={() => setMaxPrice(600)}><X className="w-3 h-3" /></button>
            </span>
          )}

          {onlySale && (
            <span className="bg-[#f0ebe3] border border-[#d2c4ba] px-2.5 py-1 flex items-center gap-1.5 text-[#1b1c1a]">
              Privileged Sale
              <button onClick={() => setOnlySale(false)}><X className="w-3 h-3" /></button>
            </span>
          )}

          {onlyNew && (
            <span className="bg-[#f0ebe3] border border-[#d2c4ba] px-2.5 py-1 flex items-center gap-1.5 text-[#1b1c1a]">
              New Arrivals
              <button onClick={() => setOnlyNew(false)}><X className="w-3 h-3" /></button>
            </span>
          )}

          <button
            onClick={handleResetFilters}
            className="text-xs text-[#715a44] underline uppercase tracking-wider font-semibold ml-2 flex items-center gap-1 hover:text-[#1b1c1a]"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        </div>
      )}

      {/* Main Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-8 pr-4">
          {/* Department Categories */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#1b1c1a] border-b border-[#d2c4ba] pb-2 mb-3">
              Departments
            </h3>
            <ul className="space-y-1.5 text-xs">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => setCategoryFilter(cat.slug)}
                    className={`w-full text-left py-1.5 px-2 transition-colors flex items-center justify-between ${
                      categoryFilter === cat.slug
                        ? 'bg-[#1b1c1a] text-white font-medium'
                        : 'text-[#5f5e5e] hover:text-[#1b1c1a] hover:bg-[#f0ebe3]'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {categoryFilter === cat.slug && <span className="w-1.5 h-1.5 rounded-full bg-[#c4a78d]" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter Slider */}
          <div>
            <div className="flex justify-between items-center border-b border-[#d2c4ba] pb-2 mb-3">
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#1b1c1a]">
                Price Ceiling
              </h3>
              <span className="text-xs font-semibold text-[#715a44]">{formatPrice(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="50"
              max="600"
              step="25"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#1b1c1a] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#777] mt-1 font-mono">
              <span>$50</span>
              <span>$600+</span>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#1b1c1a] border-b border-[#d2c4ba] pb-2 mb-3">
              Size
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSizeFilter('all')}
                className={`px-2.5 py-1 text-xs border ${
                  sizeFilter === 'all' ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]' : 'bg-white text-[#1b1c1a] border-[#d2c4ba]'
                }`}
              >
                All
              </button>
              {availableSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSizeFilter(s)}
                  className={`px-2.5 py-1 text-xs border ${
                    sizeFilter === s ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]' : 'bg-white text-[#1b1c1a] border-[#d2c4ba]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#1b1c1a] border-b border-[#d2c4ba] pb-2 mb-3">
              Shade & Color
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setColorFilter('all')}
                className={`text-xs px-2.5 py-1 border ${
                  colorFilter === 'all' ? 'bg-[#1b1c1a] text-white' : 'bg-white border-[#d2c4ba]'
                }`}
              >
                All Shades
              </button>
              {availableColors.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setColorFilter(c.value)}
                  className={`flex items-center gap-1.5 text-xs px-2.5 py-1 border ${
                    colorFilter === c.value ? 'border-[#1b1c1a] bg-[#1b1c1a] text-white' : 'border-[#d2c4ba] bg-white text-[#1b1c1a]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full border border-[#bbb]" style={{ backgroundColor: c.hex }} />
                  <span>{c.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Special Toggles */}
          <div className="space-y-2 pt-2 border-t border-[#d2c4ba]">
            <label className="flex items-center gap-2 text-xs font-medium text-[#1b1c1a] cursor-pointer">
              <input
                type="checkbox"
                checked={onlyNew}
                onChange={(e) => setOnlyNew(e.target.checked)}
                className="accent-[#1b1c1a]"
              />
              <span>New Arrivals Only</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-[#1b1c1a] cursor-pointer">
              <input
                type="checkbox"
                checked={onlySale}
                onChange={(e) => setOnlySale(e.target.checked)}
                className="accent-[#1b1c1a]"
              />
              <span>Privileged Sale Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-[#f5f3ef] border border-[#d2c4ba] p-12 text-center my-8">
              <h3 className="font-serif text-xl text-[#1b1c1a] mb-2 font-medium">
                No items match your filter criteria
              </h3>
              <p className="text-xs text-[#5f5e5e] max-w-sm mx-auto mb-6">
                Try widening your price range, selecting different size filters, or clearing your active search query.
              </p>
              <button
                onClick={handleResetFilters}
                className="luxury-btn-primary px-6 py-3 text-xs font-semibold tracking-widest"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigateTo('product', { productId: product.id })}
                  className="group bg-[#fbf9f5] border border-[#d2c4ba]/60 p-4 sm:p-6 flex flex-col sm:flex-row gap-6 cursor-pointer hover:border-[#1b1c1a] transition-all"
                >
                  <div className="w-full sm:w-48 aspect-[3/4] bg-[#f0ebe3] overflow-hidden shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#715a44] font-bold">
                            {product.brand}
                          </span>
                          <h3 className="font-serif text-xl text-[#1b1c1a] group-hover:text-[#c4a78d] transition-colors font-medium">
                            {product.name}
                          </h3>
                        </div>
                        <span className="font-medium text-lg text-[#1b1c1a]">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      <p className="text-xs text-[#5f5e5e] leading-relaxed mt-2 line-clamp-3">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-[#777] mt-3">
                        <span>Sizes: {product.sizes.join(', ')}</span>
                        <span>•</span>
                        <span>{product.colors.length} shades</span>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between border-t border-[#d2c4ba]/40 mt-4">
                      <span className="text-xs uppercase tracking-widest font-semibold text-[#715a44] group-hover:text-[#1b1c1a] transition-colors">
                        View Product Specifications →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsFilterDrawerOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#fbf9f5] h-full shadow-2xl z-10 p-6 overflow-y-auto flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b border-[#d2c4ba] mb-6">
              <h3 className="font-serif text-lg text-[#1b1c1a] font-medium">Filter Catalog</h3>
              <button onClick={() => setIsFilterDrawerOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content inside mobile drawer */}
            <div className="space-y-6 flex-1">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1b1c1a] mb-2">Category</h4>
                <div className="space-y-1">
                  {categories.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => setCategoryFilter(c.slug)}
                      className={`block w-full text-left py-1 text-xs ${categoryFilter === c.slug ? 'font-bold text-[#c4a78d]' : 'text-[#5f5e5e]'}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1b1c1a] mb-2">
                  Max Price ({formatPrice(maxPrice)})
                </h4>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#d2c4ba]">
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full luxury-btn-primary py-3 text-xs font-semibold tracking-widest"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
