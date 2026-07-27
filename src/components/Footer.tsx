import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Cookie, Phone, Mail, MapPin, ArrowUp, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Footer: React.FC = () => {
  const { t } = useApp();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll for Back to Top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer
        className="bg-cookie-950 text-white pt-16 pb-8 border-t border-cookie-900 overflow-hidden relative"
        id="app-footer"
      >
        {/* Soft background glow */}
        <div className="absolute right-0 bottom-0 h-96 w-96 bg-cookie-900/40 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 text-left pb-12 border-b border-cookie-900">
            
            {/* Branding Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-2 group cursor-pointer" onClick={() => handleScrollTo('home')}>
                <div className="bg-cookie-600 text-gold-100 p-2 rounded-full shadow-lg group-hover:rotate-12 transition-transform">
                  <Cookie className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-extrabold text-xl tracking-tight text-white leading-none">
                    SofiaAtikah
                  </span>
                  <span className="font-sans font-semibold text-xs tracking-widest text-gold-500 uppercase leading-none mt-1">
                    Cookies
                  </span>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-cookie-200/80 leading-relaxed max-w-sm">
                {t('footer.desc')}
              </p>

              {/* Social links row */}
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook Link"
                  className="p-2.5 rounded-xl bg-cookie-900 border border-cookie-800 text-cookie-200 hover:bg-cookie-600 hover:text-white transition-all shadow-sm"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram Link"
                  className="p-2.5 rounded-xl bg-cookie-900 border border-cookie-800 text-cookie-200 hover:bg-cookie-600 hover:text-white transition-all shadow-sm"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp Link"
                  className="p-2.5 rounded-xl bg-cookie-900 border border-cookie-800 text-cookie-200 hover:bg-cookie-600 hover:text-white transition-all shadow-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="lg:col-span-3 lg:pl-8 space-y-5">
              <h4 className="font-serif font-extrabold text-base tracking-wider text-gold-500">
                {t('footer.links')}
              </h4>
              <nav className="flex flex-col gap-3 font-sans text-xs sm:text-sm text-cookie-200/95 font-medium">
                <button onClick={() => handleScrollTo('home')} className="text-left hover:text-gold-500 transition-colors cursor-pointer w-fit">
                  {t('nav.home')}
                </button>
                <button onClick={() => handleScrollTo('about')} className="text-left hover:text-gold-500 transition-colors cursor-pointer w-fit">
                  {t('nav.about')}
                </button>
                <button onClick={() => handleScrollTo('products')} className="text-left hover:text-gold-500 transition-colors cursor-pointer w-fit">
                  {t('nav.products')}
                </button>
                <button onClick={() => handleScrollTo('why-choose-us')} className="text-left hover:text-gold-500 transition-colors cursor-pointer w-fit">
                  {t('nav.whyChooseUs')}
                </button>
                <button onClick={() => handleScrollTo('testimonials')} className="text-left hover:text-gold-500 transition-colors cursor-pointer w-fit">
                  {t('nav.testimonials')}
                </button>
                <button onClick={() => handleScrollTo('faq')} className="text-left hover:text-gold-500 transition-colors cursor-pointer w-fit">
                  {t('nav.faq')}
                </button>
              </nav>
            </div>

            {/* Direct contact column */}
            <div className="lg:col-span-5 space-y-5">
              <h4 className="font-serif font-extrabold text-base tracking-wider text-gold-500">
                {t('footer.contact')}
              </h4>
              <div className="space-y-4 font-sans text-xs sm:text-sm text-cookie-200/90 leading-normal">
                <div className="flex gap-3 items-start">
                  <MapPin className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                  <p>{t('contact.info_addr')}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <Phone className="h-5 w-5 text-gold-500 shrink-0" />
                  <p className="font-semibold">+6012-3456789 / +603-9876543</p>
                </div>
                <div className="flex gap-3 items-center">
                  <Mail className="h-5 w-5 text-gold-500 shrink-0" />
                  <p>hello@sofiagpmg-cookies.com</p>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[11px] sm:text-xs text-cookie-300/80 font-medium">
            <p>© {currentYear} SofiaAtikah Cookies. {t('footer.rights')}</p>
            <p>Designed with luxury bakery standards by SofiaGPMG.</p>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            onClick={handleBackToTop}
            className="fixed bottom-6 left-6 md:left-auto md:right-[26rem] lg:right-8 z-30 p-3.5 bg-cookie-600 hover:bg-cookie-700 text-white rounded-full shadow-2xl shadow-cookie-950/40 hover:scale-110 active:scale-95 transition-all cursor-pointer border border-cookie-500/20"
            aria-label="Back to top"
            id="back-to-top-btn"
          >
            <ArrowUp className="h-5 w-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};
