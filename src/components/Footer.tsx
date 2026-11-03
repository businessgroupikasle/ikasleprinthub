import React from 'react';
import { MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onNavClick: (href: string, label: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const mainLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#our-work' },
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
    { label: 'FAQ', href: '/faq' },
  ];

  const legalLinks = [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'FAQ', href: '/faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string, label: string) => {
    e.preventDefault();
    onNavClick(href, label);
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top Tier: Primary Navigation Links */}
        <div className="footer-nav-wrapper">
          <nav className="footer-nav" aria-label="Footer navigation">
            {mainLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href, item.label)}
                className="footer-nav-link"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Clear Visual Divider between navigation and copyright/info */}
        <div className="footer-divider" />

        {/* Bottom Tier: Copyright, Legal Links, Separated Address & Phone */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            © 2026 Ikasle PrintHub. All rights reserved.
          </div>

          {/* Legal Pages & FAQ Links */}
          <nav className="footer-legal-links" aria-label="Legal and policy links">
            {legalLinks.map((item, index) => (
              <React.Fragment key={item.label}>
                {index > 0 && <span className="footer-separator-dot" aria-hidden="true" />}
                <a
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href, item.label)}
                  className="footer-legal-link"
                >
                  {item.label}
                </a>
              </React.Fragment>
            ))}
          </nav>

          {/* Contact Details with Address & Phone */}
          <div className="footer-contact-details">
            <div className="footer-address-item">
              <MapPin size={14} className="footer-icon" aria-hidden="true" />
              <span>1639/ A, 2nd Floor, Hopes, Coimbatore, India - 641004</span>
            </div>

            <span className="footer-separator-dot" aria-hidden="true" />

            <a href="tel:+917845132962" className="footer-phone-item">
              <Phone size={14} className="footer-icon" aria-hidden="true" />
              <span>+91 78451 32962</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
