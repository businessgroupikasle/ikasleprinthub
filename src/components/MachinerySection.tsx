import React, { useState } from 'react';
import { Cpu, Zap, Eye, CheckCircle2, ArrowRight } from 'lucide-react';

interface MachinerySectionProps {
  onOpenQuote: (machineName?: string) => void;
}

export const MachinerySection: React.FC<MachinerySectionProps> = ({ onOpenQuote }) => {
  const [activeTab, setActiveTab] = useState(0);

  const machines = [
    {
      id: 'heidelberg',
      title: 'Heidelberg Speedmaster 5-Color Offset Press',
      category: 'CORE OFFSET PRODUCTION',
      image: '/assets/images/machine_heidelberg_offset.jpg',
      badge: '15,000 Sheets / Hr',
      desc: 'Our flagship German Heidelberg 5-color offset press delivers unmatched color vibrancy and sharp typography with real-time in-line spectrophotometer scanning.',
      specs: [
        '2400 DPI Micron Thermal CTP Laser Plates',
        'Automatic Ink Agitation & Spectrophotometer Control',
        'Handles 80 GSM Paper to 450 GSM Heavy Board',
        'Pantone Matching & Metallic Ink Integration',
      ],
      idealFor: 'Bulk visiting cards, product catalogues, corporate brochures, and luxury packaging.',
    },
    {
      id: 'uv-large-format',
      title: 'SpectraJet Pro 3200 UV-LED Hybrid System',
      category: 'INDUSTRIAL SIGNAGE & BANNERS',
      image: '/assets/images/machine_large_format_uv.jpg',
      badge: '3.2 Meter Seamless Bed',
      desc: 'Heavy-duty industrial UV flatbed and roll-to-roll printing powerhouse engineered for weatherproof banners, architectural signage, and exhibition displays.',
      specs: [
        'Instant UV-LED Curing (Scratch & Fade Proof)',
        'Direct-to-Substrate: Acrylic, Foam Board, Canvas & Vinyl',
        'Double-Sided Day & Night Backlit Illumination Quality',
        '5-Year UV Outdoor Durability Guarantee',
      ],
      idealFor: 'CODISSIA exhibition stalls, billboard flex banners, roll-up standees, and retail store LED boards.',
    },
    {
      id: 'digital-press',
      title: 'High-Speed Production Digital Press & Hydraulic Cutter',
      category: 'RUSH & SHORT RUN PRINTING',
      image: '/assets/images/machine_digital_press.jpg',
      badge: 'Same-Day Dispatch',
      desc: 'Advanced digital toner press paired with computerized programmable hydraulic guillotines for express turnaround without any minimum order quantities.',
      specs: [
        'Automated Color Calibration with Zero Set-Up Delay',
        'Variable Data Printing (Numbered Coupons, Barcodes, QR Codes)',
        'Hydraulic Micro-Cut Accuracy to 0.1 Millimeter',
        'Same-Day Delivery across Coimbatore Zones',
      ],
      idealFor: 'Same-day visiting cards, marketing flyers, event invitations, and serialized product labels.',
    },
  ];

  return (
    <section id="machinery" className="machinery-section">
      <div className="container">
        {/* Section Header */}
        <div className="machinery-header">
          <div className="section-tag yellow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={16} />
            <span>HEAVY-DUTY INFRASTRUCTURE</span>
          </div>

          <h2 className="machinery-title">
            Our Advanced Industrial Printing Machinery
          </h2>

          <p className="machinery-lead">
            We invest in world-class German offset presses and high-resolution industrial UV technology to guarantee unmatched precision, rich CMYK color depth, and rapid delivery across Coimbatore.
          </p>
        </div>

        {/* Machine Switcher Tabs */}
        <div className="machinery-tabs-nav" role="tablist">
          {machines.map((m, idx) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`machinery-tab-btn ${activeTab === idx ? 'active' : ''}`}
              role="tab"
              aria-selected={activeTab === idx}
            >
              <span className="tab-pill-badge">{`0${idx + 1}`}</span>
              <span className="tab-pill-name">{m.title.split(' ')[0]} {m.title.split(' ')[1]}</span>
            </button>
          ))}
        </div>

        {/* Featured Active Machine Display Card */}
        <div className="machinery-featured-card">
          <div className="machinery-image-col">
            <div className="machine-img-container">
              <img
                src={machines[activeTab].image}
                alt={machines[activeTab].title}
                className="machine-main-img"
                loading="lazy"
              />
              <div className="machine-floating-badge">
                <Zap size={14} className="zap-icon" />
                <span>{machines[activeTab].badge}</span>
              </div>
            </div>
          </div>

          <div className="machinery-info-col">
            <div className="machine-category-label">{machines[activeTab].category}</div>
            <h3 className="machine-display-name">{machines[activeTab].title}</h3>
            <p className="machine-desc-text">{machines[activeTab].desc}</p>

            <div className="machine-specs-box">
              <div className="specs-box-title">Engineered Specifications:</div>
              <ul className="machine-specs-list">
                {machines[activeTab].specs.map((spec, sIdx) => (
                  <li key={sIdx} className="machine-spec-item">
                    <CheckCircle2 size={16} className="spec-check-icon" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="machine-ideal-box">
              <span className="ideal-label">Best Applications:</span>
              <span className="ideal-text">{machines[activeTab].idealFor}</span>
            </div>

            <div className="machine-cta-row">
              <button
                onClick={() => onOpenQuote(machines[activeTab].title)}
                className="btn-yellow"
                style={{ padding: '12px 24px' }}
              >
                <span>Request Print Quote</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Machine Thumbnail Grid Below */}
        <div className="machinery-grid-row">
          {machines.map((m, idx) => (
            <div
              key={m.id}
              className={`machine-mini-card ${activeTab === idx ? 'active-mini' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <div className="mini-card-thumb-wrap">
                <img src={m.image} alt={m.title} className="mini-card-thumb" loading="lazy" />
                <span className="mini-card-overlay-btn">
                  <Eye size={16} />
                </span>
              </div>
              <div className="mini-card-content">
                <span className="mini-card-cat">{m.category}</span>
                <h4 className="mini-card-title">{m.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachinerySection;
