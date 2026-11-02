import React, { useEffect } from 'react';
import { X, ArrowRight, ShieldCheck, Clock, Layers } from 'lucide-react';
import type { PortfolioItem } from './FeaturedWorkSection';

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onRequestQuote: (serviceName: string) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  item,
  onClose,
  onRequestQuote,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 38, 77, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 2200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '860px',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 30px 70px rgba(5, 38, 77, 0.4)',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(5, 38, 77, 0.8)',
            border: 'none',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'background-color 0.2s ease',
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {/* High-res Image Showcase */}
          <div style={{ backgroundColor: '#F8FAFC', padding: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                maxHeight: '440px',
                objectFit: 'cover',
                borderRadius: '14px',
                boxShadow: '0 10px 30px rgba(5, 38, 77, 0.12)',
              }}
            />
          </div>

          {/* Details & Specs */}
          <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(33, 111, 163, 0.1)',
                  color: '#216FA3',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                }}
              >
                {item.subtitle}
              </div>

              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#05264D', marginBottom: '8px', lineHeight: 1.2 }}>
                {item.title}
              </h2>

              <p style={{ fontSize: '14.5px', color: '#64748B', lineHeight: 1.6, marginBottom: '24px' }}>
                Crafted using precision offset lithography and specialized digital finishing technology by IKASLÉ Print Hub.
              </p>

              {/* Spec list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#F0F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#216FA3' }}>
                    <Layers size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Material Specifications</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#05264D' }}>{item.specs}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#F0F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#216FA3' }}>
                    <Clock size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Production Turnaround</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#05264D' }}>{item.turnaround}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#F0F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#216FA3' }}>
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Client Project</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#05264D' }}>{item.client}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => {
                onClose();
                onRequestQuote(item.title);
              }}
              className="btn-yellow"
              style={{ width: '100%', padding: '14px', fontSize: '15px' }}
            >
              <span>Order Similar Prints</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
