import React, { useState } from 'react';
import { ChevronDown, Droplets, Send, Heart, ShieldCheck, Sparkles, Leaf } from 'lucide-react';

export default function Footer() {
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const faqs = [
    {
      q: "What makes Coco Aura different from grocery store coconut oil?",
      a: "Commercial coconut oil is made from dried copra, heavily boiled at 200°C, and bleached with chemicals. Coco Aura uses 100% fresh Kerala coconuts cold-pressed under 38°C within 4 hours of harvest, preserving active Lauric Acid, living enzymes, and a delicate weightless absorption that leaves zero greasy residue."
    },
    {
      q: "Will the Coconut Hair Oil make fine or oily hair feel heavy?",
      a: "Not at all! Unlike heavy mineral oils, our unheated Kerala cold-pressed coconut oil has an exceptionally low molecular weight that penetrates directly into the hair shaft cortex rather than sitting on top. For fine hair, we recommend applying 2–3 drops to wet ends or using it as a pre-shampoo treatment."
    },
    {
      q: "Are Coco Aura formulas safe for color-treated and keratin-treated hair?",
      a: "Yes, 100%. All our formulas are completely sulfate-free, silicone-free, paraben-free, and pH balanced to 5.5. The cold-pressed coconut lipids actually prolong hair color vibrancy by preventing wash-out porosity."
    },
    {
      q: "What is your 30-Day Radiant Hair Guarantee?",
      a: "We believe you should see and feel the transformation in your hair. Try any Coco Aura product or the Trinity Ritual for 30 days. If your hair is not softer, shinier, and significantly less frizzy, simply email us for a 100% refund, no questions asked."
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#060e0b] border-t border-gold-400/20 text-[#F7F4EE] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-semibold block mb-2">
              Common Curiosities
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4"
                  >
                    <span className="font-serif text-base font-semibold text-white">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gold-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-stone-300 font-light leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Newsletter & Brand Promise */}
        <div className="glass-luxe rounded-3xl p-8 sm:p-12 border border-gold-400/30 mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-300 font-semibold block mb-1">
              Join The Coco Sanctuary
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Receive 15% Off Your First Ritual
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light max-w-lg">
              Subscribe to receive sacred Kerala haircare rituals, seasonal harvest releases, and private member discounts.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-400 text-emerald-300 text-xs text-center font-mono">
                ✨ Welcome to the family! Check your inbox for code WELCOME15.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-gold-400 font-mono"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-gold-300 to-gold-500 text-botanical-darkest font-semibold text-xs tracking-wider uppercase shadow-glow-gold hover:brightness-110 transition-all flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gold-400/20 border border-gold-400/40 flex items-center justify-center text-gold-300 font-serif font-bold text-base">
                C
              </div>
              <span className="font-display tracking-[0.2em] text-lg font-bold text-white">
                COCO AURA
              </span>
            </div>
            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
              Artisanal, clean haircare powered by 100% cold-pressed organic coconuts from heritage Kerala groves. Formulated with Ayurvedic integrity and scientific precision.
            </p>
            <div className="flex items-center gap-4 text-xs text-gold-300/80 font-mono">
              <span>Kerala, India</span>
              <span>•</span>
              <span>Worldwide Shipping</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-gold-300 font-semibold mb-4">
              The Collection
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><a href="#products" className="hover:text-gold-200">Nourishing Shampoo</a></li>
              <li><a href="#products" className="hover:text-gold-200">Deep Hydration Conditioner</a></li>
              <li><a href="#products" className="hover:text-gold-200">Miraculous Hair Oil</a></li>
              <li><a href="#products" className="hover:text-gold-200">The Sacred Trinity Bundle</a></li>
              <li><a href="#quiz" className="hover:text-gold-200">Hair Diagnostic Quiz</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-gold-300 font-semibold mb-4">
              Provenance
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li><a href="#hero-story" className="hover:text-gold-200">The Kerala Groves</a></li>
              <li><a href="#journey" className="hover:text-gold-200">Cold-Pressed under 38°C</a></li>
              <li><a href="#transformation" className="hover:text-gold-200">Clinical Results</a></li>
              <li><a href="#reviews" className="hover:text-gold-200">Customer Testimonials</a></li>
              <li><a href="#" className="hover:text-gold-200">Sustainability Mission</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-gold-300 font-semibold mb-4">
              Our Pledges
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Vegan & Cruelty-Free</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Zero Sulfates or Silicones</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Recycled Packaging & Glass</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-gold-400" />
                <span>1% Given to Kerala Grove Farmers</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 font-mono gap-4">
          <div>
            © {new Date().getFullYear()} Coco Aura Botanicals Ltd. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-300">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300">Terms of Ritual</a>
            <a href="#" className="hover:text-stone-300">Shipping & Returns</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
