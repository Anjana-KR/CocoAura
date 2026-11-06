import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react';

const TOTAL_FRAMES = 92;

// Easing function matching Hop/Apple scroll standards
function easeInOutCubic(t) {
  const clampT = Math.max(0, Math.min(1, t));
  return clampT < 0.5 ? 4 * clampT * clampT * clampT : 1 - Math.pow(-2 * clampT + 2, 3) / 2;
}

export default function HeroScroll() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const textSlideRefs = useRef([]);

  const [scrollProgress, setScrollProgress] = useState(0);

  const imagesRef = useRef([]);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const currentFrameRef = useRef(0);
  const lastLoadedFrameRef = useRef(0);

  // Dynamic relative base path for frames
  const basePath = (import.meta.env?.BASE_URL || './').replace(/\/$/, '') + '/';

  // 3 Narrative Slides (Slide 0 is 100% visible at 0% scroll)
  const slides = [
    {
      range: [0.0, 0.28],
      eyebrow: "KERALA BOTANICALS",
      line1: "Born in Nature's",
      line2: "Pristine Cradle.",
      sub: "Where sun-drenched coastal palm trees drink from the Arabian Sea breeze. Pure cold-pressed coconut hydration crafted in Kerala.",
      cta: { text: "Explore The Trio", href: "#products" }
    },
    {
      range: [0.36, 0.64],
      eyebrow: "THE LIVING BURST",
      line1: "Cold-Cracked",
      line2: "Raw Vitality.",
      sub: "Bursting open with active plant electrolytes and 52% virgin Lauric Acid that penetrates deep inside compromised hair cuticles.",
      cta: { text: "Discover The Science", href: "#journey" }
    },
    {
      range: [0.72, 1.0],
      eyebrow: "NATURE'S BLESSING, BOTTLED",
      line1: "Experience",
      line2: "Coco Aura.",
      sub: "Nourishing Shampoo, Deep Hydration Conditioner, and Miraculous Cold-Pressed Hair Oil. Formulated for glass-like shine.",
      cta: { text: "Shop The Collection", href: "#products" }
    }
  ];

  // 1. Draw frame onto canvas with cover aspect ratio
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Use requested frame if loaded, otherwise fallback to last loaded frame
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = imagesRef.current[lastLoadedFrameRef.current];
    } else {
      lastLoadedFrameRef.current = frameIndex;
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const scale = Math.max(width / imgW, height / imgH);
    const sw = imgW * scale;
    const sh = imgH * scale;
    const sx = (width - sw) / 2;
    const sy = (height - sh) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  // 2. Preload frames in background without blocking screen
  useEffect(() => {
    const imgs = [];

    // Frame 1 is loaded immediately
    const firstImg = new Image();
    firstImg.src = `${basePath}frames/frame_001.jpg`;
    firstImg.onload = () => {
      drawFrame(0);
    };
    imgs.push(firstImg);

    // Preload remaining frames
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const padIndex = String(i).padStart(3, '0');
      img.src = `${basePath}frames/frame_${padIndex}.jpg`;
      imgs.push(img);
    }

    imagesRef.current = imgs;
  }, [basePath, drawFrame]);

  // 3. High-DPI canvas resizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // 4. Scroll tracking
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const totalScrollable = containerHeight - windowHeight;

    if (totalScrollable <= 0) return;

    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

    targetProgressRef.current = progress;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 5. 60fps lerp animation loop for canvas & text transitions
  useEffect(() => {
    let animId;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const loop = () => {
      const target = targetProgressRef.current;
      currentProgressRef.current = lerp(currentProgressRef.current, target, 0.18);
      const p = currentProgressRef.current;

      // Draw canvas frame
      const frameIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(p * (TOTAL_FRAMES - 1)))
      );

      if (frameIdx !== currentFrameRef.current) {
        currentFrameRef.current = frameIdx;
        drawFrame(frameIdx);
      }

      // Update Slide Opacities & Transforms smoothly
      slides.forEach((slide, idx) => {
        const el = textSlideRefs.current[idx];
        if (!el) return;

        const [start, end] = slide.range;
        const fadeBuffer = 0.08;
        let opacity = 0;
        let translateY = 0;

        // Slide 0 is 100% visible at the very top (p = 0)
        if (idx === 0 && p < start + fadeBuffer) {
          opacity = 1;
          translateY = 0;
        } else if (p >= start - fadeBuffer && p <= end + fadeBuffer) {
          const fadeIn = easeInOutCubic((p - (start - fadeBuffer)) / fadeBuffer);
          const fadeOut = easeInOutCubic(Math.max(0, p - end) / fadeBuffer);

          opacity = fadeIn * (1 - fadeOut);
          translateY = (1 - fadeIn) * 20 - 20 * fadeOut;
        }

        opacity = Math.max(0, Math.min(1, opacity));
        el.style.opacity = String(opacity);
        el.style.transform = `translate3d(0, ${translateY}px, 0)`;
        el.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [drawFrame, slides]);

  return (
    <section 
      id="hero-story"
      ref={containerRef} 
      className="relative w-full bg-[#091410]"
      style={{ height: '420vh' }}
    >
      {/* Sticky 100vh Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        
        {/* Instant Fallback Background Image (Eliminates any blank screen while frames load) */}
        <img 
          src={`${basePath}frames/frame_001.jpg`}
          alt="Kerala Palm Groves"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Canvas Layer for 60fps Scrubbing */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-10"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
        />

        {/* Cinematic Vignettes: Dark left backdrop for crisp text readability */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#091410] via-transparent to-[#091410]/80 z-15" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#091410]/95 via-[#091410]/60 to-transparent md:w-[65%] z-15" />
        <div className="absolute inset-0 pointer-events-none bg-black/20 z-15" />

        {/* Left-Aligned Floating Narrative Typography Slides */}
        {slides.map((slide, idx) => (
          <div
            key={idx}
            ref={el => (textSlideRefs.current[idx] = el)}
            className="absolute left-0 top-0 bottom-0 w-full md:w-[55%] lg:w-[48%] flex flex-col justify-center items-start text-left px-8 sm:px-14 lg:px-20 z-20"
            style={{ opacity: idx === 0 ? 1 : 0 }}
          >
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-gold-400/30 text-gold-300 text-[11px] uppercase tracking-[0.25em] font-semibold mb-5 shadow-lg backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              {slide.eyebrow}
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.06] mb-5 drop-shadow-2xl">
              <span className="block">{slide.line1}</span>
              <span className="gold-gradient-text italic font-normal block">{slide.line2}</span>
            </h1>

            {/* Subtext description */}
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-md mb-8 drop-shadow">
              {slide.sub}
            </p>

            {/* CTA Button */}
            {slide.cta && (
              <a
                href={slide.cta.href}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-botanical-darkest font-semibold text-xs uppercase tracking-[0.15em] shadow-glow-gold hover:brightness-110 hover:scale-[1.02] transition-all flex items-center gap-2 group pointer-events-auto"
              >
                <span>{slide.cta.text}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            )}
          </div>
        ))}

        {/* Minimal Subtle Scroll Indicator at Bottom Right */}
        <div className="absolute bottom-8 right-8 z-20 hidden sm:flex items-center gap-3 pointer-events-none">
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-stone-400">
            Scroll to Reveal Story
          </span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gold-400 animate-bounce">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Sleek Vertical Progress Line on the Right */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-0.5 h-32 bg-white/10 rounded-full overflow-hidden hidden lg:block z-20">
          <div 
            className="w-full bg-gradient-to-b from-gold-400 to-emerald-400 transition-all duration-75"
            style={{ height: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>

      </div>
    </section>
  );
}
