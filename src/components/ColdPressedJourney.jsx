import React, { useState } from 'react';
import { Leaf, Sun, Droplets, ThermometerSnowflake, ShieldCheck, ArrowRight, Award } from 'lucide-react';

export default function ColdPressedJourney() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'harvest',
      number: '01',
      title: 'Hand-Harvested in Kerala',
      subtitle: '80-Foot Heritage Coastal Palms',
      icon: Sun,
      metric: '0 Synthetic Fertilizers',
      temp: 'Ambient Coastal 29°C',
      description: 'Generational harvesters hand-select mature golden coconuts from coastal Kerala groves nourished exclusively by monsoonal rains and mineral-rich ocean soil.',
      detail: 'Harvested only at daybreak when the coconut internal electrolyte pressure and lauric acid concentration reach biological maximum.'
    },
    {
      id: 'cracking',
      number: '02',
      title: 'Hydraulic Cold-Cracking',
      subtitle: 'Zero Heat Impact within 4 Hours',
      icon: Leaf,
      metric: 'Under 4 Hours Post-Harvest',
      temp: 'Cool Room 22°C',
      description: 'Each coconut is washed with purified spring water and cracked open with gentle hydraulic pressure to liberate the fresh, pristine coconut water and tender meat.',
      detail: 'Eliminates rancidity and oxidation common in commercial copra oils that sit in hot sun for weeks.'
    },
    {
      id: 'extraction',
      number: '03',
      title: 'Sub-38°C Centrifugation',
      subtitle: 'Pure Mechanical Cold Separation',
      icon: ThermometerSnowflake,
      metric: 'Strictly < 38°C Guaranteed',
      temp: 'Zero Heat Refinement',
      description: 'Our proprietary multi-stage cold centrifuge separates virgin coconut oil and active milk proteins mechanically without bleaching clays, deodorizers, or hexane.',
      detail: 'Preserves 100% of the active lauric, capric, and caprylic fatty acids that make CocoAura penetrate hair shafts 4x faster.'
    },
    {
      id: 'infusion',
      number: '04',
      title: 'Ayurvedic Botanicals Infusion',
      subtitle: 'Solar Maceration with Rosemary & Amla',
      icon: Droplets,
      metric: '14-Day Micro-Extraction',
      temp: 'Gentle Sunlight Incubated',
      description: 'The cold virgin coconut elixir is slowly infused with wild rosemary leaves, fresh amla (Indian gooseberry), and hibiscus flowers to create our root-strengthening formulas.',
      detail: 'Rosemary stimulates cellular regeneration at the dermal papilla, awakening sleepy follicles for denser hair growth.'
    },
    {
      id: 'bottling',
      number: '05',
      title: 'UV-Protected Eco Bottling',
      subtitle: 'Sealed for Maximum Freshness',
      icon: ShieldCheck,
      metric: '100% Recyclable Packaging',
      temp: 'Sealed in Dark Glass / PCR',
      description: 'Bottled in clean, recyclable amber bottles and protective tubes that shield delicate botanical antioxidants from light degradation until the moment it touches your hair.',
      detail: 'Small-batch crafted in eco-certified solar-powered facilities, carbon neutral from coastal grove to your doorstep.'
    }
  ];

  return (
    <section id="journey" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-gold-400/30 text-gold-300 text-xs uppercase tracking-widest font-semibold mb-4">
          <ThermometerSnowflake className="w-3.5 h-3.5" />
          The Science of Sub-38°C Extraction
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          From Kerala Coastal Palm <br />
          <span className="gold-gradient-text italic font-normal">To Your Daily Hair Ritual</span>
        </h2>
        <p className="mt-4 text-stone-300 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
          Standard hair oils are boiled at 200°C, destroying active proteins. CocoAura never touches heat, preserving the living biological structure of raw coconut.
        </p>
      </div>

      {/* Step Selector Pills */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-mono transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-gold-400/30 to-botanical-surface border border-gold-400 text-gold-300 shadow-glow-gold'
                  : 'bg-white/5 border border-white/10 text-stone-400 hover:text-stone-200'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isActive ? 'bg-gold-400 text-botanical-darkest' : 'bg-white/10 text-stone-400'
              }`}>
                {step.number}
              </span>
              <span>{step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Feature Display */}
      {(() => {
        const step = steps[activeStep];
        const Icon = step.icon;

        return (
          <div className="glass-luxe rounded-3xl border border-gold-400/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/10 blur-[130px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gold-400 uppercase tracking-widest font-semibold block">
                      Phase {step.number} of 05
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-stone-200 font-light leading-relaxed">
                  {step.description}
                </p>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-xs font-semibold text-gold-300 block mb-1 uppercase tracking-wider font-mono">
                    Biological Impact:
                  </span>
                  <p className="text-xs text-stone-300 leading-relaxed font-light">
                    {step.detail}
                  </p>
                </div>

                {/* Step Navigation Buttons */}
                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={() => setActiveStep(prev => (prev > 0 ? prev - 1 : steps.length - 1))}
                    className="px-4 py-2 rounded-xl glass-dark border border-white/10 text-xs text-stone-300 hover:text-white"
                  >
                    ← Previous Phase
                  </button>
                  <button
                    onClick={() => setActiveStep(prev => (prev < steps.length - 1 ? prev + 1 : 0))}
                    className="px-5 py-2 rounded-xl bg-gold-500/20 border border-gold-400/40 text-xs text-gold-300 hover:bg-gold-500/30 font-medium flex items-center gap-1.5"
                  >
                    <span>Next Phase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Right Diagnostic Cards */}
              <div className="lg:col-span-5 space-y-4">
                <div className="glass-dark p-6 rounded-2xl border border-white/10 space-y-3">
                  <span className="text-[11px] uppercase tracking-wider font-mono text-stone-400">Quality Benchmark</span>
                  <div className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-gold-400" />
                    <span>{step.metric}</span>
                  </div>
                  <p className="text-xs text-stone-400 font-light">
                    Independent laboratory certified for uncompromised bio-active integrity.
                  </p>
                </div>

                <div className="glass-dark p-6 rounded-2xl border border-white/10 space-y-3">
                  <span className="text-[11px] uppercase tracking-wider font-mono text-stone-400">Thermal Threshold</span>
                  <div className="text-2xl font-serif font-bold text-emerald-400 flex items-center gap-2">
                    <ThermometerSnowflake className="w-5 h-5 text-emerald-400" />
                    <span>{step.temp}</span>
                  </div>
                  <p className="text-xs text-stone-400 font-light">
                    Guarantees natural amino acids and medium chain fatty acids stay biologically intact.
                  </p>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

    </section>
  );
}
