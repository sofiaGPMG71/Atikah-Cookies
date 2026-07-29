import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, Award, Flame, Calendar, Check } from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  const { t } = useApp();

  const stats = [
    {
      icon: Users,
      val: t('about.stat1_val'),
      lbl: t('about.stat1_lbl'),
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
    {
      icon: Award,
      val: t('about.stat2_val'),
      lbl: t('about.stat2_lbl'),
      color: 'text-gold-600',
      bgColor: 'bg-gold-100',
    },
    {
      icon: Flame,
      val: t('about.stat3_val'),
      lbl: t('about.stat3_lbl'),
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      icon: Calendar,
      val: t('about.stat4_val'),
      lbl: t('about.stat4_lbl'),
      color: 'text-cookie-600',
      bgColor: 'bg-cookie-100',
    },
  ];

  const highlights = [
    'Premium Belgian Chocolates',
    'Pure Dairy Butter Only',
    'No Artificial Preservatives',
    'Baked to Order Daily',
  ];

  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-white overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Staggered Image Collage */}
          <div className="lg:col-span-5 relative" id="about-image-collage">
            {/* Background geometric blur accent */}
            <div className="absolute -left-12 -top-12 h-64 w-64 bg-gold-500/10 rounded-full blur-3xl" />
            
            <div className="relative grid grid-cols-12 gap-4">
              {/* Image 1: Flour & Baking Prep */}
              <div className="col-span-8">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-square cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600"
                    alt="Artisanal bakery prep ingredients flour"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=600';
                    }}
                  />
                </motion.div>
              </div>

              {/* Image 2: Golden freshly baked cookies directly on tray */}
              <div className="col-span-4 self-end">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl overflow-hidden shadow-lg border-4 border-white aspect-square cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1600431521340-491eca880813?auto=format&fit=crop&q=80&w=400"
                    alt="Fresh hot oatmeal cookie close-up"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1558961314-bc8a4d49ec2c?auto=format&fit=crop&q=80&w=400';
                    }}
                  />
                </motion.div>
              </div>

              {/* Image 3: Cookies served with coffee */}
              <div className="col-span-12">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-48 sm:h-56 cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800"
                    alt="Artisan cookie platter dessert table"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Float badge overlapping college */}
            <div className="absolute -bottom-6 right-4 sm:right-8 bg-cookie-950 text-white p-6 rounded-3xl shadow-2xl border border-white/10 max-w-xs text-left">
              <span className="font-serif italic text-gold-500 font-bold text-lg block">SofiaAtikah</span>
              <p className="text-xs text-cookie-100/80 font-sans mt-1 leading-relaxed">
                "Our philosophy is simple: never rush, never compromise, and always bake with pure love."
              </p>
            </div>
          </div>

          {/* Right Side: Narrative and Stats */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left" id="about-text-container">
            <div className="space-y-3">
              <span className="font-sans font-bold text-xs sm:text-sm tracking-widest text-gold-600 uppercase block">
                {t('about.title')}
              </span>
              <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-cookie-950 tracking-tight leading-tight">
                {t('about.subtitle')}
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-cookie-800 leading-relaxed font-sans max-w-2xl mx-auto lg:mx-0">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
            </div>

            {/* Quality Checklist Highlights */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0" id="about-highlights-grid">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 text-cookie-900 font-sans text-xs sm:text-sm font-semibold">
                  <div className="bg-gold-100 text-gold-600 rounded-full p-1 flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            <hr className="border-cookie-100 max-w-2xl mx-auto lg:mx-0" />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4" id="about-stats-grid">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-cookie-50/50 hover:bg-cookie-100/30 p-4 rounded-2xl border border-cookie-100/60 transition-all duration-300 flex flex-col items-center lg:items-start text-center lg:text-left shadow-sm hover:shadow-md"
                  >
                    <div className={`${stat.bgColor} ${stat.color} p-2.5 rounded-xl mb-3`}>
                      <StatIcon className="h-5 w-5 stroke-[2.5]" />
                    </div>
                    <span className="font-serif font-extrabold text-2xl sm:text-3xl text-cookie-950 block">
                      {stat.val}
                    </span>
                    <span className="font-sans text-[11px] sm:text-xs font-semibold text-cookie-600 tracking-wide mt-1 uppercase">
                      {stat.lbl}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
