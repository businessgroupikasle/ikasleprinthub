import React, { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { LargeFormatSection } from './components/LargeFormatSection';
import { FeaturedWorkSection } from './components/FeaturedWorkSection';
import type { PortfolioItem } from './components/FeaturedWorkSection';
import { CurvedShowcaseSection } from './components/CurvedShowcaseSection';
import { SamplePackSection } from './components/SamplePackSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { MachinerySection } from './components/MachinerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { SearchModal } from './components/SearchModal';
import { PortfolioModal } from './components/PortfolioModal';
import { ContactModal } from './components/ContactModal';
import { NotFoundPage } from './components/NotFoundPage';

export const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState('Home');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState('Business Cards');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [isNotFound, setIsNotFound] = useState(() => {
    const path = window.location.pathname;
    return path === '/404' || (path !== '/' && path !== '' && path !== '/index.html');
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setIsNotFound(path === '/404' || (path !== '/' && path !== '' && path !== '/index.html'));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenQuote = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForQuote(serviceName);
    }
    setQuoteModalOpen(true);
  };

  const handleSelectServiceFromCard = (serviceName: string) => {
    setSelectedServiceForQuote(serviceName);
    setQuoteModalOpen(true);
  };

  const smoothScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId) || document.querySelector(targetId);
    if (el) {
      const headerOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleExploreServices = () => {
    smoothScrollTo('services');
    setActiveNav('Services');
  };

  const handleViewAllPortfolio = () => {
    smoothScrollTo('our-work');
    setActiveNav('Our Work');
  };

  const handleNavClick = (href: string, label: string) => {
    setActiveNav(label);
    const targetId = href.startsWith('#') ? href.slice(1) : href;
    smoothScrollTo(targetId);
    try {
      window.history.pushState(null, '', href);
    } catch {
      // Ignore iframe security restrictions if any
    }
  };

  if (isNotFound) {
    return (
      <div className="ikasle-app-wrapper">
        <Header
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          onOpenQuote={() => handleOpenQuote()}
          onOpenSearch={() => setSearchModalOpen(true)}
        />
        <NotFoundPage
          onBackHome={() => {
            window.history.pushState({}, '', '/');
            setIsNotFound(false);
          }}
          onOpenQuote={() => {
            window.history.pushState({}, '', '/');
            setIsNotFound(false);
            setQuoteModalOpen(true);
          }}
        />
        <Footer
          onNavClick={(href, label) => {
            window.history.pushState({}, '', '/');
            setIsNotFound(false);
            handleNavClick(href, label);
          }}
        />
        <QuoteModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
          initialService={selectedServiceForQuote}
        />
      </div>
    );
  }

  return (
    <div className="ikasle-app-wrapper">
      {/* 1. Sticky Navigation Header */}
      <Header
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onOpenQuote={() => handleOpenQuote()}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      <main>
        {/* 2. Hero Section */}
        <Hero
          onOpenQuote={() => handleOpenQuote()}
          onExploreServices={handleExploreServices}
        />

        {/* 3. "Complete Print Solutions for Every Business" (Services Grid) */}
        <ServicesSection
          onSelectService={handleSelectServiceFromCard}
          onViewAll={handleExploreServices}
        />

        {/* 4. "Large Format Printing for a Bigger Impact" (Go Bigger) */}
        <LargeFormatSection
          onRequestLargeFormat={() => handleOpenQuote('Large Format Billboards')}
        />

        {/* 5. CENTER OF PAGE: 3D Curved Panoramic Ring Showcase (with 360° Animation) */}
        <CurvedShowcaseSection
          onSelectPortfolio={(item) => setSelectedPortfolioItem(item)}
        />

        {/* 6. "Print That Speaks for Itself" (Featured Work Grid) */}
        <FeaturedWorkSection
          onSelectPortfolio={(item) => setSelectedPortfolioItem(item)}
          onViewAllPortfolio={handleViewAllPortfolio}
        />

        {/* 7. "SAMPLE PACKS - Discover our bestselling products" */}
        <SamplePackSection
          onOrderSamplePack={() => handleOpenQuote('Sample Pack (Free Bestseller Kit)')}
        />

        {/* 8. "Why Choose Ikaslé Print Hub?" */}
        <WhyChooseSection />

        {/* 7. "How It Works" (Simple Process) */}
        <HowItWorksSection />

        {/* 8. "HEAVY-DUTY INFRASTRUCTURE" (Printing Machines Showcase) */}
        <MachinerySection onOpenQuote={handleOpenQuote} />

        {/* 9. "Trusted by Businesses Like Yours" (Client Stories) */}
        <TestimonialsSection />

        {/* 10. "Print Knowledge Hub & Blog" (Insights, Guides & Tips) */}
        <BlogSection />

        {/* 10. "Let's Bring Your Ideas to Print" (CTA Banner) */}
        <CtaSection
          onOpenQuote={() => handleOpenQuote()}
          onOpenContact={() => setContactModalOpen(true)}
        />
      </main>

      {/* 10. Footer */}
      <Footer onNavClick={handleNavClick} />

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialService={selectedServiceForQuote}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectService={(service) => {
          setSelectedServiceForQuote(service);
          setQuoteModalOpen(true);
        }}
      />

      <PortfolioModal
        item={selectedPortfolioItem}
        onClose={() => setSelectedPortfolioItem(null)}
        onRequestQuote={(serviceName) => {
          setSelectedPortfolioItem(null);
          handleOpenQuote(serviceName);
        }}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
};

export default App;
