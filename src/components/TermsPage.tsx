import React from 'react';
import { ArrowLeft, FileText, Phone, Sparkles } from 'lucide-react';
import './LegalPage.css';

interface TermsPageProps {
  onBackHome: () => void;
  onOpenQuote?: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBackHome, onOpenQuote }) => {
  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'specifications', title: '2. Print Specifications & Artwork' },
    { id: 'color-tolerances', title: '3. Color Accuracy & CMYK Calibration' },
    { id: 'pricing-payment', title: '4. Quotations, Pricing & GST' },
    { id: 'production-dispatch', title: '5. Production & Express Coimbatore Delivery' },
    { id: 'reprints-returns', title: '6. 100% Reprint & Cancellation Policy' },
    { id: 'intellectual-property', title: '7. Client Artwork Copyright & Ownership' },
    { id: 'jurisdiction', title: '8. Governing Law & Jurisdiction' },
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
            <span style={{ color: '#E2E8F0' }}>Terms & Conditions</span>
          </div>

          <div className="legal-badge">
            <FileText size={13} />
            <span>LEGAL & COMPLIANCE • LAST UPDATED: NOVEMBER 2026</span>
          </div>

          <h1 className="legal-title">Terms & Conditions of Service</h1>
          <p className="legal-subtitle">
            These terms govern all commercial printing orders, online quote requests, proof approvals, and logistics services provided by Ikasle PrintHub in Coimbatore, Tamil Nadu.
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

          {/* Main Legal Content */}
          <main className="legal-main-card">
            <section id="acceptance" className="legal-section">
              <h2 className="legal-section-title">
                <span className="legal-section-number">1</span>
                <span>Acceptance of Terms</span>
              </h2>
              <p>
                By placing an order, uploading artwork files, or requesting an instant price quotation with <strong>Ikasle PrintHub</strong> ("we," "us," or "our"), you ("Client," "Customer," or "You") confirm that you are at least 18 years old and agree to be legally bound by these Terms and Conditions.
              </p>
              <p>
                If you are placing an order on behalf of an enterprise, company, institution, or non-profit organization in Coimbatore or across India, you warrant that you possess the full legal authority to bind that entity to these Terms.
              </p>
            </section>

            <section id="specifications" className="legal-section">
              <h2 className="legal-section-title">
                <span className="legal-section-number">2</span>
                <span>Print Specifications, Artwork & Proofing</span>
              </h2>
              <p>
                To ensure high-definition print quality on our Heidelberg offset and Konica Minolta digital presses, client artwork must meet the following standard industry prepress guidelines:
              </p>
              <ul>
                <li><strong>Resolution:</strong> Minimum 300 DPI at 100% final physical print scale.</li>
                <li><strong>Color Mode:</strong> Native CMYK color space. Files supplied in RGB or Pantone will be converted automatically to process CMYK, which may cause minor color shifts.</li>
                <li><strong>Bleed & Safe Margins:</strong> Minimum 3mm external bleed on all perimeter edges and 4mm internal safe area inside cut lines for text and logos.</li>
                <li><strong>Accepted Formats:</strong> Print-ready PDF/X-1a, Adobe Illustrator (.AI), Adobe Photoshop (.PSD), or CorelDraw (.CDR) with fonts converted to outlines/curves.</li>
              </ul>
              <div className="legal-highlight-box">
                <strong>Proof Approval Notice:</strong> A digital soft proof (PDF/JPEG) is shared for client sign-off. Once you approve a proof via email, WhatsApp, or customer dashboard, Ikasle PrintHub cannot be held liable for typographical errors, spelling mistakes, or grammatical oversights present in the approved design.
              </div>
            </section>

            <section id="color-tolerances" className="legal-section">
              <h2 className="legal-section-title">
                <span className="legal-section-number">3</span>
                <span>Color Accuracy & CMYK Calibration</span>
              </h2>
              <p>
                Computer monitors, smartphones, and tablets display colors using emitted RGB light, whereas commercial offset presses deposit CMYK ink layers on physical paper substrates. As a result, colors on physical paper will naturally appear slightly softer than glowing backlit screens.
              </p>
              <p>
                We calibrate our press runs using X-Rite spectrophotometers to adhere to ISO 12647-2 commercial printing standards. A color variation of ±5% across different production batches or varying paper stocks (e.g. coated art board vs uncoated textured craft) is considered standard commercial tolerance.
              </p>
            </section>

            <section id="pricing-payment" className="legal-section">
              <h2 className="legal-section-title">
                <span className="legal-section-number">4</span>
                <span>Quotations, Pricing & GST Compliance</span>
              </h2>
              <p>
                All prices quoted in the online calculator and specialist invoices are stated in Indian Rupees (INR) and are subject to applicable Goods and Services Tax (GST) as per Government of India statutory rates (typically 12% or 18% HSN Code 4911 / 4819).
              </p>
              <ul>
                <li><strong>Payment Milestones:</strong> Custom manufacturing orders require 100% advance or 50% mobilization advance upon proof approval and balance prior to final dispatch.</li>
                <li><strong>Tax Invoices:</strong> Valid GST tax invoices are provided with every order enabling B2B input tax credit.</li>
                <li><strong>Quote Validity:</strong> Formal quotations issued by print specialists remain valid for 15 calendar days from the date of issuance.</li>
              </ul>
            </section>

            <section id="production-dispatch" className="legal-section">
              <h2 className="legal-section-title">
                <span className="legal-section-number">5</span>
                <span>Production Turnaround & Express Coimbatore Dispatch</span>
              </h2>
              <p>
                Production turnaround time begins strictly after final artwork proof approval and payment confirmation:
              </p>
              <ul>
                <li><strong>Digital Express:</strong> Same-day dispatch or 24-hour delivery across Coimbatore city (Gandhipuram, RS Puram, Peelamedu, Saravanampatti, Singanallur).</li>
                <li><strong>Standard Commercial Offset:</strong> 3 to 5 business days for brochures, flyers, catalogues, and packaging boxes.</li>
                <li><strong>CODISSIA Exhibitions Delivery:</strong> Direct booth delivery to CODISSIA Trade Fair Complex for trade shows (INTEC, Agri Intex, Texfair).</li>
              </ul>
            </section>

            <section id="reprints-returns" className="legal-section">
              <h2 className="legal-section-title">
                <span className="legal-section-number">6</span>
                <span>100% Reprint & Cancellation Policy</span>
              </h2>
              <p>
                Because print jobs are custom-manufactured specifically to your bespoke specifications, orders cannot be cancelled or returned once physical plate-making or paper cutting has commenced.
              </p>
              <div className="legal-highlight-box">
                <strong>Our 100% Reprint Guarantee:</strong> If your print batch exhibits a manufacturing defect attributable to our production (such as machine misregistration, faulty binding, cutting misalignment exceeding 2mm, or incorrect finish applied), notify us within 48 hours of receipt with photographic proof. We will happily reprint the affected quantity completely free of charge.
              </div>
            </section>

            <section id="intellectual-property" className="legal-section">
              <h2 className="legal-section-title">
                <span className="legal-section-number">7</span>
                <span>Client Artwork Copyright & Ownership</span>
              </h2>
              <p>
                You retain complete, exclusive copyright and intellectual property rights over all logos, trademarks, photographs, and text content supplied to us. You warrant that you possess all legal rights and licenses required to reproduce the submitted materials.
              </p>
              <p>
                Ikasle PrintHub reserves the right to decline any print order containing unlawful, defamatory, infringing, or obscene material.
              </p>
            </section>

            <section id="jurisdiction" className="legal-section">
              <h2 className="legal-section-title">
                <span className="legal-section-number">8</span>
                <span>Governing Law & Legal Jurisdiction</span>
              </h2>
              <p>
                These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any legal dispute or claim arising out of or in connection with print services provided by Ikasle PrintHub shall be subject to the exclusive jurisdiction of the competent courts in <strong>Coimbatore, Tamil Nadu, India</strong>.
              </p>
            </section>

            {/* Bottom Support Callout */}
            <div className="legal-cta-card">
              <div className="legal-cta-text">
                <h4>Have questions regarding our terms?</h4>
                <p>Our Coimbatore print consultants are available Mon-Sat to assist you.</p>
              </div>
              <div className="legal-cta-actions">
                <a
                  href="https://wa.me/917845132962"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-yellow"
                  style={{ padding: '10px 18px', fontSize: '13.5px', textDecoration: 'none' }}
                >
                  <Phone size={15} />
                  <span>WhatsApp (+91 78451 32962)</span>
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
