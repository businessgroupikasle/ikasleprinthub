import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import { IkasleLogo } from './IkasleLogo';

interface HeaderProps {
  onOpenQuote: (service?: string) => void;
  onOpenSearch: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onNavClick?: (href: string, label: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuote,
  onOpenSearch,
  activeNav,
  setActiveNav,
  onNavClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Automatic active nav tracking based on scroll position
      const sections = [
        { id: 'home', label: 'Home' },
        { id: 'services', label: 'Services' },
        { id: 'our-work', label: 'Our Work' },
        { id: 'about', label: 'About' },
        { id: 'blog', label: 'Blog' },
        { id: 'contact', label: 'Contact' },
      ];

      const scrollPosition = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveNav(sections[i].label);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveNav]);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Our Work', href: '#our-work' },
    { label: 'About', href: '#about' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string, label: string) => {
    setActiveNav(label);
    setMobileMenuOpen(false);

    if (onNavClick) {
      onNavClick(href, label);
      return;
    }

    if (window.location.pathname !== '/' && window.location.pathname !== '' && window.location.pathname !== '/index.html') {
      window.location.href = '/' + href;
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 85;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      try {
        window.history.pushState(null, '', href);
      } catch {
        // Ignore iframe security restrictions if any
      }
    }
  };

  return (
    <>
      <header
        className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: isScrolled ? 'rgba(5, 38, 77, 0.95)' : '#05264D',
          backdropFilter: 'blur(12px)',
          borderBottom: isScrolled
            ? '1px solid rgba(255, 255, 255, 0.12)'
            : '1px solid rgba(255, 255, 255, 0.05)',
          transition: 'all 0.3s ease',
          height: isScrolled ? '72px' : '82px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Logo on Left */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home', 'Home');
            }}
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <IkasleLogo variant="light" size={isScrolled ? 'sm' : 'md'} />
          </a>

          {/* Centered Desktop Navigation */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {navLinks.map((item) => {
              const isActive = activeNav === item.label;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href, item.label);
                  }}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  style={{
                    color: isActive ? '#FFF000' : 'rgba(255, 255, 255, 0.9)',
                    fontSize: '15px',
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: '0.2px',
                    position: 'relative',
                    padding: '8px 0',
                    transition: 'color 0.2s ease',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '18px',
                        height: '2.5px',
                        backgroundColor: '#FFF000',
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & Button */}
          <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Search Icon Button */}
            <button
              onClick={onOpenSearch}
              className="search-btn"
              title="Search print services"
              aria-label="Search"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Search size={18} />
            </button>

            {/* Electric-Yellow "Get a Quote" Button */}
            <button
              onClick={() => onOpenQuote()}
              className="btn-yellow desktop-quote-btn"
              style={{
                padding: '11px 22px',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              <span>Get a Quote</span>
              <ArrowRight size={16} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-toggle"
              aria-label="Toggle menu"
              style={{
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                padding: '6px',
                display: 'none',
              }}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-drawer"
          style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#05264D',
            zIndex: 999,
            padding: '30px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.label);
                }}
                style={{
                  color: activeNav === item.label ? '#FFF000' : '#FFFFFF',
                  fontSize: '20px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  padding: '10px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="btn-yellow"
              style={{ width: '100%', padding: '14px', fontSize: '16px' }}
            >
              <span>Get a Quote</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '9999px',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <Search size={16} />
              <span>Search Print Products</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
