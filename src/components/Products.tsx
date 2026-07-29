import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { products } from '../products';
import { Star, ShoppingBag, Check, Sparkles, Download } from 'lucide-react';
import { downloadCatalogPDF } from '../utils/downloadCatalog';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

export const Products: React.FC = () => {
  const { t, addToCart, language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addingId, setAddingId] = useState<string | null>(null);

  const categories = [
    { id: 'all', labelKey: 'products.filter_all' },
    { id: 'signature', labelKey: 'products.filter_signature' },
    { id: 'classic', labelKey: 'products.filter_classic' },
    { id: 'crunchy', labelKey: 'products.filter_crunchy' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    setAddingId(product.id);
    addToCart(product);
    setTimeout(() => {
      setAddingId(null);
    }, 1200);
  };

  return (
    <section
      id="products"
      className="py-20 sm:py-28 bg-cookie-50/40 relative overflow-hidden"
    >
      {/* Decorative backdrop elements */}
      <div className="absolute right-0 top-1/4 h-80 w-80 bg-cookie-100 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute left-0 bottom-1/4 h-80 w-80 bg-gold-100 rounded-full blur-3xl opacity-50 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
          <span className="font-sans font-bold text-xs sm:text-sm tracking-widest text-gold-600 uppercase block">
            {t('products.title')}
          </span>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-cookie-950 tracking-tight leading-tight">
            {t('products.subtitle')}
          </h2>
          <div className="h-1 w-20 bg-cookie-500 mx-auto rounded-full mt-4" />

          <div className="pt-2">
            <button
              onClick={() => downloadCatalogPDF(language)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-100 hover:bg-gold-200 text-gold-900 border border-gold-300 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
              id="products-download-catalog-btn"
            >
              <Download className="w-4 h-4 text-gold-700" />
              <span>{t('btn.downloadCatalog')}</span>
            </button>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12" id="product-category-filters">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-cookie-600 text-white shadow-md shadow-cookie-600/20'
                    : 'bg-white hover:bg-cookie-100 border border-cookie-200/60 text-cookie-800'
                }`}
              >
                {t(cat.labelKey)}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          id="products-display-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isAdding = addingId === product.id;
              const hasBestSeller = product.isBestSeller;
              const hasNewTag = product.tags.includes('new');

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={product.id}
                  className="bg-white rounded-3xl overflow-hidden border border-cookie-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full cursor-pointer"
                >
                  {/* Image Container with Badge */}
                  <div className="relative overflow-hidden aspect-square shrink-0 bg-cookie-50">
                    <img
                      src={product.image}
                      alt={t(product.nameKey)}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                    
                    {/* Dark gradient vignette on overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Left floating badge overlays */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                      {hasBestSeller && (
                        <div className="bg-cookie-950 text-gold-100 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 shadow-md">
                          <Sparkles className="h-3 w-3 text-gold-500 fill-current animate-pulse" />
                          <span>{t('products.bestseller')}</span>
                        </div>
                      )}
                      {hasNewTag && (
                        <div className="bg-gold-500 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-md">
                          {t('products.new')}
                        </div>
                      )}
                    </div>

                    {/* Smooth visual category overlay label */}
                    <div className="absolute bottom-3 right-3 glass px-3 py-1 rounded-full shadow-sm text-[10px] font-bold text-cookie-800 tracking-wider uppercase">
                      {t(`products.filter_${product.category}`)}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-5 flex-grow flex flex-col justify-between text-left">
                    <div className="space-y-2">
                      {/* Rating details */}
                      <div className="flex items-center gap-1">
                        <div className="flex items-center text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 fill-current ${
                                i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-sans font-bold text-xs text-cookie-950 ml-1">{product.rating}</span>
                        <span className="font-sans text-[10px] text-cookie-400">({product.reviewsCount})</span>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-serif font-bold text-base sm:text-lg text-cookie-950 group-hover:text-cookie-600 transition-colors leading-snug">
                        {t(product.nameKey)}
                      </h3>

                      {/* Short Description */}
                      <p className="font-sans text-xs text-cookie-600/90 leading-relaxed line-clamp-2 h-8">
                        {t(product.descriptionKey)}
                      </p>
                    </div>

                    {/* Price and Add action */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-cookie-100">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-cookie-400 font-semibold tracking-wider uppercase">Price</span>
                        <span className="font-sans font-extrabold text-base sm:text-lg text-cookie-950">
                          RM {product.price.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        disabled={isAdding}
                        className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                          isAdding
                            ? 'bg-green-600 text-white shadow-md shadow-green-600/20 scale-105'
                            : 'bg-cookie-100 text-cookie-900 hover:bg-cookie-600 hover:text-white shadow-sm hover:scale-105 active:scale-95'
                        }`}
                        aria-label={`Add ${t(product.nameKey)} to cart`}
                      >
                        {isAdding ? (
                          <Check className="h-4 w-4 stroke-[3]" />
                        ) : (
                          <ShoppingBag className="h-4 w-4 stroke-[2.5]" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
