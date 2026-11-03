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
          {/* Brand-themed copy column (live text: navy / white / yellow) */}
          <div className="sample-pack-content">
            <span className="sample-pack-eyebrow">Sample Packs</span>
            <h3 className="sample-pack-title">
              Discover our <span className="sample-pack-title-accent">bestselling</span> products
            </h3>
            <p className="sample-pack-desc">
              Touch and feel our premium paper stocks, finishes and print quality before you place a bulk order.
            </p>
            <button
              type="button"
              className="btn-yellow sample-pack-cta"
              onClick={(e) => {
                e.stopPropagation();
                onOrderSamplePack();
              }}
              title="Order your free bestseller sample pack"
              aria-label="Order your free sample pack now"
            >
              <span>Order yours now</span>
              <span className="arrow-circle" aria-hidden="true">
                <ArrowUpRight size={15} strokeWidth={2.4} />
              </span>
            </button>
          </div>

          {/* Product mockup visual */}
          <div className="sample-pack-visual">
            <div className="sample-pack-visual-inner">
              <img
                src="/assets/images/sample_pack_mockup.png"
                alt="Sample Packs - A4 paper, envelope, and luxury business card mockups."
                className="sample-pack-banner-img"
                width={490}
                height={298}
                loading="lazy"
              />

              {/* iKASLÉ Logo Brand Overlays on Stationery Items */}
              <div className="stationery-ikasle-tag tag-a4" aria-hidden="true">
                <span className="brand-logo-text">iKASLÉ</span>
              </div>
              <div className="stationery-ikasle-tag tag-card" aria-hidden="true">
                <span className="brand-logo-text">iKASLÉ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SamplePackSection;
