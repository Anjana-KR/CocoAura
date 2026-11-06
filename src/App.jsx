import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroScroll from './components/HeroScroll';
import ProductSection from './components/ProductSection';
import InteractiveBeforeAfter from './components/InteractiveBeforeAfter';
import ColdPressedJourney from './components/ColdPressedJourney';
import IngredientDeepDive from './components/IngredientDeepDive';
import HairRitualQuiz from './components/HairRitualQuiz';
import ReviewsAndClinical from './components/ReviewsAndClinical';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';

export default function App() {
  const [cartItems, setCartItems] = useState([
    {
      id: 'coco-trinity-bundle-0',
      baseId: 'coco-trinity-bundle',
      name: 'The Sacred CocoAura Trinity Ritual Bundle',
      subtitle: 'Complete 3-Step Cold-Pressed Coconut Hair System',
      volume: 'Full Ritual Set (Shampoo + Conditioner + Hair Oil)',
      price: 78,
      quantity: 1,
      image: './images/shampoo.jpg'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Cart helper calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleAddToCart = (productToAdd) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productToAdd.id);
      if (existing) {
        return prev.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...productToAdd, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(prev =>
        prev.map(item => item.id === id ? { ...item, quantity: newQty } : item)
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleToggleVideoAudio = () => {
    setIsVideoMuted(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-[#091410] text-[#F7F4EE] relative selection:bg-gold-500 selection:text-botanical-darkest">
      
      {/* Top Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        {/* Core Scrolling Animated Video Hero Section */}
        <HeroScroll />

        {/* 3 Core Products + Bundle Showcase */}
        <ProductSection
          onAddToCart={handleAddToCart}
          onOpenQuickView={handleOpenQuickView}
        />

        {/* Interactive Before & After Comparison Slider */}
        <InteractiveBeforeAfter />

        {/* Sub-38°C Cold-Pressed Extraction Timeline */}
        <ColdPressedJourney />

        {/* Molecular Coconut Ingredient Deep Dive */}
        <IngredientDeepDive />

        {/* 3-Step Interactive Hair Diagnostic Quiz */}
        <HairRitualQuiz
          onAddToCart={handleAddToCart}
        />

        {/* Verified Reviews & Clinical Proof */}
        <ReviewsAndClinical />
      </main>

      {/* Sustainable Botanical Footer with FAQs & Newsletter */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Product Quick View Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseQuickView}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
