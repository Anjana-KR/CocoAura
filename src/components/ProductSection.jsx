import React, { useState } from 'react';
import { 
  Star, 
  ShoppingBag, 
  Check, 
  Eye, 
  Sparkles, 
  Droplet, 
  ShieldCheck, 
  Award,
  ArrowRight,
  Heart
} from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function ProductSection({ onAddToCart, onOpenQuickView }) {
  const [selectedVolumes, setSelectedVolumes] = useState({
    'coco-shampoo': 0,
    'coco-conditioner': 0,
    'coco-hair-oil': 0,
    'coco-trinity-bundle': 0
  });

  const [addedIds, setAddedIds] = useState({});

  const handleVolumeChange = (productId, index) => {
    setSelectedVolumes(prev => ({
      ...prev,
      [productId]: index
    }));
  };

  const handleAdd = (product) => {
    const volIdx = selectedVolumes[product.id] || 0;
    const selectedVol = product.volumeOptions[volIdx];
    const selectedPrice = product.prices[volIdx] || product.price;

    onAddToCart({
      id: `${product.id}-${volIdx}`,
      baseId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      volume: selectedVol,
      price: selectedPrice,
      image: product.image
    });

    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const trioProducts = PRODUCTS.filter(p => p.id !== 'coco-trinity-bundle');
  const bundleProduct = PRODUCTS.find(p => p.id === 'coco-trinity-bundle');

  return (
    <section id="products" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-gold-400/30 text-gold-300 text-xs uppercase tracking-widest font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          The Kerala Botanical Collection
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-100 tracking-tight leading-tight">
          Pure Coconut Alchemy <br />
          <span className="gold-gradient-text italic font-normal">For Hair That Captivates</span>
        </h2>
        <p className="mt-4 text-stone-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Every formulation is anchored in unheated Kerala cold-pressed coconut nectar, formulated with clinical botanicals to cleanse, hydrate, and fortify down to the root cortex.
        </p>
      </div>

      {/* The 3 Core Individual Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {trioProducts.map((product) => {
          const currentVolIdx = selectedVolumes[product.id] || 0;
          const currentPrice = product.prices[currentVolIdx] || product.price;
          const isAdded = addedIds[product.id];

          return (
            <div 
              key={product.id}
              className="group relative bg-[#0e1e17] rounded-3xl border border-white/10 hover:border-gold-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-black/70 flex flex-col overflow-hidden"
            >
              {/* Product Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                <span className="glass-luxe px-3 py-1 rounded-full text-[11px] font-mono font-medium text-gold-300 border border-gold-400/30 shadow-md">
                  {product.badge}
                </span>
                <span className="glass-pill px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider text-stone-300 font-semibold">
                  {product.category}
                </span>
              </div>

              {/* Quick View Button on Image */}
              <button 
                onClick={() => onOpenQuickView(product)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full glass-dark text-stone-300 hover:text-gold-300 border border-white/10 hover:border-gold-400/40 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Quick View Details"
              >
                <Eye className="w-4 h-4" />
              </button>

              {/* Product Image Stage */}
              <div 
                className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-[#152b22] to-[#0e1e17] cursor-pointer"
                onClick={() => onOpenQuickView(product)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1e17] via-transparent to-transparent opacity-60" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Reviews & Star Rating */}
                  <div className="flex items-center gap-1.5 text-xs text-gold-400 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                      ))}
                    </div>
                    <span className="font-semibold text-stone-200">{product.rating}</span>
                    <span className="text-stone-400 text-[11px]">({product.reviewsCount} reviews)</span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100 group-hover:text-gold-200 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gold-300/80 mt-1 font-mono tracking-wide">
                    {product.subtitle}
                  </p>

                  <p className="text-xs text-stone-300/80 mt-3 line-clamp-2 font-light leading-relaxed">
                    {product.description}
                  </p>

                  {/* Key Ingredients tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {product.keyIngredients.slice(0, 2).map((ing, i) => (
                      <span key={i} className="glass-pill px-2 py-0.5 rounded text-[10px] text-stone-300 border border-white/5">
                        {ing.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Size Selection & Action Row */}
                <div className="mt-6 pt-5 border-t border-white/5">
                  {/* Volume Selector */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider font-medium">Select Size</span>
                    <div className="flex gap-1.5">
                      {product.volumeOptions.map((vol, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleVolumeChange(product.id, idx)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all ${
                            currentVolIdx === idx
                              ? 'bg-gold-500/20 text-gold-300 border border-gold-400/50 shadow-sm'
                              : 'bg-white/5 text-stone-400 border border-white/5 hover:text-stone-200'
                          }`}
                        >
                          {vol.split('/')[0].trim()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & Add to Bag CTA */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="text-2xl font-bold font-serif text-stone-100">
                        ${currentPrice}
                      </span>
                      <span className="text-[10px] text-stone-400 block -mt-0.5">USD</span>
                    </div>

                    <button
                      onClick={() => handleAdd(product)}
                      disabled={isAdded}
                      className={`flex-1 py-3 px-4 rounded-2xl font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                        isAdded
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                          : 'bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-botanical-darkest font-semibold shadow-glow-gold hover:scale-[1.02]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 animate-scale" />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Master Bundle: The Sacred CocoAura Trinity Ritual */}
      {bundleProduct && (
        <div className="relative rounded-3xl bg-gradient-to-br from-[#142820] via-[#0f2119] to-[#0a1712] border-2 border-gold-400/40 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl shadow-black/80">
          
          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-luxe border border-gold-400 text-gold-300 text-xs uppercase tracking-widest font-semibold mb-4 w-fit shadow-glow-gold">
                <Award className="w-4 h-4 text-gold-300" />
                Special Offer: Save 20% + Complimentary Gift
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                The Sacred CocoAura <br />
                <span className="gold-gradient-text italic font-normal">Complete Trinity Ritual</span>
              </h3>

              <p className="mt-3 text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-xl">
                Experience the synchronized potency of all three formulas. Infuses hair fibers with cold-pressed lauric acids, plant ceramides, and root-activating rosemary.
              </p>

              {/* What's Inside Checklist */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-200">
                <div className="flex items-center gap-2.5 glass-dark p-2.5 rounded-xl border border-white/5">
                  <span className="w-5 h-5 rounded-full bg-gold-400/20 text-gold-300 flex items-center justify-center font-bold text-[10px]">1</span>
                  <span>Coco Aura Shampoo (250ml)</span>
                </div>
                <div className="flex items-center gap-2.5 glass-dark p-2.5 rounded-xl border border-white/5">
                  <span className="w-5 h-5 rounded-full bg-gold-400/20 text-gold-300 flex items-center justify-center font-bold text-[10px]">2</span>
                  <span>Deep Hydration Conditioner (200ml)</span>
                </div>
                <div className="flex items-center gap-2.5 glass-dark p-2.5 rounded-xl border border-white/5">
                  <span className="w-5 h-5 rounded-full bg-gold-400/20 text-gold-300 flex items-center justify-center font-bold text-[10px]">3</span>
                  <span>Miraculous Hair Oil (50ml)</span>
                </div>
                <div className="flex items-center gap-2.5 glass-luxe p-2.5 rounded-xl border border-gold-400/30 text-gold-300 font-semibold">
                  <Sparkles className="w-4 h-4 text-gold-300" />
                  <span>FREE Handcrafted Neem Comb ($18)</span>
                </div>
              </div>

              {/* Bundle Pricing and Action CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-serif font-bold text-white">${bundleProduct.price}</span>
                  <span className="text-xl text-stone-400 line-through font-serif">${bundleProduct.originalPrice}</span>
                  <span className="px-2.5 py-1 rounded bg-gold-400/20 text-gold-300 font-mono text-xs font-semibold">
                    SAVE $20
                  </span>
                </div>

                <button
                  onClick={() => handleAdd(bundleProduct)}
                  disabled={addedIds[bundleProduct.id]}
                  className={`py-3.5 px-8 rounded-full font-semibold text-sm tracking-wide uppercase transition-all duration-300 flex items-center gap-2.5 ${
                    addedIds[bundleProduct.id]
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-botanical-darkest shadow-glow-gold hover:scale-105'
                  }`}
                >
                  {addedIds[bundleProduct.id] ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Trinity Bundle Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Claim The Trinity Bundle</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Right Visual Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-gold-400/30 aspect-[4/3] shadow-2xl">
                <img 
                  src={bundleProduct?.image || "./images/shampoo.jpg"} 
                  alt="Coco Aura Collection"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 glass-dark p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-gold-300 font-semibold block">Full Care Regimen</span>
                    <span className="text-stone-300 text-[11px]">30-Day Guaranteed Transformation</span>
                  </div>
                  <button
                    onClick={() => onOpenQuickView(bundleProduct)}
                    className="text-xs text-gold-300 hover:text-white underline font-medium"
                  >
                    View Set Details
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Sustainable Commitment Strip */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="glass-pill p-5 rounded-2xl border border-white/5">
          <Droplet className="w-6 h-6 text-gold-300 mx-auto mb-2" />
          <h4 className="text-stone-100 font-serif font-semibold text-sm">Cold-Pressed Under 38°C</h4>
          <p className="text-stone-400 text-xs mt-1">Preserves 100% active enzymes & nutrients</p>
        </div>
        <div className="glass-pill p-5 rounded-2xl border border-white/5">
          <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <h4 className="text-stone-100 font-serif font-semibold text-sm">Clean Formulation</h4>
          <p className="text-stone-400 text-xs mt-1">Zero sulfates, silicones, phthalates</p>
        </div>
        <div className="glass-pill p-5 rounded-2xl border border-white/5">
          <Award className="w-6 h-6 text-gold-300 mx-auto mb-2" />
          <h4 className="text-stone-100 font-serif font-semibold text-sm">Ayurvedic Provenance</h4>
          <p className="text-stone-400 text-xs mt-1">Sustainably hand-harvested in Kerala</p>
        </div>
        <div className="glass-pill p-5 rounded-2xl border border-white/5">
          <Sparkles className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <h4 className="text-stone-100 font-serif font-semibold text-sm">30-Day Radiant Guarantee</h4>
          <p className="text-stone-400 text-xs mt-1">Love your hair or get a 100% refund</p>
        </div>
      </div>

    </section>
  );
}
