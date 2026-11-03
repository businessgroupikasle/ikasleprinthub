import React from 'react';
import { ArrowLeft, Shield, Mail, Sparkles } from 'lucide-react';
import './LegalPage.css';

interface PrivacyPageProps {
  onBackHome: () => void;
  onOpenQuote?: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBackHome, onOpenQuote }) => {
  const sections = [
    { id: 'commitment', title: '1. Our Privacy Commitment' },
    { id: 'info-collected', title: '2. Information We Collect' },
    { id: 'how-we-use', title: '3. How We Use Your Data' },
    { id: 'artwork-confidentiality', title: '4. Artwork & File Confidentiality' },
    { id: 'data-sharing', title: '5. Third-Party Disclosures & Courier Logistics' },
    { id: 'cookies-storage', title: '6. Cookies & Local Browser Storage' },
    { id: 'data-retention', title: '7. Data Retention & Your Rights' },
    { id: 'contact-officer', title: '8. Data Protection Officer Contact' },
  ];

  return (
    <div className="legal-page-wrapper">
      <div className="container">
        {/* Hero Banner */}
        <div className="legal-hero-banner">
          <div className="legal-breadcrumb">
            <button onClick={onBackHome} aria-label="Return to Home">
              <ArrowLeft size={14} />
              <span>Home</span>
            </button>
            <span>/</span>
            <span style={{ color: '#E2E8F0' }}>Privacy Policy</span>
          </div>

          <div className="legal-badge">
            <Shield size={13} />
            <span>DATA PROTECTION & CONFIDENTIALITY • COMPLIANT WITH DPDP ACT 2023</span>
          </div>

          <h1 className="legal-title">Privacy Policy & Client Data Protection</h1>
          <p className="legal-subtitle">
            At Ikasle PrintHub, we treat your contact details, brand assets, and proprietary packaging designs with the highest standards of security, privacy, and confidentiality.
          </p>
        </div>

        {/* Content Layout */}
        <div className="legal-content-grid">
          {/* Quick Nav Sidebar */}
          <aside className="legal-sidebar" aria-label="Table of contents">
            <div className="legal-sidebar-title">Table of Contents</div>
            <nav className="legal-sidebar-menu">
              {sections.map((sec) => (
                <a key={sec.id} href={`#${sec.id}`} className="legal-sidebar-link">
                  <span>{sec.title}</span>
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="legal-main-card">
            <section id="commitment" className="legal-section">
              <h2 className="legal-section-title">
                <span className="legal-section-number">1</span>
                <span>Our Privacy Commitment</span>
              </h2>
              <p>
                <strong>Ikasle PrintHub</strong> ("Ikasle," "we," "us," or "our"), located at 1639/ A, 2nd Floor, Hopes, Coimbatore, Tamil Nadu, India, is committed to safeguarding the privacy and personal data of our website visitors, clients, and corporate partners.
              </p>
              <p>
                This Privacy Policy explains how we collect, process, store, and safeguard your personal information and uploaded digital print files when you use our website (ikasleprinthub.com) or engage our print production services.
              </p>
            </section>

            <section id="info-collected" className="legal-section">
              <h2 className="legal-section-title">
                <span className="legal-section-number">2</span>
                <span>Information We Collect</span>
              </h2>
              <p>
                We only collect information necessary to provide accurate custom price estimates, prepare proofs, produce print orders, and deliver items to your physical premises:
              </p>
              <ul>
                <li><strong>Contact Details:</strong> Full name, verified email address, and 10-digit mobile / WhatsApp phone number.</li>
                <li><strong>Business & Billing Data:</strong> Company or brand name, GSTIN (for GST input tax credit invoices), and billing address.</li>
                <li><strong>Shipping & Delivery Addresses:</strong> Street address, landmark, PIN code, and recipient contact person in Coimbatore or elsewhere in India.</li>
                <li><strong>Artwork & Production Assets:</strong> Graphic designs, logos, brochures, visiting cards, box die-lines, and customer specification notes.</li>
              </ul>
            </section>

            <section id="how-we-use" className="legal-section">
              <h2 className="legal-section-title">
                <span className="legal-section-number">3</span>
                <span>How We Use Your Information</span>
              </h2>
              <p>
                Your personal and order data is used strictly for legitimate commercial printing business purposes:
              </p>
              <ul>
                <li>Generating accurate real-time price quotes based on quantity, paper GSM, and finishing choices.</li>
                <li>Conducting automated and manual prepress file checks (resolution, bleed, color profile).</li>
                <li>Sending proof approval alerts and order status tracking via WhatsApp and email.</li>
                <li>Dispatching packages via courier or local Coimbatore hyper-local delivery partners (Porter, ST Courier, Professional Couriers).</li>
                <li>Issuing statutory GST sales invoices and accounting documentation.</li>
              </ul>
            </section>

            <section id="artwork-confidentiality" className="legal-section">
              <h2 className="legal-section-title">
                <span className="legal-section-number">4</span>
                <span>Artwork & Brand Asset Confidentiality</span>
              </h2>
              <div className="legal-highlight-box">
                <strong>Non-Disclosure Assurance:</strong> Your design files, unreleased product packaging mockups, book manuscripts, confidential financial brochures, and proprietary branding assets remain strictly confidential. We will <em>never</em> sell, license, share, or display your design files publicly without your explicit prior written consent.
              </div>
              <p>
                All digital artwork files submitted through our online portal or upload form are transferred using encrypted protocols (TLS/SSL) and stored in firewalled production directories accessible solely by designated prepress engineers.
              </p>
            </section>

            <section id="data-sharing" className="legal-section">
              <h2 className="legal-section-title">
                <span className="legal-section-number">5</span>
                <span>Third-Party Disclosures & Courier Logistics</span>
              </h2>
              <p>
                We do not sell, rent, or trade your personal information to third-party marketing brokers. Data is shared exclusively with trusted service providers under strict data-protection agreements:
              </p>
              <ul>
                <li><strong>Logistics Carriers:</strong> Name, delivery address, and contact number are provided to courier and transport partners for physical doorstep parcel delivery.</li>
                <li><strong>Payment Processors:</strong> Online payments are processed through RBI-authorized payment gateways complying with PCI-DSS standards. We never store credit/debit card PINs or CVV numbers on our servers.</li>
                <li><strong>Legal Compliance:</strong> We may disclose information if mandatory under applicable Indian law, court summons, or regulatory authorities.</li>
              </ul>
            </section>

            <section id="cookies-storage" className="legal-section">
              <h2 className="legal-section-title">
                <span className="legal-section-number">6</span>
                <span>Cookies & Local Browser Storage</span>
              </h2>
              <p>
                Our web application utilizes minimal, privacy-friendly browser cookies and HTML5 local storage (<code>localStorage</code>) to enhance your user experience:
              </p>
              <ul>
                <li>Retaining active quote configurations and reference numbers across page reloads.</li>
                <li>Saving your preferred print categories and sample kit requests.</li>
                <li>Anonymous session metrics to optimize site performance and loading speeds.</li>
              </ul>
              <p>
                You may clear your browser cookies or localStorage at any time through your browser settings without affecting core website functionality.
              </p>
            </section>

            <section id="data-retention" className="legal-section">
              <h2 className="legal-section-title">
                <span className="legal-section-number">7</span>
                <span>Data Retention & Your Rights</span>
              </h2>
              <p>
                In compliance with India's Digital Personal Data Protection (DPDP) Act 2023, you hold the following rights:
              </p>
              <ul>
                <li><strong>Right to Access:</strong> Request a summary of the personal data and past print orders held by us.</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate phone numbers, billing addresses, or company names.</li>
                <li><strong>Right to Erasure:</strong> Request the deletion of historical digital artwork files once production and warranty periods have concluded.</li>
              </ul>
            </section>

            <section id="contact-officer" className="legal-section">
              <h2 className="legal-section-title">
                <span className="legal-section-number">8</span>
                <span>Data Protection Officer Contact</span>
              </h2>
              <p>
                For questions regarding this Privacy Policy, file removal requests, or data privacy practices, please contact our designated privacy team:
              </p>
              <div style={{ background: '#F8FAFC', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '14px', lineHeight: 1.6 }}>
                <div><strong>Ikasle PrintHub — Privacy & Compliance Division</strong></div>
                <div>1639/ A, 2nd Floor, Hopes, Coimbatore, Tamil Nadu, India - 641004</div>
                <div>Email: <a href="mailto:businessgroupikasle@gmail.com" style={{ color: '#216FA3', textDecoration: 'none', fontWeight: 600 }}>businessgroupikasle@gmail.com</a></div>
                <div>Phone: <a href="tel:+917845132962" style={{ color: '#216FA3', textDecoration: 'none', fontWeight: 600 }}>+91 78451 32962</a></div>
              </div>
            </section>

            {/* Bottom Support Callout */}
            <div className="legal-cta-card">
              <div className="legal-cta-text">
                <h4>Need clarification on your data privacy?</h4>
                <p>Reach out to our Coimbatore print support team directly.</p>
              </div>
              <div className="legal-cta-actions">
                <a
                  href="mailto:businessgroupikasle@gmail.com?subject=Privacy%20Inquiry%20-%20Ikasle%20PrintHub"
                  className="btn-yellow"
                  style={{ padding: '10px 18px', fontSize: '13.5px', textDecoration: 'none' }}
                >
                  <Mail size={15} />
                  <span>Email Privacy Officer</span>
                </a>
                {onOpenQuote && (
                  <button
                    onClick={onOpenQuote}
                    className="btn-outline-dark"
                    style={{ padding: '10px 18px', fontSize: '13.5px' }}
                  >
                    <Sparkles size={15} />
                    <span>Get a Quote</span>
                  </button>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
