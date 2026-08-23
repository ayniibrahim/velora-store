import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface PolicyPageProps {
  type: 'shipping' | 'privacy' | 'terms' | 'faq';
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ type }) => {
  const { navigateTo } = useShop();

  const renderContent = () => {
    switch (type) {
      case 'shipping':
        return (
          <div className="space-y-8 text-xs sm:text-sm text-[#5f5e5e] leading-relaxed">
            <div>
              <h2 className="font-serif text-xl text-[#1b1c1a] font-medium mb-3">
                1. Complimentary Worldwide Express Delivery
              </h2>
              <p>
                VELORA provides insured express delivery worldwide via DHL Express on all orders exceeding $500 USD (or local currency equivalent). All shipments are packed in signature keepsake gift boxes with tamper-evident security ribbon closures.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[#1b1c1a] font-medium mb-3">
                2. Delivery Estimates & Signature Requirements
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>European Union:</strong> 1–2 business days</li>
                <li><strong>United States & Canada:</strong> 2–3 business days</li>
                <li><strong>Middle East & Asia-Pacific:</strong> 3–4 business days</li>
              </ul>
              <p className="mt-2">
                For safety, an adult signature is required upon courier delivery.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[#1b1c1a] font-medium mb-3">
                3. 30-Day Complimentary Returns
              </h2>
              <p>
                If your acquisition does not surpass your expectations, you may initiate a complimentary return or size exchange within 30 days of receipt. Items must remain unwashed, unworn, and in their original packaging with atelier seal tags intact.
              </p>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-8 text-xs sm:text-sm text-[#5f5e5e] leading-relaxed">
            <div>
              <h2 className="font-serif text-xl text-[#1b1c1a] font-medium mb-3">
                1. Client Confidentiality & Data Protection
              </h2>
              <p>
                At VELORA Atelier, we value client privacy with the utmost discretion. We adhere to European GDPR and California CCPA privacy standards. We never sell, monetize, or disclose client identity information or purchasing histories to third-party ad networks.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[#1b1c1a] font-medium mb-3">
                2. Encrypted Payment Processing
              </h2>
              <p>
                All financial transactions are tokenized and processed via end-to-end PCI-DSS Level 1 certified banking gateways. We do not store full credit card numbers or CVV codes on our servers.
              </p>
            </div>
          </div>
        );

      case 'terms':
      default:
        return (
          <div className="space-y-8 text-xs sm:text-sm text-[#5f5e5e] leading-relaxed">
            <div>
              <h2 className="font-serif text-xl text-[#1b1c1a] font-medium mb-3">
                1. Terms of Maison Services
              </h2>
              <p>
                By accessing and placing an acquisition through VELORA ATELIER, you agree to our standard terms of luxury retail, provenance certification, and intellectual property protections for our proprietary garment silhouettes.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-xl text-[#1b1c1a] font-medium mb-3">
                2. Craftsmanship Authenticity Warranty
              </h2>
              <p>
                Every garment is covered by a 2-year atelier warranty against material or manufacturing defects. Complimentary button replacements and seam adjustments are available at any of our flagship salons.
              </p>
            </div>
          </div>
        );
    }
  };

  const getTitle = () => {
    if (type === 'shipping') return 'Shipping & Returns Policy';
    if (type === 'privacy') return 'Privacy & Discretion Policy';
    return 'Terms & Maison Conditions';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-12">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#715a44] font-semibold">
          Legal & Transparency
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1b1c1a] mt-2 mb-3">
          {getTitle()}
        </h1>
        <p className="text-xs text-[#888]">Last revised: Fall Season 2026</p>
      </div>

      <div className="bg-[#fbf9f5] border border-[#d2c4ba] p-8 sm:p-12 shadow-xs">
        {renderContent()}

        <div className="mt-12 pt-8 border-t border-[#d2c4ba] flex justify-between items-center text-xs">
          <span className="text-[#777]">Have questions regarding our policies?</span>
          <button
            onClick={() => navigateTo('contact')}
            className="text-[#1b1c1a] font-semibold underline uppercase tracking-wider hover:text-[#c4a78d]"
          >
            Contact Client Concierge →
          </button>
        </div>
      </div>
    </div>
  );
};
