import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Upload, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Business Cards',
}) => {
  const [selectedService, setSelectedService] = useState(initialService);
  const [quantity, setQuantity] = useState(500);
  const [material, setMaterial] = useState('400gsm Premium Silk');
  const [finish, setFinish] = useState('Soft-touch Matt Lamination');
  const [turnaround, setTurnaround] = useState('Standard (3-5 days)');
  const [artworkFile, setArtworkFile] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteReference, setQuoteReference] = useState('');

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Real-time dynamic price calculator
  const calculatePrice = () => {
    let base = 25;
    if (selectedService.includes('Sample Pack')) return 0;
    else if (selectedService.includes('Packaging')) base = 120;
    else if (selectedService.includes('Signage') || selectedService.includes('Banners')) base = 85;
    else if (selectedService.includes('Large Format') || selectedService.includes('Billboard')) base = 190;
    else if (selectedService.includes('T-shirt')) base = 75;
    else if (selectedService.includes('Gifts') || selectedService.includes('Mugs')) base = 45;
    else if (selectedService.includes('Brochures')) base = 60;
    else if (selectedService.includes('Stickers')) base = 35;

    let finishMult = 1.0;
    if (finish.includes('Foil')) finishMult = 1.35;
    if (finish.includes('Spot UV')) finishMult = 1.25;
    if (finish.includes('Soft-touch')) finishMult = 1.15;

    let speedMult = 1.0;
    if (turnaround.includes('24-48')) speedMult = 1.25;
    if (turnaround.includes('Same Day')) speedMult = 1.5;

    const unitDiscount = quantity >= 2500 ? 0.6 : quantity >= 1000 ? 0.75 : quantity >= 500 ? 0.85 : 1.0;
    const est = Math.round((base * (quantity / 100) * unitDiscount * finishMult * speedMult) + 15);
    return est;
  };

  const estimatedPrice = calculatePrice();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'IK-' + Math.floor(100000 + Math.random() * 900000);
    setQuoteReference(ref);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

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
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        className="modal-card"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(5, 38, 77, 0.3)',
          position: 'relative',
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            backgroundColor: '#05264D',
            color: '#FFFFFF',
            padding: '24px 28px',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFF000', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              <Sparkles size={16} />
              <span>Instant Print Quote Calculator</span>
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '4px 0 0', color: '#FFFFFF' }}>
              Request a Custom Quote
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {isSubmitted ? (
          <div style={{ padding: '48px 32px', textAlign: 'center' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'rgba(33, 111, 163, 0.12)',
                color: '#216FA3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <CheckCircle size={44} color="#216FA3" />
            </div>

            <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#05264D', marginBottom: '8px' }}>
              Quote Request Received!
            </h3>
            <p style={{ color: '#4A5568', fontSize: '16px', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              Thank you, <strong>{customerName || 'Valued Client'}</strong>. Your quote request for <strong>{selectedService}</strong> has been logged under reference:
            </p>

            <div
              style={{
                display: 'inline-block',
                backgroundColor: '#F5F8FC',
                border: '2px dashed #216FA3',
                borderRadius: '12px',
                padding: '12px 28px',
                fontSize: '22px',
                fontWeight: 800,
                color: '#05264D',
                letterSpacing: '1px',
                marginBottom: '24px',
              }}
            >
              {quoteReference}
            </div>

            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                padding: '16px',
                maxWidth: '460px',
                margin: '0 auto 30px',
                textAlign: 'left',
                fontSize: '14px',
                color: '#4A5568',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Estimated Total:</span>
                <strong style={{ color: '#05264D', fontSize: '16px' }}>${estimatedPrice}.00 USD</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span>Quantity & Finish:</span>
                <span>{quantity.toLocaleString()} units • {finish}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Turnaround:</span>
                <span>{turnaround}</span>
              </div>
            </div>

            <button onClick={resetForm} className="btn-yellow" style={{ padding: '14px 32px' }}>
              Done / Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: '28px' }}>
            {/* 1. Category Selection */}
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#05264D', marginBottom: '8px' }}>
                1. Select Print Category
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '8px' }}>
                {[
                  'Sample Pack (Free Bestseller Kit)',
                  'Business Cards',
                  'Brochures & Flyers',
                  'Signage & Banners',
                  'Custom Gifts & Mugs',
                  'Stickers & Labels',
                  'Packaging & Boxes',
                  'T-shirt Printing',
                  'Branding Solutions',
                  'Large Format Billboards',
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedService(cat)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: selectedService === cat ? '2px solid #216FA3' : '1px solid #E2E8F0',
                      backgroundColor: selectedService === cat ? 'rgba(33, 111, 163, 0.08)' : '#FFFFFF',
                      color: selectedService === cat ? '#05264D' : '#4A5568',
                      fontWeight: selectedService === cat ? 700 : 500,
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Specs Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '22px' }}>
              {/* Quantity */}
              <div>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#05264D', marginBottom: '6px' }}>
                  Quantity
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '14px',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <option value={100}>100 Units</option>
                  <option value={250}>250 Units</option>
                  <option value={500}>500 Units (Popular)</option>
                  <option value={1000}>1,000 Units</option>
                  <option value={2500}>2,500 Units</option>
                  <option value={5000}>5,000+ Units (Bulk)</option>
                </select>
              </div>

              {/* Material Stock */}
              <div>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#05264D', marginBottom: '6px' }}>
                  Paper / Material Stock
                </label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '14px',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <option value="400gsm Premium Silk">400gsm Premium Silk</option>
                  <option value="350gsm Recycled Matte">350gsm Recycled Matte</option>
                  <option value="450gsm Heavy Velvet Card">450gsm Heavy Velvet Card</option>
                  <option value="Heavyweight Vinyl Banner">Heavyweight Vinyl Banner</option>
                  <option value="Corrugated Craft Board">Corrugated Craft Board</option>
                  <option value="Waterproof Polypropylene">Waterproof Polypropylene</option>
                </select>
              </div>

              {/* Finishing */}
              <div>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#05264D', marginBottom: '6px' }}>
                  Finish / Embellishment
                </label>
                <select
                  value={finish}
                  onChange={(e) => setFinish(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '14px',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <option value="Soft-touch Matt Lamination">Soft-touch Matt Lamination</option>
                  <option value="Gloss Lamination">Gloss Lamination</option>
                  <option value="Spot UV High-Gloss Accents">Spot UV High-Gloss Accents</option>
                  <option value="Metallic Gold Foil Stamping">Metallic Gold Foil Stamping</option>
                  <option value="Embossed / Debossed Texture">Embossed / Debossed Texture</option>
                  <option value="Standard Uncoated Natural">Standard Uncoated Natural</option>
                </select>
              </div>
            </div>

            {/* 3. Turnaround & File Upload */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '22px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#05264D', marginBottom: '6px' }}>
                  Turnaround Speed
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { label: 'Standard (3-5 days)', note: 'Included' },
                    { label: 'Express (24-48 hrs)', note: '+25%' },
                    { label: 'Same Day Rush', note: '+50%' },
                  ].map((speed) => (
                    <label
                      key={speed.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        border: turnaround === speed.label ? '1.5px solid #216FA3' : '1px solid #E2E8F0',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        backgroundColor: turnaround === speed.label ? 'rgba(33, 111, 163, 0.05)' : '#FFFFFF',
                        fontSize: '13px',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                          type="radio"
                          name="turnaround"
                          checked={turnaround === speed.label}
                          onChange={() => setTurnaround(speed.label)}
                        />
                        {speed.label}
                      </span>
                      <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>{speed.note}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Upload Artwork Box */}
              <div>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#05264D', marginBottom: '6px' }}>
                  Artwork File (PDF, AI, PNG, PSD)
                </label>
                <div
                  onClick={() => setArtworkFile('brand_artwork_final.pdf')}
                  style={{
                    border: '2px dashed #CBD5E1',
                    borderRadius: '8px',
                    padding: '20px 16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: artworkFile ? 'rgba(33, 111, 163, 0.05)' : '#FAFCFF',
                    transition: 'border 0.2s ease',
                  }}
                >
                  <Upload size={24} style={{ color: '#216FA3', margin: '0 auto 6px' }} />
                  {artworkFile ? (
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#05264D' }}>{artworkFile}</div>
                      <div style={{ fontSize: '11px', color: '#2E7D32', marginTop: '2px' }}>✓ File Attached (Ready for pre-flight)</div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#05264D' }}>Click to upload artwork</div>
                      <div style={{ fontSize: '11.5px', color: '#94A3B8', marginTop: '2px' }}>or drag and drop your file here</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 4. Contact Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#05264D', marginBottom: '4px' }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#05264D', marginBottom: '4px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah@company.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#05264D', marginBottom: '4px' }}>
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+234 803 000 0000"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                />
              </div>
            </div>

            {/* Live Estimation Bar & Submit Button */}
            <div
              style={{
                backgroundColor: '#F5F8FC',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                border: '1px solid #E2E8F0',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>
                  Estimated Live Price
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#05264D', lineHeight: 1.1 }}>
                  ${estimatedPrice}
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#64748B', marginLeft: '4px' }}>.00 USD</span>
                </div>
                <div style={{ fontSize: '11.5px', color: '#216FA3', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <ShieldCheck size={14} />
                  <span>Includes free digital proof & quality guarantee</span>
                </div>
              </div>

              <button type="submit" className="btn-yellow" style={{ padding: '13px 28px', fontSize: '15px' }}>
                <span>Submit Quote Request</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
