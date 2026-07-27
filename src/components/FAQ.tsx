import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { faqs } from '../data';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FAQ: React.FC = () => {
  const { t } = useApp();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 bg-white relative overflow-hidden"
    >
      {/* Decorative vectors */}
      <div className="absolute right-0 bottom-0 h-64 w-64 bg-cookie-50 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-sans font-bold text-xs sm:text-sm tracking-widest text-gold-600 uppercase block">
            {t('faq.title')}
          </span>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-cookie-950 tracking-tight leading-tight">
            {t('faq.subtitle')}
          </h2>
          <div className="h-1 w-20 bg-cookie-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Accordions Container */}
        <div className="space-y-4 max-w-3xl mx-auto" id="faqs-accordion-container">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-cookie-500 bg-cookie-50/30 shadow-md'
                    : 'border-cookie-100 hover:border-cookie-300 bg-white hover:shadow-sm'
                }`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left font-sans cursor-pointer group"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  id={`faq-btn-${faq.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl transition-colors shrink-0 ${isOpen ? 'bg-cookie-600 text-white' : 'bg-cookie-100 text-cookie-600'}`}>
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <span className="font-serif font-bold text-sm sm:text-base text-cookie-950 group-hover:text-cookie-600 transition-colors">
                      {t(faq.questionKey)}
                    </span>
                  </div>

                  <span className={`p-1.5 rounded-full border transition-all duration-300 shrink-0 ${isOpen ? 'bg-cookie-600 text-white border-cookie-600 rotate-180' : 'bg-white border-cookie-200 text-cookie-500'}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-2 pl-16 text-xs sm:text-sm text-cookie-700/90 leading-relaxed font-sans border-t border-cookie-100/50">
                        {t(faq.answerKey)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
