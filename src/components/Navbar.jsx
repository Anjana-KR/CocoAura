import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Droplets } from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  onOpenCart 
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'About', href: '#journey' },
    { label: 'Rituals', href: '#transformation' },
    { label: 'Hair Quiz', href: '#quiz' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#091410]/90 backdrop-blur-md py-3.5 border-b border-gold-500/20 shadow-2xl' 
        : 'bg-gradient-to-b from-[#091410]/90 via-[#091410]/50 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400/25 to-botanical-dark flex items-center justify-center border border-gold-400/40 group-hover:border-gold-300 transition-colors shadow-glow-gold">
            <span className="text-gold-300 font-serif text-base font-bold">C</span>
            <Droplets className="w-3 h-3 text-gold-300 absolute -bottom-0.5 -right-0.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display tracking-[0.24em] text-lg sm:text-xl font-bold gold-gradient-text leading-none">
              COCO AURA
            </span>
            <span className="text-[8px] uppercase tracking-[0.3em] text-stone-400 font-medium mt-0.5">
              Kerala Botanicals
            </span>
          </div>
        </a>

        {/* Clean Center Navigation */}
        <nav className="hidden md:flex items-center gap-9 text-xs uppercase tracking-[0.18em] font-medium text-stone-200">
          {navLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="hover:text-gold-300 transition-colors relative py-1 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right: Clean Luxury Bag Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="relative p-2.5 rounded-full text-stone-200 hover:text-gold-300 hover:bg-white/5 transition-all flex items-center justify-center group"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#d4af37] text-[#091410] text-[10px] font-bold flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg text-stone-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#091410]/95 backdrop-blur-xl border-b border-gold-500/20 px-8 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-200 hover:text-gold-300 py-2 text-sm uppercase tracking-widest font-serif border-b border-white/5"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
