import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
  onViewAll?: () => void;
}

import type { ServiceCategory } from '../data/servicesData';
import { serviceCategories } from '../data/servicesData';
export type { ServiceCategory };

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
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
