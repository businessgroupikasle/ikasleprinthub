import React from 'react';
import { Gem, Zap, Lightbulb, Settings2, Handshake } from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  const reasons = [
    {
      id: 'quality',
      title: 'Premium Quality Prints',
      desc: 'Sharp, vibrant and durable results.',
      icon: <Gem size={26} />,
    },
    {
      id: 'turnaround',
      title: 'Fast Turnaround',
      desc: 'Get your prints when you need them.',
      icon: <Zap size={26} />,
    },
    {
      id: 'support',
      title: 'Design Support',
      desc: 'Our team brings your ideas to life.',
      icon: <Lightbulb size={26} />,
    },
    {
      id: 'custom',
      title: 'Custom Solutions',
      desc: 'Tailored to your brand needs.',
      icon: <Settings2 size={26} />,
    },
    {
      id: 'partner',
      title: 'Trusted Partner',
      desc: 'Reliable, professional and client-focused.',
      icon: <Handshake size={26} />,
    },
  ];

  return (
    <section id="about" className="why-choose-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <span id="why-choose" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
      {/* Industrial Printing Press Background with Navy Blend */}
      <div
        className="why-choose-bg"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(5, 38, 77, 0.94) 0%, rgba(0, 59, 112, 0.90) 50%, rgba(5, 38, 77, 0.95) 100%), url(/assets/images/industrial_press.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      />

      {/* Top & Bottom Yellow Geometric Accent Wedges */}
      <div className="why-choose-top-wedge" />
      <div className="why-choose-bottom-wedge" />

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div className="why-choose-layout">
          {/* Left Intro Text */}
          <div className="why-choose-left">
            <div
              style={{
                display: 'inline-block',
                backgroundColor: '#EFF6FF',
                color: '#1D4ED8',
                border: '1px solid #BFDBFE',
                padding: '4px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                marginBottom: '12px'
              }}
            >
              About Ikaslé Print Hub
            </div>
            <h2 className="why-choose-title">
              Why Choose<br />
              Ikaslé Print Hub?
            </h2>
            <p className="why-choose-sub">
              More than just printing — we're your creative production partner in Coimbatore.
            </p>
          </div>

          {/* Right 5 Feature Cards in a Row */}
          <div className="why-choose-cards-row">
            {reasons.map((item) => (
              <div key={item.id} className="why-choose-card">
                <div className="why-icon-badge">
                  {item.icon}
                </div>
                <h3 className="why-card-title">{item.title}</h3>
                <p className="why-card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
