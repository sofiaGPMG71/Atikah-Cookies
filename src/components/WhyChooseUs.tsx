import React from 'react';
import { useApp } from '../context/AppContext';
import { whyChooseUs } from '../data';
import { Sparkles, Heart, Award, Truck, Coins, Smile } from 'lucide-react';
import { motion } from 'motion/react';

// Icon Map helper to load appropriate lucide icon dynamically
const iconMap: Record<string, React.ComponentType<any>> = {
  Sparkles,
  Heart,
  Award,
  Truck,
  Coins,
  Smile,
};

export const WhyChooseUs: React.FC = () => {
  const { t } = useApp();

  return (
    <section
      id="why-choose-us"
      className="py-20 sm:py-28 bg-white relative overflow-hidden"
    >
      {/* Decorative vector background shapes */}
      <div className="absolute left-[5%] top-[10%] h-48 w-48 bg-cookie-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute right-[5%] bottom-[10%] h-48 w-48 bg-gold-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="font-sans font-bold text-xs sm:text-sm tracking-widest text-gold-600 uppercase block">
            {t('why.title')}
          </span>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-cookie-950 tracking-tight leading-tight">
            {t('why.subtitle')}
          </h2>
          <div className="h-1 w-20 bg-cookie-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Features Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          id="why-choose-us-grid"
        >
          {whyChooseUs.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Sparkles;
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                key={feature.id}
                className="bg-cookie-50/40 hover:bg-white p-8 rounded-3xl border border-cookie-100/60 hover:border-cookie-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center lg:items-start text-center lg:text-left cursor-pointer group"
              >
                {/* Animated Icon badge */}
                <div className="bg-cookie-100 text-cookie-600 p-4 rounded-2xl group-hover:bg-cookie-600 group-hover:text-white group-hover:rotate-12 transition-all duration-300 mb-6 shadow-sm">
                  <IconComponent className="h-6 w-6 stroke-[2]" />
                </div>

                <h3 className="font-serif font-bold text-lg sm:text-xl text-cookie-950 mb-3 group-hover:text-cookie-600 transition-colors">
                  {t(feature.titleKey)}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-cookie-600 leading-relaxed">
                  {t(feature.descriptionKey)}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
