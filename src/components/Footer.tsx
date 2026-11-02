import React from 'react';

interface FooterProps {
  onNavClick: (href: string, label: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#our-work' },
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="site-footer" style={{ backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', padding: '24px 0 32px' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        {/* Navigation Links on Left */}
        <nav className="footer-nav" style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                onNavClick(item.href, item.label);
              }}
              className="footer-nav-link"
              style={{
                fontSize: '14px',
                color: '#64748B',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Copyright on Right */}
        <div
          className="footer-copyright"
          style={{
            fontSize: '13.5px',
            color: '#64748B',
            fontWeight: 400,
          }}
        >
          © 2026 Ikasle PrintHub • 1639/ A, 2nd Floor, Hopes, Coimbatore, India- 641004 • Tel: +91 78451 32962
        </div>
      </div>
    </footer>
  );
};
