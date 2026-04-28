import { SVGTruck, SVGLeaf, SVGReturn, SVGLock, SVGFarm } from '../common/SVGIcons';

const badges = [
  { Icon: SVGTruck,  color: '#0ea5e9', bg: '#e0f2fe', label: 'Free Shipping',    sub: 'On orders over ₹499' },
  { Icon: SVGLeaf,   color: '#2D6A4F', bg: '#d1fae5', label: '100% Organic',     sub: 'Certified & verified' },
  { Icon: SVGReturn, color: '#f59e0b', bg: '#fef3c7', label: 'Easy Returns',     sub: '7-day return policy' },
  { Icon: SVGLock,   color: '#8b5cf6', bg: '#ede9fe', label: 'Secure Payment',   sub: 'UPI, Cards, Wallets' },
  { Icon: SVGFarm,   color: '#336939', bg: '#d1fae5', label: 'Farm Direct',      sub: 'No middlemen' },
];

const TrustBadges = () => (
  <div className="hh-trust-wrap">
    <div className="container">
      <div className="hh-trust-row">
        {badges.map((b) => (
          <div key={b.label} className="hh-trust-card">
            <div className="hh-trust-icon-wrap" style={{ background: b.bg }}>
              <b.Icon size={22} color={b.color} />
            </div>
            <div>
              <div className="hh-trust-label">{b.label}</div>
              <div className="hh-trust-sub">{b.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <style>{`
      .hh-trust-wrap {
        background: #fff;
        border-top: 1px solid #f1f5f9;
        border-bottom: 1px solid #f1f5f9;
        padding: 20px 0;
      }
      .hh-trust-row {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        justify-content: space-between;
        align-items: center;
      }
      .hh-trust-card {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
        min-width: 160px;
        padding: 12px 16px;
        border-radius: 12px;
        background: #f8fafc;
        border: 1px solid #f1f5f9;
        transition: all 0.25s;
      }
      .hh-trust-card:hover {
        background: #fff;
        box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        transform: translateY(-2px);
      }
      .hh-trust-icon-wrap {
        width: 42px;
        height: 42px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .hh-trust-label {
        font-size: 0.88rem;
        font-weight: 700;
        color: #111827;
        line-height: 1.2;
      }
      .hh-trust-sub {
        font-size: 0.73rem;
        color: #6b7280;
        margin-top: 1px;
      }
      @media (max-width: 767px) {
        .hh-trust-row { gap: 8px; }
        .hh-trust-card { min-width: 140px; padding: 10px 12px; }
      }
    `}</style>
  </div>
);

export default TrustBadges;
