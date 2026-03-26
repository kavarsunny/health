import { SVGTruck, SVGLeaf, SVGReturn, SVGLock, SVGFarm } from '../common/SVGIcons';

const badges = [
  { Icon: SVGTruck, color: '#0ea5e9', label: 'Free Shipping', sub: 'On orders over ₹499' },
  { Icon: SVGLeaf, color: '#336939', label: '100% Organic', sub: 'Certified & verified' },
  { Icon: SVGReturn, color: '#f59e0b', label: 'Easy Returns', sub: '7-day return policy' },
  { Icon: SVGLock, color: '#8b5cf6', label: 'Secure Payment', sub: 'UPI, Cards, Wallets' },
  { Icon: SVGFarm, color: '#336939', label: 'Farm Direct', sub: 'No middlemen' },
];

const TrustBadges = () => (
  <div className="ms-trust-strip">
    <div className="container">
      <div className="ms-trust-grid">
        {badges.map((b) => (
          <div key={b.label} className="ms-trust-item">
            <div className="ms-trust-icon">
              <b.Icon size={36} color={b.color} />
            </div>
            <div>
              <div className="ms-trust-label">{b.label}</div>
              <div className="ms-trust-sub">{b.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TrustBadges;
