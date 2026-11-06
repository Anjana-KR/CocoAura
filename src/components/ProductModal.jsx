import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, Sparkles, Droplets, ShieldCheck, Heart } from 'lucide-react';

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !product) return null;

  const [selectedVolIdx, setSelectedVolIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const currentPrice = product.prices[selectedVolIdx] || product.price;
  const currentVol = product.volumeOptions[selectedVolIdx];

  const handleAdd = () => {
    onAddToCart({
      id: `${product.id}-${selectedVolIdx}`,
      baseId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      volume: currentVol,
      price: currentPrice,
      image: product.image
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center py-10">
        <div 
          onClick={e => e.stopPropagation()} 
          className="inline-block w-full max-w-4xl p-6 sm:p-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#0d1e17] border border-gold-400/30 rounded-3xl shadow-2xl relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left Image Showcase */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-stone-900 shadow-xl">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-4 left-4 glass-luxe px-3 py-1 rounded-full text-xs font-mono text-gold-300 border border-gold-400/40">
                {product.badge}
              </div>
            </div>

            {/* Right Information */}
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-gold-400 mb-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <span className="font-semibold text-stone-200">{product.rating}</span>
                  <span className="text-stone-400 text-[11px]">({product.reviewsCount} customer reviews)</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {product.name}
                </h3>
                <span className="text-xs text-gold-300 font-mono block mt-1">
                  {product.subtitle}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Scent notes & how to use */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2 text-xs">
                <div>
                  <span className="font-mono text-gold-300 uppercase tracking-wider text-[10px] font-semibold block">
                    Aromatic Signature:
                  </span>
                  <span className="text-stone-300 font-light">{product.scentNotes}</span>
                </div>
                <div>
                  <span className="font-mono text-gold-300 uppercase tracking-wider text-[10px] font-semibold block">
                    The Application Ritual:
                  </span>
                  <span className="text-stone-300 font-light">{product.howToUse}</span>
                </div>
              </div>

              {/* Volume Selection */}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-mono text-stone-400 block mb-2 font-medium">
                  Select Size
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.volumeOptions.map((vol, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVolIdx(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                        selectedVolIdx === idx
                          ? 'bg-gold-500/20 text-gold-300 border border-gold-400 shadow-sm'
                          : 'bg-white/5 border border-white/5 text-stone-400 hover:text-white'
                      }`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Add to Bag */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <span className="text-3xl font-serif font-bold text-white">${currentPrice}</span>
                  <span className="text-[10px] text-stone-400 block -mt-1">Taxes included</span>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`flex-1 py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-botanical-darkest shadow-glow-gold hover:scale-[1.02]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Your Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • ${currentPrice}</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
