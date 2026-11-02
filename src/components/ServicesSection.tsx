import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
  onViewAll: () => void;
}

export interface ServiceCategory {
  id: string;
  name: string;
  image: string;
  subtitle: string;
  popular?: boolean;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'business-cards',
    name: 'Business Cards',
    subtitle: 'Luxury finishes, foil stamping & thick cardstocks',
    image: '/assets/images/cat_business_cards.jpg',
    popular: true,
  },
  {
    id: 'brochures-flyers',
    name: 'Brochures & Flyers',
    subtitle: 'Tri-folds, bi-folds, gloss & matte marketing prints',
    image: '/assets/images/cat_brochures.jpg',
    popular: true,
  },
  {
    id: 'signage-banners',
    name: 'Signage & Banners',
    subtitle: 'Roll-up standees, vinyl banners & trade displays',
    image: '/assets/images/cat_signage_banners.jpg',
    popular: true,
  },
  {
    id: 'custom-gifts',
    name: 'Custom Gifts',
    subtitle: 'Branded ceramic mugs, stationery & corporate perks',
    image: '/assets/images/cat_custom_gifts.jpg',
  },
  {
    id: 'stickers-labels',
    name: 'Stickers & Labels',
    subtitle: 'Waterproof die-cut stickers & product roll labels',
    image: '/assets/images/cat_stickers_labels.jpg',
  },
  {
    id: 'packaging-boxes',
    name: 'Packaging & Boxes',
    subtitle: 'Rigid gift boxes, custom mailers & product packaging',
    image: '/assets/images/cat_packaging_boxes.jpg',
    popular: true,
  },
  {
    id: 'tshirt-printing',
    name: 'T-shirt Printing',
    subtitle: 'DTG, screen-printed & embroidered brand apparel',
    image: '/assets/images/cat_tshirt_printing.jpg',
  },
  {
    id: 'branding-solutions',
    name: 'Branding Solutions',
    subtitle: 'Stationery kits, letterheads, folders & envelopes',
    image: '/assets/images/cat_branding_solutions.jpg',
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onViewAll,
}) => {
  return (
    <section id="services" className="services-section" style={{ backgroundColor: '#FFFFFF', padding: '80px 0 90px' }}>
      <div className="container">
        <div className="services-layout">
          {/* Left Column: Heading & Description */}
          <div className="services-intro">
            <div className="section-tag light">
              <span className="tag-star">✦</span>
              <span>WHAT WE DO</span>
            </div>

            <h2 className="section-heading-dark" style={{ maxWidth: '360px', marginTop: '8px' }}>
              Complete Print Solutions for Every Business
            </h2>

            <p className="section-desc-dark" style={{ maxWidth: '360px', marginTop: '16px' }}>
              From marketing materials to large-format signage, we bring your ideas to life with exceptional quality and creativity.
            </p>

            <button onClick={onViewAll} className="btn-yellow" style={{ marginTop: '12px' }}>
              <span>View All Services</span>
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Column: 8 Category Cards (4 columns x 2 rows) */}
          <div className="services-grid">
            {serviceCategories.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectService(item.name)}
                className="category-card"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectService(item.name);
                  }
                }}
              >
                {/* Card Title & Arrow Icon */}
                <div className="category-card-header">
                  <h3 className="category-title">{item.name}</h3>
                  <div className="category-arrow-btn">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Card Image Thumbnail */}
                <div className="category-img-wrap">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="category-img"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
