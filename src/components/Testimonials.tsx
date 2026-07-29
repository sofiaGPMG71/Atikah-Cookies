import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { testimonials } from '../data';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Testimonials: React.FC = () => {
  const { t } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-28 bg-cookie-50/35 relative overflow-hidden"
    >
      {/* Decorative quotes background illustration */}
      <div className="absolute right-[10%] top-[8%] text-cookie-100 opacity-20 pointer-events-none -z-10">
        <Quote className="h-44 w-44 rotate-180" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-sans font-bold text-xs sm:text-sm tracking-widest text-gold-600 uppercase block">
            {t('testimonials.title')}
          </span>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-cookie-950 tracking-tight leading-tight">
            {t('testimonials.subtitle')}
          </h2>
          <div className="h-1 w-20 bg-cookie-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Carousel Slide Wrapper */}
        <div className="relative min-h-[380px] sm:min-h-[320px] flex items-center justify-center" id="testimonials-carousel-wrapper">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-cookie-100 shadow-xl flex flex-col md:flex-row items-center gap-8 w-full relative"
            >
              {/* Profile Image */}
              <div className="relative shrink-0" id="testimonial-image-container">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-gold-500 to-cookie-500 rounded-full blur opacity-40 animate-pulse" />
                <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden border-4 border-white relative z-10 shadow-md">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200';
                    }}
                  />
                </div>
                {/* Micro Quote Badge */}
                <div className="absolute -bottom-1 -right-1 bg-cookie-600 text-white p-2 rounded-full border-2 border-white shadow-md z-20">
                  <Quote className="h-4 w-4" />
                </div>
              </div>

              {/* Review Text */}
              <div className="flex-grow text-center md:text-left space-y-4">
                {/* Star Ratings */}
                <div className="flex items-center justify-center md:justify-start text-yellow-500">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                  ))}
                </div>

                {/* Review Paragraph */}
                <p className="font-sans text-sm sm:text-base text-cookie-800 leading-relaxed font-medium italic">
                  "{t(current.textKey)}"
                </p>

                {/* Author Info */}
                <div className="pt-2">
                  <h4 className="font-serif font-bold text-lg text-cookie-950">
                    {current.name}
                  </h4>
                  <p className="font-sans text-xs text-cookie-500 font-semibold uppercase mt-0.5 tracking-wider">
                    {t(current.roleKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation & Pagination Controls */}
        <div className="flex items-center justify-between mt-8" id="testimonials-controls">
          {/* Pagination Indicators Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex ? 'w-8 bg-cookie-600' : 'w-2.5 bg-cookie-200 hover:bg-cookie-350'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Nav arrows buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-cookie-200 bg-white hover:bg-cookie-600 hover:text-white text-cookie-800 shadow-sm transition-all cursor-pointer active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-cookie-200 bg-white hover:bg-cookie-600 hover:text-white text-cookie-800 shadow-sm transition-all cursor-pointer active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
