import { Link } from 'react-router-dom';

/* Seasonal Fresh Picks — bright, colorful, warm */
const picks = [
  {
    name: 'Alphonso Mangoes',
    origin: 'Ratnagiri, MH',
    label: 'Fresh Today',
    labelColor: '#f59e0b',
    labelBg: '#fffbeb',
    img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=400&auto=format&fit=crop',
    to: '/products?category=Fruits',
  },
  {
    name: 'Fresh Coconuts',
    origin: 'Kerala, India',
    label: 'Direct Farm',
    labelColor: '#16a34a',
    labelBg: '#f0fdf4',
    img: 'https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?q=80&w=400&auto=format&fit=crop',
    to: '/products?category=Fruits',
  },
  {
    name: 'Wild Forest Honey',
    origin: 'Himachal, India',
    label: '100% Raw',
    labelColor: '#d97706',
    labelBg: '#fef3c7',
    img: 'https://images.unsplash.com/photo-1587049352851-8d4e89134fc2?q=80&w=400&auto=format&fit=crop',
    to: '/products?category=Natural+Sweeteners',
  },
  {
    name: 'Red Rice (Organic)',
    origin: 'Wayanad, Kerala',
    label: 'Heirloom Variety',
    labelColor: '#dc2626',
    labelBg: '#fef2f2',
    img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=400&auto=format&fit=crop',
    to: '/products?category=Cereals+%26+Grains',
  },
];

const SeasonalBanner = () => (
  <section className="sb-section">
    {/* Header */}
    <div className="container">
      <div className="sb-hdr">
        <div>
          <div className="sb-eyebrow">Fresh This Season</div>
          <h2 className="sb-title">Today's Fresh Picks</h2>
          <p className="sb-sub">Harvested this week and delivered straight from the farm to your home.</p>
        </div>
        <Link to="/products" className="sb-viewall d-none d-md-flex">
          See All Fresh Items <i className="bi bi-arrow-right" />
        </Link>
      </div>

      {/* Cards */}
      <div className="sb-grid">
        {picks.map((p) => (
          <Link key={p.name} to={p.to} className="sb-card">
            <div className="sb-img-wrap">
              <img src={p.img} alt={p.name} loading="lazy" />
              <div className="sb-img-overlay" />
              <div className="sb-label" style={{ background: p.labelBg, color: p.labelColor }}>
                {p.label}
              </div>
            </div>
            <div className="sb-body">
              <div className="sb-name">{p.name}</div>
              <div className="sb-origin">
                <i className="bi bi-geo-alt-fill" style={{ color: '#f59e0b' }} /> {p.origin}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile View All */}
      <div className="text-center mt-4 d-md-none">
        <Link to="/products" className="ms-btn-outline">
          See All Fresh Items <i className="bi bi-arrow-right" />
        </Link>
      </div>
    </div>

    <style>{`
      .sb-section {
        background: linear-gradient(180deg, #fffbeb 0%, #fff 100%);
        padding: 56px 0;
        border-top: 1px solid #fde68a;
        border-bottom: 1px solid #f1f5f9;
      }
      .sb-hdr {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
        margin-bottom: 28px;
      }
      .sb-eyebrow {
        font-size: 0.82rem;
        font-weight: 700;
        color: #d97706;
        letter-spacing: 0.5px;
        margin-bottom: 4px;
      }
      .sb-title {
        font-size: clamp(1.5rem, 3vw, 2.2rem);
        font-weight: 800;
        color: #111827;
        font-family: var(--font-display);
        margin: 0 0 6px;
        line-height: 1.15;
      }
      .sb-sub {
        font-size: 0.92rem;
        color: #6b7280;
        max-width: 420px;
        margin: 0;
        line-height: 1.6;
      }
      .sb-viewall {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 0.85rem;
        font-weight: 700;
        color: #d97706;
        text-decoration: none;
        white-space: nowrap;
        transition: gap 0.2s;
      }
      .sb-viewall:hover { gap: 9px; color: #b45309; }
      .sb-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
      }
      .sb-card {
        display: block;
        border-radius: 18px;
        overflow: hidden;
        border: 2px solid #fde68a;
        background: #fff;
        text-decoration: none;
        transition: all 0.25s;
        box-shadow: 0 2px 12px rgba(245,158,11,0.08);
      }
      .sb-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 40px rgba(245,158,11,0.18);
        border-color: #f59e0b;
      }
      .sb-img-wrap {
        position: relative;
        height: 170px;
        overflow: hidden;
        background: #fef3c7;
      }
      .sb-img-wrap img {
        width: 100%; height: 100%;
        object-fit: cover;
        transition: transform 0.45s;
      }
      .sb-card:hover .sb-img-wrap img { transform: scale(1.07); }
      .sb-img-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.18) 100%);
      }
      .sb-label {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 0.68rem;
        font-weight: 700;
        padding: 3px 10px;
        border-radius: 999px;
        letter-spacing: 0.3px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.08);
      }
      .sb-body {
        padding: 14px 14px 16px;
      }
      .sb-name {
        font-size: 0.92rem;
        font-weight: 700;
        color: #111827;
        margin-bottom: 4px;
        font-family: var(--font-display);
        line-height: 1.3;
      }
      .sb-origin {
        font-size: 0.75rem;
        color: #6b7280;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 3px;
      }
      @media (max-width: 991px) {
        .sb-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 575px) {
        .sb-section { padding: 40px 0; }
        .sb-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .sb-img-wrap { height: 130px; }
        .sb-body { padding: 10px 10px 12px; }
        .sb-name { font-size: 0.82rem; }
      }
    `}</style>
  </section>
);

export default SeasonalBanner;
