import React, { useState, useRef } from 'react';
import { ArrowRight, Gem, Zap, Settings2 } from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
  onExploreServices: () => void;
}

interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  image: string;
  tag: string;
}

// 6 Brand New Print Products for IKASLÉ Print Hub
const PRINT_PRODUCTS: ShowcaseItem[] = [
  {
    id: 'cards',
    title: 'Luxury Foil Business Cards',
    category: 'BUSINESS CARDS',
    tag: '450 GSM • VELVET & FOIL',
    image: '/assets/images/cat_business_cards.jpg',
  },
  {
    id: 'packaging',
    title: 'Custom Luxury Rigid Boxes',
    category: 'CUSTOM PACKAGING',
    tag: 'PREMIUM RIGID CARTON',
    image: '/assets/images/cat_packaging_boxes.jpg',
  },
  {
    id: 'brochures',
    title: 'Tri-Fold & Bi-Fold Brochures',
    category: 'FLYERS & BROCHURES',
    tag: '300 GSM ART GLOSS',
    image: '/assets/images/cat_brochures.jpg',
  },
  {
    id: 'signage',
    title: 'Large Format Signage & Standees',
    category: 'SIGNAGE & BANNERS',
    tag: 'WEATHERPROOF ROLL-UP',
    image: '/assets/images/large_format_signage.jpg',
  },
  {
    id: 'stickers',
    title: 'Die-Cut Stickers & Labels',
    category: 'STICKERS & LABELS',
    tag: 'VINYL & WATERPROOF',
    image: '/assets/images/cat_stickers_labels.jpg',
  },
  {
    id: 'apparel',
    title: 'Corporate Apparel & Merch',
    category: 'CUSTOM APPAREL',
    tag: 'SCREEN PRINT & EMBROIDERY',
    image: '/assets/images/cat_tshirt_printing.jpg',
  },
];

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onExploreServices }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [manualAngle, setManualAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(0);

  const currentItems = PRINT_PRODUCTS;
  const totalFaces = currentItems.length;
  const angleStep = 360 / totalFaces; // 60 deg for 6 faces

  // Mouse & Touch Drag Handlers to allow manual 3D rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsPaused(true);
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = manualAngle;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartXRef.current;
    // Map drag distance to rotation angle (0.4 deg per pixel)
    setManualAngle(dragStartAngleRef.current + deltaX * 0.45);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  return (
    <section id="home" className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Dynamic Rainbow Aurora Spectrum Background */}
      <div className="hero-rainbow-aurora">
        <div className="rainbow-blob blob-1" />
        <div className="rainbow-blob blob-2" />
        <div className="rainbow-blob blob-3" />
        <div className="rainbow-blob blob-4" />
      </div>

      {/* Geometric Overlay */}
      <div className="hero-bg-overlay" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid">
          {/* Left Column: Headlines & Actions */}
          <div className="hero-left">
            {/* Top Eyebrow Tagline with CMYK Rainbow Spectrum */}
            <div className="hero-eyebrow">
              <div className="rainbow-cmyk-pills" title="Full CMYK Color Spectrum">
                <span className="cmyk-dot cyan" />
                <span className="cmyk-dot magenta" />
                <span className="cmyk-dot yellow" />
                <span className="cmyk-dot black" />
              </div>
              <span className="eyebrow-item cyan">PRINTING</span>
              <span className="eyebrow-dot">•</span>
              <span className="eyebrow-item magenta">BRANDING</span>
              <span className="eyebrow-dot">•</span>
              <span className="eyebrow-item yellow">SIGNAGE</span>
              <span className="eyebrow-dot">•</span>
              <span className="eyebrow-item key">CUSTOM SOLUTIONS</span>
            </div>

            {/* Main Headline (Optimized Single H1 for Coimbatore Printing Services SEO) */}
            <h1 className="hero-headline">
              <span className="headline-line white">Professional Printing Services</span>
              <span className="headline-line yellow">in Coimbatore</span>
            </h1>

            {/* Subtitle Description */}
            <p className="hero-description">
              Looking for the best printing services in Coimbatore? Choose Ikasle PrintHub for custom printing, business card printing, brochures, flyers, banners, stickers and corporate printing solutions at competitive prices.
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons">
              <button onClick={onOpenQuote} className="btn-yellow hero-btn-quote">
                <span>Get a Quote</span>
                <ArrowRight size={18} />
              </button>

              <button onClick={onExploreServices} className="btn-outline-white hero-btn-explore">
                <span>Explore Our Services</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Feature Highlights Row */}
            <div className="hero-features-row">
              <div className="feature-item">
                <div className="feature-icon-badge">
                  <Gem size={20} className="feature-svg" />
                </div>
                <div className="feature-text">
                  <div className="feature-title">Premium</div>
                  <div className="feature-sub">Print Quality</div>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-badge">
                  <Zap size={20} className="feature-svg" />
                </div>
                <div className="feature-text">
                  <div className="feature-title">Fast</div>
                  <div className="feature-sub">Turnaround</div>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-badge">
                  <Settings2 size={20} className="feature-svg" />
                </div>
                <div className="feature-text">
                  <div className="feature-title">Custom</div>
                  <div className="feature-sub">Solutions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Rotating Showcase (Print Aura Style) */}
          <div className="hero-right">
            {/* Top Right Script Accent & 4 Pillars */}
            <div className="hero-script-wrapper">
              <div className="hero-script-text">
                More<br />
                Than Print,<br />
                A Stronger<br />
                You
              </div>
              <div className="hero-pillars-column">
                <span>PRINT</span>
                <span>BRAND</span>
                <span>PROMOTE</span>
                <span>GROW</span>
              </div>
            </div>

            {/* Main 3D Cylinder Stage */}
            <div className="hero-3d-stage-wrapper">
              {/* Backlight Glow Behind Cylinder */}
              <div className="hero-mockup-glow" />

              {/* Tilted Wrapper (Print Aura 20deg dynamic tilt) */}
              <div
                className="hero-3d-tilt-wrapper"
                onMouseEnter={() => !isDragging && setIsPaused(true)}
                onMouseLeave={() => !isDragging && setIsPaused(false)}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                title="Hover to pause • Drag to rotate"
              >
                <div className="hero-3d-rotate-container">
                  <div
                    className={`hero-3d-carousel ${isPaused ? 'paused' : ''}`}
                    style={
                      isDragging || manualAngle !== 0
                        ? {
                            transform: `rotateY(${manualAngle}deg)`,
                            animation: 'none',
                          }
                        : undefined
                    }
                  >
                    {currentItems.map((item, index) => {
                      const rotateY = angleStep * index;
                      return (
                        <div
                          key={item.id}
                          className="hero-3d-face"
                          style={{
                            transform: `rotateY(${rotateY}deg) translateZ(var(--face-radius, 246px))`,
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="hero-3d-face-img"
                            loading="eager"
                            draggable={false}
                          />
                          <div className="hero-3d-face-label">
                            <span className="hero-3d-face-tag">{item.tag}</span>
                            <span className="hero-3d-face-title">{item.title}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Ground Shadow Pulse */}
                <div className="hero-3d-ground-shadow" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal Bottom Edge Accent with Rainbow Flare */}
      <div className="hero-bottom-cut">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
          <defs>
            <linearGradient id="rainbowLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00D2FF" />
              <stop offset="20%" stopColor="#8A2BE2" />
              <stop offset="40%" stopColor="#E91E8C" />
              <stop offset="60%" stopColor="#FF6B00" />
              <stop offset="80%" stopColor="#FFF000" />
              <stop offset="100%" stopColor="#00F5A0" />
            </linearGradient>
          </defs>
          <polygon points="0,60 1440,60 1440,20 0,60" fill="#FFFFFF" />
          <polygon points="0,56 650,60 0,60" fill="url(#rainbowLineGrad)" />
        </svg>
      </div>
    </section>
  );
};

