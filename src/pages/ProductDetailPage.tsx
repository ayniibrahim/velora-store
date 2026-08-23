import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ShoppingBag, 
  Ruler, 
  ChevronDown, 
  Star, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Sparkles,
  Share2,
  Check,
  Plus,
  Minus
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product, ProductReview } from '../types';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductId, 
    navigateTo, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    formatPrice,
    setIsSizeGuideOpen,
    showToast
  } = useShop();

  const product: Product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Default');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'One Size');
  const [quantity, setQuantity] = useState<number>(1);
  const [isCopied, setIsCopied] = useState(false);

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState<string>('details');

  // Review modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviews || [
    {
      id: 'r1',
      author: 'Elena R.',
      rating: 5,
      date: '2 weeks ago',
      title: 'The pinnacle of quiet luxury',
      comment: 'The weight and luster of this mulberry silk are truly extraordinary. The drape is flattering without feeling oversized.',
      verified: true
    },
    {
      id: 'r2',
      author: 'Camille V.',
      rating: 5,
      date: '1 month ago',
      title: 'Sublime tailoring',
      comment: 'Buttons and cuff detailing are immaculate. Looks incredible tucked into trousers or paired fluidly with tailored denim.',
      verified: true
    }
  ]);

  // Sync state when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColor(product.colors[0]?.name || 'Default');
    setSelectedSize(product.sizes[0] || 'One Size');
    setQuantity(1);
    if (product.reviews) {
      setReviewsList(product.reviews);
    }
  }, [product.id]);

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    showToast('Link Copied', 'Product link copied to clipboard.', 'info');
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle || 'Exquisite quality',
      comment: newReviewComment,
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsReviewModalOpen(false);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
    showToast('Review Published', 'Thank you for sharing your experience with the atelier.', 'info');
  };

  // Complete the look products
  const completeTheLookProducts = (product.completeTheLookIds || [])
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const handleAddFullLook = () => {
    // Add main product
    addToCart(product, selectedColor, selectedSize, 1);
    // Add complete the look items
    completeTheLookProducts.forEach((item) => {
      addToCart(item, item.colors[0]?.name || 'Default', item.sizes[0] || 'One Size', 1);
    });
    showToast('Full Look Added', `Added ${product.name} and ${completeTheLookProducts.length} matching pieces to bag!`, 'cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#715a44] uppercase tracking-wider mb-8">
        <button onClick={() => navigateTo('home')} className="hover:underline">Home</button>
        <span>/</span>
        <button onClick={() => navigateTo('shop', { categorySlug: product.category })} className="hover:underline">
          {product.category}
        </button>
        <span>/</span>
        <button onClick={() => navigateTo('shop')} className="hover:underline">
          {product.subcategory}
        </button>
        <span>/</span>
        <span className="text-[#1b1c1a] font-semibold">{product.name}</span>
      </nav>

      {/* Main Product Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Gallery (7 Cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[620px] shrink-0 pb-2 md:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 md:w-20 md:h-24 bg-[#ebe7e0] overflow-hidden shrink-0 border transition-all ${
                    activeImageIndex === idx 
                      ? 'border-[#1b1c1a] ring-1 ring-[#1b1c1a]' 
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Primary Image */}
          <div className="flex-1 relative aspect-[3/4] bg-[#f0ebe3] overflow-hidden group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center product-image-zoom cursor-crosshair"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.isNew && (
                <span className="bg-[#1b1c1a] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1">
                  New Arrival
                </span>
              )}
              {product.collection && (
                <span className="bg-[#c4a78d] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1">
                  {product.collection}
                </span>
              )}
            </div>

            {/* Wishlist Floating Button */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                isSaved 
                  ? 'bg-[#1b1c1a] text-white' 
                  : 'bg-white/80 hover:bg-white text-[#1b1c1a] backdrop-blur-sm'
              }`}
              title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Column: Information & Atelier Actions (5 Cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Brand, Title & Price */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-[#715a44] font-bold">
                  {product.brand}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-xs text-[#715a44] hover:text-[#1b1c1a] transition-colors"
                  title="Share product"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Share'}</span>
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#1b1c1a] font-medium mt-1 mb-2">
                {product.name}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex text-[#c4a78d]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-[#d2c4ba]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[#1b1c1a] font-semibold">{product.rating}</span>
                <span className="text-[#888]">({reviewsList.length} Atelier Reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-medium text-2xl text-[#1b1c1a]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#999] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-[11px] text-[#715a44] uppercase tracking-wider font-semibold">
                  Taxes Included • Duties Paid
                </span>
              </div>
            </div>

            {/* Product Narrative */}
            <p className="text-xs sm:text-sm text-[#5f5e5e] leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatches */}
            {product.colors.length > 0 && (
              <div className="pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#1b1c1a] mb-2.5">
                  Color Shade: <span className="font-normal text-[#5f5e5e]">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`px-3.5 py-2 text-xs border flex items-center gap-2 transition-all ${
                        selectedColor === c.name 
                          ? 'border-[#1b1c1a] bg-[#1b1c1a] text-white font-semibold shadow-xs' 
                          : 'border-[#d2c4ba] bg-white text-[#1b1c1a] hover:border-[#1b1c1a]'
                      }`}
                    >
                      <span 
                        className="w-3 h-3 rounded-full border border-white/50" 
                        style={{ backgroundColor: c.hex }} 
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#1b1c1a]">
                    Select Size: <span className="font-normal text-[#5f5e5e]">{selectedSize}</span>
                  </label>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-[#715a44] underline hover:text-[#1b1c1a] flex items-center gap-1 font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Atelier Sizing Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`min-w-[48px] h-10 px-3 text-xs border transition-all flex items-center justify-center font-medium ${
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

            {/* Quantity Stepper & Add to Bag CTA */}
            <div className="pt-4 space-y-3">
              <div className="flex gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-[#d2c4ba] bg-white h-13 px-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#5f5e5e] hover:text-[#1b1c1a]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-[#1b1c1a]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#5f5e5e] hover:text-[#1b1c1a]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Add Button */}
                <button
                  id="pdp-add-to-bag-btn"
                  onClick={handleAddToCart}
                  className="flex-1 luxury-btn-primary h-13 text-xs font-semibold tracking-[0.2em] flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO SHOPPING BAG</span>
                </button>
              </div>

              {/* Micro Perks */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-[#5f5e5e]">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#715a44]" />
                  <span>Complimentary Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-[#715a44]" />
                  <span>30-Day Free Returns</span>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="pt-6 border-t border-[#d2c4ba] space-y-3">
              {/* Accordion 1: Details & Fit */}
              <div className="border border-[#d2c4ba] bg-white">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'details' ? '' : 'details')}
                  className="w-full p-4 text-left flex justify-between items-center text-xs uppercase font-semibold tracking-wider text-[#1b1c1a]"
                >
                  <span>Details & Silhouette Fit</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'details' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'details' && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#5f5e5e] space-y-2 border-t border-[#f0ebe3]">
                    <ul className="list-disc pl-4 space-y-1">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Fabric & Care */}
              <div className="border border-[#d2c4ba] bg-white">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'fabric' ? '' : 'fabric')}
                  className="w-full p-4 text-left flex justify-between items-center text-xs uppercase font-semibold tracking-wider text-[#1b1c1a]"
                >
                  <span>Fabric & Sustainable Care</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'fabric' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'fabric' && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#5f5e5e] space-y-2 border-t border-[#f0ebe3]">
                    <ul className="list-disc pl-4 space-y-1">
                      {product.fabricCare.map((fc, i) => (
                        <li key={i}>{fc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Returns */}
              <div className="border border-[#d2c4ba] bg-white">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? '' : 'shipping')}
                  className="w-full p-4 text-left flex justify-between items-center text-xs uppercase font-semibold tracking-wider text-[#1b1c1a]"
                >
                  <span>Complimentary Shipping & Returns</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#5f5e5e] space-y-2 border-t border-[#f0ebe3]">
                    <ul className="list-disc pl-4 space-y-1">
                      {product.shippingInfo.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete the Look Section */}
      {completeTheLookProducts.length > 0 && (
        <section className="mt-24 pt-16 border-t border-[#d2c4ba]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#715a44] font-semibold">
                Styled by Velora Maison
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1b1c1a] mt-1">
                Complete The Look
              </h2>
            </div>

            <button
              onClick={handleAddFullLook}
              className="mt-4 sm:mt-0 luxury-btn-primary px-6 py-3 text-xs font-semibold tracking-widest flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>ADD COMPLETE LOOK TO BAG</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {completeTheLookProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Customer Reviews Section */}
      <section className="mt-24 pt-16 border-t border-[#d2c4ba]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#715a44] font-semibold">
              Client Feedback
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1b1c1a] mt-1">
              Atelier Reviews ({reviewsList.length})
            </h2>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="mt-4 sm:mt-0 luxury-btn-ghost px-6 py-3 text-xs font-semibold tracking-widest"
          >
            WRITE A CLIENT REVIEW
          </button>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsList.map((rev) => (
            <div key={rev.id} className="bg-white p-6 border border-[#d2c4ba] space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex text-[#c4a78d]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-[#ddd]'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#1b1c1a]">{rev.author}</span>
                  {rev.verified && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 font-medium">
                      Verified Acquisition
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#999]">{rev.date}</span>
              </div>

              <h4 className="font-serif text-sm font-semibold text-[#1b1c1a]">
                "{rev.title}"
              </h4>

              <p className="text-xs text-[#5f5e5e] leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Review Modal Form */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsReviewModalOpen(false)}
          />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-[#fbf9f5] border border-[#d2c4ba] p-6 sm:p-8 shadow-2xl">
              <h3 className="font-serif text-xl text-[#1b1c1a] font-medium mb-4">
                Share Your Experience with {product.name}
              </h3>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#1b1c1a] mb-1">Your Name</label>
                  <input
                    required
                    type="text"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Charlotte M."
                    className="w-full bg-white border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#1b1c1a] mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReviewRating(star)}
                        className="text-[#c4a78d]"
                      >
                        <Star className={`w-6 h-6 ${star <= newReviewRating ? 'fill-current' : 'text-[#ccc]'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#1b1c1a] mb-1">Review Headline</label>
                  <input
                    type="text"
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    placeholder="e.g. Exceptional drape and feel"
                    className="w-full bg-white border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-[#1b1c1a] mb-1">Your Detailed Review</label>
                  <textarea
                    required
                    rows={4}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Describe the fabric weight, fit, stitching..."
                    className="w-full bg-white border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#d2c4ba]">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#777]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="luxury-btn-primary px-6 py-2.5 text-xs font-semibold tracking-widest"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
