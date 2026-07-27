import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Plus, Minus, Trash2, CreditCard, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartSidebar: React.FC = () => {
  const {
    language,
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    t,
    addToast,
  } = useApp();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 40 || subtotal === 0 ? 0 : 8.00; // FREE shipping above RM40
  const totalAmount = subtotal + deliveryFee;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate payment gateway checkout loading
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsCartOpen(false);
      addToast(t('toast.checkoutSuccess'), 'success');
      // Clear cart
      clearCart();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-cookie-950 z-50 cursor-pointer"
            id="cart-sidebar-backdrop"
          />

          {/* Cart Panel Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-cookie-100"
            id="cart-sidebar-panel"
          >
            {/* Header */}
            <div className="p-6 border-b border-cookie-100 flex items-center justify-between text-left shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="bg-cookie-600 text-gold-100 p-2 rounded-xl">
                  <Cookie className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif font-extrabold text-lg text-cookie-950">
                    {t('cart.title')}
                  </h3>
                  <p className="font-sans text-[11px] font-bold text-cookie-500 uppercase tracking-widest mt-0.5">
                    {t('cart.item_count', { count: cart.length })}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-cookie-100 border border-transparent hover:border-cookie-200 text-cookie-800 transition-colors cursor-pointer"
                aria-label="Close cart basket"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4" id="cart-sidebar-items-list">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="bg-cookie-100 text-cookie-300 p-6 rounded-full">
                    <Cookie className="h-12 w-12 animate-float-slow" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-cookie-950">Your Basket is Empty</h4>
                  <p className="font-sans text-xs sm:text-sm text-cookie-600 max-w-xs leading-relaxed">
                    {t('cart.empty')}
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 bg-cookie-600 text-white font-sans text-xs sm:text-sm font-semibold rounded-full hover:bg-cookie-700 transition-colors cursor-pointer"
                  >
                    {t('btn.shopNow')}
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 rounded-2xl border border-cookie-100 bg-cookie-50/30 hover:bg-white hover:border-cookie-200 transition-all text-left group"
                  >
                    {/* Cookie Image thumbnail */}
                    <div className="h-20 w-20 rounded-xl overflow-hidden bg-cookie-50 shrink-0 border border-cookie-100">
                      <img
                        src={item.product.image}
                        alt={t(item.product.nameKey)}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Quantity edits & detail */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif font-bold text-sm text-cookie-950 group-hover:text-cookie-600 transition-colors line-clamp-1">
                            {t(item.product.nameKey)}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-cookie-300 hover:text-red-500 p-1 rounded-md transition-colors cursor-pointer"
                            aria-label={`Remove ${t(item.product.nameKey)} from basket`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="font-sans text-[11px] text-cookie-400">
                          RM {item.product.price.toFixed(2)} / unit
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Qty edit buttons */}
                        <div className="flex items-center border border-cookie-200 bg-white rounded-full p-1 shadow-sm">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-cookie-600 hover:bg-cookie-100 rounded-full transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="font-sans font-bold text-xs text-cookie-950 px-3 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-cookie-600 hover:bg-cookie-100 rounded-full transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Combined price tag */}
                        <span className="font-sans font-extrabold text-sm text-cookie-950">
                          RM {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sticky Order Summary and Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-cookie-100 bg-cookie-50/50 shrink-0 text-left space-y-4" id="cart-sidebar-summary-footer">
                <div className="space-y-2.5">
                  <h4 className="font-serif font-bold text-sm text-cookie-950 uppercase tracking-wide">
                    {t('cart.summary')}
                  </h4>

                  {/* Subtotal */}
                  <div className="flex items-center justify-between text-xs sm:text-sm font-sans text-cookie-700">
                    <span>{t('cart.subtotal')}</span>
                    <span className="font-semibold text-cookie-900">RM {subtotal.toFixed(2)}</span>
                  </div>

                  {/* Shipping Fee */}
                  <div className="flex items-center justify-between text-xs sm:text-sm font-sans text-cookie-700">
                    <span>{t('cart.delivery')}</span>
                    {deliveryFee === 0 ? (
                      <span className="font-bold text-green-600 text-[11px] sm:text-xs bg-green-50 px-2 py-0.5 rounded-full border border-green-200 uppercase tracking-wider">
                        {t('cart.free_delivery')}
                      </span>
                    ) : (
                      <span className="font-semibold text-cookie-900">RM {deliveryFee.toFixed(2)}</span>
                    )}
                  </div>

                  {/* FREE delivery progress bar alert if less than RM40 */}
                  {subtotal < 40 && (
                    <div className="bg-amber-50 border border-amber-100 p-2.5 rounded-xl text-[10px] text-amber-800 leading-normal">
                      Add <span className="font-bold">RM {(40 - subtotal).toFixed(2)}</span> more to unlock <span className="font-bold">FREE delivery</span>!
                    </div>
                  )}

                  <hr className="border-cookie-100" />

                  {/* Total Amount */}
                  <div className="flex items-center justify-between font-serif font-extrabold text-base sm:text-lg text-cookie-950">
                    <span>{t('cart.total')}</span>
                    <span>RM {totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout & Clear Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full relative group flex items-center justify-center gap-2 py-3.5 bg-cookie-600 hover:bg-cookie-700 text-white font-sans font-bold text-sm rounded-2xl shadow-md active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    <CreditCard className="h-4.5 w-4.5 text-gold-100" />
                    <span>{isCheckingOut ? t('btn.submitting') : t('btn.checkout')}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to clear your cookie basket?')) {
                        clearCart();
                      }
                    }}
                    className="w-full text-center py-2.5 text-cookie-400 hover:text-red-500 font-sans text-xs font-semibold hover:bg-cookie-100/30 rounded-xl transition-all cursor-pointer"
                  >
                    {t('btn.clearCart')}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
