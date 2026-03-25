const badges = [
  { icon: '🌿', title: '100% Organic', desc: 'All produce certified organic by APEDA & PGS-India standards.' },
  { icon: '🚚', title: 'Farm to Door in 48h', desc: 'Next-day delivery from farm-gate to your doorstep, nationwide.' },
  { icon: '🔐', title: 'Secure Payments', desc: 'UPI, cards & wallets — all transactions are 256-bit encrypted.' },
  { icon: '♻️', title: 'Zero Waste Packaging', desc: '100% biodegradable packaging. We plant a tree for every order.' },
  { icon: '🤝', title: 'Farmer-First Pricing', desc: 'Farmers earn 80%+ of the sale price. No exploitative middlemen.' },
  { icon: '📞', title: '24 × 7 Support', desc: 'Real humans on chat, call & WhatsApp — always ready to help.' },
];

const TrustBadges = () => (
  <section className="hh-section hh-section-alt">
    <div className="container">
      <div className="hh-section-header">
        <div className="hh-eyebrow">Why Choose Us</div>
        <h2 className="hh-section-title">Our Promise to You</h2>
        <p className="hh-section-sub">
          Every feature, every policy — built around trust, transparency, and the farmer.
        </p>
      </div>
      <div className="row g-4">
        {badges.map((b) => (
          <div key={b.title} className="col-md-4 col-sm-6">
            <div className="hh-trust-card">
              <span className="hh-trust-icon">{b.icon}</span>
              <div className="hh-trust-title">{b.title}</div>
              <p className="hh-trust-desc">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
