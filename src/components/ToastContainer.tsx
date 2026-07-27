import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div
      className="fixed bottom-6 right-6 z-55 flex flex-col gap-3 w-full max-w-sm pointer-events-none"
      id="toast-notification-root"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === 'success';
          const isInfo = toast.type === 'info';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', damping: 20, stiffness: 220 }}
              className={`p-4 rounded-2xl shadow-xl border flex items-start gap-3.5 pointer-events-auto text-left relative overflow-hidden bg-white/95 backdrop-blur-md ${
                isSuccess
                  ? 'border-green-100 shadow-green-900/5'
                  : isInfo
                  ? 'border-blue-100 shadow-blue-900/5'
                  : 'border-red-100 shadow-red-900/5'
              }`}
            >
              {/* Colored Side Bar indicator */}
              <div
                className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                  isSuccess ? 'bg-green-500' : isInfo ? 'bg-blue-500' : 'bg-red-500'
                }`}
              />

              {/* Icon */}
              <div
                className={`p-1.5 rounded-xl shrink-0 ${
                  isSuccess
                    ? 'bg-green-50 text-green-600'
                    : isInfo
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-red-50 text-red-600'
                }`}
              >
                {isSuccess ? (
                  <CheckCircle className="h-5 w-5 stroke-[2.5]" />
                ) : isInfo ? (
                  <Info className="h-5 w-5 stroke-[2.5]" />
                ) : (
                  <AlertCircle className="h-5 w-5 stroke-[2.5]" />
                )}
              </div>

              {/* Message text */}
              <div className="flex-grow pr-4">
                <p className="font-sans font-bold text-xs text-cookie-500 uppercase tracking-widest leading-none">
                  {isSuccess ? 'Success' : isInfo ? 'System Info' : 'Alert'}
                </p>
                <p className="font-sans text-xs sm:text-sm text-cookie-950 font-semibold mt-1 leading-snug">
                  {toast.message}
                </p>
              </div>

              {/* Dismiss Button */}
              <button
                onClick={() => removeToast(toast.id)}
                className="text-cookie-300 hover:text-cookie-950 p-1 rounded-lg hover:bg-cookie-100/30 transition-colors cursor-pointer shrink-0"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
