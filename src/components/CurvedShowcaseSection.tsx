import React, { useState, useRef } from 'react';
import { Eye } from 'lucide-react';
import type { PortfolioItem } from './FeaturedWorkSection';

interface CurvedShowcaseSectionProps {
  onSelectPortfolio?: (item: PortfolioItem) => void;
}

interface ShowcaseCard {
  id: string;
  title: string;
  category: string;
  image: string;
  specs: string;
  client: string;
  turnaround: string;
}

const SHOWCASE_ITEMS: ShowcaseCard[] = [
  {
    id: 'cards-1',
    title: 'Luxury Foil Business Cards',
    category: 'CORPORATE BRANDING',
    image: '/assets/images/work_business_cards.jpg',
    specs: '600 GSM Cotton • Gold & Navy Foil • Edge Paint',
    client: 'Apex Capital',
    turnaround: '48 Hours',
  },
  {
    id: 'packaging-1',
    title: 'Custom Luxury Rigid Box',
    category: 'CUSTOM PACKAGING',
    image: '/assets/images/cat_packaging_boxes.jpg',
    specs: 'Rigid Cardboard • Velvet Lamination • Embossed Gold',
    client: 'Aura Botanicals',
    turnaround: '5 Days',
  },
  {
    id: 'brochures-1',
    title: 'Tri-Fold Architectural Brochure',
    category: 'MARKETING COLLATERAL',
    image: '/assets/images/work_brochures.jpg',
    specs: '250 GSM Silk Cover • Spot UV • Precision Crease',
    client: 'Veridian Studio',
    turnaround: '3 Days',
  },
  {
    id: 'signage-1',
    title: 'LED Backlit Retail Signage',
    category: 'SIGNAGE & BANNERS',
    image: '/assets/images/large_format_signage.jpg',
    specs: 'Weatherproof UV • Aluminum Extrusion • Double-Sided',
    client: 'Monolith Design',
    turnaround: '4 Days',
  },
  {
    id: 'stickers-1',
    title: 'Die-Cut Holographic Stickers',
    category: 'STICKERS & LABELS',
    image: '/assets/images/cat_stickers_labels.jpg',
    specs: 'Waterproof Vinyl • Holographic Sheen • Zero Residue',
    client: 'HyperPulse Tech',
    turnaround: '24 Hours',
  },
  {
    id: 'apparel-1',
    title: 'Corporate Branded Apparel',
    category: 'CUSTOM APPAREL',
    image: '/assets/images/cat_tshirt_printing.jpg',
    specs: '100% Ring-Spun Cotton • Screen Print & Embroidery',
    client: 'Nexus Global',
    turnaround: '3 Days',
  },
  {
    id: 'gifts-1',
    title: 'Custom Sublimation Drinkware',
    category: 'CORPORATE GIFTS',
    image: '/assets/images/work_custom_gifts.jpg',
    specs: 'Ceramic & Stainless Steel • High Gloss Sublimation',
    client: 'Starlight Media',
    turnaround: '24 Hours',
  },
  {
    id: 'display-1',
    title: 'Exhibition Product Showcase',
    category: 'RETAIL DISPLAY',
    image: '/assets/images/hero_product_display.jpg',
    specs: 'Heavy-Duty Acrylic • High-Impact Color Printing',
    client: 'Kroma Studio',
    turnaround: '4 Days',
  },
  {
    id: 'branding-1',
    title: 'Complete Brand Identity Suite',
    category: 'BRANDING SOLUTIONS',
    image: '/assets/images/cat_branding_solutions.jpg',
    specs: 'Letterheads • Envelopes • Folders • NFC Smart Cards',
    client: 'Vanguard Partners',
    turnaround: '5 Days',
  },
  {
    id: 'packaging-2',
    title: 'Eco-Friendly Kraft Packaging',
    category: 'ECO CARTONS',
    image: '/assets/images/work_packaging.jpg',
    specs: 'Recycled Kraft Stock • Soy-Based Eco Inks • Window Cut',
    client: 'Terra Organics',
    turnaround: '4 Days',
  },
];

export const CurvedShowcaseSection: React.FC<CurvedShowcaseSectionProps> = ({
  onSelectPortfolio,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [manualAngle, setManualAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(0);

  const totalCards = SHOWCASE_ITEMS.length; // 10 cards
  const angleStep = 360 / totalCards; // 36 deg per card
  const radius = 500; // 3D cylinder ring radius giving tight, snug gaps between cards

  // Drag interaction to spin ring manually
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
    setManualAngle(dragStartAngleRef.current + deltaX * 0.35);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  return (
    <section id="curved-showcase" className="curved-showcase-section">
      {/* Background Ambience & Lighting */}
      <div className="curved-showcase-backdrop" />

      <div className="container">
        {/* Top Centered Section Header */}
        <div className="curved-showcase-header">
          <div className="section-tag yellow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span className="tag-star">✦</span>
            <span>360° CURVED PANORAMA SHOWCASE</span>
          </div>

          <h2 className="curved-showcase-title">
            Explore Our Craftsmanship in 3D
          </h2>

          <p className="curved-showcase-subtitle">
            An infinite cylindrical gallery of our finest print productions — luxury foils, rigid packaging, and large format branding.
          </p>
        </div>
      </div>

      {/* Full-Width 3D Curved Cylindrical Panorama Stage */}
      <div
        className="curved-panorama-stage"
        onMouseEnter={() => !isDragging && setIsPaused(true)}
        onMouseLeave={() => !isDragging && setIsPaused(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Ambient Top & Side Vignette Masks to fade cards into distance */}
        <div className="panorama-vignette-mask left" />
        <div className="panorama-vignette-mask right" />

        {/* 3D Perspective Box */}
        <div className="curved-cylinder-viewport">
          <div
            className={`curved-cylinder-ring ${isPaused ? 'paused' : ''}`}
            style={
              isDragging || manualAngle !== 0
                ? {
                    transform: `rotateX(-2.5deg) rotateY(${manualAngle}deg)`,
                    animation: 'none',
                  }
                : undefined
            }
          >
            {SHOWCASE_ITEMS.map((item, index) => {
              const rotateY = angleStep * index;
              return (
                <div
                  key={item.id}
                  className="curved-card-item"
                  style={{
                    transform: `rotateY(${rotateY}deg) translateZ(${radius}px)`,
                  }}
                  onClick={() => onSelectPortfolio?.({
                    id: item.id,
                    title: item.title,
                    subtitle: item.category,
                    image: item.image,
                    specs: item.specs,
                    client: item.client,
                    turnaround: item.turnaround,
                  })}
                >
                  {/* Card Image */}
                  <div className="curved-card-img-box">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="curved-card-img"
                      loading="lazy"
                      draggable={false}
                    />
                    <div className="curved-card-glass-sheen" />
                    <div className="curved-card-inspect-hint">
                      <Eye size={16} />
                      <span>Quick View</span>
                    </div>
                  </div>

                  {/* Card Bottom Meta Plate */}
                  <div className="curved-card-meta">
                    <span className="curved-card-category">{item.category}</span>
                    <h3 className="curved-card-title">{item.title}</h3>
                    <p className="curved-card-specs">{item.specs}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ambient Floor Reflection & Glow */}
        <div className="curved-panorama-floor-glow" />
      </div>
    </section>
  );
};
