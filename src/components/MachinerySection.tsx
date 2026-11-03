import React, { useState } from 'react';
import { Sparkles, Zap, Eye, CheckCircle2, ArrowRight } from 'lucide-react';

interface MachinerySectionProps {
  onOpenQuote: (serviceName?: string) => void;
}

export const MachinerySection: React.FC<MachinerySectionProps> = ({ onOpenQuote }) => {
  const [activeTab, setActiveTab] = useState(0);

  const capabilities = [
    {
      id: 'commercial-offset',
      title: 'Commercial Offset & Bulk Printing Services',
      category: 'HIGH-VOLUME COMMERCIAL SERVICES',
      image: '/assets/images/machine_heidelberg_offset.jpg',
      badge: 'Bulk Volume & Cost Efficiency',
      desc: 'End-to-end commercial printing services tailored for corporate collateral, product catalogues, brochures, and custom packaging. We manage complete pre-press proofing, color calibration, and bulk finishing with maximum cost efficiency for your business.',
      specs: [
        'Comprehensive Pre-flight File Review & CTP Color Proofing',
        'Vibrant CMYK & Exact Pantone Color Consistency at Scale',
        'Curated Paper Stock Advisory (80 GSM Bond to 450 GSM Heavy Board)',
        'Premium Post-Press Finishes: Spot UV, Gold Foiling & Thermal Lamination',
      ],
      idealFor: 'Bulk visiting cards, product catalogues, corporate brochures, annual reports, and custom rigid packaging.',
      quoteService: 'Brochures & Flyers',
      ctaText: 'Request Offset Quote',
    },
    {
      id: 'uv-signage',
      title: 'Large Format Signage & Brand Display Solutions',
      category: 'SIGNAGE & EVENT BRANDING SERVICES',
      image: '/assets/images/machine_large_format_uv.jpg',
      badge: 'Weatherproof & High-Impact',
      desc: 'Turnkey display and signage fabrication services for retail storefronts, corporate office interiors, and major exhibitions like CODISSIA. From substrate recommendation to vibrant UV printing and custom mounting, we deliver ready-to-install visual branding.',
      specs: [
        'Direct-to-Substrate UV Printing: Acrylic, Sunboard, Foam Sheet & Canvas',
        'Weatherproof, UV-Resistant & Scratch-Proof Outdoor Durability',
        'Seamless Extra-Wide Banners, Backlit Glow Signs & Roll-Up Standees',
        'Complete Dimension Planning, Fabrication & Installation Guidance',
      ],
      idealFor: 'CODISSIA exhibition stalls, billboard flex banners, retail showroom branding, and roll-up standees.',
      quoteService: 'Signage & Banners',
      ctaText: 'Request Signage Quote',
    },
    {
      id: 'express-digital',
      title: 'Express Digital Printing & Short-Run Solutions',
      category: 'ON-DEMAND & EXPRESS PRINT SERVICES',
      image: '/assets/images/machine_digital_press.jpg',
      badge: 'Zero MOQ • Same-Day Dispatch',
      desc: 'Agile, on-demand digital printing services built for urgent business timelines, event collaterals, prototypes, and targeted marketing campaigns without any minimum order restrictions or lengthy setup delays.',
      specs: [
        'Same-Day Delivery & Rapid Dispatch across Coimbatore Zones',
        'Zero Minimum Order Quantity (Zero MOQ) — Print Only What You Need',
        'Variable Data Printing (VDP) for Serialized Cards, QR Codes & Names',
        'Computerized Micro-Cut Accuracy to 0.1mm with Custom Folding & Creasing',
      ],
      idealFor: 'Same-day visiting cards, marketing flyers, corporate event invitations, serialized labels, and launch materials.',
      quoteService: 'Business Cards',
      ctaText: 'Request Express Quote',
    },
  ];

  return (
    <section id="machinery" className="machinery-section">
      <div className="container">
        {/* Section Header */}
        <div className="machinery-header">
          <div className="section-tag yellow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} />
            <span>FULL-SERVICE PRINT SOLUTIONS</span>
          </div>

          <h2 className="machinery-title">
            Our End-to-End Print Service Capabilities
          </h2>

          <p className="machinery-lead">
            As a trusted service-based printing partner in Coimbatore, we handle your entire project lifecycle—from artwork pre-flight audit and material advisory to precision production, bespoke finishing, and doorstep delivery.
          </p>
        </div>

        {/* Service Capability Selection Cards */}
        <div className="machinery-grid-row" role="tablist" aria-label="Service capability selection">
          {capabilities.map((c, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={c.id}
                type="button"
                id={`machinery-tab-${c.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`machinery-panel-${c.id}`}
                tabIndex={isActive ? 0 : -1}
                className={`machine-mini-card ${isActive ? 'active-mini' : ''}`}
                onClick={() => setActiveTab(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    setActiveTab((idx + 1) % capabilities.length);
                  } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    setActiveTab((idx - 1 + capabilities.length) % capabilities.length);
                  }
                }}
              >
                <div className="mini-card-thumb-wrap">
                  <img src={c.image} alt={c.title} className="mini-card-thumb" loading="lazy" />
                  <span className="mini-card-overlay-btn" aria-hidden="true">
                    <Eye size={16} />
                  </span>
                </div>
                <div className="mini-card-content">
                  <span className="mini-card-cat">{c.category}</span>
                  <h4 className="mini-card-title">{c.title}</h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured Active Service Display Card */}
        <div
          id={`machinery-panel-${capabilities[activeTab].id}`}
          role="tabpanel"
          aria-labelledby={`machinery-tab-${capabilities[activeTab].id}`}
          key={capabilities[activeTab].id}
          className="machinery-featured-card"
        >
          <div className="machinery-image-col">
            <div className="machine-img-container">
              <img
                src={capabilities[activeTab].image}
                alt={capabilities[activeTab].title}
                className="machine-main-img"
                loading="lazy"
              />
              <div className="machine-floating-badge">
                <Zap size={14} className="zap-icon" />
                <span>{capabilities[activeTab].badge}</span>
              </div>
            </div>
          </div>

          <div className="machinery-info-col">
            <div className="machine-category-label">{capabilities[activeTab].category}</div>
            <h3 className="machine-display-name">{capabilities[activeTab].title}</h3>
            <p className="machine-desc-text">{capabilities[activeTab].desc}</p>

            <div className="machine-specs-box">
              <div className="specs-box-title">Service Capabilities & Standards:</div>
              <ul className="machine-specs-list">
                {capabilities[activeTab].specs.map((spec, sIdx) => (
                  <li key={sIdx} className="machine-spec-item">
                    <CheckCircle2 size={16} className="spec-check-icon" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="machine-ideal-box">
              <span className="ideal-label">Best Applications:</span>
              <span className="ideal-text">{capabilities[activeTab].idealFor}</span>
            </div>

            <div className="machine-cta-row">
              <button
                type="button"
                onClick={() => onOpenQuote(capabilities[activeTab].quoteService || capabilities[activeTab].title)}
                className="btn-yellow"
                style={{ padding: '12px 24px' }}
              >
                <span>{capabilities[activeTab].ctaText}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MachinerySection;
