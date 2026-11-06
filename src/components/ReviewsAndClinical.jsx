import React, { useState } from 'react';
import { Star, CheckCircle, ShieldCheck, Quote, ThumbsUp } from 'lucide-react';

export default function ReviewsAndClinical() {
  const [filter, setFilter] = useState('all');

  const reviews = [
    {
      id: 1,
      name: 'Priya M.',
      location: 'Kochi, Kerala',
      hairType: 'Wavy & Coarse',
      product: 'The Sacred Trinity Bundle',
      category: 'bundle',
      rating: 5,
      date: '2 days ago',
      title: 'The authentic Kerala coconut elixir I’ve searched years for!',
      content: 'I grew up with fresh coconut oil in Kerala, but modern drugstore products always felt watered down with silicones. Coco Aura is in an entirely different league. The cold-pressed smell is heavenly and my hair hasn’t had a single bad frizz day in high monsoon humidity!',
      verified: true,
      helpful: 42
    },
    {
      id: 2,
      name: 'Elena Rostova',
      location: 'London, UK',
      hairType: 'Fine & Bleached Blonde',
      product: 'Coco Aura Miraculous Hair Oil',
      category: 'oil',
      rating: 5,
      date: '1 week ago',
      title: 'Resurrected my bleached hair without greasiness',
      content: 'I was terrified of using coconut oil because typical oils weigh my fine hair down like a grease slick. The dropper bottle on this is incredible—just 3 drops warmed in my hands melts right into the ends. My hair feels like liquid silk.',
      verified: true,
      helpful: 38
    },
    {
      id: 3,
      name: 'Maya S.',
      location: 'California, US',
      hairType: 'Curly (3B)',
      product: 'Deep Hydration Conditioner',
      category: 'conditioner',
      rating: 5,
      date: '2 weeks ago',
      title: 'Unbelievable slip and curl retention',
      content: 'I have tight 3B curls that tangle the second water hits them. This conditioner melted through knots like butter. When my curls dried, they were bouncy, clumped beautifully, and had that reflective wet look all day long.',
      verified: true,
      helpful: 29
    },
    {
      id: 4,
      name: 'Ananya D.',
      location: 'Bangalore, India',
      hairType: 'Straight & Scalp Prone to Flakes',
      product: 'Coco Aura Nourishing Shampoo',
      category: 'shampoo',
      rating: 5,
      date: '3 weeks ago',
      title: 'A sulfate-free shampoo that actually cleans and softens',
      content: 'Most natural shampoos either don’t foam or leave my hair feeling like dry straw. CocoAura creates the thickest velvety coconut milk foam and leaves my scalp completely calm and hydrated. Love the gold aesthetic too!',
      verified: true,
      helpful: 19
    }
  ];

  const filtered = filter === 'all' ? reviews : reviews.filter(r => r.category === filter);

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Press Quotes */}
      <div className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-y border-white/10 py-10">
        <div>
          <span className="font-serif italic text-gold-300 text-lg block font-bold">VOGUE</span>
          <p className="text-xs text-stone-300 mt-1">"The holy grail of cold-pressed botanicals."</p>
        </div>
        <div>
          <span className="font-serif italic text-gold-300 text-lg block font-bold">ELLE</span>
          <p className="text-xs text-stone-300 mt-1">"Restores cuticle shine within single wash."</p>
        </div>
        <div>
          <span className="font-serif italic text-gold-300 text-lg block font-bold">HARPER'S BAZAAR</span>
          <p className="text-xs text-stone-300 mt-1">"Artisanal Kerala hair alchemy at its peak."</p>
        </div>
        <div>
          <span className="font-serif italic text-gold-300 text-lg block font-bold">ALLURE</span>
          <p className="text-xs text-stone-300 mt-1">"Best Clean Hair Oil Winner 2026."</p>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-gold-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-gold-400" />
            1,280+ Verified 5-Star Experiences
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Loved By Thousands of <br />
            <span className="gold-gradient-text italic font-normal">Rejuvenated Manes</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'shampoo', label: 'Shampoo' },
            { id: 'conditioner', label: 'Conditioner' },
            { id: 'oil', label: 'Hair Oil' },
            { id: 'bundle', label: 'Trinity Set' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                filter === tab.id
                  ? 'bg-gold-500/20 border border-gold-400 text-gold-300 font-semibold'
                  : 'bg-white/5 border border-white/5 text-stone-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(rev => (
          <div 
            key={rev.id} 
            className="glass-dark p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-gold-400/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Rating & Verified Tag */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                {rev.verified && (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Verified Buyer
                  </span>
                )}
              </div>

              {/* Title & Content */}
              <h3 className="font-serif text-lg font-bold text-white mb-2">
                "{rev.title}"
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                {rev.content}
              </p>
            </div>

            {/* Reviewer Details */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-stone-200 block">{rev.name}</span>
                <span className="text-[10px] text-stone-400">{rev.location} • Hair: {rev.hairType}</span>
              </div>
              <div className="text-[10px] font-mono text-gold-300/80 bg-white/5 px-2.5 py-1 rounded-md">
                {rev.product}
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
