import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  specs: string;
  client: string;
  turnaround: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'portfolio-cards',
    title: 'Business Cards',
    subtitle: 'Corporate Branding',
    image: '/assets/images/work_business_cards.jpg',
    specs: '600gsm Cotton Stock • Gold & Navy Foil • Painted Edges',
    client: 'Apex Capital Partners',
    turnaround: '48 Hours',
  },
  {
    id: 'portfolio-brochures',
    title: 'Brochures',
    subtitle: 'Marketing Materials',
    image: '/assets/images/work_brochures.jpg',
    specs: '250gsm Silk Cover • Soft-Touch Matte • Spot UV Accents',
    client: 'Veridian Architecture Studio',
    turnaround: '3 Days',
  },
  {
    id: 'portfolio-packaging',
    title: 'Packaging',
    subtitle: 'Product Packaging',
    image: '/assets/images/work_packaging.jpg',
    specs: 'Rigid Cardboard • Custom Die-Cut • Embossed Pattern Foil',
    client: 'Aura Luxury Botanicals',
    turnaround: '5 Days',
  },
  {
    id: 'portfolio-signage',
    title: 'Signage',
    subtitle: 'Retail & Outdoor',
    image: '/assets/images/work_signage.jpg',
    specs: 'Circular Lightbox • Double-Sided LED • Weatherproof Acrylic',
    client: 'Monolith Design Labs',
    turnaround: '4 Days',
  },
  {
    id: 'portfolio-gifts',
    title: 'Custom Gifts',
    subtitle: 'Branded Merchandise',
    image: '/assets/images/work_custom_gifts.jpg',
    specs: 'Premium Ceramic • Sublimation Printing • Microwave Safe',
    client: 'Starlight Tech Solutions',
    turnaround: '24 Hours',
  },
];

interface FeaturedWorkSectionProps {
  onSelectPortfolio: (item: PortfolioItem) => void;
  onViewAllPortfolio: () => void;
}

export const FeaturedWorkSection: React.FC<FeaturedWorkSectionProps> = ({
  onSelectPortfolio,
  onViewAllPortfolio,
}) => {
  return (
    <section id="our-work" className="featured-work-section" style={{ backgroundColor: '#F8FAFC', padding: '36px 0 60px', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="featured-work-header">
          <div className="featured-work-titles">
            <div className="section-tag light">
              <span className="tag-star">✦</span>
              <span>FEATURED WORK</span>
            </div>
            <h2 className="section-heading-dark" style={{ margin: 0 }}>
              Print That Speaks for Itself
            </h2>
          </div>

          <button onClick={onViewAllPortfolio} className="btn-outline-dark portfolio-cta-btn">
            <span>View Our Portfolio</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* 5 Portfolio Cards in a Row */}
        <div className="portfolio-cards-grid">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectPortfolio(item)}
              className="portfolio-card"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectPortfolio(item);
                }
              }}
            >
              {/* Image Frame */}
              <div className="portfolio-img-box">
                <img
                  src={item.image}
                  alt={`${item.title} - ${item.subtitle}`}
                  className="portfolio-thumb"
                  loading="lazy"
                />
                <div className="portfolio-hover-overlay">
                  <div className="portfolio-zoom-icon">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>

              {/* Card Meta & Arrow */}
              <div className="portfolio-info-row">
                <div className="portfolio-meta">
                  <h3 className="portfolio-item-title">{item.title}</h3>
                  <p className="portfolio-item-sub">{item.subtitle}</p>
                </div>
                <div className="portfolio-arrow-circle">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
