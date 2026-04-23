import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2548&auto=format&fit=crop', // Fresh Veggies
    bgColor: '#eef2ff', // Light Blue/Indigo
    title: 'Freshness Delivered \nStraight to Your Door',
    subTitle: 'Connect directly with certified farmers and enjoy peak-harvest produce every day.',
    ctaText: 'Shop Fresh Now',
    ctaLink: '/products',
    badge: '🌿 100% Organic certified'
  },
  {
    image: 'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?q=80&w=2576&auto=format&fit=crop', // Pulses & Grains
    bgColor: '#fff1f2', // Light Rose/Peach
    title: 'Pure Grains & Pulses \nFrom Local Farms',
    subTitle: 'Unprocessed, chemical-free staples for a healthier, more traditional kitchen.',
    ctaText: 'Explore Staples',
    ctaLink: '/products?category=Cereals+%26+Grains',
    badge: '🌾 Directly From Farmers'
  },
  {
    image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=2670&auto=format&fit=crop', // Spices & Honey
    bgColor: '#f0fdf4', // Light Green/Mint
    title: 'Natural Sweeteners \n& Earthy Spices',
    subTitle: 'Pure raw honey and stone-ground spices to enrich your daily meals.',
    ctaText: 'Browse Pantry',
    ctaLink: '/products?category=Spices',
    badge: '✨ No Added Preservatives'
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="ms-hero-container" style={{ paddingTop: '80px' }}>
      <div className="container py-4">
        <div 
          className="ms-hero-main shadow-sm"
          style={{ 
            backgroundColor: slides[current].bgColor,
            borderRadius: 'var(--ms-radius-lg)',
            overflow: 'hidden',
            minHeight: '460px',
            display: 'flex',
            position: 'relative',
            transition: 'background-color 0.8s ease'
          }}
        >
          {/* Content */}
          <div className="row w-100 g-0 align-items-center">
            <div className="col-lg-6 p-5">
              <div className="ms-hero-badge mb-3" style={{ 
                background: 'rgba(255,255,255,0.7)', 
                padding: '6px 14px', 
                borderRadius: 'var(--ms-radius-pill)',
                display: 'inline-block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--ms-primary)'
              }}>
                {slides[current].badge}
              </div>
              <h1 className="mb-3" style={{ 
                fontSize: 'clamp(2rem, 4vw, 3.2rem)', 
                fontWeight: 800, 
                lineHeight: 1.2, 
                color: 'var(--ms-heading)',
                whiteSpace: 'pre-line'
              }}>
                {slides[current].title}
              </h1>
              <p className="mb-4 text-muted" style={{ fontSize: '1.1rem', maxWidth: '450px' }}>
                {slides[current].subTitle}
              </p>
              <Link to={slides[current].ctaLink} className="ms-pill-btn">
                {slides[current].ctaText} <i className="bi bi-arrow-right ms-2" />
              </Link>

              {/* Slider Dots */}
              <div className="mt-5 d-flex gap-2">
                {slides.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      width: i === current ? '30px' : '10px',
                      height: '10px',
                      borderRadius: '5px',
                      background: i === current ? 'var(--ms-primary)' : 'var(--ms-border-dark)',
                      border: 'none',
                      transition: 'var(--ms-transition)'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Media */}
            <div className="col-lg-6 d-none d-lg-block" style={{ height: '460px' }}>
               <img 
                 src={slides[current].image} 
                 alt="Seasonal fresh produce" 
                 style={{ 
                   width: '100%', 
                   height: '100%', 
                   objectFit: 'cover',
                   maskImage: 'linear-gradient(to left, black 80%, transparent 100%)',
                   WebkitMaskImage: 'linear-gradient(to left, black 80%, transparent 100%)'
                 }}
               />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
