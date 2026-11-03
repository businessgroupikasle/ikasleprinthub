import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, ArrowUpRight } from 'lucide-react';
import { serviceCategories } from '../data/servicesData';
import { portfolioItems } from '../data/portfolioData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceName: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectService,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => inputRef.current?.focus(), 50);
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter products and portfolio items
  const filteredServices = serviceCategories.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPortfolio = portfolioItems.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      p.specs.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 38, 77, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 2100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '80px 20px 20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '640px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(5, 38, 77, 0.35)',
        }}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
            gap: '12px',
          }}
        >
          <Search size={22} color="#216FA3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search business cards, brochures, banners, packaging, apparel..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              color: '#05264D',
              fontWeight: 500,
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              backgroundColor: '#F1F5F9',
              border: 'none',
              fontSize: '12px',
              fontWeight: 600,
              color: '#64748B',
              cursor: 'pointer',
            }}
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '16px' }}>
          {/* Quick Keywords Chips if empty */}
          {!query && (
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>
                Popular Searches
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {['Gold Foil Cards', 'Roll-up Banners', 'Outdoor Signage', 'Coffee Mugs', 'T-shirts', 'Product Boxes'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      fontSize: '13px',
                      color: '#05264D',
                      cursor: 'pointer',
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Services Category Results */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>
              Print Services ({filteredServices.length})
            </div>
            {filteredServices.length === 0 ? (
              <div style={{ padding: '12px', fontSize: '13.5px', color: '#94A3B8' }}>No services matching &quot;{query}&quot;</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {filteredServices.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectService(item.name);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #F1F5F9',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F5F8FC')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#05264D' }}>{item.name}</div>
                        <div style={{ fontSize: '12.5px', color: '#64748B' }}>{item.subtitle}</div>
                      </div>
                    </div>
                    <ArrowUpRight size={16} color="#216FA3" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Portfolio Results */}
          {filteredPortfolio.length > 0 && (
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>
                Portfolio Showcases
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {filteredPortfolio.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectService(p.title);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #F1F5F9',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#05264D' }}>
                          {p.title} — <span style={{ fontWeight: 500, color: '#64748B' }}>{p.subtitle}</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#216FA3' }}>{p.specs}</div>
                      </div>
                    </div>
                    <ArrowRight size={14} color="#94A3B8" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
