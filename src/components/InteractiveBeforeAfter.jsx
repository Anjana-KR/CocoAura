import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, ArrowLeftRight, Droplet, ShieldCheck, Zap } from 'lucide-react';

export default function InteractiveBeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pos);
  }, []);

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section 
      id="transformation" 
      className="scroll-mt-24 pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Section Header with generous clearance below header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-gold-400/40 text-gold-300 text-[11px] uppercase tracking-[0.25em] font-semibold mb-4 shadow-lg backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          Clinical Hair Transformation
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          See The Difference In <br />
          <span className="gold-gradient-text italic font-normal">Every Single Strand</span>
        </h2>
        <p className="mt-4 text-stone-300 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
          Slide horizontally to witness how 100% cold-pressed Kerala coconut elixir restores broken keratin bonds, eliminates frizz, and seals in reflective mirror shine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Interactive Comparison Slider */}
        <div className="lg:col-span-7">
          <div 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={(e) => {
              isDragging.current = true;
              if (e.touches.length > 0) handleMove(e.touches[0].clientX);
            }}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-ew-resize select-none border-2 border-gold-400/30 shadow-2xl bg-[#091410] group"
          >
            {/* "After" Image: Healthy Glossy Hair (Full background) */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={`${(import.meta.env?.BASE_URL || './').replace(/\/$/, '')}/images/hair-after.jpg`} 
                alt="Healthy silky hair after Coco Aura ritual" 
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091410]/70 via-transparent to-transparent pointer-events-none" />
              
              {/* After Tag */}
              <div className="absolute top-5 right-5 glass-luxe px-3.5 py-1.5 rounded-full border border-gold-400/60 text-gold-300 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-xl backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Day 14: Liquid Glass Shine</span>
              </div>
            </div>

            {/* "Before" Layer: Dry Frizzy Hair (Clipped by sliderPos) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="absolute inset-0 w-[100vw] max-w-none md:w-[750px] lg:w-[850px] h-full">
                <img 
                  src={`${(import.meta.env?.BASE_URL || './').replace(/\/$/, '')}/images/hair-before.jpg`} 
                  alt="Dry damaged hair before Coco Aura ritual" 
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Before Tag */}
              <div className="absolute top-5 left-5 glass-dark px-3.5 py-1.5 rounded-full border border-white/20 text-stone-300 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-xl backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span>Day 0: Dry & Frizzy</span>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-300 via-white to-gold-400 z-30 shadow-[0_0_12px_rgba(212,175,55,0.9)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#0e1e17] border-2 border-gold-300 shadow-2xl flex items-center justify-center text-gold-300 group-hover:scale-110 transition-transform">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>

            {/* Sub-label prompts */}
            <div className="absolute bottom-5 left-5 z-20 pointer-events-none text-left">
              <span className="text-white text-xs font-mono font-semibold bg-black/60 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-sm">
                ← Before Treatment
              </span>
            </div>
            <div className="absolute bottom-5 right-5 z-20 pointer-events-none text-right">
              <span className="text-gold-300 text-xs font-mono font-semibold bg-black/60 px-2.5 py-1 rounded-md border border-gold-400/30 backdrop-blur-sm">
                After Coco Aura →
              </span>
            </div>

          </div>
        </div>

        {/* Right Clinical Metrics & Benefits */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <div className="glass-luxe p-7 sm:p-8 rounded-3xl border border-gold-400/30 shadow-2xl space-y-6 bg-[#0e1e17]/80 backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-gold-400 font-semibold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                Verified Clinical Study
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Clinically Observed Results
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light mt-1.5">
                Independent 4-week consumer perception study across 120 diverse hair types utilizing the complete Coco Aura Coconut Trinity Ritual:
              </p>
            </div>

            {/* Progress Bars with High Visibility */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-stone-200">Frizz Reduction & Cuticle Sealing</span>
                  <span className="text-gold-300 font-mono text-sm font-bold">98%</span>
                </div>
                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-gold-400 to-emerald-400 rounded-full w-[98%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-stone-200">Root Fortification & Less Hair Fall</span>
                  <span className="text-gold-300 font-mono text-sm font-bold">94%</span>
                </div>
                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-gold-400 to-emerald-400 rounded-full w-[94%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-stone-200">Continuous 48-Hour Hydro-Lock</span>
                  <span className="text-gold-300 font-mono text-sm font-bold">96%</span>
                </div>
                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-gold-400 to-emerald-400 rounded-full w-[96%]" />
                </div>
              </div>
            </div>

            {/* Benefit Checkpoints */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <div className="flex items-start gap-2.5 text-xs text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Lauric Acid molecules penetrate cortex within 3 minutes of contact</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Thermal shield defense against hair dryers and heat tools up to 230°C</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Non-greasy, lightweight absorption suited for daily care on fine or thick hair</span>
              </div>
            </div>

            {/* CTA Link to products */}
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-botanical-darkest font-semibold text-xs uppercase tracking-wider shadow-glow-gold hover:brightness-110 transition-all"
            >
              <span>Explore The Trinity Ritual</span>
              <ArrowRight className="w-4 h-4" />
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}
