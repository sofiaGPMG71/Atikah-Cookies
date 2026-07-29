import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ShoppingBag, ArrowRight, Heart, Cookie, Download } from 'lucide-react';
import { downloadCatalogPDF } from '../utils/downloadCatalog';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { t, language } = useApp();

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-0 overflow-hidden bg-gradient-to-b from-cookie-50 via-cookie-100/30 to-cookie-50"
    >
      {/* Abstract Background Decor from Geometric Balance */}
      <div className="absolute top-10 right-20 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-gold-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex-grow flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6" id="hero-text-container">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 bg-cookie-100 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-gold-500 mb-6 border border-cookie-200/40"
            >
              <span>{t('hero.badge')}</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-5xl sm:text-6xl xl:text-7xl leading-[1.05] text-cookie-950 font-extrabold tracking-tight"
              >
                Freshly Baked <br />
                <span className="italic font-light text-gold-500">Happiness</span> in Every Bite
                <span className="block font-sans font-medium text-lg sm:text-xl xl:text-2xl text-gold-600 mt-3 tracking-widest uppercase">
                  {t('hero.title')} {t('hero.company')}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-serif font-medium text-lg sm:text-xl text-cookie-800 italic"
              >
                "{t('hero.tagline')}"
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm sm:text-base text-cookie-800 leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans"
            >
              {t('hero.subheading')}
            </motion.p>

            {/* Buttons Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4"
              id="hero-cta-buttons"
            >
              {/* Shop Now Button */}
              <button
                onClick={() => handleScrollTo('products')}
                className="w-full sm:w-auto px-8 py-4 bg-cookie-600 text-white rounded-xl font-bold text-sm tracking-wider hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center group cursor-pointer"
              >
                <span>{t('btn.shopNow')}</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              {/* Download Menu Catalogue Button */}
              <button
                onClick={() => downloadCatalogPDF(language)}
                className="w-full sm:w-auto px-6 py-4 bg-gold-100 hover:bg-gold-200 border-2 border-gold-300 text-gold-900 rounded-xl font-bold text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                id="hero-download-menu-btn"
              >
                <Download className="w-4 h-4 text-gold-700" />
                <span>{t('btn.downloadCatalog')}</span>
              </button>
            </motion.div>
          </div>

          {/* Banner Image */}
          <div className="lg:col-span-5 flex justify-center relative" id="hero-image-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md sm:max-w-lg aspect-square"
            >
              {/* Outer decorative ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-cookie-200/60 animate-spin" style={{ animationDuration: '40s' }} />
              
              {/* Soft decorative blur backdrop */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-gold-500/20 to-cookie-500/10 rounded-full blur-2xl opacity-60" />

              {/* Main Cookie Portrait Container (Geometric Balance Style) */}
              <div className="relative w-full h-[450px] bg-cookie-200 rounded-[40px] overflow-hidden shadow-2xl group border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=1000"
                  alt="Premium Golden Chocolate Chip Cookies SofiaAtikah"
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1558961314-bc8a4d49ec2c?auto=format&fit=crop&q=80&w=1000';
                  }}
                />
                
                {/* Overlay card for a touch of elegance */}
                <div className="absolute bottom-8 right-8 bg-white p-5 rounded-2xl shadow-xl flex items-center space-x-4 border border-cookie-100 z-10">
                  <div className="text-right">
                    <div className="text-gold-500 font-bold text-lg">RM 15.90</div>
                    <div className="text-[10px] uppercase font-bold text-cookie-800 tracking-wider">Signature Dark Choc</div>
                  </div>
                  <div className="w-12 h-12 bg-cookie-600 rounded-xl flex items-center justify-center text-white shadow-md">
                    <Cookie className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* Mini Badge floating element */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 bg-white shadow-xl rounded-2xl p-3 sm:p-4 border border-cookie-100 flex items-center gap-3 z-20"
              >
                <div className="bg-gold-100 text-gold-600 p-2 rounded-xl">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] sm:text-xs text-cookie-500 font-semibold tracking-wider uppercase leading-none">Rating</p>
                  <p className="text-sm sm:text-base font-serif font-bold text-cookie-950 leading-none mt-1">4.9 ★ (1.5k+)</p>
                </div>
              </motion.div>

              {/* Floating cookie badge at the bottom-left */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white shadow-xl rounded-2xl p-3 sm:p-4 border border-cookie-100 flex items-center gap-3 z-20"
              >
                <div className="bg-cookie-100 text-cookie-600 p-2 rounded-xl">
                  <Cookie className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] sm:text-xs text-cookie-500 font-semibold tracking-wider uppercase leading-none">Freshness</p>
                  <p className="text-sm sm:text-base font-serif font-bold text-cookie-950 leading-none mt-1">100% Baked Daily</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Feature Bar from Geometric Balance */}
      <div className="bg-white border-t border-cookie-200 py-8 px-6 sm:px-12 w-full z-15 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center text-gold-500 shrink-0 shadow-sm">
              <svg className="w-6 h-6 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-tight text-cookie-950">100% Premium</h4>
              <p className="text-[11px] text-cookie-800">Finest Belgian Chocolate</p>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center text-gold-500 shrink-0 shadow-sm">
              <svg className="w-6 h-6 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-tight text-cookie-950">Daily Fresh</h4>
              <p className="text-[11px] text-cookie-800">Baked Every Morning</p>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center text-gold-500 shrink-0 shadow-sm">
              <svg className="w-6 h-6 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-tight text-cookie-950">1k+ Reviews</h4>
              <p className="text-[11px] text-cookie-800">5-Star Customer Rating</p>
            </div>
          </div>
          
          {/* Feature 4 */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center text-gold-500 shrink-0 shadow-sm">
              <svg className="w-6 h-6 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-tight text-cookie-950">Same Day</h4>
              <p className="text-[11px] text-cookie-800">Express Klang Valley Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
