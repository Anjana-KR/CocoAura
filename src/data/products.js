const BASE = (import.meta.env?.BASE_URL || './').replace(/\/$/, '') + '/';

export const PRODUCTS = [
  {
    id: 'coco-shampoo',
    name: 'Coco Aura Nourishing Shampoo',
    subtitle: 'Restoring Coconut & Foam Milk Cleanse',
    category: 'Cleanse',
    price: 28,
    rating: 4.95,
    reviewsCount: 428,
    badge: 'Bestseller',
    volumeOptions: ['250ml / 8.4 fl oz', '500ml / 16.9 fl oz'],
    prices: [28, 48],
    image: `${BASE}images/shampoo.jpg`,
    description: 'A sulfate-free, rich creamy shampoo infused with freshly extracted Kerala coconut milk, aloe vera leaf juice, and provitamin B5. Cleanses scalp impurities gently without stripping natural lipid barriers, leaving hair feather-soft and luminous.',
    benefits: [
      'Zero sulfates, silicones, parabens, or synthetic dyes',
      'Infused with 52% raw cold-pressed Lauric Acid for cuticle nourishment',
      'Rich, velvety lather naturally derived from coconut glucosides',
      'Soothes dry, flaky scalp and balances natural pH to 5.5'
    ],
    keyIngredients: [
      { name: 'Raw Coconut Milk', note: 'Rich in essential fatty acids and natural lipids' },
      { name: 'Organic Aloe Vera', note: 'Calms and hydrates sensitive scalp tissue' },
      { name: 'Provitamin B5 (Panthenol)', note: 'Strengthens hair cortex and prevents split ends' }
    ],
    scentNotes: 'Sun-warmed coconut water, fresh crushed palm leaf, and soft Tahitian vanilla orchid.',
    howToUse: 'Lather a coin-sized amount between damp palms. Gently massage into scalp and roots for 2 minutes to stimulate microcirculation. Rinse thoroughly with lukewarm or cool water.'
  },
  {
    id: 'coco-conditioner',
    name: 'Coco Aura Deep Hydration Conditioner',
    subtitle: 'Velvet Moisture & Botanical Ceramide Crème',
    category: 'Hydrate',
    price: 32,
    rating: 4.92,
    reviewsCount: 384,
    badge: 'Award Winner 2026',
    volumeOptions: ['200ml / 6.8 fl oz', '400ml / 13.5 fl oz'],
    prices: [32, 54],
    image: `${BASE}images/conditioner.jpg`,
    description: 'An ultra-nourishing botanical balm created with extra-virgin cold-pressed coconut oil, shea butter, and vegetable ceramides. Deeply infiltrates compromised hair fibers, instantly unravels stubborn tangles, and seals in moisture for a glassy mirror finish.',
    benefits: [
      'Instant 48-hour frizz defense even in 80%+ humidity',
      'Deeply seals cuticles without weighing hair down or leaving residue',
      'Contains plant-based ceramides that restore depleted keratin bonds',
      'Safe for color-treated, chemically straightened, or keratin-treated hair'
    ],
    keyIngredients: [
      { name: 'Extra-Virgin Coconut Oil', note: 'Penetrates inside the hair cortex, unlike mineral oils' },
      { name: 'Botanical Ceramides', note: 'Rebuilds the outer protective lipid sheath' },
      { name: 'Hydrolyzed Pea Peptide', note: 'Provides weightless bounce, volume, and tensile strength' }
    ],
    scentNotes: 'Creamy coconut cream, fresh frangipani blossom, and sunlit coastal cedarwood.',
    howToUse: 'After shampooing, apply generously from mid-lengths to ends. Use fingers or a wide-tooth comb to gently detangle. Leave on for 3–5 minutes for daily hydration, or 10 minutes as a deep conditioning mask. Rinse thoroughly.'
  },
  {
    id: 'coco-hair-oil',
    name: 'Coco Aura Miraculous Hair Oil',
    subtitle: '100% Cold-Pressed Kerala Coconut & Ayurvedic Elixir',
    category: 'Nourish & Repair',
    price: 38,
    rating: 4.98,
    reviewsCount: 512,
    badge: 'Customer Holy Grail',
    volumeOptions: ['50ml / 1.7 fl oz', '100ml / 3.4 fl oz'],
    prices: [38, 64],
    image: `${BASE}images/hair_oil.jpg`,
    description: 'Our crown jewel. Extracted via artisanal zero-heat cold pressing of sun-ripened organic coconuts from heritage coastal groves in Kerala. Infused with cold-macerated Rosemary, Moroccan Argan, and Indian Gooseberry (Amla) to stimulate root density and promote rapid growth.',
    benefits: [
      '100% pure cold-pressed unrefined coconut nectar',
      'Enriched with Rosemary extract clinically proven to awaken dormant follicles',
      'Non-greasy, fast-absorbing golden formula with dropper precision',
      'Multi-use: Pre-shampoo scalp massage, heat protectant, or overnight repair mask'
    ],
    keyIngredients: [
      { name: 'Cold-Pressed Kerala Coconut Nectar', note: 'Richest source of medium-chain triglycerides (MCTs)' },
      { name: 'Pure Rosemary Leaf Extract', note: 'Improves scalp microvascular circulation' },
      { name: 'Cold-Pressed Argan & Amla', note: 'High in Vitamin E and antioxidants to combat UV stress' }
    ],
    scentNotes: 'Warm roasted coconut kernel, wild crushed rosemary, and golden amber sunlight.',
    howToUse: 'Scalp Ritual: Part hair and apply 3-5 drops directly to scalp; massage in circular motions for 5 minutes. Styling & Shine: Warm 1-2 drops between palms and sweep over dry ends to tame flyaways and impart radiant shine.'
  },
  {
    id: 'coco-trinity-bundle',
    name: 'The Sacred CocoAura Trinity Ritual Bundle',
    subtitle: 'Complete 3-Step Cold-Pressed Coconut Hair System',
    category: 'Complete Ritual',
    price: 78,
    originalPrice: 98,
    rating: 4.99,
    reviewsCount: 640,
    badge: 'Save 20% + Free Gift',
    volumeOptions: ['Full Ritual Set (Shampoo 250ml + Conditioner 200ml + Hair Oil 50ml)'],
    prices: [78],
    image: `${BASE}images/shampoo.jpg`,
    secondaryImage: `${BASE}images/hair_oil.jpg`,
    description: 'The holistic Ayurvedic beauty experience. Includes full sizes of Nourishing Shampoo, Deep Hydration Conditioner, and Miraculous Hair Oil, plus a complimentary Handcrafted Neem Wood Scalp Comb and Organic Cotton Canvas Travel Pouch.',
    benefits: [
      'Complete 3-phase ritual: Cleanse, Hydrate, and Seal with cold-pressed coconut',
      'Includes complimentary Handcrafted Neem Wood Detangling Comb ($18 value)',
      'Guaranteed 30-Day Hair Transformation or your money back',
      'Saves $20 compared to buying individually'
    ],
    keyIngredients: [
      { name: 'All 3 Core Elixirs', note: 'Shampoo, Conditioner & Miraculous Hair Oil' },
      { name: 'Handcrafted Neem Comb', note: 'Anti-static, promotes scalp circulation' },
      { name: 'Travel Dust Bag', note: '100% GOTS certified organic canvas' }
    ],
    scentNotes: 'A harmonious tropical signature bouquet of raw coconut, sweet gardenia, and coastal ocean breeze.',
    howToUse: '1. Pre-treat scalp twice weekly with 4 drops of Hair Oil. 2. Cleanse with Nourishing Shampoo. 3. Lock in moisture with Deep Hydration Conditioner. 4. Seal ends with a single drop of Hair Oil.'
  }
];

export const CHAPTERS = [
  { id: 'grove', label: '01. The Kerala Groves', targetTime: 0.1, scrollRatio: 0.05, desc: 'Pristine coastal palms kissed by Arabian sea mist.' },
  { id: 'harvest', label: '02. The Peak Harvest', targetTime: 2.2, scrollRatio: 0.28, desc: 'Sun-ripened organic coconuts hand-selected at prime vitality.' },
  { id: 'fall', label: '03. Gravitational Purity', targetTime: 3.6, scrollRatio: 0.50, desc: 'Nature’s effortless descent toward the fertile earth.' },
  { id: 'burst', label: '04. The Sacred Burst', targetTime: 5.2, scrollRatio: 0.72, desc: 'Cold-cracked open to unleash pure coconut water & rich milk.' },
  { id: 'elixir', label: '05. The Bottled Elixir', targetTime: 7.8, scrollRatio: 0.95, desc: 'The birth of Coco Aura: clean, cold-pressed haircare perfection.' },
];
