import React, { useState } from 'react';
import { MapPin, Truck, CheckCircle2, Printer, Award, ChevronDown, Sparkles } from 'lucide-react';

interface CoimbatoreSeoSectionProps {
  onOpenQuote: (serviceName?: string) => void;
}

export const CoimbatoreSeoSection: React.FC<CoimbatoreSeoSectionProps> = ({ onOpenQuote }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const localities = [
    'Gandhipuram',
    'RS Puram',
    'Peelamedu',
    'Saibaba Colony',
    'Saravanampatti (IT Corridor)',
    'Singanallur',
    'Ganapathy',
    'Ramanathapuram',
    'Race Course',
    'SIDCO Industrial Estate',
    'Thudiyalur',
    'Tiruppur & Pollachi Belt',
  ];

  const faqs = [
    {
      q: 'Which is the best printing press in Coimbatore for commercial and offset printing?',
      a: 'IKASLÉ Print Hub is recognized as one of the premier commercial printing partners in Coimbatore, delivering end-to-end commercial offset printing, high-speed digital printing, and specialized post-press finishing. We serve thousands of corporate clients, engineering manufacturers, textile exporters, and retail businesses across Coimbatore.',
    },
    {
      q: 'Do you provide same-day or 24-hour express printing in Coimbatore?',
      a: 'Yes! For digital printing services like emergency business cards, brochures, flyers, ID cards, standees, and custom stickers, we offer same-day dispatch and 24-hour express doorstep delivery across Gandhipuram, Peelamedu, RS Puram, and Saravanampatti.',
    },
    {
      q: 'Can I get a physical paper sample kit in Coimbatore before placing a bulk order?',
      a: 'Absolutely. We provide free Bestseller Sample Packs containing paper stock swatches from 130 GSM to 600 GSM, matte/gloss laminations, velvet touch, spot UV, and gold foil finishes delivered right to your office or doorstep in Coimbatore.',
    },
    {
      q: 'Do you print marketing materials and stall standees for CODISSIA exhibitions in Coimbatore?',
      a: 'Yes, we are the preferred printing partner for exhibitors at CODISSIA Trade Fair Complex, INTEC, Agri Intex, and Texfair. We produce roll-up standees, product brochures, exhibition catalogues, promotional lanyards, and booth banners with rush delivery directly to the venue.',
    },
    {
      q: 'What areas in and around Coimbatore do you deliver to?',
      a: 'We offer daily doorstep delivery across all key zones of Coimbatore including Gandhipuram, RS Puram, Peelamedu, Singanallur, Ganapathy, Saravanampatti, Saibaba Colony, Kurichi SIDCO, and express courier logistics to Tiruppur, Erode, Pollachi, and Palakkad.',
    },
  ];

  return (
    <section id="coimbatore-printing" className="coimbatore-seo-section">
      <div className="container">
        {/* Section Header with Local SEO Keyword Signals */}
        <div className="seo-header">
          <div className="section-tag yellow" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={15} />
            <span>COIMBATORE PRINTING SERVICES</span>
          </div>

          <h2 className="seo-main-title">
            Top-Rated Printing Press & Printing Services in Coimbatore
          </h2>

          <p className="seo-lead-text">
            Looking for the best <strong>Printing Services in Coimbatore</strong>? <strong>Ikasle PrintHub</strong> is your trusted local <strong>Printing Press in Coimbatore</strong> offering fast <strong>Online Printing Services Coimbatore</strong> and <strong>Custom Printing Services Coimbatore</strong>. Visit our facility at <strong>1639/ A, 2nd Floor, Hopes, Coimbatore- 641004</strong> or order online for same-day dispatch.
          </p>
        </div>

        {/* 3 Core Trust Badges */}
        <div className="seo-trust-badges">
          <div className="seo-trust-card">
            <div className="trust-icon-box">
              <Printer size={22} />
            </div>
            <div>
              <div className="trust-title">Commercial Offset & Digital</div>
              <div className="trust-desc">Micron-accurate 2400 DPI CMYK spectrophotometer color calibration.</div>
            </div>
          </div>

          <div className="seo-trust-card">
            <div className="trust-icon-box">
              <Truck size={22} />
            </div>
            <div>
              <div className="trust-title">Doorstep Coimbatore Delivery</div>
              <div className="trust-desc">Safe moisture-sealed packaging delivered right to your doorstep across Coimbatore.</div>
            </div>
          </div>

          <div className="seo-trust-card">
            <div className="trust-icon-box">
              <Award size={22} />
            </div>
            <div>
              <div className="trust-title">Best Price & Quality Promise</div>
              <div className="trust-desc">Direct factory pricing with zero agent markups and 100% quality inspection.</div>
            </div>
          </div>
        </div>

        {/* Coimbatore Localities Coverage Area */}
        <div className="seo-localities-card">
          <div className="localities-head">
            <div className="localities-title-wrap">
              <MapPin size={20} className="pin-icon" />
              <div>
                <h3 className="localities-heading">Fast Delivery Across All Coimbatore Zones</h3>
                <p className="localities-sub">Daily local dispatch and logistics coverage for businesses and industries</p>
              </div>
            </div>
            <button onClick={() => onOpenQuote('Sample Pack (Free Bestseller Kit)')} className="btn-yellow" style={{ padding: '10px 20px', fontSize: '13px' }}>
              <Sparkles size={15} />
              <span>Get Free Sample Kit</span>
            </button>
          </div>

          <div className="localities-tags-grid">
            {localities.map((loc, idx) => (
              <div key={idx} className="locality-pill">
                <CheckCircle2 size={13} className="check-icon" />
                <span>{loc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Local SEO Coimbatore FAQs Accordion */}
        <div className="seo-faq-section">
          <div className="faq-header">
            <h3 className="faq-main-title">Frequently Asked Questions • Coimbatore Printing</h3>
            <p className="faq-subtext">Everything you need to know about turnaround times, paper stocks, and ordering in Coimbatore.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <div className="faq-question-row">
                    <h4 className="faq-question-text">{faq.q}</h4>
                    <span className="faq-chevron-btn">
                      <ChevronDown size={18} className={`chevron-svg ${isOpen ? 'rotated' : ''}`} />
                    </span>
                  </div>
                  {isOpen && (
                    <div className="faq-answer-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoimbatoreSeoSection;
