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
import { CoimbatoreSeoSection } from './components/CoimbatoreSeoSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { SearchModal } from './components/SearchModal';
import { PortfolioModal } from './components/PortfolioModal';
import { ContactModal } from './components/ContactModal';
import { NotFoundPage } from './components/NotFoundPage';
import { TermsPage } from './components/TermsPage';
import { PrivacyPage } from './components/PrivacyPage';
import { FaqPage } from './components/FaqPage';

type PageRoute = 'home' | 'terms' | 'privacy' | 'faq' | '404';

const getRouteFromPath = (path: string): PageRoute => {
  const normalized = path.toLowerCase().replace(/\/+$/, '') || '/';
  if (normalized === '/' || normalized === '/index.html') return 'home';
  if (
    normalized === '/terms' ||
    normalized === '/terms-and-conditions' ||
    normalized === '/terms-of-service' ||
    normalized === '/terms-conditions'
  ) {
    return 'terms';
  }
  if (normalized === '/privacy' || normalized === '/privacy-policy') {
    return 'privacy';
  }
  if (normalized === '/faq' || normalized === '/faqs') {
    return 'faq';
  }
  return '404';
};

export const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState('Home');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState('Business Cards');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() =>
    getRouteFromPath(window.location.pathname)
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getRouteFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPage = (path: string) => {
    try {
      window.history.pushState({}, '', path);
    } catch {
      // Ignore iframe restrictions if any
    }
    setCurrentRoute(getRouteFromPath(path));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        behavior: 'smooth',
      });
    }
  };

  const handleExploreServices = () => {
    smoothScrollTo('services');
    setActiveNav('Services');
  };

  const handleViewAllPortfolio = () => {
    smoothScrollTo('curved-showcase');
    setActiveNav('Our Work');
  };

  const handleNavClick = (href: string, label: string) => {
    setActiveNav(label);

    // If it is a full path (e.g. /terms, /privacy, /faq)
    if (href.startsWith('/')) {
      navigateToPage(href);
      return;
    }

    // If user is currently on an inner page and clicks an anchor link
    if (currentRoute !== 'home') {
      try {
        window.history.pushState({}, '', '/' + href);
      } catch {}
      setCurrentRoute('home');
      setTimeout(() => {
        const targetId = href.startsWith('#') ? href.slice(1) : href;
        smoothScrollTo(targetId);
      }, 80);
      return;
    }

    // Standard on-page anchor navigation
    const targetId = href.startsWith('#') ? href.slice(1) : href;
    smoothScrollTo(targetId);
    try {
      window.history.pushState(null, '', href);
    } catch {
      // Ignore iframe security restrictions if any
    }
  };

  return (
    <div className="ikasle-app-wrapper">
      {/* Sticky Navigation Header */}
      <Header
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onOpenQuote={() => handleOpenQuote()}
        onOpenSearch={() => setSearchModalOpen(true)}
        onNavClick={handleNavClick}
      />

      {/* Main Content Rendered According to Current Route */}
      {currentRoute === 'terms' ? (
        <TermsPage
          onBackHome={() => navigateToPage('/')}
          onOpenQuote={() => handleOpenQuote()}
        />
      ) : currentRoute === 'privacy' ? (
        <PrivacyPage
          onBackHome={() => navigateToPage('/')}
          onOpenQuote={() => handleOpenQuote()}
        />
      ) : currentRoute === 'faq' ? (
        <FaqPage
          onBackHome={() => navigateToPage('/')}
          onOpenQuote={(service) => handleOpenQuote(service)}
        />
      ) : currentRoute === '404' ? (
        <NotFoundPage
          onBackHome={() => navigateToPage('/')}
          onOpenQuote={() => handleOpenQuote()}
        />
      ) : (
        <main>
          {/* 1. Hero Section */}
          <Hero
            onOpenQuote={() => handleOpenQuote()}
            onExploreServices={handleExploreServices}
          />

          {/* 2. Services Grid */}
          <ServicesSection
            onSelectService={handleSelectServiceFromCard}
            onViewAll={handleExploreServices}
          />

          {/* 3. Large Format Printing */}
          <LargeFormatSection
            onRequestLargeFormat={() => handleOpenQuote('Large Format Billboards')}
          />

          {/* 4. 3D Curved Panoramic Ring Showcase */}
          <CurvedShowcaseSection
            onSelectPortfolio={(item) => setSelectedPortfolioItem(item)}
          />

          {/* 5. Featured Work Grid */}
          <FeaturedWorkSection
            onSelectPortfolio={(item) => setSelectedPortfolioItem(item)}
            onViewAllPortfolio={handleViewAllPortfolio}
          />

          {/* 6. Sample Packs */}
          <SamplePackSection
            onOrderSamplePack={() => handleOpenQuote('Sample Pack (Free Bestseller Kit)')}
          />

          {/* 7. Why Choose Ikaslé Print Hub */}
          <WhyChooseSection />

          {/* 8. How It Works */}
          <HowItWorksSection />

          {/* 9. Machinery & Infrastructure */}
          <MachinerySection onOpenQuote={handleOpenQuote} />

          {/* 10. Client Stories */}
          <TestimonialsSection />

          {/* 11. Coimbatore Local SEO & Key Authority */}
          <CoimbatoreSeoSection onOpenQuote={handleOpenQuote} />

          {/* 12. Print Knowledge Hub & Blog */}
          <BlogSection />

          {/* 13. CTA Banner */}
          <CtaSection
            onOpenQuote={() => handleOpenQuote()}
            onOpenContact={() => setContactModalOpen(true)}
          />
        </main>
      )}

      {/* Persistent Footer across all pages */}
      <Footer onNavClick={handleNavClick} />

      {/* Global Interactive Modals (Available from any page) */}
      <QuoteModal
        key={selectedServiceForQuote}
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
