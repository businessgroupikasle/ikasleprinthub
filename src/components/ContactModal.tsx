import React, { useState, useEffect, useCallback } from 'react';
import { X, Send, CheckCircle, Clock, MessageCircle, Mail, Loader2, AlertCircle } from 'lucide-react';
import { getEmailError, getNameError, isValidEmail, normalizeName } from '../utils/validation';
import { sendContactInquiry } from '../utils/emailService';
import { FieldError } from './FieldError';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [message, setMessage] = useState('');
  const [messageTouched, setMessageTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submittedData, setSubmittedData] = useState({ name: '', email: '', message: '' });

  const nameError = (nameTouched || /\d/.test(name)) ? getNameError(name) : '';
  const isEmailMalformed = email.length > 0 && (
    /\.[a-z0-9]*\d/i.test(email) ||
    (email.includes('@') && email.slice(email.indexOf('@')).includes('.') && !isValidEmail(email))
  );
  const emailError = (emailTouched || isEmailMalformed) ? getEmailError(email) : '';
  const messageError = messageTouched && !message.trim() ? 'Please tell us about your print requirements.' : '';

  const handleClose = useCallback(() => {
    setName('');
    setEmail('');
    setNameTouched(false);
    setEmailTouched(false);
    setMessage('');
    setMessageTouched(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setSent(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
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
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setNameTouched(true);
    setEmailTouched(true);
    setMessageTouched(true);
    setSubmitError(null);

    if (getNameError(name)) {
      document.getElementById('contact-name')?.focus();
      return;
    }
    if (getEmailError(email)) {
      document.getElementById('contact-email')?.focus();
      return;
    }
    if (!message.trim()) {
      document.getElementById('contact-message')?.focus();
      return;
    }

    const cleanName = normalizeName(name);
    const cleanEmail = email.trim();
    setIsSubmitting(true);

    try {
      // Observable form submission to the configured email service
      const response = await sendContactInquiry({
        name: cleanName,
        email: cleanEmail,
        message,
      });

      if (!response.success) {
        setSubmitError(response.message);
        setIsSubmitting(false);
        return;
      }

      setSubmittedData({ name: cleanName, email: cleanEmail, message });
      try {
        const messages = JSON.parse(localStorage.getItem('printhub_contact_messages') || '[]');
        messages.unshift({
          date: new Date().toISOString(),
          name: cleanName,
          email: cleanEmail,
          message,
        });
        localStorage.setItem('printhub_contact_messages', JSON.stringify(messages.slice(0, 50)));
      } catch {
        // Local storage fallback
      }

      // Automatically reset form fields only upon confirmed submission
      setName('');
      setEmail('');
      setNameTouched(false);
      setEmailTouched(false);
      setMessageTouched(false);
      setMessage('');
      setSent(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to dispatch message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 38, 77, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 2200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '560px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(5, 38, 77, 0.35)',
        }}
      >
        <div
          style={{
            backgroundColor: '#05264D',
            color: '#FFFFFF',
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ color: '#FFF000', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
              ✦ GET IN TOUCH
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '4px 0 0', color: '#FFFFFF' }}>
              Speak with a Print Specialist
            </h3>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
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

        {sent ? (
          <div style={{ padding: '40px 28px', textAlign: 'center' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(33, 111, 163, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <CheckCircle size={40} color="#216FA3" />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#05264D', marginBottom: '8px' }}>
              Message Dispatched!
            </h3>
            <p style={{ color: '#64748B', fontSize: '15px', marginBottom: '24px' }}>
              One of our Coimbatore print consultants will reach out to you within 30 minutes during business hours.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/917845132962?text=${encodeURIComponent(
                  `Hello Ikasle PrintHub! My name is ${submittedData.name || 'Client'}. Message: ${submittedData.message}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-yellow"
                style={{ padding: '12px 20px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <MessageCircle size={18} />
                <span>Chat on WhatsApp (+91 78451 32962)</span>
              </a>

              <a
                href={`mailto:businessgroupikasle@gmail.com?subject=${encodeURIComponent(
                  `Print Inquiry from ${submittedData.name || 'Client'}`
                )}&body=${encodeURIComponent(
                  `Client Name: ${submittedData.name}\nClient Email: ${submittedData.email}\n\nMessage:\n${submittedData.message}`
                )}`}
                className="btn-outline-dark"
                style={{ padding: '12px 20px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
              >
                <Mail size={16} />
                <span>Email Us (businessgroupikasle@gmail.com)</span>
              </a>

              <button
                onClick={handleClose}
                className="btn-outline-dark"
                style={{ padding: '12px 20px' }}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ padding: '28px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label htmlFor="contact-name" style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#05264D', marginBottom: '6px' }}>
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    const nativeEvent = e.nativeEvent as InputEvent;
                    if (
                      nativeEvent.inputType === 'insertFromPaste' ||
                      nativeEvent.inputType === 'insertFromDrop' ||
                      (nativeEvent.data && nativeEvent.data.length > 1)
                    ) {
                      setNameTouched(true);
                    }
                  }}
                  onBlur={() => setNameTouched(true)}
                  aria-invalid={!!nameError}
                  aria-describedby={nameError ? 'contact-name-error' : undefined}
                  className={`modal-form-input ${nameError ? 'input-error' : ''}`}
                />
                <FieldError id="contact-name-error" message={nameError} marginTop={6} />
              </div>

              <div>
                <label htmlFor="contact-email" style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#05264D', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="text"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="ramesh@company.in"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    const nativeEvent = e.nativeEvent as InputEvent;
                    if (
                      nativeEvent.inputType === 'insertFromPaste' ||
                      nativeEvent.inputType === 'insertFromDrop' ||
                      (nativeEvent.data && nativeEvent.data.length > 1)
                    ) {
                      setEmailTouched(true);
                    }
                  }}
                  onBlur={() => setEmailTouched(true)}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'contact-email-error' : undefined}
                  className={`modal-form-input ${emailError ? 'input-error' : ''}`}
                />
                <FieldError id="contact-email-error" message={emailError} marginTop={6} />
              </div>

              <div>
                <label htmlFor="contact-message" style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#05264D', marginBottom: '6px' }}>
                  How can we help your brand? *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  placeholder="Tell us about your print requirements, sizes, quantities, or deadlines..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onBlur={() => setMessageTouched(true)}
                  aria-invalid={!!messageError}
                  aria-describedby={messageError ? 'contact-message-error' : undefined}
                  className={`modal-form-input ${messageError ? 'input-error' : ''}`}
                  style={{ resize: 'vertical' }}
                />
                <FieldError id="contact-message-error" message={messageError} marginTop={6} />
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

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ fontSize: '12.5px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={15} />
                <span>Open Mon-Sat: 9:00 AM - 8:30 PM</span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-yellow"
                style={{
                  padding: '12px 24px',
                  opacity: isSubmitting ? 0.75 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                {isSubmitting ? (
                  <Loader2 size={16} className="spin-animate" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
