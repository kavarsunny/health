import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=2748&auto=format&fit=crop',
    tag: '100% Organic Certified',
    title: 'Freshness From',
    accent: 'Farm to Your Table',
    sub: 'Real food, real farmers. Skip the middlemen and get peak-harvest produce delivered to your door.',
    cta: 'Shop Fresh Now',
    ctaLink: '/products',
    chip1: { text: '500+ Farm Partners' },
    chip2: { text: '4.9 Avg Rating' },
  },
  {
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop',
    tag: 'Stone-Ground & Unprocessed',
    title: 'Ancient Grains,',
    accent: 'Modern Wellness',
    sub: 'Chemical-free cereals, pulses and flours harvested the traditional way — packed with nutrition your family deserves.',
    cta: 'Explore Grains',
    ctaLink: '/products?category=Cereals+%26+Grains',
    chip1: { text: 'Grown by Local Farmers' },
    chip2: { text: 'Zero Chemicals' },
  },
  {
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2548&auto=format&fit=crop',
    tag: 'Raw & Unfiltered',
    title: "Nature's Pantry,",
    accent: 'Straight to You',
    sub: "Wild honey, cold-pressed oils, hand-picked spices — the most authentic flavours of India's farmlands.",
    cta: 'Browse Pantry',
    ctaLink: '/products?category=Spices',
    chip1: { text: 'No Preservatives' },
    chip2: { text: 'Mountain Sourced' },
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => { setCurrent(p => (p + 1) % slides.length); setFading(false); }, 450);
    }, 6500);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => {
    if (i === current) return;
    setFading(true);
    setTimeout(() => { setCurrent(i); setFading(false); }, 400);
  };

  const s = slides[current];

  return (
    <section className="hh2-hero">
      {/* BG layers */}
      <div className="hh2-hero-bg" key={current} style={{ backgroundImage: `url(${s.image})` }} />
      <div className="hh2-hero-gradient" />

      {/* Warm texture overlay */}
      <div className="hh2-hero-texture" />

      <div className="container hh2-hero-body">
        <div className={`hh2-hero-content ${fading ? 'hh2-out' : 'hh2-in'}`}>

          {/* Badge pill */}
          <div className="hh2-tag">{s.tag}</div>

          {/* Headline */}
          <h1 className="hh2-title">
            {s.title}<br />
            <span className="hh2-accent">{s.accent}</span>
          </h1>

          {/* Sub */}
          <p className="hh2-sub">{s.sub}</p>

          {/* Chips */}
          <div className="hh2-chips">
            <div className="hh2-chip">{s.chip1.text}</div>
            <div className="hh2-chip">{s.chip2.text}</div>
          </div>

          {/* CTAs */}
          <div className="hh2-ctas">
            <Link to={s.ctaLink} className="hh2-cta-main">
              {s.cta} <i className="bi bi-arrow-right" />
            </Link>
            <Link to="/about" className="hh2-cta-ghost">Meet Our Farmers</Link>
          </div>
        </div>

        {/* Slide dots */}
        <div className="hh2-dots">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`hh2-dot ${i === current ? 'on' : ''}`} />
          ))}
        </div>
      </div>

      {/* Bottom trust strip */}
      <div className="hh2-trust-strip">
        <div className="container">
          <div className="hh2-trust-items">
            {[
              { label: 'Farm Certified', sub: 'All farms verified' },
              { label: 'Fresh Delivery', sub: 'Straight from harvest' },
              { label: 'Chemical-Free', sub: '100% natural produce' },
              { label: 'Fair to Farmers', sub: '80% goes to growers' },
            ].map(item => (
              <div key={item.label} className="hh2-trust-item">
                <div>
                  <div className="hh2-trust-label">{item.label}</div>
                  <div className="hh2-trust-sub">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hh2-hero {
          position: relative;
          min-height: 640px;
          display: flex;
          flex-direction: column;
          padding-top: 106px;
          overflow: hidden;
        }
        .hh2-hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center 30%;
          animation: hh2-zoom 10s ease forwards;
        }
        @keyframes hh2-zoom {
          from { transform: scale(1.07); }
          to   { transform: scale(1.00); }
        }
        .hh2-hero-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            rgba(15, 40, 20, 0.88) 0%,
            rgba(15, 40, 20, 0.70) 45%,
            rgba(15, 40, 20, 0.25) 100%
          );
        }
        .hh2-hero-texture {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23ffffff' fill-opacity='0.025'/%3E%3C/svg%3E");
        }
        .hh2-hero-body {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 60px;
          padding-bottom: 40px;
          min-height: 500px;
        }
        .hh2-hero-content {
          max-width: 640px;
        }
        .hh2-in {
          animation: hh2-fadein 0.65s cubic-bezier(0.22,1,0.36,1);
        }
        .hh2-out {
          animation: hh2-fadeout 0.4s ease forwards;
        }
        @keyframes hh2-fadein {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hh2-fadeout {
          to { opacity: 0; transform: translateY(-10px); }
        }
        .hh2-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.13);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 7px 18px;
          border-radius: 999px;
          margin-bottom: 1.4rem;
          letter-spacing: 0.2px;
        }
        .hh2-title {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 5.5vw, 3.8rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
          letter-spacing: -0.5px;
          margin-bottom: 1rem;
        }
        .hh2-accent {
          background: linear-gradient(90deg, #f59e0b, #fde68a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hh2-sub {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.82);
          line-height: 1.75;
          margin-bottom: 1.5rem;
          max-width: 500px;
        }
        .hh2-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 1.8rem;
        }
        .hh2-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.9);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 5px 14px;
          border-radius: 999px;
          backdrop-filter: blur(8px);
        }
        .hh2-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }
        .hh2-cta-main {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f59e0b;
          color: #1a1a1a;
          font-weight: 800;
          font-size: 0.95rem;
          padding: 14px 30px;
          border-radius: 999px;
          text-decoration: none;
          transition: all 0.25s;
          box-shadow: 0 6px 24px rgba(245,158,11,0.4);
        }
        .hh2-cta-main:hover {
          background: #d97706;
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(245,158,11,0.5);
        }
        .hh2-cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: rgba(255,255,255,0.9);
          font-weight: 600;
          font-size: 0.95rem;
          padding: 13px 26px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.4);
          text-decoration: none;
          transition: all 0.25s;
        }
        .hh2-cta-ghost:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.7);
          color: #fff;
        }
        .hh2-dots {
          position: absolute;
          bottom: 50px;
          right: 12px;
          display: flex;
          gap: 7px;
          z-index: 3;
        }
        .hh2-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
          border: none; cursor: pointer;
          transition: all 0.3s; padding: 0;
        }
        .hh2-dot.on { background: #f59e0b; width: 26px; border-radius: 4px; }

        /* Bottom trust strip */
        .hh2-trust-strip {
          background: rgba(10,30,15,0.75);
          backdrop-filter: blur(16px);
          border-top: 1px solid rgba(255,255,255,0.08);
          position: relative;
          z-index: 2;
        }
        .hh2-trust-items {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          gap: 0;
          padding: 16px 0;
        }
        .hh2-trust-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          flex: 1;
          min-width: 180px;
          border-right: 1px solid rgba(255,255,255,0.08);
        }
        .hh2-trust-item:last-child { border-right: none; }
        .hh2-trust-icon { font-size: 1.5rem; line-height: 1; }
        .hh2-trust-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
        }
        .hh2-trust-sub {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.5);
          margin-top: 1px;
        }
        @media (max-width: 767px) {
          .hh2-hero { min-height: 560px; }
          .hh2-hero-body { padding-top: 30px; padding-bottom: 20px; }
          .hh2-dots { bottom: 60px; }
          .hh2-trust-items { gap: 0; padding: 8px 0; }
          .hh2-trust-item { min-width: 140px; padding: 8px 10px; }
          .hh2-trust-item:nth-child(2) { border-right: none; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
