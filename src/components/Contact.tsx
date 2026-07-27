import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, MessageCircle, Map } from 'lucide-react';
import { motion } from 'motion/react';

export const Contact: React.FC = () => {
  const { t, addToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear individual field errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      addToast(t('toast.contactSuccess'), 'success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1500);
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook', hoverColor: 'hover:bg-blue-600 hover:border-blue-600' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', hoverColor: 'hover:bg-pink-600 hover:border-pink-600' },
    { icon: MessageCircle, href: 'https://whatsapp.com', label: 'WhatsApp', hoverColor: 'hover:bg-green-600 hover:border-green-600' },
  ];

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-cookie-50/40 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="font-sans font-bold text-xs sm:text-sm tracking-widest text-gold-600 uppercase block">
            {t('contact.title')}
          </span>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-cookie-950 tracking-tight leading-tight">
            {t('contact.subtitle')}
          </h2>
          <div className="h-1 w-20 bg-cookie-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Details & Map Placeholder */}
          <div className="lg:col-span-5 space-y-8" id="contact-info-container">
            
            {/* Store Contact details card */}
            <div className="bg-white p-8 rounded-[2rem] border border-cookie-100 shadow-xl space-y-6 text-left">
              <h3 className="font-serif font-extrabold text-xl text-cookie-950">
                {t('contact.info_title')}
              </h3>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex gap-4 items-start text-sans">
                  <div className="bg-cookie-100 text-cookie-600 p-2.5 rounded-xl shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-cookie-950">Our Bakery</h4>
                    <p className="text-xs sm:text-sm text-cookie-700 leading-relaxed mt-1">
                      {t('contact.info_addr')}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4 items-start text-sans">
                  <div className="bg-cookie-100 text-cookie-600 p-2.5 rounded-xl shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-cookie-950">{t('contact.info_hours_title')}</h4>
                    <p className="text-xs sm:text-sm text-cookie-700 leading-relaxed mt-1">
                      {t('contact.info_hours')}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 items-start text-sans">
                  <div className="bg-cookie-100 text-cookie-600 p-2.5 rounded-xl shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-cookie-950">Phone Helpline</h4>
                    <p className="text-xs sm:text-sm text-cookie-700 leading-relaxed mt-1 font-semibold">
                      +6012-3456789 / +603-9876543
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start text-sans">
                  <div className="bg-cookie-100 text-cookie-600 p-2.5 rounded-xl shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-cookie-950">Order Email</h4>
                    <p className="text-xs sm:text-sm text-cookie-700 leading-relaxed mt-1">
                      hello@sofiagpmg-cookies.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="pt-4 border-t border-cookie-100 flex items-center justify-between">
                <span className="font-sans font-bold text-xs text-cookie-500 uppercase tracking-widest">Follow us</span>
                <div className="flex items-center gap-2">
                  {socialLinks.map((soc, index) => {
                    const SocIcon = soc.icon;
                    return (
                      <a
                        key={index}
                        href={soc.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={soc.label}
                        className={`p-2.5 rounded-full border border-cookie-200 bg-white text-cookie-800 transition-all duration-300 shadow-sm ${soc.hoverColor} hover:text-white hover:scale-110`}
                      >
                        <SocIcon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Custom Location Map Illustration Card */}
            <div className="bg-white rounded-[2rem] border border-cookie-100 shadow-xl overflow-hidden p-3 relative h-64 flex items-center justify-center text-center group cursor-pointer">
              {/* Soft grid background */}
              <div className="absolute inset-0 bg-cookie-50/70" />
              <div className="absolute inset-0 border-4 border-white rounded-[1.7rem] z-10" />

              {/* Styled map graphic vectors */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute left-0 right-0 top-1/3 h-4 bg-cookie-500/40 transform rotate-12" />
                <div className="absolute left-1/4 right-1/4 top-0 bottom-0 w-4 bg-cookie-500/40 transform -rotate-45" />
                <div className="absolute left-1/2 right-0 top-0 bottom-0 w-4 bg-cookie-500/40 transform rotate-6" />
                <div className="absolute left-10 right-10 top-2/3 h-4 bg-cookie-500/40 transform -rotate-12" />
              </div>

              <div className="relative z-10 p-6 flex flex-col items-center max-w-sm">
                <div className="bg-cookie-600 text-gold-100 p-4 rounded-full shadow-lg mb-4 animate-float group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-6 w-6 stroke-[2.5]" />
                </div>
                <h4 className="font-serif font-extrabold text-base text-cookie-950 mb-1">
                  Bukit Bintang, KL
                </h4>
                <p className="font-sans text-[11px] sm:text-xs text-cookie-600 leading-relaxed mb-3">
                  {t('contact.info_addr')}
                </p>
                <div className="glass px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm group-hover:bg-cookie-100 transition-all">
                  <Map className="h-3.5 w-3.5 text-cookie-600" />
                  <span className="font-sans font-bold text-[10px] text-cookie-950 tracking-wider uppercase">Open Google Maps</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[2.5rem] border border-cookie-100 shadow-xl" id="contact-form-container">
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="font-sans font-bold text-xs text-cookie-800 uppercase tracking-widest block">
                    {t('contact.form_name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('contact.form_ph_name')}
                    className={`w-full px-5 py-3.5 rounded-2xl border bg-cookie-50/50 focus:bg-white text-cookie-950 text-xs sm:text-sm font-sans font-medium placeholder-cookie-300 focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-cookie-100 focus:border-cookie-500 focus:ring-cookie-100'
                    }`}
                  />
                  {errors.name && (
                    <span className="font-sans text-[11px] font-bold text-red-500 block">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="font-sans font-bold text-xs text-cookie-800 uppercase tracking-widest block">
                    {t('contact.form_email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('contact.form_ph_email')}
                    className={`w-full px-5 py-3.5 rounded-2xl border bg-cookie-50/50 focus:bg-white text-cookie-950 text-xs sm:text-sm font-sans font-medium placeholder-cookie-300 focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-cookie-100 focus:border-cookie-500 focus:ring-cookie-100'
                    }`}
                  />
                  {errors.email && (
                    <span className="font-sans text-[11px] font-bold text-red-500 block">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="font-sans font-bold text-xs text-cookie-800 uppercase tracking-widest block">
                  {t('contact.form_phone')}
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t('contact.form_ph_phone')}
                  className={`w-full px-5 py-3.5 rounded-2xl border bg-cookie-50/50 focus:bg-white text-cookie-950 text-xs sm:text-sm font-sans font-medium placeholder-cookie-300 focus:outline-none focus:ring-2 transition-all ${
                    errors.phone
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-cookie-100 focus:border-cookie-500 focus:ring-cookie-100'
                  }`}
                />
                {errors.phone && (
                  <span className="font-sans text-[11px] font-bold text-red-500 block">{errors.phone}</span>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="font-sans font-bold text-xs text-cookie-800 uppercase tracking-widest block">
                  {t('contact.form_msg')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('contact.form_ph_msg')}
                  className={`w-full px-5 py-3.5 rounded-2xl border bg-cookie-50/50 focus:bg-white text-cookie-950 text-xs sm:text-sm font-sans font-medium placeholder-cookie-300 h-36 focus:outline-none focus:ring-2 transition-all ${
                    errors.message
                      ? 'border-red-500 focus:ring-red-200'
                      : 'border-cookie-100 focus:border-cookie-500 focus:ring-cookie-100'
                  }`}
                />
                {errors.message && (
                  <span className="font-sans text-[11px] font-bold text-red-500 block">{errors.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto relative group flex items-center justify-center gap-2 px-8 py-4 bg-cookie-600 text-white font-sans font-semibold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl hover:bg-cookie-700 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden disabled:opacity-75 disabled:cursor-not-allowed"
                id="contact-form-submit-btn"
              >
                <Send className="h-4.5 w-4.5 text-gold-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <span>{isSubmitting ? t('btn.submitting') : t('btn.submit')}</span>
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
