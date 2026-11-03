import React, { useState } from 'react';
import { Star, Building2, Coffee, Megaphone } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      id: 'vertex',
      quote: '"Excellent quality and super fast delivery. Our business cards turned out amazing!"',
      author: 'Vertex Solutions',
      role: 'Corporate Client',
      avatarBg: '#111827',
      AvatarIcon: Building2,
      rating: 5,
    },
    {
      id: 'bison',
      quote: '"They understood our brand perfectly. The signage and packaging were top-notch!"',
      author: 'Bison Café',
      role: 'Small Business Owner',
      avatarBg: '#2E7D32',
      AvatarIcon: Coffee,
      rating: 5,
    },
    {
      id: 'nexora',
      quote: '"Reliable, creative and professional. Our go-to print partner!"',
      author: 'Nexora Marketing',
      role: 'Marketing Agency',
      avatarBg: '#05264D',
      AvatarIcon: Megaphone,
      rating: 5,
    },
  ];

  return (
    <section id="client-stories" className="testimonials-section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background with geometric angles */}
      <div className="testimonials-bg" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="testimonials-header" style={{ marginBottom: '48px' }}>
          <div className="section-tag yellow">
            <span className="tag-star">✦</span>
            <span>CLIENT STORIES</span>
          </div>

          <h2 className="section-heading-dark" style={{ margin: '8px 0 12px' }}>
            Trusted by Businesses in Coimbatore & Beyond
          </h2>

          <p className="section-desc-dark" style={{ margin: 0, maxWidth: '580px' }}>
            Real feedback from Coimbatore brands that print, grow and succeed with Ikasle PrintHub.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="testimonials-grid">
          {testimonials.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveSlide(idx)}
              className={`testimonial-card ${activeSlide === idx ? 'card-active' : ''}`}
            >
              {/* 5 Yellow Stars */}
              <div className="testimonial-stars">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={17} fill="#FFF000" color="#FFF000" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="testimonial-quote">{item.quote}</p>

              {/* Author Row */}
              <div className="testimonial-author-row">
                <div
                  className="testimonial-avatar"
                  style={{ backgroundColor: item.avatarBg }}
                >
                  <item.AvatarIcon size={20} strokeWidth={2.2} aria-hidden="true" />
                </div>
                <div className="testimonial-meta">
                  <h4 className="testimonial-name">{item.author}</h4>
                  <span className="testimonial-role">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicator Dots */}
        <div className="testimonials-dots-row">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`t-dot ${activeSlide === idx ? 'active' : ''}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
