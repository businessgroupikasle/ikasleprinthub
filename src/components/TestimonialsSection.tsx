import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Star, Building2, Coffee, Megaphone, ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

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

  const scrollToSlide = (idx: number) => {
    setActiveSlide(idx);
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cards = container.children;
    if (cards[idx]) {
      const card = cards[idx] as HTMLElement;
      const targetScroll = card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollCenter = container.scrollLeft + container.offsetWidth / 2;
    const children = Array.from(container.children) as HTMLElement[];

    let closestIdx = 0;
    let minDistance = Infinity;

    children.forEach((child, idx) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(scrollCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setActiveSlide(closestIdx);
  }, []);

  const handlePrev = () => {
    const nextIdx = (activeSlide - 1 + testimonials.length) % testimonials.length;
    scrollToSlide(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeSlide + 1) % testimonials.length;
    scrollToSlide(nextIdx);
  };

  // Drag-to-scroll support for desktop simulation & mice
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Subtle auto-advance on mobile when not interacting
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (window.innerWidth <= 860) {
        setActiveSlide((prev) => {
          const next = (prev + 1) % testimonials.length;
          if (carouselRef.current) {
            const container = carouselRef.current;
            const cards = container.children;
            if (cards[next]) {
              const card = cards[next] as HTMLElement;
              const targetScroll = card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
              container.scrollTo({ left: targetScroll, behavior: 'smooth' });
            }
          }
          return next;
        });
      }
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  return (
    <section id="client-stories" className="testimonials-section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background with geometric angles */}
      <div className="testimonials-bg" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div className="testimonials-header" style={{ marginBottom: '40px' }}>
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

        {/* Testimonials Carousel / Grid */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 4000)}
          className="testimonials-grid"
        >
          {testimonials.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => scrollToSlide(idx)}
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
                onClick={() => scrollToSlide(idx)}
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
