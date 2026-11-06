import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, RefreshCw, ShoppingBag, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRODUCTS } from '../data/products';

export default function HairRitualQuiz({ onAddToCart }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    hairType: '',
    concern: '',
    frequency: ''
  });
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = [
    {
      id: 'hairType',
      title: 'What is your natural hair texture?',
      subtitle: 'Different textures absorb cold-pressed coconut lipids differently.',
      options: [
        { label: 'Straight & Fine', desc: 'Prone to oiliness at roots, needs weightless hydration' },
        { label: 'Wavy & Medium', desc: 'Tends to frizz in humidity, craves balance' },
        { label: 'Curly (3A-3C)', desc: 'Needs deep moisture & enhanced curl definition' },
        { label: 'Coily / Textured (4A-4C)', desc: 'High porosity, requires maximum cuticle sealing' }
      ]
    },
    {
      id: 'concern',
      title: 'What is your primary hair or scalp concern?',
      subtitle: 'We target the root cause with bioactive Kerala botanicals.',
      options: [
        { label: 'Frizz, Dullness & Dehydration', desc: 'Needs rich coconut milk & moisture barrier repair' },
        { label: 'Hair Fall, Thinning & Weak Roots', desc: 'Requires Rosemary & Amla scalp stimulation' },
        { label: 'Damage from Heat / Color Styling', desc: 'Requires deep penetrating vegetable ceramides' },
        { label: 'Dry, Itchy or Sensitive Scalp', desc: 'Needs pH-balanced pure coconut aloe vera cleanse' }
      ]
    },
    {
      id: 'frequency',
      title: 'How often do you wash your hair?',
      subtitle: 'Calibrates your oiling and conditioning rhythm.',
      options: [
        { label: 'Every Day or Every Other Day', desc: 'Needs our gentle sulfate-free daily shampoo formula' },
        { label: '2 to 3 Times a Week', desc: 'The golden balance for maximum lipid restoration' },
        { label: 'Once a Week', desc: 'Ideal for deep overnight coconut oil mask treatments' }
      ]
    }
  ];

  const handleSelectOption = (field, value) => {
    const nextAnswers = { ...answers, [field]: value };
    setAnswers(nextAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const resetQuiz = () => {
    setAnswers({ hairType: '', concern: '', frequency: '' });
    setCurrentStep(0);
    setQuizFinished(false);
  };

  const bundle = PRODUCTS.find(p => p.id === 'coco-trinity-bundle');

  return (
    <section id="quiz" className="scroll-mt-24 py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-gold-400/30 text-gold-300 text-xs uppercase tracking-widest font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Personalized Hair Diagnosis
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Find Your Custom <br />
          <span className="gold-gradient-text italic font-normal">Coconut Hair Ritual</span>
        </h2>
        <p className="mt-3 text-stone-300 text-xs sm:text-sm font-light">
          Take 45 seconds to discover the ideal application order, frequency, and dosage for your hair.
        </p>
      </div>

      <div className="glass-luxe rounded-3xl border border-gold-400/30 p-6 sm:p-10 shadow-2xl relative">
        {!quizFinished ? (
          <div>
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-6 pb-4 border-b border-white/10">
              <span className="text-gold-300">Step {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              {questions[currentStep].title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mb-8 font-light">
              {questions[currentStep].subtitle}
            </p>

            {/* Options grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(questions[currentStep].id, opt.label)}
                  className="text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold-400/60 hover:bg-gold-500/10 transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-serif text-lg font-semibold text-white group-hover:text-gold-200">
                      {opt.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-gold-300 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-stone-400 mt-2 font-light">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="mt-6 text-xs text-stone-400 hover:text-stone-200 underline"
              >
                ← Back to previous question
              </button>
            )}
          </div>
        ) : (
          /* Quiz Results Screen */
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 rounded-full bg-gold-400/20 border-2 border-gold-400 flex items-center justify-center text-gold-300 mx-auto shadow-glow-gold">
              <Gift className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 block mb-1">
                Diagnosis Complete • Your Bespoke Formulation Match
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                The Sacred Trinity Ritual System
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto mt-2 font-light">
                For your <strong className="text-gold-300 font-semibold">{answers.hairType}</strong> hair with <strong className="text-gold-300 font-semibold">{answers.concern}</strong>:
              </p>
            </div>

            {/* Recommended Routine Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto my-6">
              <div className="glass-dark p-4 rounded-2xl border border-white/10">
                <span className="text-[10px] uppercase font-mono text-gold-400 font-bold block mb-1">Step 1: Scalp Pre-Wash</span>
                <h4 className="font-serif font-bold text-stone-100 text-sm">Coco Aura Hair Oil</h4>
                <p className="text-xs text-stone-400 mt-1 font-light">Apply 4 drops to dry scalp 30 mins before washing to invigorate follicles.</p>
              </div>

              <div className="glass-dark p-4 rounded-2xl border border-white/10">
                <span className="text-[10px] uppercase font-mono text-gold-400 font-bold block mb-1">Step 2: Cleanse & Milk</span>
                <h4 className="font-serif font-bold text-stone-100 text-sm">Nourishing Shampoo</h4>
                <p className="text-xs text-stone-400 mt-1 font-light">Lather gently with lukewarm water. Dissolves sebum without drying.</p>
              </div>

              <div className="glass-dark p-4 rounded-2xl border border-white/10">
                <span className="text-[10px] uppercase font-mono text-gold-400 font-bold block mb-1">Step 3: Cuticle Seal</span>
                <h4 className="font-serif font-bold text-stone-100 text-sm">Deep Conditioner</h4>
                <p className="text-xs text-stone-400 mt-1 font-light">Leave for 4 mins on mid-lengths to lock moisture with plant ceramides.</p>
              </div>
            </div>

            {/* Exclusive Promo Code Box */}
            <div className="glass-pill p-4 rounded-2xl border border-gold-400/40 max-w-md mx-auto flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-300 uppercase tracking-wider block">Exclusive Quiz Voucher:</span>
                <span className="text-lg font-mono font-bold text-gold-300">COCO15 (15% OFF)</span>
              </div>
              <span className="text-xs text-stone-400 font-mono">Applies at checkout</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  if (bundle) {
                    onAddToCart({
                      id: `${bundle.id}-0`,
                      baseId: bundle.id,
                      name: bundle.name,
                      subtitle: bundle.subtitle,
                      volume: bundle.volumeOptions[0],
                      price: bundle.price,
                      image: bundle.image
                    });
                  }
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 text-botanical-darkest font-semibold text-xs tracking-wider uppercase shadow-glow-gold hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Recommended Trinity Bundle ($78)</span>
              </button>

              <button
                onClick={resetQuiz}
                className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
