import React from 'react';
import { ArrowRight, Leaf, Shield, Award, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="w-full">
      {/* Hero Header */}
      <section className="bg-[#f0ebe3] py-20 sm:py-28 border-b border-[#d2c4ba]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#715a44] font-semibold">
            Maison Velora • Established in Milan
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1b1c1a] mt-3 mb-6 leading-tight">
            Defining Everyday Elegance <br />
            <span className="italic font-normal">Through Noble Simplicity</span>
          </h1>
          <p className="text-sm sm:text-base text-[#5f5e5e] leading-relaxed max-w-2xl mx-auto">
            Born from a deep reverence for tactile craftsmanship, VELORA creates permanent wardrobe staples that reject transient fashion cycles in favor of timeless form and ethical European provenance.
          </p>
        </div>
      </section>

      {/* Main Narrative with Split Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="aspect-[4/5] bg-[#e0dacf] overflow-hidden shadow-lg">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQog3FQZNSoJcbtaieDc2EBd0DJtjSWjOuqxlV4b_2j_AMFC6UPk8NGrYRbq1C_m6mLHtURD0VIEw_WdnRbtVjAE3LYnMQDUdcC2OTPgbeQg2_2C3c_Z7YSDKG7CpESa1HeAOnwS2VnMMONLBnL7HgHMNYI5bRGILnn7m94EmLbi4W7JsGKOYptVPpYYeUeo8ZpCboVEVnm7kVG493xUd-hI-5ifBpF3Nkai82nWEbyLdtuEYBYld7fA"
              alt="Velora Atelier Heritage"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#715a44] font-semibold">
              The Philosophy
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#1b1c1a] leading-snug">
              "We do not design for seasons; we design for lifetimes."
            </h2>
            <p className="text-xs sm:text-sm text-[#5f5e5e] leading-relaxed">
              In our fast-paced global culture, fashion has frequently sacrificed integrity for velocity. At Velora, we take the deliberate, slow path. Every garment begins with raw natural fiber: Grade-A Mongolian cashmere, organic Mulberry silk, long-staple French linen, and vegetable-tanned leather from Tuscany.
            </p>
            <p className="text-xs sm:text-sm text-[#5f5e5e] leading-relaxed">
              We partner directly with fourth-generation family-owned mills across Northern Italy, France, and Portugal. By bypassing intermediaries, we invest directly into master artisans, ethical working wages, and pure zero-waste sericulture.
            </p>
            <div className="pt-2">
              <span className="font-serif text-base italic text-[#1b1c1a]">
                — Clara Beaumont & Matteo Rossi, Founders & Creative Directors
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="bg-[#f5f3ef] py-20 border-y border-[#d2c4ba]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#715a44] font-semibold">
              Our Core Commitments
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#1b1c1a] mt-1">
              The Atelier Standard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#fbf9f5] p-8 border border-[#d2c4ba] space-y-4">
              <div className="w-12 h-12 bg-[#c4a78d]/20 text-[#715a44] flex items-center justify-center rounded-full">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-[#1b1c1a] font-medium">100% Traceable Fibers</h3>
              <p className="text-xs text-[#5f5e5e] leading-relaxed">
                From organic Mulberry silkworm groves to certified cruelty-free Mongolian cashmere cooperatives, all our materials can be traced back to their origins.
              </p>
            </div>

            <div className="bg-[#fbf9f5] p-8 border border-[#d2c4ba] space-y-4">
              <div className="w-12 h-12 bg-[#c4a78d]/20 text-[#715a44] flex items-center justify-center rounded-full">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-[#1b1c1a] font-medium">Master Artisanal Guilds</h3>
              <p className="text-xs text-[#5f5e5e] leading-relaxed">
                Our bespoke tailoring and leatherwork are crafted by multigenerational artisans in Biella, Florence, and Porto who uphold heirloom sewing techniques.
              </p>
            </div>

            <div className="bg-[#fbf9f5] p-8 border border-[#d2c4ba] space-y-4">
              <div className="w-12 h-12 bg-[#c4a78d]/20 text-[#715a44] flex items-center justify-center rounded-full">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-[#1b1c1a] font-medium">Sustainable Keepsake Packaging</h3>
              <p className="text-xs text-[#5f5e5e] leading-relaxed">
                All acquisitions arrive in 100% recyclable, plastic-free keepsake gift boxes with organic cotton dust covers designed for permanent storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="font-serif text-3xl font-medium text-[#1b1c1a]">
          Experience the Quiet Luxury Difference
        </h2>
        <p className="text-xs sm:text-sm text-[#5f5e5e] max-w-xl mx-auto">
          Explore our permanent catalogue and discover everyday elegance crafted to endure.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="luxury-btn-primary px-8 py-4 text-xs font-semibold tracking-widest inline-flex items-center gap-2"
        >
          <span>EXPLORE ATELIER CREATIONS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
