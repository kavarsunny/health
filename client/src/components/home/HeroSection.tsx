import { Link } from 'react-router-dom';

const HeroSection = () => (
  <section className="hh-hero">
    <div className="hh-hero-grid-overlay" />
    <div className="container">
      <div className="row align-items-center gy-5 py-5">
        <div className="col-lg-6">
          <div className="hh-hero-badge">
            <span className="pulse" />
            🌿 India's Premier Agri-Commerce Platform
          </div>
          <h1 className="hh-hero-title">
            From <span className="gradient-text">Farmer's Field</span><br />
            to Your Table —<br />
            Pure <span className="gradient-text">Goodness</span>
          </h1>
          <p className="hh-hero-sub">
            Connecting thousands of Indian farmers directly to health-conscious consumers.
            Shop certified organic, fresh-picked produce with full traceability.
          </p>
          <div className="hh-hero-cta-group">
            <Link to="/products" className="hh-btn-primary">
              Shop Fresh Produce <i className="bi bi-arrow-right" />
            </Link>
            <Link to="/register?role=farmer" className="hh-btn-outline">
              <i className="bi bi-person-plus" /> Join as Farmer
            </Link>
          </div>
          <div className="hh-hero-stats">
            {[
              { num: '15K+', label: 'Verified Farmers' },
              { num: '2L+', label: 'Happy Customers' },
              { num: '500+', label: 'Products' },
            ].map((s) => (
              <div key={s.label} className="hh-stat-item">
                <div className="hh-stat-num">{s.num}</div>
                <div className="hh-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-6 d-none d-lg-flex justify-content-center">
          <div className="hh-hero-image-wrap">
            <div className="glow-ring" />
            <div style={{
              width: 480,
              height: 440,
              borderRadius: 'var(--hh-radius-xl)',
              background: 'linear-gradient(145deg, #0d2e14, #0a1f0d)',
              border: '2px solid rgba(0,200,83,0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              boxShadow: 'var(--hh-shadow-lg)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Decorative grid of produce emojis */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem', padding: '2rem' }}>
                {['🥦','🍅','🌽','🥕','🫚','🥬','🍓','🧄','🌾','🍋','🫐','🥑'].map((e, i) => (
                  <div key={i} style={{
                    width: 72, height: 72,
                    background: 'rgba(0,200,83,0.07)',
                    border: '1px solid rgba(0,200,83,0.18)',
                    borderRadius: 'var(--hh-radius-md)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2rem',
                    transition: 'var(--hh-transition)',
                    animation: `fadeInUp 0.5s ease-out ${i * 0.05}s both`,
                  }}>
                    {e}
                  </div>
                ))}
              </div>
              <div style={{
                position: 'absolute', bottom: 20,
                background: 'rgba(0,200,83,0.1)',
                border: '1px solid rgba(0,200,83,0.25)',
                borderRadius: 12, padding: '0.6rem 1.2rem',
                display: 'flex', alignItems: 'center', gap: '0.7rem',
              }}>
                <span style={{ color: 'var(--hh-primary)', fontWeight: 700, fontFamily: 'Rajdhani', fontSize: '1rem' }}>
                  🟢 Live Bidding Active — 38 lots available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
