import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import type { PortfolioItem } from '../data/portfolioData';
import { portfolioItems } from '../data/portfolioData';
export type { PortfolioItem };

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
              </div>

              {/* Card Meta & Arrow */}
              <div className="portfolio-info-row">
                <div className="portfolio-meta">
                  <h3 className="portfolio-item-title">{item.title}</h3>
                  <p className="portfolio-item-sub">{item.subtitle}</p>
                </div>
                <div className="portfolio-arrow-circle" aria-hidden="true">
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
