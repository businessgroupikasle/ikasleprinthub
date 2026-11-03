import React, { useState, useMemo } from 'react';
import { ArrowLeft, HelpCircle, Search, ChevronDown, Phone, Sparkles } from 'lucide-react';
import './LegalPage.css';

interface FaqPageProps {
  onBackHome: () => void;
  onOpenQuote?: (service?: string) => void;
}

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: React.ReactNode;
}

const CATEGORIES = [
  'All',
  'Ordering & Quotes',
  'Artwork & Prepress',
  'Printing & Finishes',
  'Turnaround & Delivery',
  'Billing & GST',
];

const FAQ_LIST: FaqItem[] = [
  {
    id: 'best-press',
    category: 'Ordering & Quotes',
    question: 'Which is the best printing press in Coimbatore for commercial offset & digital printing?',
    answer: (
      <>
        <p>
          <strong>Ikasle PrintHub</strong> is widely recognized as one of the premier commercial printing and corporate branding partners in Coimbatore, Tamil Nadu. Located at Hopes (Avinashi Road corridor), our team delivers high-capacity offset printing for bulk volume runs and high-precision digital printing for short-run express marketing collateral.
        </p>
        <p>
          We specialize in luxury visiting cards, brochures, product packaging boxes, roll-up exhibition standees, and custom stickers for over 4,000+ corporate clients, manufacturers, and colleges across Coimbatore, Tiruppur, and Erode.
        </p>
      </>
    ),
  },
  {
    id: 'instant-quote',
    category: 'Ordering & Quotes',
    question: 'How do I request a custom price quote for my print project?',
    answer: (
      <>
        <p>
          You can get an instant estimate directly on our website by clicking the <strong>"Get a Quote"</strong> button in the navigation header. Select your product (e.g. Business Cards, Brochures, Packaging Boxes), choose your quantity, paper stock, and finish, and our dynamic pricing engine will instantly calculate an estimate in Indian Rupees (₹).
        </p>
        <p>
          Alternatively, chat with our print specialists on WhatsApp at <strong>+91 78451 32962</strong> or email your specifications to <strong>businessgroupikasle@gmail.com</strong> for a formal commercial tender quotation within 30 minutes.
        </p>
      </>
    ),
  },
  {
    id: 'free-sample-pack',
    category: 'Ordering & Quotes',
    question: 'Can I get a physical paper sample pack in Coimbatore before placing a bulk order?',
    answer: (
      <>
        <p>
          <strong>Yes!</strong> We provide free Bestseller Sample Packs delivered to your office or residence in Coimbatore. Each kit contains physical samples of:
        </p>
        <ul>
          <li>Paper weights ranging from 130 GSM, 170 GSM, 250 GSM, 300 GSM, 350 GSM up to 600 GSM duplex board.</li>
          <li>Matte vs. Gloss thermal laminations.</li>
          <li>Luxury finishes including Soft-Touch Velvet Lamination, Raised Spot UV, and Metallic Gold/Silver Foil Stamping.</li>
          <li>Specialty synthetic non-tearable visiting card stocks.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'file-formats',
    category: 'Artwork & Prepress',
    question: 'What file formats and specifications do you require for print production?',
    answer: (
      <>
        <p>
          We accept all industry-standard prepress graphic file formats:
        </p>
        <ul>
          <li><strong>Preferred Format:</strong> Print-Ready PDF (PDF/X-1a or high-quality print preset).</li>
          <li><strong>Vector Formats:</strong> Adobe Illustrator (.AI), CorelDraw (.CDR), Encapsulated PostScript (.EPS) with all text converted to curves/outlines.</li>
          <li><strong>Raster Formats:</strong> Adobe Photoshop (.PSD), TIFF, or high-res PNG at minimum 300 DPI.</li>
          <li><strong>Bleed Requirements:</strong> Ensure minimum 3mm bleed on all sides and keep essential text 4mm inside the trim line.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'rgb-vs-cmyk',
    category: 'Artwork & Prepress',
    question: 'Why do colors look different on my screen compared to the printed copy?',
    answer: (
      <>
        <p>
          Computer and phone screens emit light using the <strong>RGB</strong> (Red, Green, Blue) spectrum, which has a broad, glowing color gamut. Commercial printing presses deposit physical ink pigments using the <strong>CMYK</strong> (Cyan, Magenta, Yellow, Black) process.
        </p>
        <p>
          Because paper absorbs light rather than emitting it, physical prints appear slightly softer than glowing displays. To achieve maximum color fidelity, always design your artwork in <strong>CMYK mode</strong> and request a physical hard proof if exact Pantone matching is critical for your brand identity.
        </p>
      </>
    ),
  },
  {
    id: 'turnaround-time',
    category: 'Turnaround & Delivery',
    question: 'Do you offer same-day or 24-hour express printing in Coimbatore?',
    answer: (
      <>
        <p>
          <strong>Yes!</strong> For emergency requirements, our digital printing press provides <strong>Same-Day Dispatch</strong> and <strong>24-Hour Doorstep Delivery</strong> across Coimbatore city (Gandhipuram, RS Puram, Peelamedu, Saravanampatti, Saibaba Colony, Kurichi SIDCO).
        </p>
        <p>
          Qualifying express items include visiting cards, product brochures, flyers, ID cards, certificate printing, roll-up standees, and custom vinyl labels.
        </p>
      </>
    ),
  },
  {
    id: 'codissia-delivery',
    category: 'Turnaround & Delivery',
    question: 'Do you print stall materials and provide rush delivery to CODISSIA Trade Fair Complex?',
    answer: (
      <>
        <p>
          <strong>Yes, absolutely.</strong> Ikasle PrintHub is a regular printing partner for national and international exhibitors participating in major expos at <strong>CODISSIA Trade Fair Complex</strong>, Coimbatore (such as INTEC, Agri Intex, Texfair, and ELECRAMA).
        </p>
        <p>
          We print roll-up display banners, exhibition product catalogues, stall backdrops, sample brochures, and promo lanyards with direct, on-time delivery right to your booth or stall coordinator at CODISSIA.
        </p>
      </>
    ),
  },
  {
    id: 'finishes-available',
    category: 'Printing & Finishes',
    question: 'What premium finishing and post-press embellishments do you offer?',
    answer: (
      <>
        <p>
          We house full post-press automation including computerized guillotine cutters, thermal roll laminators, automatic foil stampers, and precision die-cutting equipment:
        </p>
        <ul>
          <li><strong>Thermal Lamination:</strong> Zero-bubble Ultra Matte, High Gloss, and Velvet Touch (Soft Touch).</li>
          <li><strong>Specialty UV:</strong> Precision Spot UV varnish and 3D Raised Embossed UV.</li>
          <li><strong>Hot Foil Stamping:</strong> Metallic Gold, Matte Gold, Silver, Holographic, and Rose Gold foil.</li>
          <li><strong>Structural Finishing:</strong> Custom shape die-cutting, folding, scoring, saddle-stitching, and wire-O binding.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'gst-invoices',
    category: 'Billing & GST',
    question: 'Do you provide valid GST invoices for corporate input tax credit?',
    answer: (
      <>
        <p>
          <strong>Yes, 100%.</strong> Every single order placed with Ikasle PrintHub comes with an official GST tax invoice displaying our GSTIN, your company’s GSTIN (if provided), appropriate HSN/SAC codes (4911 for printed matter, 4819 for packaging cartons), and statutory CGST/SGST/IGST breakdowns.
        </p>
        <p>
          Corporate clients can claim full input tax credit (ITC) on all marketing and packaging printing expenditure.
        </p>
      </>
    ),
  },
  {
    id: 'reprint-policy',
    category: 'Printing & Finishes',
    question: 'What happens if there is a printing defect or misaligned cut in my order?',
    answer: (
      <>
        <p>
          We stand behind every sheet that rolls off our presses with our <strong>100% Quality & Reprint Guarantee</strong>. If your print batch exhibits a manufacturing defect attributable to our production (such as ink smudging, machine misregistration, lamination peeling, or cutting deviation exceeding 2mm), simply notify us within 48 hours of delivery with photos or video.
        </p>
        <p>
          We will reprint the affected quantity and dispatch it via express priority at zero additional charge.
        </p>
      </>
    ),
  },
];

export const FaqPage: React.FC<FaqPageProps> = ({ onBackHome, onOpenQuote }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'best-press': true, // First FAQ open by default
  });

  const toggleAccordion = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_LIST.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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
            <span style={{ color: '#E2E8F0' }}>FAQ</span>
          </div>

          <div className="legal-badge">
            <HelpCircle size={13} />
            <span>KNOWLEDGE HUB & HELP CENTER • COIMBATORE</span>
          </div>

          <h1 className="legal-title">Frequently Asked Questions</h1>
          <p className="legal-subtitle">
            Find immediate answers regarding custom printing options, prepress file setup, paper GSM stocks, turnaround times, and delivery across Coimbatore.
          </p>
        </div>

        {/* Search & Category Filter Section */}
        <div className="faq-search-wrapper">
          <Search size={18} className="faq-search-icon" />
          <input
            type="text"
            className="faq-search-input"
            placeholder="Search questions (e.g., sample packs, bleed, turnaround, GST, CODISSIA)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="faq-category-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`faq-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-list">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div key={faq.id} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-accordion-trigger"
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <ChevronDown size={18} className="faq-chevron" />
                  </button>
                  {isOpen && <div className="faq-accordion-body">{faq.answer}</div>}
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 20px', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <HelpCircle size={36} color="#94A3B8" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#05264D', marginBottom: '6px' }}>No matching questions found</h3>
              <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '16px' }}>
                Try searching for something else or ask our Coimbatore print specialist directly.
              </p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="btn-outline-dark" style={{ padding: '8px 18px', fontSize: '13px' }}>
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom Support Callout */}
        <div className="legal-cta-card">
          <div className="legal-cta-text">
            <h4>Still have questions or need custom technical assistance?</h4>
            <p>Our Coimbatore print consultants will assist you with paper stock selection and quote estimates.</p>
          </div>
          <div className="legal-cta-actions">
            <a
              href="https://wa.me/917845132962?text=Hello%20Ikasle%20PrintHub!%20I%20have%20a%20question%20regarding%20printing%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-yellow"
              style={{ padding: '10px 18px', fontSize: '13.5px', textDecoration: 'none' }}
            >
              <Phone size={15} />
              <span>Chat on WhatsApp (+91 78451 32962)</span>
            </a>
            {onOpenQuote && (
              <button
                onClick={() => onOpenQuote()}
                className="btn-outline-dark"
                style={{ padding: '10px 18px', fontSize: '13.5px' }}
              >
                <Sparkles size={15} />
                <span>Request Custom Quote</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
