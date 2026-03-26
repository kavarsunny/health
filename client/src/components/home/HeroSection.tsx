import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ── Mouse-parallax tilt hook ── */
const useMouseTilt = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 22;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -16;
      el.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02,1.02,1.02)`;
    };
    const onLeave = () => { el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);
  return ref;
};

/* ── 3D Floating Sphere with SVG texture ── */
const Sphere3D = ({
  size, color1, color2, shadow, top, left, right, delay, duration = 6,
  icon, iconSize = 32
}: {
  size: number; color1: string; color2: string; shadow: string;
  top?: string; left?: string; right?: string; delay?: number; duration?: number;
  icon: string; iconSize?: number;
}) => (
  <div
    style={{
      position: 'absolute',
      top, left, right,
      width: size, height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle at 35% 28%, ${color1}, ${color2})`,
      boxShadow: `inset -${size*0.08}px -${size*0.08}px ${size*0.18}px rgba(0,0,0,0.35), inset ${size*0.06}px ${size*0.06}px ${size*0.14}px rgba(255,255,255,0.22), 0 ${size*0.2}px ${size*0.5}px ${shadow}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: `floatBob ${duration}s ease-in-out ${delay ?? 0}s infinite`, 
      filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.22))',
      zIndex: 2,
    }}
  >
    {/* specular highlight */}
    <div style={{
      position: 'absolute', top: '14%', left: '18%',
      width: size * 0.32, height: size * 0.22,
      background: 'radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 70%)',
      borderRadius: '50%',
    }} />
    <i className={`bi ${icon}`} style={{ fontSize: iconSize, color: '#fff', opacity: 0.92, position: 'relative', zIndex: 1, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
  </div>
);

/* ── Animated orbiting ring ── */
const OrbitRing = ({ size, delay }: { size: number; delay: number }) => (
  <div style={{
    position: 'absolute', top: '50%', left: '50%',
    width: size, height: size,
    marginTop: -size/2, marginLeft: -size/2,
    border: '1.5px dashed rgba(255,255,255,0.12)',
    borderRadius: '50%',
    animation: `spinSlow ${20 + delay * 5}s linear ${delay}s infinite`,
  }} />
);

/* ── Floating particle dots ── */
const Particle = ({ size, top, left, delay }: { size: number; top: string; left: string; delay: number }) => (
  <div style={{
    position: 'absolute', top, left,
    width: size, height: size, borderRadius: '50%',
    background: 'rgba(255,255,255,0.3)',
    animation: `floatBob ${4 + delay}s ease-in-out ${delay * 0.4}s infinite`,
  }} />
);

const slides = [
  {
    bgImage: 'url("https://images.unsplash.com/photo-1595856461973-206d2d7c00e1?q=80&w=2600&auto=format&fit=crop")', // Green farm field
    bgAccent: '#5a6524',
    eyebrow: '🌿 New Harvest',
    title: "Farm Fresh,",
    titleHighlight: "Delivered Daily.",
    sub: 'Connecting 15,000+ certified Indian farmers directly to your table. Zero chemicals, 100% organic, harvested at peak freshness.',
    cta: 'Shop Fresh Now',
    ctaTo: '/products',
    spheres: [
      { color1: '#c2cf82', color2: '#5a6524', shadow: 'rgba(90,101,36,0.5)', size: 110, top: '8%', left: '5%', delay: 0, duration: 5, icon: 'bi-flower1', iconSize: 36 },
      { color1: '#e2ba76', color2: '#a64d4d', shadow: 'rgba(166,77,77,0.4)', size: 90, top: '10%', right: '8%', delay: 1.5, duration: 6.5, icon: 'bi-heart-fill', iconSize: 28 },
      { color1: '#fae6a0', color2: '#d49a37', shadow: 'rgba(212,154,55,0.4)', size: 78, top: '55%', left: '0%', delay: 0.8, duration: 7, icon: 'bi-sun-fill', iconSize: 24 },
      { color1: '#bedbcf', color2: '#4e6b5d', shadow: 'rgba(78,107,93,0.45)', size: 95, top: '52%', right: '2%', delay: 2.2, duration: 5.5, icon: 'bi-droplet-fill', iconSize: 30 },
      { color1: '#deb8c4', color2: '#804a5c', shadow: 'rgba(128,74,92,0.4)', size: 62, top: '78%', left: '30%', delay: 1.0, duration: 8, icon: 'bi-gem', iconSize: 20 },
    ],
  },
  {
    bgImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2600&auto=format&fit=crop")', // Golden wheat sunset
    bgAccent: '#664929',
    eyebrow: '⭐ Bestsellers',
    title: "Certified Organic,",
    titleHighlight: "Always Pure.",
    sub: 'Our verified farmers follow natural farming practices — no pesticides, no preservatives, no compromise. Just nature\'s best.',
    cta: 'View Bestsellers',
    ctaTo: '/products?sort=popular',
    spheres: [
      { color1: '#fae6a0', color2: '#d49a37', shadow: 'rgba(212,154,55,0.45)', size: 105, top: '6%', left: '4%', delay: 0.5, duration: 6, icon: 'bi-star-fill', iconSize: 34 },
      { color1: '#bceadded', color2: '#5c7a6e', shadow: 'rgba(92,122,110,0.4)', size: 88, top: '12%', right: '6%', delay: 1.2, duration: 5.5, icon: 'bi-shield-check', iconSize: 27 },
      { color1: '#e5aba0', color2: '#a64d4d', shadow: 'rgba(166,77,77,0.4)', size: 74, top: '58%', left: '2%', delay: 0.3, duration: 7, icon: 'bi-award-fill', iconSize: 23 },
      { color1: '#c2cf82', color2: '#7a8736', shadow: 'rgba(122,135,54,0.45)', size: 92, top: '54%', right: '3%', delay: 1.8, duration: 6, icon: 'bi-leaf-fill', iconSize: 28 },
      { color1: '#e8e4d3', color2: '#826142', shadow: 'rgba(130,97,66,0.4)', size: 58, top: '80%', left: '28%', delay: 0.9, duration: 8.5, icon: 'bi-egg-fill', iconSize: 18 },
    ],
  },
  {
    bgImage: 'url("https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2600&auto=format&fit=crop")', // Produce/sunlight
    bgAccent: '#6e362b',
    eyebrow: '🍂 Seasonal Picks',
    title: "Taste the Season,",
    titleHighlight: "Embrace Nature.",
    sub: 'Seasonal vegetables and fruits, packed at peak nutritional value and harvested just for you from across rural India.',
    cta: 'Shop Seasonal',
    ctaTo: '/products?category=seasonal',
    spheres: [
      { color1: '#fadb9d', color2: '#d49a37', shadow: 'rgba(212,154,55,0.5)', size: 108, top: '7%', left: '3%', delay: 0, duration: 5.5, icon: 'bi-brightness-high-fill', iconSize: 35 },
      { color1: '#e3ebd1', color2: '#5a6524', shadow: 'rgba(90,101,36,0.45)', size: 86, top: '11%', right: '7%', delay: 1.4, duration: 6, icon: 'bi-tree-fill', iconSize: 26 },
      { color1: '#edbcbc', color2: '#a64d4d', shadow: 'rgba(166,77,77,0.4)', size: 76, top: '56%', left: '1%', delay: 0.6, duration: 7.5, icon: 'bi-flower3', iconSize: 24 },
      { color1: '#fcf1d4', color2: '#ba662d', shadow: 'rgba(186,102,45,0.45)', size: 94, top: '53%', right: '2%', delay: 2.0, duration: 5.5, icon: 'bi-basket3-fill', iconSize: 29 },
      { color1: '#d1e6e0', color2: '#4a6b63', shadow: 'rgba(74,107,99,0.4)', size: 60, top: '79%', right: '28%', delay: 1.1, duration: 8, icon: 'bi-droplet-half', iconSize: 19 },
    ],
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tiltRef = useMouseTilt();

  useEffect(() => {
    const t = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setIsTransitioning(false);
      }, 400);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setIsTransitioning(true);
    setTimeout(() => { setCurrent(idx); setIsTransitioning(false); }, 400);
  };
  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  const slide = slides[current];

  return (
    <>
      {/* Keyframe CSS */}
      <style>{`
        @keyframes floatBob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(3deg); }
          66% { transform: translateY(-8px) rotate(-2deg); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; transform: scale(0.94); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.15); }
          50% { box-shadow: 0 0 0 12px rgba(255,255,255,0); }
        }
        .hero3d-slide-enter { animation: heroFadeUp 0.5s cubic-bezier(0.22,0.61,0.36,1) forwards; }
        .hero3d-visual-enter { animation: heroFadeIn 0.6s cubic-bezier(0.22,0.61,0.36,1) forwards; }
        .hero3d-tilt {
          transition: transform 0.12s ease-out;
          transform-style: preserve-3d;
        }
        .hero3d-pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.1); backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.9); font-size: 0.8rem; font-weight: 700;
          padding: 6px 14px; border-radius: 20px;
          letter-spacing: 0.5px; margin-bottom: 1.2rem;
          display: inline-block;
        }
        .hero3d-cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; color: #1a2e1c;
          font-size: 0.95rem; font-weight: 800;
          padding: 13px 28px; border-radius: 50px;
          border: none; cursor: pointer; text-decoration: none;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
          transition: all 0.2s ease;
          animation: pulseGlow 3s ease-in-out infinite;
        }
        .hero3d-cta-primary:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 8px 32px rgba(0,0,0,0.35); color: #336939; }
        .hero3d-cta-ghost {
          display: inline-flex; align-items: center; gap: 7px;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.35);
          color: rgba(255,255,255,0.9);
          font-size: 0.9rem; font-weight: 700;
          padding: 12px 24px; border-radius: 50px;
          cursor: pointer; text-decoration: none;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
        }
        .hero3d-cta-ghost:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.6); color: #fff; transform: translateY(-2px); }
        .hero3d-stat { text-align: center; }
        .hero3d-stat-num { font-size: 2rem; font-weight: 900; color: #fff; line-height: 1; }
        .hero3d-stat-label { font-size: 0.7rem; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }
        .hero3d-divider { width: 1px; height: 40px; background: rgba(255,255,255,0.15); }
        .hero3d-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.35); border: none; cursor: pointer; transition: all 0.3s; padding: 0; }
        .hero3d-dot.active { background: #fff; width: 28px; border-radius: 4px; }
        .hero3d-arrow {
          width: 44px; height: 44px; border-radius: 50%;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
          color: #fff; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s; backdrop-filter: blur(8px);
          font-size: 1rem;
        }
        .hero3d-arrow:hover { background: rgba(255,255,255,0.2); transform: scale(1.1); }
        .hero3d-glass-badge {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 16px;
          padding: 12px 18px;
          display: flex; align-items: center; gap: 12px;
        }
        .hero3d-scroll-indicator {
          position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          color: rgba(255,255,255,0.4); font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase;
          animation: floatBob 2s ease-in-out infinite;
        }
      `}</style>

      <section style={{
        position: 'relative',
        backgroundImage: slide.bgImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        transition: 'background-image 0.8s ease',
      }}>
        {/* Dark overlay for contrast over images */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7))', zIndex: 0 }} />
        {/* Animated mesh background blobs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-20%', right: '-10%',
            width: 600, height: 600, borderRadius: '50%',
            background: `radial-gradient(circle, ${slide.bgAccent}88 0%, transparent 70%)`,
            animation: 'floatBob 8s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', bottom: '-15%', left: '-8%',
            width: 500, height: 500, borderRadius: '50%',
            background: `radial-gradient(circle, ${slide.bgAccent}66 0%, transparent 70%)`,
            animation: 'floatBob 10s ease-in-out 2s infinite',
          }} />
          {/* Grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        {/* Orbit rings */}
        <div style={{ position: 'absolute', right: '10%', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <OrbitRing size={340} delay={0} />
          <OrbitRing size={490} delay={1} />
          <OrbitRing size={620} delay={2} />
        </div>

        {/* Floating particles */}
        <Particle size={6} top="20%" left="20%" delay={0} />
        <Particle size={4} top="35%" left="65%" delay={1} />
        <Particle size={8} top="70%" left="40%" delay={2} />
        <Particle size={5} top="15%" left="80%" delay={0.5} />
        <Particle size={7} top="80%" left="15%" delay={1.5} />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="row align-items-center" style={{ minHeight: '88vh', padding: '4rem 0 5rem' }}>

            {/* ─── Content ─── */}
            <div className="col-lg-6" style={{ paddingRight: '3rem' }}>
              <div
                key={`content-${current}`}
                className="hero3d-slide-enter"
              >
                <div className="hero3d-pill">{slide.eyebrow}</div>

                <h1 style={{
                  fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                  fontWeight: 900,
                  color: '#fff',
                  lineHeight: 1.08,
                  marginBottom: '0.3rem',
                  letterSpacing: '-1px',
                }}>
                  {slide.title}
                </h1>
                <h1 style={{
                  fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                  fontWeight: 900,
                  lineHeight: 1.08,
                  marginBottom: '1.5rem',
                  letterSpacing: '-1px',
                  background: 'linear-gradient(90deg, #a8e6cf, #56ab2f, #f9d423)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {slide.titleHighlight}
                </h1>

                <p style={{
                  fontSize: '1.05rem', color: 'rgba(255,255,255,0.72)',
                  lineHeight: 1.72, maxWidth: 480,
                  marginBottom: '2.2rem',
                }}>
                  {slide.sub}
                </p>

                {/* CTAs */}
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: '2.8rem' }}>
                  <Link to={slide.ctaTo} className="hero3d-cta-primary">
                    {slide.cta} <i className="bi bi-arrow-right" />
                  </Link>
                  <Link to="/register?role=farmer" className="hero3d-cta-ghost">
                    <i className="bi bi-person-plus" /> Become a Farmer Partner
                  </Link>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                  {[
                    { num: '15K+', label: 'Farmers' },
                    { num: '2 Lakh+', label: 'Customers' },
                    { num: '8K+', label: 'Products' },
                    { num: '98%', label: 'Organic' },
                  ].map((s, i, arr) => (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                      <div className="hero3d-stat">
                        <div className="hero3d-stat-num">{s.num}</div>
                        <div className="hero3d-stat-label">{s.label}</div>
                      </div>
                      {i < arr.length - 1 && <div className="hero3d-divider" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── 3D Visual ─── */}
            <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
              <div
                ref={tiltRef}
                className="hero3d-tilt hero3d-visual-enter"
                key={`visual-${current}`}
                style={{
                  position: 'relative',
                  width: 480, height: 480,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {/* Central glassmorphism card */}
                <div style={{
                  width: 240, height: 240, borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 32%, rgba(255,255,255,0.18), rgba(255,255,255,0.04))',
                  backdropFilter: 'blur(20px)',
                  border: '1.5px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 20px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: 12,
                  position: 'relative', zIndex: 3,
                  transform: 'translateZ(30px)',
                }}>
                  {/* Specular */}
                  <div style={{
                    position: 'absolute', top: '12%', left: '16%',
                    width: '40%', height: '28%',
                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.35) 0%, transparent 70%)',
                    borderRadius: '50%',
                  }} />
                  <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#fff', lineHeight: 1, textShadow: '0 4px 16px rgba(0,0,0,0.4)' }}>
                    🌿
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fff' }}>HealthyHaat</div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', letterSpacing: 1 }}>ORGANIC STORE</div>
                  </div>
                </div>

                {/* Floating spheres */}
                {slide.spheres.map((s, i) => (
                  <Sphere3D key={i} {...s} />
                ))}

                {/* Glass badges floating around */}
                <div className="hero3d-glass-badge" style={{
                  position: 'absolute', bottom: '6%', left: '-8%',
                  transform: 'translateZ(20px)',
                  animation: 'floatBob 5s ease-in-out 0.5s infinite',
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(76,175,80,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🚚</div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>Free Delivery</div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)' }}>On orders ₹499+</div>
                  </div>
                </div>

                <div className="hero3d-glass-badge" style={{
                  position: 'absolute', top: '2%', right: '-5%',
                  transform: 'translateZ(20px)',
                  animation: 'floatBob 6.5s ease-in-out 1.2s infinite',
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,193,7,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>⭐</div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>4.9 Rating</div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)' }}>2L+ reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls bottom bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '1.5rem 2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 100%)',
          zIndex: 20,
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} className={`hero3d-dot ${i === current ? 'active' : ''}`} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="hero3d-arrow" onClick={prev} aria-label="Previous"><i className="bi bi-chevron-left" /></button>
            <button className="hero3d-arrow" onClick={next} aria-label="Next"><i className="bi bi-chevron-right" /></button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero3d-scroll-indicator d-none d-md-flex">
          <span>Scroll</span>
          <i className="bi bi-chevron-down" style={{ fontSize: '0.8rem' }} />
        </div>
      </section>
    </>
  );
};

export default HeroSection;
