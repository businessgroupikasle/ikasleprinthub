import React, { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle, Sparkles, ShieldCheck, ArrowRight, MessageCircle, Mail, Loader2, AlertCircle } from 'lucide-react';
import {
  getEmailError,
  getNameError,
  getPhoneError,
  isValidEmail,
  limitPhoneDigits,
  normalizeName,
  normalizePhone,
  phoneFromPaste,
} from '../utils/validation';
import { formatFileSize } from '../utils/artwork';
import { sendQuoteRequest } from '../utils/emailService';
import { ArtworkUpload } from './ArtworkUpload';
import { FieldError } from './FieldError';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

const NOTHING_TOUCHED = { name: false, email: false, phone: false };

// True for a paste, drop, autofill or any multi-character insert; false for ordinary one-key typing.
const isBulkInput = (event: Event): boolean => {
  if (!(event instanceof InputEvent)) return true; // browser autofill fires a plain "input" event
  return (
    event.inputType === 'insertFromPaste' ||
    event.inputType === 'insertFromDrop' ||
    event.inputType === 'insertReplacementText' ||
    (event.data?.length ?? 0) > 1
  );
};

const generateQuoteRef = () => 'IK-' + Math.floor(100000 + Math.random() * 900000);
const getNowISO = () => new Date().toISOString();

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
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [submittedArtwork, setSubmittedArtwork] = useState<{ name: string; size: number; attached: boolean } | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [touched, setTouched] = useState(NOTHING_TOUCHED);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteReference, setQuoteReference] = useState('');
  const [submittedCustomer, setSubmittedCustomer] = useState('');

  // Errors show when field is touched, attempted submit, or actively malformed
  const nameError = (touched.name || /\d/.test(customerName)) ? getNameError(customerName) : '';
  const isEmailMalformed = customerEmail.length > 0 && (
    /\.[a-z0-9]*\d/i.test(customerEmail) ||
    (customerEmail.includes('@') && customerEmail.slice(customerEmail.indexOf('@')).includes('.') && !isValidEmail(customerEmail))
  );
  const emailError = (touched.email || isEmailMalformed) ? getEmailError(customerEmail) : '';
  const phoneError = touched.phone ? getPhoneError(customerPhone) : '';
  const markTouched = (field: keyof typeof NOTHING_TOUCHED) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const resetForm = useCallback(() => {
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setTouched(NOTHING_TOUCHED);
    setArtworkFile(null);
    setIsSubmitting(false);
    setSubmitError(null);
    setIsSubmitted(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') resetForm();
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
  }, [isOpen, resetForm]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setTouched({ name: true, email: true, phone: true });
    setSubmitError(null);

    const firstInvalidFieldId = [
      { id: 'quote-name', error: getNameError(customerName) },
      { id: 'quote-email', error: getEmailError(customerEmail) },
      { id: 'quote-phone', error: getPhoneError(customerPhone) },
    ].find((field) => field.error)?.id;
    if (firstInvalidFieldId) {
      document.getElementById(firstInvalidFieldId)?.focus();
      return;
    }
    const cleanName = normalizeName(customerName);
    const cleanEmail = customerEmail.trim();
    const cleanPhone = normalizePhone(customerPhone);
    const ref = generateQuoteRef();

    setIsSubmitting(true);
    try {
      const response = await sendQuoteRequest({
        quoteReference: ref,
        customerName: cleanName,
        customerEmail: cleanEmail,
        customerPhone: cleanPhone,
        selectedService,
        quantity,
        material,
        finish,
        turnaround,
        artwork: artworkFile,
      });

      if (!response.success) {
        setSubmitError(response.message);
        setIsSubmitting(false);
        return;
      }

      setQuoteReference(ref);
      setSubmittedCustomer(cleanName);
      setSubmittedArtwork(
        artworkFile ? { name: artworkFile.name, size: artworkFile.size, attached: Boolean(response.artworkAttached) } : null,
      );
      try {
        const existing = JSON.parse(localStorage.getItem('printhub_quotes') || '[]');
        existing.unshift({
          ref,
          date: getNowISO(),
          customerName: cleanName,
          customerEmail: cleanEmail,
          customerPhone: cleanPhone,
          selectedService,
          quantity,
          material,
          finish,
          turnaround,
          artworkFile: artworkFile?.name ?? null,
          artworkFileSize: artworkFile?.size ?? null,
        });
        localStorage.setItem('printhub_quotes', JSON.stringify(existing.slice(0, 50)));
      } catch {
        // Local storage fallback
      }
      // Automatically reset customer input fields only after confirmation
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setTouched(NOTHING_TOUCHED);
      setArtworkFile(null);
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to dispatch quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetForm();
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
              <span>Custom Print Quote Request</span>
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
              Thank you, <strong>{submittedCustomer || 'Valued Client'}</strong>. Your quote request for <strong>{selectedService}</strong> has been logged under reference:
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
                <span>Category:</span>
                <strong style={{ color: '#05264D' }}>{selectedService}</strong>
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

            {submittedArtwork && (
              <div
                style={{
                  backgroundColor: 'rgba(255, 240, 0, 0.14)',
                  border: '1px solid rgba(230, 216, 0, 0.6)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  maxWidth: '460px',
                  margin: '0 auto 30px',
                  textAlign: 'left',
                  fontSize: '13.5px',
                  color: '#05264D',
                  lineHeight: 1.5,
                }}
              >
                <strong style={{ wordBreak: 'break-all' }}>
                  {submittedArtwork.name} ({formatFileSize(submittedArtwork.size)})
                </strong>{' '}
                {submittedArtwork.attached ? (
                  <>
                    was attached to your request and sent to our team for pre-flight checks.
                  </>
                ) : (
                  <>
                    is too large to attach to the request. Please send this file to us on WhatsApp or email, quoting{' '}
                    <strong>{quoteReference}</strong>, so our team can pre-flight it.
                  </>
                )}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/917845132962?text=${encodeURIComponent(
                  `Hello Ikasle PrintHub! I have requested Quote [${quoteReference}] for ${selectedService} (${quantity} units, ${finish}, turnaround: ${turnaround}). Client: ${submittedCustomer || 'Client'}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-yellow"
                style={{ padding: '12px 20px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <MessageCircle size={18} />
                <span>Send via WhatsApp (+91 78451 32962)</span>
              </a>

              <a
                href={`mailto:businessgroupikasle@gmail.com?subject=${encodeURIComponent(
                  `Print Quote Request [${quoteReference}] - ${selectedService}`
                )}&body=${encodeURIComponent(
                  `Dear Ikasle PrintHub,\n\nPlease find my print quote request details below:\n\nReference: ${quoteReference}\nCategory: ${selectedService}\nQuantity: ${quantity} units\nMaterial: ${material}\nFinishing: ${finish}\nTurnaround: ${turnaround}\n\nClient Name: ${submittedCustomer}\n\nThank you!`
                )}`}
                className="btn-outline-dark"
                style={{ padding: '12px 20px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <Mail size={16} />
                <span>Email Specs (businessgroupikasle@gmail.com)</span>
              </a>

              <button onClick={resetForm} className="btn-outline-dark" style={{ padding: '12px 20px' }}>
                Done / Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ padding: '28px' }}>
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
              <ArtworkUpload file={artworkFile} onChange={setArtworkFile} />
            </div>

            {/* 4. Contact Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label htmlFor="quote-name" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#05264D', marginBottom: '4px' }}>
                  Your Full Name *
                </label>
                <input
                  id="quote-name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (isBulkInput(e.nativeEvent)) markTouched('name');
                  }}
                  onBlur={() => markTouched('name')}
                  aria-invalid={!!nameError}
                  aria-describedby={nameError ? 'quote-name-error' : undefined}
                  className={`modal-form-input ${nameError ? 'input-error' : ''}`}
                  style={{
                    padding: '9px 12px',
                    borderRadius: '6px',
                    fontSize: '13.5px',
                  }}
                />
                <FieldError id="quote-name-error" message={nameError} />
              </div>

              <div>
                <label htmlFor="quote-email" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#05264D', marginBottom: '4px' }}>
                  Email Address *
                </label>
                <input
                  id="quote-email"
                  type="text"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="ramesh@company.in"
                  value={customerEmail}
                  onChange={(e) => {
                    setCustomerEmail(e.target.value);
                    if (isBulkInput(e.nativeEvent)) markTouched('email');
                  }}
                  onBlur={() => markTouched('email')}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'quote-email-error' : undefined}
                  className={`modal-form-input ${emailError ? 'input-error' : ''}`}
                  style={{
                    padding: '9px 12px',
                    borderRadius: '6px',
                    fontSize: '13.5px',
                  }}
                />
                <FieldError id="quote-email-error" message={emailError} />
              </div>

              <div>
                <label htmlFor="quote-phone" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#05264D', marginBottom: '4px' }}>
                  Phone / WhatsApp *
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  required
                  placeholder="10-digit mobile number"
                  value={customerPhone}
                  // Digits only, max 10. (No maxLength attribute: it would cut a pasted "+91 98765…"
                  // mid-number before we get the chance to strip the prefix.)
                  onChange={(e) => {
                    setCustomerPhone(
                      isBulkInput(e.nativeEvent) ? phoneFromPaste(e.target.value) : limitPhoneDigits(e.target.value),
                    );
                    if (isBulkInput(e.nativeEvent)) markTouched('phone');
                  }}
                  onBlur={() => markTouched('phone')}
                  aria-invalid={!!phoneError}
                  aria-describedby={phoneError ? 'quote-phone-error' : undefined}
                  className={`modal-form-input ${phoneError ? 'input-error' : ''}`}
                  style={{
                    padding: '9px 12px',
                    borderRadius: '6px',
                    fontSize: '13.5px',
                  }}
                />
                <FieldError id="quote-phone-error" message={phoneError} />
              </div>
            </div>

            {submitError && (
              <div
                role="alert"
                style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  color: '#991B1B',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <AlertCircle size={16} color="#DC2626" style={{ flexShrink: 0 }} />
                <span>{submitError}</span>
              </div>
            )}

            {/* Submit Action Bar */}
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
              <div style={{ fontSize: '13px', color: '#216FA3', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} />
                <span>Includes free digital proof & Coimbatore delivery guarantee</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-yellow"
                style={{
                  padding: '13px 28px',
                  fontSize: '15px',
                  opacity: isSubmitting ? 0.75 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{isSubmitting ? 'Submitting...' : 'Submit Quote Request'}</span>
                {isSubmitting ? (
                  <Loader2 size={18} className="spin-animate" />
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
