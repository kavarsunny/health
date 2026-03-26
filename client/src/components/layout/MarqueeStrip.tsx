const items = [
  '🌿 100% Organic', '🚚 Free Shipping ₹499+', '🥦 Farm Fresh', '⭐ Trusted by 2L+ Customers',
  '🔒 Secure Payments', '🌾 15K+ Verified Farmers', '♻️ Eco Friendly Packaging', '💚 No Preservatives',
  '🌿 100% Organic', '🚚 Free Shipping ₹499+', '🥦 Farm Fresh', '⭐ Trusted by 2L+ Customers',
  '🔒 Secure Payments', '🌾 15K+ Verified Farmers', '♻️ Eco Friendly Packaging', '💚 No Preservatives',
];

const MarqueeStrip = () => (
  <div className="ms-marquee-strip">
    <div className="ms-marquee-inner">
      {items.map((item, i) => (
        <span key={i} className="ms-marquee-item">
          {item}
          <span className="ms-marquee-dot" />
        </span>
      ))}
    </div>
  </div>
);

export default MarqueeStrip;
