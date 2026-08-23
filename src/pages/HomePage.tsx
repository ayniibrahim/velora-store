import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Clock, RefreshCw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ARTICLES } from '../data/articles';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const { navigateTo } = useShop();

  const newArrivals = PRODUCTS.filter((p) => p.isNew || p.isFeatured).slice(0, 4);

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] bg-[#f0ebe3] flex items-center overflow-hidden">
        {/* Background Image with subtle gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQog3FQZNSoJcbtaieDc2EBd0DJtjSWjOuqxlV4b_2j_AMFC6UPk8NGrYRbq1C_m6mLHtURD0VIEw_WdnRbtVjAE3LYnMQDUdcC2OTPgbeQg2_2C3c_Z7YSDKG7CpESa1HeAOnwS2VnMMONLBnL7HgHMNYI5bRGILnn7m94EmLbi4W7JsGKOYptVPpYYeUeo8ZpCboVEVnm7kVG493xUd-hI-5ifBpF3Nkai82nWEbyLdtuEYBYld7fA"
            alt="Velora Autumn Editorial Collection"
            className="w-full h-full object-cover object-top sm:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1b1c1a]/70 via-[#1b1c1a]/30 to-transparent sm:from-[#1b1c1a]/60 sm:via-[#1b1c1a]/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white">
          <div className="max-w-xl space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a78d] bg-black/40 backdrop-blur-sm px-3.5 py-1.5 border border-[#c4a78d]/30">
              <Sparkles className="w-3.5 h-3.5" />
              Fall / Winter 2026 Collection
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight tracking-tight">
              Discover Your <br />
              <span className="italic font-normal">Everyday Elegance</span>
            </h1>

            <p className="text-sm sm:text-base text-[#d2c4ba] leading-relaxed max-w-md font-light">
              Explore our curated autumn collection of pure Italian cashmere, Mulberry silk, and bespoke tailoring designed to transcend fleeting trends.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                id="hero-shop-now-btn"
                onClick={() => navigateTo('shop')}
                className="luxury-btn-primary px-8 py-4 text-xs font-semibold tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg"
              >
                <span>SHOP NEW ARRIVALS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="hero-explore-collections-btn"
                onClick={() => navigateTo('collections')}
                className="border border-white/80 hover:bg-white hover:text-[#1b1c1a] text-white px-8 py-4 text-xs font-semibold tracking-[0.2em] transition-colors flex items-center justify-center backdrop-blur-xs"
              >
                <span>EXPLORE COLLECTIONS</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bento Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#715a44] font-semibold">
              Curated Departments
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1b1c1a] mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => navigateTo('categories')}
            className="mt-3 sm:mt-0 text-xs font-semibold uppercase tracking-widest text-[#715a44] hover:text-[#1b1c1a] flex items-center gap-1 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Large Card: Women's */}
          <div 
            onClick={() => navigateTo('shop', { categorySlug: 'women' })}
            className="group relative md:col-span-2 aspect-[4/3] md:aspect-auto md:h-[480px] overflow-hidden bg-[#e0dacf] cursor-pointer"
          >
            <img
              src={CATEGORIES[0].image}
              alt={CATEGORIES[0].name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c4a78d] font-semibold mb-1">
                42 Atelier Pieces
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-2">
                {CATEGORIES[0].name}
              </h3>
              <p className="text-xs text-[#d2c4ba] max-w-sm mb-4 line-clamp-2">
                {CATEGORIES[0].description}
              </p>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-white group-hover:text-[#c4a78d] transition-colors">
                <span>Explore Women's Drop</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Men's Card */}
          <div 
            onClick={() => navigateTo('shop', { categorySlug: 'men' })}
            className="group relative aspect-[4/3] md:aspect-auto md:h-[480px] overflow-hidden bg-[#e0dacf] cursor-pointer"
          >
            <img
              src={CATEGORIES[1].image}
              alt={CATEGORIES[1].name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c4a78d] font-semibold mb-1">
                28 Atelier Pieces
              </span>
              <h3 className="font-serif text-2xl font-medium mb-2">
                {CATEGORIES[1].name}
              </h3>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-white group-hover:text-[#c4a78d] transition-colors">
                <span>Shop Men's Tailoring</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Footwear Card */}
          <div 
            onClick={() => navigateTo('shop', { categorySlug: 'shoes' })}
            className="group relative h-72 overflow-hidden bg-[#e0dacf] cursor-pointer"
          >
            <img
              src={CATEGORIES[2].image}
              alt={CATEGORIES[2].name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <h3 className="font-serif text-xl font-medium mb-1">{CATEGORIES[2].name}</h3>
              <span className="text-[11px] text-[#c4a78d] uppercase tracking-wider font-semibold">
                Shop Italian Leather →
              </span>
            </div>
          </div>

          {/* Leather Goods Card */}
          <div 
            onClick={() => navigateTo('shop', { categorySlug: 'leather' })}
            className="group relative h-72 overflow-hidden bg-[#e0dacf] cursor-pointer"
          >
            <img
              src={CATEGORIES[3].image}
              alt={CATEGORIES[3].name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <h3 className="font-serif text-xl font-medium mb-1">{CATEGORIES[3].name}</h3>
              <span className="text-[11px] text-[#c4a78d] uppercase tracking-wider font-semibold">
                Shop Handbags & Totes →
              </span>
            </div>
          </div>

          {/* Beauty Card */}
          <div 
            onClick={() => navigateTo('shop', { categorySlug: 'beauty' })}
            className="group relative h-72 overflow-hidden bg-[#e0dacf] cursor-pointer"
          >
            <img
              src={CATEGORIES[4].image}
              alt={CATEGORIES[4].name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <h3 className="font-serif text-xl font-medium mb-1">{CATEGORIES[4].name}</h3>
              <span className="text-[11px] text-[#c4a78d] uppercase tracking-wider font-semibold">
                Shop Beauté & Care →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. New Arrivals Spotlight */}
      <section className="bg-[#f5f3ef] py-20 border-y border-[#d2c4ba]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#715a44] font-semibold">
              The Autumn Drop
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#1b1c1a] mt-1 mb-3">
              New Season Arrivals
            </h2>
            <p className="text-xs text-[#5f5e5e] leading-relaxed">
              Every garment has been hand-inspected in our atelier to ensure immaculate seams, premium touch, and eternal wearability.
            </p>
          </div>

          {/* 4 Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => navigateTo('shop')}
              className="luxury-btn-ghost px-10 py-4 text-xs font-semibold tracking-[0.2em]"
            >
              VIEW FULL COLLECTION (20+ ITEMS)
            </button>
          </div>
        </div>
      </section>

      {/* 4. Editorial Story Feature (Elevate Your Everyday Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Editorial Image */}
          <div className="relative aspect-[4/5] bg-[#e0dacf] overflow-hidden shadow-xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO0UnunVUsT_wtVi4EtqXZ5tJV6QAMQFBNehORdTQB5G4R7xRprlJ2Aou1qdvsbh1bLqyX6r6ElrDMueacD_Zqb0YIccyh2-o487DIx61YJGRdNKQy1yx770sgXsKeX6PsD_I76k3V-aDLxJTSmtOqpHwGpd1yFQwY0Ez7Osv1Q07PgBcGIEiQO8hFExgdRfAs5F6mgtjabeIZ26eJj1TJM8-288nOhMUQvL46RhPnDV0TIpCzs3QNeg"
              alt="Velora Editorial Feature"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs p-4 border border-[#d2c4ba] max-w-xs">
              <p className="text-[10px] uppercase tracking-widest text-[#715a44] font-semibold">
                Lookbook Autumn 2026
              </p>
              <p className="font-serif text-xs text-[#1b1c1a] mt-0.5">
                Silk Evening Tailored Jumpsuit in Noir
              </p>
            </div>
          </div>

          {/* Editorial Text */}
          <div className="space-y-6 lg:pr-8">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#715a44] font-semibold">
              The Velora Manifesto
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#1b1c1a]">
              Elevate Your <br />
              <span className="italic">Everyday Style</span>
            </h2>

            <p className="text-sm text-[#5f5e5e] leading-relaxed">
              We believe true luxury is tactile and understated. Our collections reject the disposable nature of modern fast fashion in favor of heirloom fabrics—100% natural Mulberry silk, French flax linen, and Tuscan vegetable-tanned calfskin.
            </p>

            <p className="text-sm text-[#5f5e5e] leading-relaxed">
              Designed in Milan and tailored across master workshops in Italy and France, each piece embodies quiet confidence that moves fluidly from morning meetings to intimate evening salons.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigateTo('about')}
                className="luxury-btn-primary px-8 py-3.5 text-xs font-semibold tracking-widest flex items-center justify-center gap-2"
              >
                <span>OUR MAISON HERITAGE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateTo('journal')}
                className="luxury-btn-ghost px-8 py-3.5 text-xs font-semibold tracking-widest"
              >
                READ THE JOURNAL
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Brand Value Propositions */}
      <section className="bg-[#f0ebe3] py-16 border-y border-[#d2c4ba]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c4a78d]/20 text-[#715a44] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1b1c1a]">
                  Complimentary Global Delivery
                </h4>
                <p className="text-xs text-[#5f5e5e] mt-1 leading-relaxed">
                  On all worldwide orders over $500. Express insured courier with signature.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c4a78d]/20 text-[#715a44] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1b1c1a]">
                  Master Craftsmanship
                </h4>
                <p className="text-xs text-[#5f5e5e] mt-1 leading-relaxed">
                  100% certified European mills with authentic craftsmanship guarantee.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c4a78d]/20 text-[#715a44] flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1b1c1a]">
                  Hassle-Free Returns
                </h4>
                <p className="text-xs text-[#5f5e5e] mt-1 leading-relaxed">
                  Complimentary 30-day returns and exchanges in original packaging.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c4a78d]/20 text-[#715a44] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1b1c1a]">
                  Client Concierge 24/7
                </h4>
                <p className="text-xs text-[#5f5e5e] mt-1 leading-relaxed">
                  Bespoke styling consultations and private fitting appointments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Journal Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#715a44] font-semibold">
              The Velora Gazette
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1b1c1a] mt-1">
              Atelier Journal & Stories
            </h2>
          </div>
          <button
            onClick={() => navigateTo('journal')}
            className="mt-3 sm:mt-0 text-xs font-semibold uppercase tracking-widest text-[#715a44] hover:text-[#1b1c1a] flex items-center gap-1 transition-colors"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <div
              key={article.id}
              onClick={() => navigateTo('journal', { articleId: article.id })}
              className="group cursor-pointer flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#e0dacf] mb-4">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-center gap-3 text-[11px] text-[#715a44] font-semibold uppercase tracking-wider mb-2">
                <span>{article.category}</span>
                <span>•</span>
                <span className="text-[#888] font-normal">{article.readTime}</span>
              </div>
              <h3 className="font-serif text-lg text-[#1b1c1a] group-hover:text-[#c4a78d] transition-colors leading-snug font-medium mb-2">
                {article.title}
              </h3>
              <p className="text-xs text-[#5f5e5e] leading-relaxed line-clamp-2 mb-3">
                {article.excerpt}
              </p>
              <span className="text-xs font-semibold tracking-wider text-[#1b1c1a] uppercase underline underline-offset-4 group-hover:text-[#c4a78d] transition-colors mt-auto">
                Read Story
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
