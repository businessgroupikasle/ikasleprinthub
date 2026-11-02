import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface SamplePackSectionProps {
  onOrderSamplePack: () => void;
}

export const SamplePackSection: React.FC<SamplePackSectionProps> = ({
  onOrderSamplePack,
}) => {
  return (
    <section id="sample-packs" className="sample-pack-section">
      <div className="container">
        <div
          className="sample-pack-banner-card"
          onClick={onOrderSamplePack}
          role="region"
          aria-label="Sample Packs - Discover our bestselling products"
        >
          {/* Main Visual Image Banner */}
          <div className="sample-pack-image-wrapper">
            <img
              src="/assets/images/sample_pack_cropped_perfect.png?v=2"
              alt="Sample Packs - Discover our bestselling products. A4 paper, envelope, and luxury business card mockups."
              className="sample-pack-banner-img"
              loading="lazy"
            />

            {/* iKASLÉ Logo Brand Overlays on Stationery Items */}
            <div className="stationery-ikasle-tag tag-a4" aria-hidden="true">
              <span className="brand-logo-text">iKASLÉ</span>
            </div>
            <div className="stationery-ikasle-tag tag-card" aria-hidden="true">
              <span className="brand-logo-text">iKASLÉ</span>
            </div>

            {/* Interactive Clickable Hotspot Button (Positioned over 'Order yours now') */}
            <button
              type="button"
              className="sample-pack-hotspot-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOrderSamplePack();
              }}
              title="Order your free bestseller sample pack"
              aria-label="Order your free sample pack now"
            >
              <span className="hotspot-arrow">
                <ArrowUpRight size={16} strokeWidth={2.4} />
              </span>
              <span className="hotspot-text">Order yours now</span>
            </button>
          </div>

          {/* Hidden Accessible Description for Screen Readers & SEO */}
          <div className="sr-only">
            <h3>Sample Packs</h3>
            <p>Discover our bestselling products. Order your sample kit today to touch and feel our premium paper stocks, finishes, and print quality before placing a bulk order.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SamplePackSection;
