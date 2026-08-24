import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PageRoute } from '../types';

export const Navbar: React.FC = () => {
  const {
    activeRoute,
    navigateTo,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    currency,
    setCurrency,
    user,
    logout
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; route: PageRoute; categorySlug?: string }[] = [
    { label: 'HOME', route: 'home' },
    { label: 'SHOP', route: 'shop' },
    { label: 'CATEGORIES', route: 'categories' },
    { label: 'COLLECTIONS', route: 'collections' },
    { label: 'JOURNAL', route: 'journal' },
    { label: 'ABOUT', route: 'about' },
    { label: 'CONTACT', route: 'contact' },
  ];

  const handleNavClick = (route: PageRoute, categorySlug?: string) => {
    navigateTo(route, { categorySlug });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Main Navbar */}
      <nav 
        className={`w-full transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-[#fbf9f5]/95 backdrop-blur-md border-[#d2c4ba]/50 shadow-xs py-3.5' 
            : 'bg-[#fbf9f5] border-[#d2c4ba]/30 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#1b1c1a] hover:text-[#c4a78d] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop Left Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.slice(0, 4).map((link) => {
              const isActive = activeRoute === link.route;
              return (
                <button
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  onClick={() => handleNavClick(link.route, link.categorySlug)}
                  className={`text-[12px] font-medium tracking-[0.18em] transition-all relative py-1 uppercase ${
                    isActive 
                      ? 'text-[#1b1c1a] font-semibold' 
                      : 'text-[#5f5e5e] hover:text-[#1b1c1a]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1b1c1a]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Center Brand Logo */}
          <div className="flex-1 lg:flex-initial text-center">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="group inline-flex flex-col items-center"
            >
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-[#1b1c1a] font-bold transition-colors uppercase">
                VELORA
              </span>
              <span className="text-[9px] tracking-[0.45em] text-[#715a44] uppercase -mt-0.5 font-sans font-medium">
                HAUTE ÉLÉGANCE
              </span>
            </button>
          </div>

          {/* Desktop Right Navigation Links */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.slice(4).map((link) => {
              const isActive = activeRoute === link.route;
              return (
                <button
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  onClick={() => handleNavClick(link.route, link.categorySlug)}
                  className={`text-[12px] font-medium tracking-[0.18em] transition-all relative py-1 uppercase ${
                    isActive 
                      ? 'text-[#1b1c1a] font-semibold' 
                      : 'text-[#5f5e5e] hover:text-[#1b1c1a]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#1b1c1a]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Currency Selector */}
            <div className="relative hidden md:block">
              <button
                id="currency-selector-btn"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-[11px] font-semibold tracking-wider text-[#5f5e5e] hover:text-[#1b1c1a] uppercase py-1"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {currencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-24 bg-white border border-[#d2c4ba] shadow-lg py-1 z-50 text-[11px]"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  {(['USD', 'EUR', 'GBP'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-[#f5f3ef] transition-colors ${
                        currency === curr ? 'font-bold text-[#1b1c1a]' : 'text-[#5f5e5e]'
                      }`}
                    >
                      {curr} {curr === 'USD' ? '($)' : curr === 'EUR' ? '(€)' : '(£)'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {!user ? (
              <button
                onClick={() => navigateTo('login')}
                className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#1b1c1a] hover:text-[#c4a78d] transition-colors"
              >
                Login
              </button>
            ) : (
              <>
                {user.role === 'admin' && (
                  <button
                    onClick={() => navigateTo('admin')}
                    className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#1b1c1a] hover:text-[#c4a78d] transition-colors"
                  >
                    Admin
                  </button>
                )}
                <button
                  onClick={logout}
                  className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#5f5e5e] hover:text-[#1b1c1a] transition-colors"
                >
                  Logout
                </button>
              </>
            )}

            {/* Search Icon */}
            <button
              id="header-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="text-[#1b1c1a] hover:text-[#c4a78d] transition-colors p-1"
              aria-label="Search collection"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              id="header-wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              className="text-[#1b1c1a] hover:text-[#c4a78d] transition-colors relative p-1"
              aria-label="View wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c4a78d] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="text-[#1b1c1a] hover:text-[#c4a78d] transition-colors relative p-1"
              aria-label="View shopping bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#1b1c1a] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#fbf9f5] h-full shadow-2xl z-10 flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-6 border-b border-[#d2c4ba]">
              <div>
                <span className="font-serif text-xl tracking-[0.2em] font-bold text-[#1b1c1a]">VELORA</span>
                <p className="text-[8px] tracking-[0.3em] text-[#715a44] uppercase">HAUTE ÉLÉGANCE</p>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#1b1c1a]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.route, link.categorySlug)}
                  className={`text-left text-base font-serif tracking-wider py-2 transition-colors flex items-center justify-between ${
                    activeRoute === link.route ? 'text-[#c4a78d] font-bold' : 'text-[#1b1c1a]'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeRoute === link.route && <span className="w-1.5 h-1.5 rounded-full bg-[#c4a78d]" />}
                </button>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-[#d2c4ba] space-y-4">
              <div className="flex items-center justify-between text-xs text-[#5f5e5e]">
                <span>Currency</span>
                <div className="flex gap-2 font-medium">
                  {(['USD', 'EUR', 'GBP'] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-2 py-1 ${currency === c ? 'bg-[#1b1c1a] text-white' : 'bg-[#ebe7e0] text-[#1b1c1a]'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-[#715a44] tracking-wide text-center pt-2">
                Questions? Inquire at concierge@velora.com
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
