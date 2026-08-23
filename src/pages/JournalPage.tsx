import React, { useState } from 'react';
import { ArrowRight, X, Clock, User, Calendar, BookOpen, Share2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ARTICLES } from '../data/articles';
import { Article } from '../types';

export const JournalPage: React.FC = () => {
  const { selectedArticleId, navigateTo, showToast } = useShop();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [readingArticle, setReadingArticle] = useState<Article | null>(() => {
    if (selectedArticleId) {
      return ARTICLES.find((a) => a.id === selectedArticleId) || null;
    }
    return null;
  });

  const categories = ['all', 'Editorial', 'Craftsmanship', 'Styling'];

  const filteredArticles = activeCategory === 'all'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category.toLowerCase() === activeCategory.toLowerCase());

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Article Link Copied', 'Link copied to clipboard.', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#715a44] font-semibold">
          The Velora Gazette
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1b1c1a] mt-2 mb-4">
          Atelier Journal
        </h1>
        <p className="text-xs sm:text-sm text-[#5f5e5e] leading-relaxed">
          Essays on understated refinement, sustainable sericulture, textile science, and timeless capsule styling.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeCategory === cat
                ? 'bg-[#1b1c1a] text-white'
                : 'bg-[#f0ebe3] text-[#5f5e5e] hover:text-[#1b1c1a]'
            }`}
          >
            {cat === 'all' ? 'All Stories' : cat}
          </button>
        ))}
      </div>

      {/* Featured Lead Article */}
      {filteredArticles.length > 0 && (
        <div 
          onClick={() => setReadingArticle(filteredArticles[0])}
          className="group cursor-pointer bg-[#f5f3ef] border border-[#d2c4ba] overflow-hidden mb-16 shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto min-h-[380px] bg-[#e0dacf] overflow-hidden">
              <img
                src={filteredArticles[0].image}
                alt={filteredArticles[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#715a44] font-semibold uppercase tracking-widest mb-3">
                  <span>{filteredArticles[0].category}</span>
                  <span>•</span>
                  <span className="text-[#888] font-normal">{filteredArticles[0].readTime}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl text-[#1b1c1a] group-hover:text-[#c4a78d] transition-colors font-medium mb-3 leading-snug">
                  {filteredArticles[0].title}
                </h2>

                <p className="text-xs sm:text-sm text-[#5f5e5e] leading-relaxed mb-4">
                  {filteredArticles[0].excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-[#d2c4ba] flex items-center justify-between">
                <span className="text-xs text-[#777]">By {filteredArticles[0].author}</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1b1c1a] group-hover:text-[#c4a78d] flex items-center gap-1">
                  <span>Read Full Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Remaining Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.slice(1).map((article) => (
          <div
            key={article.id}
            onClick={() => setReadingArticle(article)}
            className="group cursor-pointer bg-[#fbf9f5] border border-[#d2c4ba] flex flex-col p-6 hover:border-[#1b1c1a] transition-all"
          >
            <div className="aspect-[16/10] overflow-hidden bg-[#e0dacf] mb-4">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#715a44] font-semibold uppercase tracking-wider mb-2">
              <span>{article.category}</span>
              <span>•</span>
              <span className="text-[#888] font-normal">{article.readTime}</span>
            </div>
            <h3 className="font-serif text-lg text-[#1b1c1a] group-hover:text-[#c4a78d] transition-colors leading-snug font-medium mb-2">
              {article.title}
            </h3>
            <p className="text-xs text-[#5f5e5e] leading-relaxed line-clamp-3 mb-4">
              {article.excerpt}
            </p>
            <div className="mt-auto pt-4 border-t border-[#d2c4ba]/50 flex justify-between items-center text-xs">
              <span className="text-[#777]">{article.date}</span>
              <span className="font-semibold text-[#1b1c1a] uppercase tracking-wider underline underline-offset-4 group-hover:text-[#c4a78d]">
                Read Article
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setReadingArticle(null)}
          />
          <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
            <div className="relative w-full max-w-3xl bg-[#fbf9f5] shadow-2xl border border-[#d2c4ba] p-6 sm:p-12 overflow-hidden">
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-5 right-5 p-2 text-[#5f5e5e] hover:text-[#1b1c1a]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 text-xs text-[#715a44] font-semibold uppercase tracking-widest mb-3">
                <span>{readingArticle.category}</span>
                <span>•</span>
                <span className="text-[#888]">{readingArticle.readTime}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl text-[#1b1c1a] font-normal leading-tight mb-3">
                {readingArticle.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#715a44] italic mb-6">
                {readingArticle.subtitle}
              </p>

              <div className="flex items-center justify-between py-3 border-y border-[#d2c4ba] text-xs text-[#777] mb-8">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#1b1c1a]">By {readingArticle.author}</span>
                  <span>({readingArticle.authorRole})</span>
                </div>
                <span>{readingArticle.date}</span>
              </div>

              <div className="aspect-[16/9] w-full bg-[#ebe7e0] overflow-hidden mb-8">
                <img src={readingArticle.image} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Body Text */}
              <div className="prose prose-stone text-xs sm:text-sm text-[#2b2b2b] leading-relaxed space-y-4">
                {readingArticle.content.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-[#d2c4ba] flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs text-[#715a44] font-semibold uppercase tracking-wider hover:text-[#1b1c1a]"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Essay</span>
                </button>

                <button
                  onClick={() => {
                    setReadingArticle(null);
                    navigateTo('shop');
                  }}
                  className="luxury-btn-primary px-6 py-2.5 text-xs font-semibold tracking-widest"
                >
                  SHOP CURATED PIECES
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
