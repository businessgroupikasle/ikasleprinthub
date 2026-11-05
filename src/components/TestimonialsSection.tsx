import React, { useState, useRef, useEffect } from 'react';
import { Star, Building2, Coffee, Megaphone, ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchDeltaXRef = useRef(0);
  const isSwipingRef = useRef(false);

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

  const total = testimonials.length;

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + total) % total);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % total);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000);
  };

  // Touch Swipe for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchDeltaXRef.current = 0;
    isSwipingRef.current = true;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwipingRef.current) return;
    const deltaX = e.touches[0].clientX - touchStartXRef.current;
    const deltaY = e.touches[0].clientY - touchStartYRef.current;
    // Don't hijack vertical page scrolling
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaX) < 15) {
      return;
    }
    touchDeltaXRef.current = deltaX;
  };

  const handleTouchEnd = () => {
    if (!isSwipingRef.current) return;
    isSwipingRef.current = false;
    const deltaX = touchDeltaXRef.current;
    if (deltaX < -35) {
      handleNext();
    } else if (deltaX > 35) {
      handlePrev();
    } else {
      setTimeout(() => setIsPaused(false), 5000);
    }
  };

  // Mouse Drag support for desktop browser mobile testing
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartXRef.current = e.clientX;
    touchDeltaXRef.current = 0;
    isSwipingRef.current = true;
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSwipingRef.current) return;
    touchDeltaXRef.current = e.clientX - touchStartXRef.current;
  };

  const handleMouseUp = () => {
    if (!isSwipingRef.current) return;
    isSwipingRef.current = false;
    const deltaX = touchDeltaXRef.current;
    if (deltaX < -35) {
      handleNext();
    } else if (deltaX > 35) {
      handlePrev();
    } else {
      setTimeout(() => setIsPaused(false), 5000);
    }
  };

  // Subtle auto-advance on mobile when not interacting
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (window.innerWidth <= 860) {
        setActiveSlide((prev) => (prev + 1) % total);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, total]);

  return (
    <section id="client-stories" className="testimonials-section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background with geometric angles */}
      <div className="testimonials-bg" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="testimonials-header" style={{ marginBottom: '36px' }}>
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

        {/* Testimonials Carousel Wrapper */}
        <div
          className="testimonials-carousel-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="testimonials-track"
            style={{
              transform: `translateX(-${activeSlide * 100}%)`,
            }}
          >
            {testimonials.map((item, idx) => (
              <div
                key={item.id}
                className={`testimonial-card ${activeSlide === idx ? 'card-active' : ''}`}
                onClick={() => {
                  setActiveSlide(idx);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 5000);
                }}
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
        </div>

        {/* Carousel Controls (Arrows + Indicator Dots) */}
        <div className="testimonials-carousel-controls">
          <button
            type="button"
            className="carousel-arrow-btn prev-btn"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="testimonials-dots-row">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveSlide(idx);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 5000);
                }}
                className={`t-dot ${activeSlide === idx ? 'active' : ''}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="carousel-arrow-btn next-btn"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
