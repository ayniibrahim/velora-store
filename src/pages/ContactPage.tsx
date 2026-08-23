import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Search, 
  ChevronDown, 
  Send, 
  ShieldCheck 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { showToast, lastOrder } = useShop();

  // Tab: 'inquiry' | 'booking' | 'tracking' | 'faq'
  const [activeTab, setActiveTab] = useState<'inquiry' | 'booking' | 'tracking' | 'faq'>('inquiry');

  // Inquiry Form state
  const [inquiryData, setInquiryData] = useState({
    fullName: '',
    email: '',
    subject: 'Bespoke Sizing Consultation',
    message: ''
  });
  const [inquirySent, setInquirySent] = useState(false);

  // Booking Form state
  const [bookingData, setBookingData] = useState({
    clientName: '',
    email: '',
    boutique: 'Milan Flagship — Via Montenapoleone',
    date: '2026-10-15',
    time: '14:00',
    guests: '1'
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Tracking Lookup state
  const [orderQuery, setOrderQuery] = useState(lastOrder?.orderId || '');
  const [trackingResult, setTrackingResult] = useState<{
    found: boolean;
    orderId: string;
    status: string;
    carrier: string;
    eta: string;
    location: string;
  } | null>(null);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    showToast('Inquiry Received', 'Our client concierge will respond within 4 hours.', 'info');
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    showToast('Appointment Reserved', 'Private boutique fitting confirmed.', 'info');
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    if (lastOrder && orderQuery.trim().toUpperCase() === lastOrder.orderId) {
      setTrackingResult({
        found: true,
        orderId: lastOrder.orderId,
        status: 'Dispatched from Milan Atelier',
        carrier: 'DHL VIP Express Insured',
        eta: 'In 2 business days',
        location: 'Hub Malpensa, Italy'
      });
    } else {
      setTrackingResult({
        found: true,
        orderId: orderQuery.toUpperCase(),
        status: 'In Transit — Customs Cleared',
        carrier: 'DHL Express Worldwide',
        eta: 'October 14, 2026 by 10:30 AM',
        location: 'Paris Logistics Center, France'
      });
    }
  };

  const faqs = [
    {
      q: 'How does Velora ensure ethical sericulture and natural fabric authenticity?',
      a: 'All our silk is 100% pure 22-Momme Mulberry grade, sourced exclusively from family-run cooperatives operating on ethical closed-loop water systems. Each item comes with an authenticity certificate from our Milan atelier.'
    },
    {
      q: 'What are your complimentary international delivery timelines?',
      a: 'We provide complimentary DHL Express Global shipping on all acquisitions over $500. Typical transit takes 2–4 business days to North America, Europe, and the Middle East.'
    },
    {
      q: 'Can I request bespoke sizing or private fitting appointments?',
      a: 'Yes, we welcome private client consultations at our salons in Milan, Paris, and New York. You may schedule a private session using the booking portal above or via concierge chat.'
    },
    {
      q: 'What is the Velora return and exchange guarantee?',
      a: 'We offer complimentary 30-day worldwide returns. Garments must be in pristine, unworn condition with original silk ribbon security tags intact in our keepsake box.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#715a44] font-semibold">
          Client Services
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1b1c1a] mt-2 mb-4">
          Concierge & Salons
        </h1>
        <p className="text-xs sm:text-sm text-[#5f5e5e] leading-relaxed">
          Our dedicated client advisors are at your service for private appointments, styling guidance, and order inquiries.
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {[
          { id: 'inquiry', label: 'Concierge Inquiry' },
          { id: 'booking', label: 'Boutique Fitting' },
          { id: 'tracking', label: 'Track An Order' },
          { id: 'faq', label: 'Client FAQ' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border ${
              activeTab === tab.id
                ? 'bg-[#1b1c1a] text-white border-[#1b1c1a]'
                : 'bg-white text-[#5f5e5e] border-[#d2c4ba] hover:text-[#1b1c1a]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Concierge Inquiry */}
      {activeTab === 'inquiry' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#f5f3ef] border border-[#d2c4ba] p-8 sm:p-12">
          {/* Salon Info */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-serif text-2xl text-[#1b1c1a] font-medium">
              Direct Atelier Access
            </h2>
            <p className="text-xs text-[#5f5e5e] leading-relaxed">
              Whether inquiring about custom tailoring adjustments, silk care, or private boutique appointments, our specialists respond promptly.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#d2c4ba] text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#715a44] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1b1c1a] block font-semibold">Milan Headquarters & Flagship</strong>
                  <span className="text-[#5f5e5e]">Via Montenapoleone 18, 20121 Milano, Italy</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#715a44] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1b1c1a] block font-semibold">Client Concierge Email</strong>
                  <span className="text-[#5f5e5e]">concierge@velora-atelier.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#715a44] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1b1c1a] block font-semibold">Private Advisory Line</strong>
                  <span className="text-[#5f5e5e]">+39 02 8945 2000 (Mon–Sat, 9am–8pm CET)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#d2c4ba]">
            {inquirySent ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#c4a78d]/20 text-[#715a44] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl text-[#1b1c1a]">Inquiry Dispatched</h3>
                <p className="text-xs text-[#5f5e5e] max-w-sm mx-auto">
                  Your message has been assigned to an atelier advisor. You will receive a bespoke reply at {inquiryData.email || 'your email'}.
                </p>
                <button
                  onClick={() => setInquirySent(false)}
                  className="luxury-btn-ghost px-6 py-2.5 text-xs font-semibold tracking-widest mt-4"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <h3 className="font-serif text-lg text-[#1b1c1a] font-medium border-b border-[#d2c4ba] pb-2">
                  Send a Message to the Concierge
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      value={inquiryData.fullName}
                      onChange={(e) => setInquiryData({ ...inquiryData, fullName: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-[#fbf9f5] border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                      placeholder="eleanor@example.com"
                      className="w-full bg-[#fbf9f5] border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                    Subject of Inquiry
                  </label>
                  <select
                    value={inquiryData.subject}
                    onChange={(e) => setInquiryData({ ...inquiryData, subject: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  >
                    <option value="Bespoke Sizing Consultation">Bespoke Sizing Consultation</option>
                    <option value="Garment Provenance & Fabric Care">Garment Provenance & Fabric Care</option>
                    <option value="Corporate / VIP Gifting">Corporate / VIP Gifting</option>
                    <option value="Press & Editorial Inquiries">Press & Editorial Inquiries</option>
                    <option value="Other Concierge Request">Other Concierge Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1b1c1a] uppercase tracking-wider mb-1">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                    placeholder="How may our atelier assist you today?"
                    className="w-full bg-[#fbf9f5] border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="luxury-btn-primary w-full py-3 text-xs font-semibold tracking-widest flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>DISPATCH CONCIERGE MESSAGE</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Boutique Fitting Booking */}
      {activeTab === 'booking' && (
        <div className="max-w-2xl mx-auto bg-[#f5f3ef] border border-[#d2c4ba] p-8 sm:p-12">
          {bookingConfirmed ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#c4a78d]/20 text-[#715a44] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-[#1b1c1a]">Private Fitting Reserved</h3>
              <p className="text-xs text-[#5f5e5e] max-w-md mx-auto">
                Your private appointment at <strong>{bookingData.boutique}</strong> on <strong>{bookingData.date}</strong> at <strong>{bookingData.time}</strong> has been saved. A salon host will welcome you with complimentary champagne and curated styling selections.
              </p>
              <button
                onClick={() => setBookingConfirmed(false)}
                className="luxury-btn-primary px-8 py-3 text-xs font-semibold tracking-widest mt-4"
              >
                Reserve Another Session
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl text-[#1b1c1a] font-medium">
                  Schedule Private Boutique Fitting
                </h3>
                <p className="text-xs text-[#5f5e5e] mt-1">
                  Enjoy an exclusive 1-on-1 session with a senior master tailor.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#1b1c1a] mb-1">Select Salon Location</label>
                <select
                  value={bookingData.boutique}
                  onChange={(e) => setBookingData({ ...bookingData, boutique: e.target.value })}
                  className="w-full bg-white border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a]"
                >
                  <option value="Milan Flagship — Via Montenapoleone">Milan Flagship — Via Montenapoleone 18</option>
                  <option value="Paris Atelier Salon — Rue Saint-Honoré">Paris Atelier Salon — Rue Saint-Honoré 24</option>
                  <option value="New York Private Suite — Madison Avenue">New York Private Suite — Madison Avenue 740</option>
                  <option value="London Mayfair Suite — Bond Street">London Mayfair Suite — Old Bond Street 12</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#1b1c1a] mb-1">Preferred Date</label>
                  <input
                    required
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                    className="w-full bg-white border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#1b1c1a] mb-1">Preferred Time</label>
                  <select
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                    className="w-full bg-white border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a]"
                  >
                    <option value="11:00">11:00 AM — Morning Salon</option>
                    <option value="14:00">2:00 PM — Afternoon Fitting</option>
                    <option value="16:30">4:30 PM — Twilight Aperitivo</option>
                    <option value="18:30">6:30 PM — Private After-Hours</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#1b1c1a] mb-1">Client Full Name</label>
                  <input
                    required
                    type="text"
                    value={bookingData.clientName}
                    onChange={(e) => setBookingData({ ...bookingData, clientName: e.target.value })}
                    placeholder="e.g. Lady Catherine"
                    className="w-full bg-white border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-[#1b1c1a] mb-1">Client Email</label>
                  <input
                    required
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                    placeholder="catherine@example.com"
                    className="w-full bg-white border border-[#d2c4ba] p-2.5 text-xs text-[#1b1c1a]"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full luxury-btn-primary py-3.5 text-xs font-semibold tracking-widest flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>CONFIRM BOUTIQUE APPOINTMENT</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Tab 3: Order Tracking Lookup */}
      {activeTab === 'tracking' && (
        <div className="max-w-xl mx-auto bg-[#f5f3ef] border border-[#d2c4ba] p-8 sm:p-10 space-y-6">
          <div className="text-center">
            <h3 className="font-serif text-2xl text-[#1b1c1a] font-medium">
              Track Your Acquisition
            </h3>
            <p className="text-xs text-[#5f5e5e] mt-1">
              Enter your Velora Order ID (e.g. {lastOrder?.orderId || 'VEL-89423'}) to view courier milestones.
            </p>
          </div>

          <form onSubmit={handleTrackOrder} className="flex gap-2">
            <input
              required
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="e.g. VEL-89423"
              className="flex-1 bg-white border border-[#d2c4ba] px-4 py-2.5 text-xs font-mono text-[#1b1c1a] focus:outline-none focus:border-[#1b1c1a]"
            />
            <button
              type="submit"
              className="luxury-btn-primary px-6 py-2.5 text-xs font-semibold tracking-widest flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>

          {trackingResult && (
            <div className="bg-white border border-[#d2c4ba] p-6 text-xs space-y-4 animate-in fade-in">
              <div className="flex justify-between items-center pb-3 border-b border-[#d2c4ba]">
                <div>
                  <span className="text-[10px] text-[#777] uppercase tracking-wider block">Reference</span>
                  <strong className="text-sm font-mono text-[#1b1c1a]">{trackingResult.orderId}</strong>
                </div>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 text-[11px] font-semibold">
                  {trackingResult.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[#5f5e5e]">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-[#1b1c1a]">Carrier</span>
                  <span>{trackingResult.carrier}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-[#1b1c1a]">Estimated Delivery</span>
                  <span>{trackingResult.eta}</span>
                </div>
                <div className="col-span-2">
                  <span className="block text-[10px] uppercase font-bold text-[#1b1c1a]">Current Waypoint</span>
                  <span>{trackingResult.location}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Client FAQ */}
      {activeTab === 'faq' && (
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-[#d2c4ba]">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex justify-between items-center text-xs sm:text-sm font-serif font-medium text-[#1b1c1a]"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#715a44] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-[#5f5e5e] leading-relaxed border-t border-[#f0ebe3]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
