import React from 'react';
import { ArrowRight, Flag, Monitor, Store, Truck, LayoutTemplate } from 'lucide-react';

interface LargeFormatSectionProps {
  onRequestLargeFormat: () => void;
}

export const LargeFormatSection: React.FC<LargeFormatSectionProps> = ({
  onRequestLargeFormat,
}) => {
  const categories = [
    { name: 'Banners', icon: <Flag size={20} /> },
    { name: 'Billboards', icon: <Monitor size={20} /> },
    { name: 'Storefronts', icon: <Store size={20} /> },
    { name: 'Vehicle Wraps', icon: <Truck size={20} /> },
    { name: 'Wall Graphics', icon: <LayoutTemplate size={20} /> },
  ];

  return (
    <section id="large-format" className="large-format-section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background with geometric angles */}
      <div className="large-format-bg" />

      {/* Yellow geometric accent wedges */}
      <div className="large-format-accent-shape" />

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div className="large-format-grid">
          {/* Left Column: Headlines, Actions & Icons */}
          <div className="large-format-left">
            <div className="section-tag yellow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px', lineHeight: 1 }}>◎</span>
              <span>GO BIGGER</span>
            </div>

            <h2 className="section-heading-dark" style={{ maxWidth: '420px', marginTop: '6px' }}>
              Large Format Printing for a Bigger Impact
            </h2>

            <p className="section-desc-dark" style={{ maxWidth: '420px', marginTop: '16px' }}>
              Grab attention with high-quality large format prints that make your brand impossible to ignore.
            </p>

            <button onClick={onRequestLargeFormat} className="btn-yellow" style={{ marginTop: '10px' }}>
              <span>Request Large Format</span>
              <ArrowRight size={18} />
            </button>

            {/* 5 Icons Row */}
            <div className="large-format-icons-row" style={{ marginTop: '48px' }}>
              {categories.map((item) => (
                <div key={item.name} className="large-format-icon-col">
                  <div className="lf-icon-circle">
                    {item.icon}
                  </div>
                  <span className="lf-icon-label">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Billboard & Shopfront Image */}
          <div className="large-format-right">
            <div className="large-format-image-card">
              <img
                src="/assets/images/large_format_signage.jpg"
                alt="iKASLÉ Large Format Signage Billboard and Storefront"
                className="large-format-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
