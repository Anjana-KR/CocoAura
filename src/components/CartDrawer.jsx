import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Tag, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const subtotal = Math.max(0, rawSubtotal - discountAmount);
  const freeShippingThreshold = 50;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingAmount = isFreeShipping || cartItems.length === 0 ? 0 : 7;
  const total = subtotal + shippingAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'COCO15' || code === 'COCOAURA15') {
      setDiscountPercent(15);
      setAppliedPromo(code);
      setPromoError('');
    } else if (code === 'RITUAL20') {
      setDiscountPercent(20);
      setAppliedPromo(code);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try COCO15');
    }
  };

  const handleProceedCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed(true);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
      onClearCart();
    }, 1200);
  };

  const handleFinishOrder = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c1b14] border-l border-gold-400/20 text-[#F7F4EE] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold-300" />
              <h2 className="font-serif text-xl font-bold tracking-tight">Your Coconut Ritual Bag</h2>
              <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded-full text-gold-300">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#142820] px-6 py-3 border-b border-white/5">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span>
                {isFreeShipping 
                  ? <span className="text-emerald-400 font-bold flex items-center gap-1">✨ You've Unlocked Free Express Shipping!</span>
                  : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for Free Shipping`
                }
              </span>
              <span className="text-gold-300 font-bold">{Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%</span>
            </div>
            <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gold-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderConfirmed ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto shadow-glow-gold">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Order Confirmed!</h3>
                <p className="text-xs text-stone-300 max-w-xs mx-auto leading-relaxed">
                  Thank you for welcoming Coco Aura into your hair sanctuary. Your cold-pressed elixirs are being packed in Kerala and prepared for dispatch.
                </p>
                <div className="glass-pill p-3 rounded-xl border border-white/10 text-xs font-mono text-gold-300">
                  Tracking Order #CA-94827
                </div>
                <button
                  onClick={handleFinishOrder}
                  className="mt-4 px-6 py-2.5 rounded-full bg-gold-400 text-botanical-darkest font-semibold text-xs tracking-wider uppercase"
                >
                  Continue Exploring
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-stone-500">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg text-stone-200">Your bag is empty</h4>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  Immerse your locks in pure cold-pressed coconut hydration.
                </p>
                <a
                  href="#products"
                  onClick={onClose}
                  className="inline-block mt-2 px-6 py-2.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/40 text-xs font-medium hover:bg-gold-400/30 transition-all"
                >
                  Explore The Collection
                </a>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="glass-dark p-3.5 rounded-2xl border border-white/5 flex gap-3.5 items-center"
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-stone-900 border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-bold text-white truncate">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-gold-300/80 font-mono block">
                      {item.volume}
                    </span>
                    <span className="text-xs font-semibold text-stone-200 mt-1 block">
                      ${item.price} each
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-500 hover:text-red-400 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-stone-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-mono font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-stone-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {!orderConfirmed && cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#091410]/80 space-y-4">
              
              {/* Promo code input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon code (COCO15)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-gold-400 font-mono uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-gold-500/20 hover:border-gold-400 border border-white/10 text-xs font-mono font-medium text-gold-300 transition-all"
                >
                  Apply
                </button>
              </form>

              {appliedPromo && (
                <div className="text-[11px] text-emerald-400 font-mono flex items-center justify-between">
                  <span>Promo Code "{appliedPromo}" Applied!</span>
                  <span>-{discountPercent}%</span>
                </div>
              )}

              {promoError && (
                <div className="text-[11px] text-red-400 font-mono">
                  {promoError}
                </div>
              )}

              {/* Cost Rows */}
              <div className="space-y-1.5 text-xs text-stone-300 pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">${rawSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-mono">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="font-mono text-white">
                    {isFreeShipping ? <span className="text-emerald-400 font-bold uppercase">FREE</span> : `$${shippingAmount.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span className="font-serif">Total</span>
                  <span className="font-serif text-gold-300 text-lg">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 text-botanical-darkest font-semibold text-xs uppercase tracking-wider shadow-glow-gold hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Complete Order • ${total.toFixed(2)}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 text-[10px] text-stone-400 font-mono">
                <span>🔒 256-Bit SSL Encrypted</span>
                <span>•</span>
                <span>30-Day Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
