import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Products } from './components/Products';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartSidebar } from './components/CartSidebar';
import { ToastContainer } from './components/ToastContainer';

export default function App() {
  return (
    <AppProvider>
      <div className="relative min-h-screen bg-cookie-50 text-cookie-950 font-sans selection:bg-cookie-200 selection:text-cookie-950">
        
        {/* Navigation bar Header */}
        <Navbar />

        {/* Primary Page Layout Sections */}
        <main id="main-content">
          <Hero />
          <About />
          <Products />
          <WhyChooseUs />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>

        {/* Footer with Quick Links, Contact details, & Back to top button */}
        <Footer />

        {/* Interactive Shopping Cart Sidebar Drawer */}
        <CartSidebar />

        {/* Floating Stack Toast Notifications */}
        <ToastContainer />
        
      </div>
    </AppProvider>
  );
}
