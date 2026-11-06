import React, { useState } from 'react';
import { Droplets, Sparkles, Shield, Leaf, Heart, ArrowRight } from 'lucide-react';

export default function IngredientDeepDive() {
  const [activeTab, setActiveTab] = useState(0);

  const ingredients = [
    {
      title: 'Raw Kerala Coconut Milk',
      subtitle: 'Living Lipids & Protein Complex',
      percent: '52% Lauric Acid',
      benefit: 'Weightless Cortex Replenishment',
      description: 'Unlike ordinary cosmetic oils that sit on top of strands like grease, our unheated raw coconut milk possesses a linear medium-chain structure that penetrates the inner cortex, preventing protein loss during washing.',
      features: ['Dissolves dry scalp build-up naturally', 'Restores natural bounce and body', 'Safe for fine, easily weighed-down hair']
    },
    {
      title: 'Sub-38°C Virgin Coconut Oil',
      subtitle: 'Cold-Centrifuged Natural Nectar',
      percent: '100% Unrefined',
      benefit: '48-Hour Hydro-Locking Seal',
      description: 'Extracted without heat or solvents, our extra-virgin coconut oil creates a feather-light barrier around the hair cuticle. It locks in water molecules while repelling outdoor humidity, preventing frizz in any weather.',
      features: ['Prevents hygral fatigue (swelling/shrinking)', 'Multi-reflective glossy shine', 'Repairs cuticle scales damaged by heat']
    },
    {
      title: 'Wild Rosemary & Amla Extract',
      subtitle: 'Ayurvedic Microcirculation Activator',
      percent: 'Clinically Proven',
      benefit: 'Follicle Awakening & Density',
      description: 'Used in Kerala ayurveda for millennia, wild rosemary leaf extract stimulates microvascular circulation at the hair root, delivering critical oxygen and minerals to encourage thicker, stronger hair growth.',
      features: ['Reduces seasonal hair fall', 'Invigorates the scalp micro-environment', 'Rich in natural polyphenol antioxidants']
    },
    {
      title: 'Botanical Ceramides & Aloe Leaf',
      subtitle: 'Plant Keratin & Soothing Mucilage',
      percent: 'pH 5.5 Balanced',
      benefit: 'Scalp Barrier Defense',
      description: 'Pure inner leaf aloe vera combined with rice and wheat ceramides replaces the lost intercellular cement that holds hair scales tight, leaving strands resilient against breakage and split ends.',
      features: ['Instant slip for pain-free wet detangling', 'Soothes inflammation, redness, and itching', 'Seals moisture inside porous ends']
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-gold-400/30 text-gold-300 text-xs uppercase tracking-widest font-semibold mb-4">
          <Leaf className="w-3.5 h-3.5" />
          Bio-Active Botanical Chemistry
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Nature's Most Potent <br />
          <span className="gold-gradient-text italic font-normal">Molecular Hair Nutrition</span>
        </h2>
        <p className="mt-4 text-stone-300 text-sm sm:text-base font-light max-w-xl mx-auto">
          Explore the pure active ingredients harvested from Kerala’s fertile soil that empower CocoAura formulas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Ingredient Navigation Buttons */}
        <div className="lg:col-span-5 space-y-3">
          {ingredients.map((ing, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-5 rounded-2xl transition-all border flex items-center justify-between group ${
                  isActive
                    ? 'bg-gradient-to-r from-gold-500/20 to-botanical-surface border-gold-400/50 shadow-glow-gold'
                    : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'
                }`}
              >
                <div>
                  <span className={`text-[11px] font-mono block ${isActive ? 'text-gold-300 font-semibold' : 'text-stone-400'}`}>
                    {ing.subtitle}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-200 transition-colors">
                    {ing.title}
                  </h3>
                </div>
                <ArrowRight className={`w-4 h-4 transition-transform ${
                  isActive ? 'text-gold-300 translate-x-1' : 'text-stone-600 group-hover:text-stone-300'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Detailed Highlight Card */}
        <div className="lg:col-span-7">
          <div className="glass-luxe rounded-3xl border border-gold-400/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-gold-300 uppercase tracking-widest block font-semibold">
                  Key Potency Marker
                </span>
                <span className="text-3xl font-serif font-bold text-white">
                  {ingredients[activeTab].percent}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block font-semibold">
                  Primary Action
                </span>
                <span className="text-base font-serif font-semibold text-stone-200">
                  {ingredients[activeTab].benefit}
                </span>
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
              {ingredients[activeTab].title}
            </h3>

            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-6">
              {ingredients[activeTab].description}
            </p>

            <div className="space-y-2.5">
              {ingredients[activeTab].features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-stone-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
