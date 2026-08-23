/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastContainer } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { AboutPage } from './pages/AboutPage';
import { JournalPage } from './pages/JournalPage';
import { ContactPage } from './pages/ContactPage';
import { PolicyPage } from './pages/PolicyPage';
import { AuthPage } from './pages/AuthPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const AppContent: React.FC = () => {
  const { activeRoute } = useShop();
  const [isAnnouncementVisible, setIsAnnouncementVisible] = React.useState(true);

  const renderCurrentPage = () => {
    switch (activeRoute) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'collections':
        return <CollectionsPage />;
      case 'about':
        return <AboutPage />;
      case 'journal':
        return <JournalPage />;
      case 'contact':
        return <ContactPage />;
      case 'shipping':
        return <PolicyPage type="shipping" />;
      case 'privacy':
        return <PolicyPage type="privacy" />;
      case 'terms':
        return <PolicyPage type="terms" />;
      case 'faq':
        return <ContactPage />;
      case 'login':
        return <AuthPage mode="login" />;
      case 'signup':
        return <AuthPage mode="signup" />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] flex flex-col font-sans selection:bg-[#c4a78d] selection:text-white">
      {/* Announcement Bar */}
      {isAnnouncementVisible && (
        <aside aria-label="Velora atelier privileges" className="bg-[#1b1c1a] text-white py-2 px-4 text-[11px] tracking-widest text-center border-b border-[#333] relative">
          <p className="max-w-4xl mx-auto flex items-center justify-center gap-2">
            <span>COMPLIMENTARY EXPRESS GLOBAL DELIVERY • 10% OFF YOUR FIRST ACQUISITION — VELORA10</span>
          </p>
          <button
            onClick={() => setIsAnnouncementVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-white text-xs px-2 py-0.5"
            aria-label="Dismiss announcement"
          >
            ✕
          </button>
        </aside>
      )}

      {/* Main Navigation Header */}
      <Navbar />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals, Drawers & Toast */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <QuickViewModal />
      <SizeGuideModal />
      <CheckoutModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
