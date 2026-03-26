import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SeasonalBanner = () => {
  const [time, setTime] = useState({ h: 5, m: 47, s: 22 });

  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="ms-section">
      <div className="container">
        <div className="ms-promo-banner">
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="ms-promo-eyebrow">🔥 Flash Sale — Today Only</div>
            <h2 className="ms-promo-title">
              Farm Fresh Deals<br />Up to 40% OFF
            </h2>
            <p className="ms-promo-sub">
              Limited-time offer on our most popular organic produce. Sourced fresh this morning — grab yours before it's gone!
            </p>
            <div className="ms-countdown">
              {[
                { val: pad(time.h), label: 'Hours' },
                { val: pad(time.m), label: 'Mins' },
                { val: pad(time.s), label: 'Secs' },
              ].map((c) => (
                <div key={c.label} className="ms-countdown-box">
                  <div className="ms-countdown-num">{c.val}</div>
                  <div className="ms-countdown-label">{c.label}</div>
                </div>
              ))}
            </div>
            <Link to="/products?sale=true" className="ms-btn-white">
              Shop Sale <i className="bi bi-arrow-right" />
            </Link>
          </div>
          <div className="ms-promo-emojis" style={{ position: 'relative', zIndex: 2 }}>
            {/* SVG mango */}
            <svg width="72" height="72" viewBox="0 0 80 80" fill="none"><defs><radialGradient id="pb1" cx="35%" cy="30%" r="70%"><stop offset="0%" stopColor="#ffcc02"/><stop offset="100%" stopColor="#e65100"/></radialGradient></defs><path d="M32 70 C22 55 18 36 24 22 C30 8 50 8 56 22 C62 36 58 58 48 70 Z" fill="url(#pb1)"/><ellipse cx="28" cy="34" rx="10" ry="18" fill="rgba(255,255,255,0.15)"/><path d="M40 18 Q44 8 50 16" stroke="#f57f17" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
            {/* SVG strawberry */}
            <svg width="72" height="72" viewBox="0 0 80 80" fill="none"><defs><radialGradient id="pb2" cx="35%" cy="30%" r="70%"><stop offset="0%" stopColor="#ef9a9a"/><stop offset="100%" stopColor="#c62828"/></radialGradient></defs><path d="M40 72 C22 58 14 36 22 22 C30 8 50 8 58 22 C66 36 58 58 40 72Z" fill="url(#pb2)"/><circle cx="32" cy="30" r="8" fill="rgba(255,255,255,0.15)"/><path d="M32 20 C32 20 38 10 44 14 C40 18 34 22 32 20Z" fill="#66bb6a"/><path d="M48 16 C48 16 40 6 34 10 C38 14 44 18 48 16Z" fill="#4caf50"/><circle cx="34" cy="40" r="2" fill="rgba(255,255,255,0.3)"/><circle cx="44" cy="50" r="2" fill="rgba(255,255,255,0.3)"/><circle cx="40" cy="35" r="1.5" fill="rgba(255,255,255,0.25)"/></svg>
            {/* SVG avocado */}
            <svg width="72" height="72" viewBox="0 0 80 80" fill="none"><defs><radialGradient id="pb3" cx="35%" cy="30%" r="70%"><stop offset="0%" stopColor="#80cbc4"/><stop offset="100%" stopColor="#004d40"/></radialGradient></defs><ellipse cx="40" cy="44" rx="24" ry="32" fill="url(#pb3)"/><ellipse cx="40" cy="50" rx="14" ry="20" fill="#f9a825" opacity="0.75"/><circle cx="40" cy="55" r="10" fill="#5d4037" opacity="0.88"/><ellipse cx="32" cy="30" rx="9" ry="14" fill="rgba(255,255,255,0.15)"/></svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalBanner;
