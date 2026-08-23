import React, { useState } from 'react';
import { ArrowRight, Instagram, Facebook, Twitter, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PageRoute } from '../types';

export const Footer: React.FC = () => {
  const { navigateTo, setIsSizeGuideOpen } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#1b1c1a] text-[#fbf9f5] pt-16 pb-12 border-t border-[#333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#333]">
          {/* Col 1 & 2: Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="font-serif text-2xl tracking-[0.25em] font-bold text-white uppercase">
                VELORA
              </span>
              <p className="text-[9px] tracking-[0.4em] text-[#c4a78d] uppercase -mt-0.5 font-sans font-medium">
                HAUTE ÉLÉGANCE
              </p>
            </div>

            <p className="text-xs text-[#a09e9c] leading-relaxed max-w-sm">
              Crafted for the modern aesthete. Defining everyday elegance through noble natural fabrics, impeccable architectural lines, and sustainable European craftsmanship.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="block text-xs font-semibold uppercase tracking-widest text-[#c4a78d] mb-2">
                Join the Velora Privileged Circle
              </span>
              <p className="text-[11px] text-[#888] mb-3">
                Receive private previews, atelier stories, and 10% off your initial acquisition.
              </p>

              {subscribed ? (
                <div className="bg-[#c4a78d]/20 border border-[#c4a78d] p-3 text-xs text-[#c4a78d]">
                  ✓ Welcome to the Velora Circle. Your invitation code has been sent.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-[#282927] border border-[#444] px-3.5 py-2.5 text-xs text-white placeholder:text-[#777] focus:outline-none focus:border-[#c4a78d]"
                  />
                  <button
                    type="submit"
                    className="bg-[#c4a78d] hover:bg-[#a68a72] text-white px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 3: Collections */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c4a78d]">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a09e9c]">
              <li>
                <button
                  onClick={() => navigateTo('shop', { categorySlug: 'women' })}
                  className="hover:text-white transition-colors"
                >
                  Women's Runway & Silk
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { categorySlug: 'men' })}
                  className="hover:text-white transition-colors"
                >
                  Men's Bespoke Tailoring
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { categorySlug: 'shoes' })}
                  className="hover:text-white transition-colors"
                >
                  Italian Leather Footwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { categorySlug: 'leather' })}
                  className="hover:text-white transition-colors"
                >
                  Architectural Handbags
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { categorySlug: 'beauty' })}
                  className="hover:text-white transition-colors"
                >
                  Velora Beauté & Elixirs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c4a78d]">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a09e9c]">
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Client Concierge & Inquiry
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  Atelier Sizing Chart
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shipping')}
                  className="hover:text-white transition-colors"
                >
                  Complimentary Shipping & Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Book Private Boutique Fitting
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: The Maison */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c4a78d]">
              The Maison
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a09e9c]">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors"
                >
                  Philosophy & Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('journal')}
                  className="hover:text-white transition-colors"
                >
                  Velora Journal & Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors"
                >
                  Sustainable Sericulture
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('privacy')}
                  className="hover:text-white transition-colors"
                >
                  Privacy & Data Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Details Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777]">
          <div className="flex items-center gap-6">
            <span>© {new Date().getFullYear()} VELORA ATELIER S.p.A. All rights reserved.</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4 text-[#a09e9c]">
            <a href="#instagram" className="hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#facebook" className="hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#twitter" className="hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#999]">Milan • Paris • London • New York</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
