import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SeasonalBanner = () => {
  const deadline = new Date('2026-04-05T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = deadline - Date.now();
      if (diff <= 0) return;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="hh-section">
      <div className="container">
        <div className="hh-seasonal-banner">
          <div className="hh-seasonal-tag">🌸 Spring Harvest Sale</div>
          <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
            Up to <span style={{ background: 'var(--hh-grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>50% OFF</span> on<br />Seasonal Produce
          </h2>
          <p style={{ color: 'var(--hh-text-muted)', fontSize: '1rem', marginBottom: 0 }}>
            Handpicked seasonal favourites straight from our farmers — only while stocks last!
          </p>

          <div className="hh-countdown">
            {[
              { val: pad(timeLeft.d), unit: 'Days' },
              { val: pad(timeLeft.h), unit: 'Hours' },
              { val: pad(timeLeft.m), unit: 'Mins' },
              { val: pad(timeLeft.s), unit: 'Secs' },
            ].map((item) => (
              <div key={item.unit} className="hh-countdown-box">
                <div className="hh-countdown-num">{item.val}</div>
                <div className="hh-countdown-unit">{item.unit}</div>
              </div>
            ))}
          </div>

          <Link to="/products?sale=true" className="hh-btn-primary" style={{ display: 'inline-flex' }}>
            Grab the Deal <i className="bi bi-lightning-fill ms-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SeasonalBanner;
