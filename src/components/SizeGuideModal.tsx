import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [tab, setTab] = useState<'women' | 'men' | 'shoes'>('women');

  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        id="sizeguide-backdrop"
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsSizeGuideOpen(false)}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-[#fbf9f5] shadow-2xl p-6 sm:p-8 border border-[#d2c4ba]">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#d2c4ba]">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-[#715a44]" />
              <h3 className="font-serif text-xl text-[#1b1c1a] font-medium">
                Atelier Sizing & Fit Guide
              </h3>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-1 text-[#5f5e5e] hover:text-[#1b1c1a]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Controls: Tabs & Unit */}
          <div className="flex flex-wrap items-center justify-between gap-4 my-6">
            <div className="flex gap-2">
              {(['women', 'men', 'shoes'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    tab === t 
                      ? 'bg-[#1b1c1a] text-white' 
                      : 'bg-[#f0ebe3] text-[#5f5e5e] hover:text-[#1b1c1a]'
                  }`}
                >
                  {t === 'women' ? "Women's Apparel" : t === 'men' ? "Men's Tailoring" : 'Footwear'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-[#f0ebe3] p-1 text-xs">
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-1 font-semibold ${unit === 'in' ? 'bg-white shadow-xs text-[#1b1c1a]' : 'text-[#777]'}`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 font-semibold ${unit === 'cm' ? 'bg-white shadow-xs text-[#1b1c1a]' : 'text-[#777]'}`}
              >
                Centimeters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {tab === 'women' && (
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#f0ebe3] text-[#1b1c1a] uppercase font-semibold">
                    <th className="p-3 border-b border-[#d2c4ba]">Size</th>
                    <th className="p-3 border-b border-[#d2c4ba]">US</th>
                    <th className="p-3 border-b border-[#d2c4ba]">EU</th>
                    <th className="p-3 border-b border-[#d2c4ba]">UK</th>
                    <th className="p-3 border-b border-[#d2c4ba]">Bust ({unit})</th>
                    <th className="p-3 border-b border-[#d2c4ba]">Waist ({unit})</th>
                    <th className="p-3 border-b border-[#d2c4ba]">Hips ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d2c4ba]/50 text-[#5f5e5e]">
                  <tr>
                    <td className="p-3 font-semibold text-[#1b1c1a]">XS</td>
                    <td className="p-3">0 - 2</td>
                    <td className="p-3">34</td>
                    <td className="p-3">6</td>
                    <td className="p-3">{unit === 'in' ? '32 - 33"' : '81 - 84 cm'}</td>
                    <td className="p-3">{unit === 'in' ? '24 - 25"' : '61 - 64 cm'}</td>
                    <td className="p-3">{unit === 'in' ? '34 - 35"' : '86 - 89 cm'}</td>
                  </tr>
                  <tr className="bg-white/40">
                    <td className="p-3 font-semibold text-[#1b1c1a]">S</td>
                    <td className="p-3">4 - 6</td>
                    <td className="p-3">36</td>
                    <td className="p-3">8</td>
                    <td className="p-3">{unit === 'in' ? '34 - 35"' : '86 - 89 cm'}</td>
                    <td className="p-3">{unit === 'in' ? '26 - 27"' : '66 - 69 cm'}</td>
                    <td className="p-3">{unit === 'in' ? '36 - 37"' : '91 - 94 cm'}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#1b1c1a]">M</td>
                    <td className="p-3">8 - 10</td>
                    <td className="p-3">38 - 40</td>
                    <td className="p-3">10 - 12</td>
                    <td className="p-3">{unit === 'in' ? '36 - 37"' : '91 - 94 cm'}</td>
                    <td className="p-3">{unit === 'in' ? '28 - 29"' : '71 - 74 cm'}</td>
                    <td className="p-3">{unit === 'in' ? '38 - 39"' : '96 - 99 cm'}</td>
                  </tr>
                  <tr className="bg-white/40">
                    <td className="p-3 font-semibold text-[#1b1c1a]">L</td>
                    <td className="p-3">12 - 14</td>
                    <td className="p-3">42</td>
                    <td className="p-3">14</td>
                    <td className="p-3">{unit === 'in' ? '38.5 - 40"' : '98 - 102 cm'}</td>
                    <td className="p-3">{unit === 'in' ? '30.5 - 32"' : '77 - 81 cm'}</td>
                    <td className="p-3">{unit === 'in' ? '40.5 - 42"' : '103 - 107 cm'}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#1b1c1a]">XL</td>
                    <td className="p-3">16</td>
                    <td className="p-3">44</td>
                    <td className="p-3">16</td>
                    <td className="p-3">{unit === 'in' ? '41.5 - 43"' : '105 - 109 cm'}</td>
                    <td className="p-3">{unit === 'in' ? '33.5 - 35"' : '85 - 89 cm'}</td>
                    <td className="p-3">{unit === 'in' ? '43.5 - 45"' : '110 - 114 cm'}</td>
                  </tr>
                </tbody>
              </table>
            )}

            {tab === 'men' && (
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#f0ebe3] text-[#1b1c1a] uppercase font-semibold">
                    <th className="p-3 border-b border-[#d2c4ba]">Chest Size</th>
                    <th className="p-3 border-b border-[#d2c4ba]">US / UK</th>
                    <th className="p-3 border-b border-[#d2c4ba]">EU</th>
                    <th className="p-3 border-b border-[#d2c4ba]">Chest ({unit})</th>
                    <th className="p-3 border-b border-[#d2c4ba]">Waist ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d2c4ba]/50 text-[#5f5e5e]">
                  <tr>
                    <td className="p-3 font-semibold text-[#1b1c1a]">38R</td>
                    <td className="p-3">38</td>
                    <td className="p-3">48</td>
                    <td className="p-3">{unit === 'in' ? '38"' : '96 cm'}</td>
                    <td className="p-3">{unit === 'in' ? '32"' : '81 cm'}</td>
                  </tr>
                  <tr className="bg-white/40">
                    <td className="p-3 font-semibold text-[#1b1c1a]">40R</td>
                    <td className="p-3">40</td>
                    <td className="p-3">50</td>
                    <td className="p-3">{unit === 'in' ? '40"' : '101 cm'}</td>
                    <td className="p-3">{unit === 'in' ? '34"' : '86 cm'}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#1b1c1a]">42R</td>
                    <td className="p-3">42</td>
                    <td className="p-3">52</td>
                    <td className="p-3">{unit === 'in' ? '42"' : '106 cm'}</td>
                    <td className="p-3">{unit === 'in' ? '36"' : '91 cm'}</td>
                  </tr>
                  <tr className="bg-white/40">
                    <td className="p-3 font-semibold text-[#1b1c1a]">44R</td>
                    <td className="p-3">44</td>
                    <td className="p-3">54</td>
                    <td className="p-3">{unit === 'in' ? '44"' : '111 cm'}</td>
                    <td className="p-3">{unit === 'in' ? '38"' : '96 cm'}</td>
                  </tr>
                </tbody>
              </table>
            )}

            {tab === 'shoes' && (
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#f0ebe3] text-[#1b1c1a] uppercase font-semibold">
                    <th className="p-3 border-b border-[#d2c4ba]">EU Size</th>
                    <th className="p-3 border-b border-[#d2c4ba]">US Women</th>
                    <th className="p-3 border-b border-[#d2c4ba]">US Men</th>
                    <th className="p-3 border-b border-[#d2c4ba]">UK</th>
                    <th className="p-3 border-b border-[#d2c4ba]">Foot Length ({unit})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d2c4ba]/50 text-[#5f5e5e]">
                  <tr>
                    <td className="p-3 font-semibold text-[#1b1c1a]">36 EU</td>
                    <td className="p-3">6.0</td>
                    <td className="p-3">-</td>
                    <td className="p-3">3.5</td>
                    <td className="p-3">{unit === 'in' ? '9.0"' : '23.0 cm'}</td>
                  </tr>
                  <tr className="bg-white/40">
                    <td className="p-3 font-semibold text-[#1b1c1a]">37 EU</td>
                    <td className="p-3">6.5 - 7.0</td>
                    <td className="p-3">-</td>
                    <td className="p-3">4.5</td>
                    <td className="p-3">{unit === 'in' ? '9.3"' : '23.6 cm'}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#1b1c1a]">38 EU</td>
                    <td className="p-3">7.5 - 8.0</td>
                    <td className="p-3">-</td>
                    <td className="p-3">5.5</td>
                    <td className="p-3">{unit === 'in' ? '9.6"' : '24.4 cm'}</td>
                  </tr>
                  <tr className="bg-white/40">
                    <td className="p-3 font-semibold text-[#1b1c1a]">40 EU</td>
                    <td className="p-3">9.5</td>
                    <td className="p-3">7.5</td>
                    <td className="p-3">7.0</td>
                    <td className="p-3">{unit === 'in' ? '10.2"' : '25.9 cm'}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#1b1c1a]">42 EU</td>
                    <td className="p-3">-</td>
                    <td className="p-3">9.0</td>
                    <td className="p-3">8.5</td>
                    <td className="p-3">{unit === 'in' ? '10.8"' : '27.4 cm'}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#d2c4ba] text-xs text-[#715a44] bg-[#f0ebe3] p-4">
            <p className="font-semibold mb-1">Personal Fit Advice:</p>
            <p className="text-[#5f5e5e] leading-relaxed">
              If you fall between measurements, we recommend sizing up for structured jackets or choosing your standard size for fluid silk items. Our client concierge is also available 24/7 for bespoke fit consultations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
