import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Cookie, ShoppingCart, Languages, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    cart,
    setIsCartOpen,
    t,
    activeSection,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  // Monitor scrolling to apply background effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { id: 'home', labelKey: 'nav.home' },
    { id: 'about', labelKey: 'nav.about' },
    { id: 'products', labelKey: 'nav.products' },
    { id: 'why-choose-us', labelKey: 'nav.whyChooseUs' },
    { id: 'testimonials', labelKey: 'nav.testimonials' },
    { id: 'faq', labelKey: 'nav.faq' },
    { id: 'contact', labelKey: 'nav.contact' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-md py-3'
            : 'bg-transparent py-5'
        }`}
        id="app-navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('home');
              }}
              className="flex items-center gap-2 group"
              id="navbar-logo"
            >
              <div className="bg-cookie-600 text-gold-100 p-2 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                <Cookie className="h-6 w-6 animate-float-fast" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl tracking-tight text-cookie-900 leading-none group-hover:text-cookie-600 transition-colors">
                  SofiaAtikah
                </span>
                <span className="font-sans font-semibold text-xs tracking-widest text-gold-600 uppercase leading-none mt-1">
                  Cookies
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" id="desktop-nav">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative px-3 py-2 font-sans text-sm font-medium tracking-wide transition-colors cursor-pointer rounded-full ${
                      isActive ? 'text-cookie-900' : 'text-cookie-600/90 hover:text-cookie-900'
                    }`}
                  >
                    <span>{t(link.labelKey)}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-cookie-600 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Utility buttons */}
            <div className="flex items-center gap-3" id="navbar-actions">
              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cookie-200 bg-white/70 hover:bg-cookie-100/50 hover:border-cookie-500 text-cookie-900 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer"
                  aria-label="Select Language"
                  id="lang-select-btn"
                >
                  <Languages className="h-4 w-4 text-cookie-600" />
                  <span className="uppercase">{language}</span>
                  <ChevronDown className={`h-3.5 w-3.5 text-cookie-500 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <>
                      {/* Invisible backdrop to close the dropdown */}
                      <div className="fixed inset-0 z-45" onClick={() => setIsLangDropdownOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-40 rounded-2xl bg-white shadow-xl border border-cookie-100/80 p-1.5 z-50 overflow-hidden"
                      >
                        <button
                          onClick={() => selectLanguage('en')}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                            language === 'en'
                              ? 'bg-cookie-100 text-cookie-900'
                              : 'text-cookie-700 hover:bg-cookie-50'
                          }`}
                        >
                          <span>English</span>
                          {language === 'en' && <span className="h-1.5 w-1.5 bg-cookie-600 rounded-full" />}
                        </button>
                        <button
                          onClick={() => selectLanguage('ms')}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                            language === 'ms'
                              ? 'bg-cookie-100 text-cookie-900'
                              : 'text-cookie-700 hover:bg-cookie-50'
                          }`}
                        >
                          <span>Bahasa Melayu</span>
                          {language === 'ms' && <span className="h-1.5 w-1.5 bg-cookie-600 rounded-full" />}
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Shopping Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full border border-cookie-200 bg-white/70 hover:bg-cookie-600 hover:text-white hover:border-cookie-600 text-cookie-900 transition-all duration-300 cursor-pointer shadow-sm group"
                aria-label="Shopping Cart"
                id="cart-toggle-btn"
              >
                <ShoppingCart className="h-5 w-5" />
                <AnimatePresence>
                  {totalCartItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-gold-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm"
                    >
                      {totalCartItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full border border-cookie-200 bg-white/70 hover:bg-cookie-100 text-cookie-900 cursor-pointer"
                aria-label="Toggle mobile menu"
                id="mobile-menu-btn"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-cookie-100 bg-white shadow-lg overflow-hidden"
              id="mobile-nav-panel"
            >
              <div className="px-4 pt-3 pb-6 space-y-1.5">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-sans text-sm font-semibold tracking-wide transition-all ${
                        isActive
                          ? 'bg-cookie-600 text-white shadow-sm'
                          : 'text-cookie-800 hover:bg-cookie-50'
                      }`}
                    >
                      {t(link.labelKey)}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
