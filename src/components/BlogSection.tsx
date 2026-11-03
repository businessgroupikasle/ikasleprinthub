import React, { useState } from 'react';
import { Clock, Calendar, ArrowUpRight, BookOpen, X, CheckCircle } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const posts: BlogPost[] = [
    {
      id: 'paper-gsm-guide',
      title: 'How to Choose the Perfect Paper GSM for Luxury Business Cards & Corporate Stationery',
      category: 'Paper & Finishes',
      readTime: '4 min read',
      date: 'Oct 28, 2026',
      excerpt: 'Understand paper weights from 80 GSM bond sheets up to 600 GSM duplex stocks, textured linen, and velvet-laminated cards to make an unforgettable first impression.',
      content: [
        'GSM stands for "Grams per Square Meter" and represents the fundamental metric of paper weight and density. For corporate identity, selecting the right GSM determines whether your collateral feels disposable or like an heirloom brand asset.',
        '• 90 - 120 GSM: Ideal for corporate letterheads, invoices, and standard stationery. It glides smoothly through office laser and inkjet printers without jamming.',
        '• 170 - 250 GSM: The sweet spot for trifold brochures, product flyers, and presentation folders. Provides enough body to resist creasing while holding deep, saturated ink densities.',
        '• 350 - 450 GSM: Standard to ultra-premium business cards and luxury invitations. Paired with soft-touch matte lamination or spot UV, it exudes authority and craft.',
        '• 600+ GSM (Duplex & Sandwich Cards): Custom bonded layers featuring colored core seams. The pinnacle of tactile prestige for executives, architects, and luxury jewelers.'
      ],
      tags: ['Paper GSM', 'Business Cards', 'Luxury Print', 'Finishes']
    },
    {
      id: 'cmyk-color-accuracy',
      title: 'CMYK vs RGB vs Pantone: The Ultimate Guide to 100% Brand Color Accuracy in Print',
      category: 'Prepress & Color',
      readTime: '5 min read',
      date: 'Oct 22, 2026',
      excerpt: 'Why colors look vibrant on your computer screen but dull in print, and how calibrated ICC color profiles and Pantone Matching Systems eliminate costly reprints.',
      content: [
        'Monitors emit light across an additive RGB (Red, Green, Blue) spectrum, while commercial presses rely on subtractive CMYK (Cyan, Magenta, Yellow, Key/Black) ink absorption on paper fibers.',
        '1. Converting RGB to CMYK: Bright saturated greens, electric blues, and neon yellows exist outside the standard four-color printing gamut. Converting in Adobe Illustrator/InDesign allows you to fine-tune out-of-gamut alerts before plate setting.',
        '2. When to Use Pantone (Spot Colors): For corporate brand identities like Coca-Cola Red or Tiffany Blue, CMYK dot screening can have 2-4% variance across print runs. Spot Pantone inks are premixed single pigment formulas that guarantee identical hue on every sheet.',
        '3. Paper Substrate Impact: Coated gloss art paper reflects light for vivid sharpness, whereas uncoated offset paper absorbs ink, making colors appear 10-15% softer and deeper.'
      ],
      tags: ['CMYK vs RGB', 'Pantone', 'Color Calibration', 'Prepress']
    },
    {
      id: 'sustainable-packaging',
      title: 'Sustainable Packaging Trends 2026: Biodegradable Kraft, Soy Inks & Foil Elegance',
      category: 'Custom Packaging',
      readTime: '4 min read',
      date: 'Oct 15, 2026',
      excerpt: 'Modern consumers demand eco-conscious packaging without sacrificing unboxing luxury. Explore how unbleached virgin kraft, vegetable inks, and hot foil stamping merge.',
      content: [
        'Sustainability is no longer an afterthought — it is an active buying trigger. Forward-thinking brands in Coimbatore and across India are redesigning their product packaging around circular lifecycle values.',
        '• Certified Recycled & Virgin Kraft: High burst strength corrugated boxes manufactured from post-consumer recycled pulp provide rugged shipping protection with natural earthy aesthetics.',
        '• Plant-Based Soy & Vegetable Inks: Free from volatile organic compounds (VOCs), vegetable inks produce rich typographic contrast while enabling effortless repulping during recycling.',
        '• Zero-Plastic Finishes: Replacing plastic laminates with aqueous barrier coatings and biodegradable water-based varnishes ensures packaging decomposes naturally within commercial compost timelines.',
        '• Metallic Hot Foil Accents: Gold and copper foil stamping remains recyclable while delivering the premium tactile sheen required for cosmetic, confectionery, and apparel packaging.'
      ],
      tags: ['Eco Packaging', 'Kraft Boxes', 'Soy Inks', 'Foil Stamping']
    }
  ];

  return (
    <section id="blog" className="blog-section" style={{ backgroundColor: '#F8FAFC', padding: '90px 0 100px', position: 'relative', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center" style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 56px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              padding: '6px 16px',
              borderRadius: '999px',
              color: '#1D4ED8',
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '14px'
            }}
          >
            <BookOpen size={15} />
            <span>Print Knowledge Hub & Blog</span>
          </div>

          <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#05264D', lineHeight: 1.2, letterSpacing: '-0.5px', marginBottom: '14px' }}>
            Latest Print Insights, Guides & Tips
          </h2>
          <p style={{ fontSize: '16.5px', color: '#475569', lineHeight: 1.6 }}>
            Master print manufacturing, paper selection, and brand color precision with practical insights from our Coimbatore press technicians.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px'
          }}
        >
          {posts.map((post) => (
            <article
              key={post.id}
              className="blog-card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
            >
              <div>
                {/* Meta info header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                  <span
                    style={{
                      backgroundColor: 'rgba(5, 38, 77, 0.08)',
                      color: '#05264D',
                      fontSize: '12px',
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: '999px',
                      letterSpacing: '0.4px'
                    }}
                  >
                    {post.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12.5px', color: '#64748B' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} />
                      {post.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Post Title */}
                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#0F172A',
                    lineHeight: 1.4,
                    marginBottom: '14px',
                    transition: 'color 0.2s ease'
                  }}
                  className="blog-card-title"
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.6, marginBottom: '22px' }}>
                  {post.excerpt}
                </p>
              </div>

              {/* Card Footer: Tags & Read More Button */}
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '11px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        color: '#64748B',
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="blog-read-more-btn"
                  aria-label={`Read full article: ${post.title}`}
                >
                  <span>Read Full Article</span>
                  <div className="blog-arrow-circle" aria-hidden="true">
                    <ArrowUpRight size={16} strokeWidth={2.4} />
                  </div>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedPost(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 17, 34, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: '36px 32px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setSelectedPost(null)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#475569'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ backgroundColor: 'rgba(5, 38, 77, 0.08)', color: '#05264D', fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '999px' }}>
                {selectedPost.category}
              </span>
              <span style={{ fontSize: '13px', color: '#64748B' }}>{selectedPost.date} • {selectedPost.readTime}</span>
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#05264D', lineHeight: 1.3, marginBottom: '20px' }}>
              {selectedPost.title}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#334155', fontSize: '15.5px', lineHeight: 1.7, marginBottom: '28px' }}>
              {selectedPost.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <CheckCircle size={18} color="#16A34A" />
              <span style={{ fontSize: '13.5px', color: '#475569', fontWeight: 500 }}>
                Need expert advice for your print job? Our Coimbatore technicians provide free paper swatch consultation.
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
