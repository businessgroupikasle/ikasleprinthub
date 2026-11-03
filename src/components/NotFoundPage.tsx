import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface NotFoundPageProps {
  onBackHome: () => void;
  onOpenQuote?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onBackHome, onOpenQuote }) => {
  return (
    <div className="not-found-page-wrapper">
      <div className="container">
        <div className="not-found-card">
          <div className="logo-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span>IKASLÉ PRINT HUB</span>
            <span style={{ color: '#FFF000' }}>✦</span>
            <span>COIMBATORE</span>
          </div>

          <div className="cmyk-registration-row">
            <span className="dot c" />
            <span className="dot m" />
            <span className="dot y" />
            <span className="dot k" />
            <span className="reg-text">404 • Sheet Misaligned / Out of Print</span>
          </div>

          <div className="error-404-glitch-code">
            404
          </div>

          <h1 className="not-found-title">
            This Page is Out of Print
          </h1>

          <p className="not-found-desc">
            The page or document you're looking for might have been trimmed off the guillotine, moved to another tray, or does not exist in our print catalog.
          </p>

          <div className="not-found-buttons">
            <button onClick={onBackHome} className="btn-yellow" style={{ padding: '12px 28px' }}>
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </button>

            {onOpenQuote && (
              <button onClick={onOpenQuote} className="btn-outline-white" style={{ padding: '12px 28px' }}>
                <Sparkles size={16} />
                <span>Request Custom Quote</span>
              </button>
            )}
          </div>

          <div className="not-found-quick-links">
            <div className="quick-links-label">Popular Coimbatore Print Solutions:</div>
            <div className="quick-links-tags">
              <a href="/#services" onClick={(e) => { e.preventDefault(); onBackHome(); setTimeout(() => { const el = document.getElementById('services'); el?.scrollIntoView({ behavior: 'smooth' }); }, 50); }} className="quick-tag">Visiting Cards</a>
              <a href="/#services" onClick={(e) => { e.preventDefault(); onBackHome(); setTimeout(() => { const el = document.getElementById('services'); el?.scrollIntoView({ behavior: 'smooth' }); }, 50); }} className="quick-tag">Brochures & Flyers</a>
              <a href="/#services" onClick={(e) => { e.preventDefault(); onBackHome(); setTimeout(() => { const el = document.getElementById('services'); el?.scrollIntoView({ behavior: 'smooth' }); }, 50); }} className="quick-tag">Packaging Boxes</a>
              <a href="/#large-format" onClick={(e) => { e.preventDefault(); onBackHome(); setTimeout(() => { const el = document.getElementById('large-format'); el?.scrollIntoView({ behavior: 'smooth' }); }, 50); }} className="quick-tag">Signage & Banners</a>
              <a href="/#sample-packs" onClick={(e) => { e.preventDefault(); onBackHome(); setTimeout(() => { const el = document.getElementById('sample-packs'); el?.scrollIntoView({ behavior: 'smooth' }); }, 50); }} className="quick-tag">Free Sample Packs</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
