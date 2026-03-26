const farmers = [
  {
    initials: 'RP',
    avatarColor: '#e8f5e9', iconColor: '#336939',
    name: 'Ramu Patil',
    location: 'Nashik, Maharashtra',
    bio: 'Third-generation farmer growing premium grapes and tomatoes using natural farming methods passed down through his family.',
    tag: 'Organic Certified',
    products: '350+ kg weekly',
  },
  {
    initials: 'KR',
    avatarColor: '#e3f2fd', iconColor: '#1565c0',
    name: 'Kavitha Reddy',
    location: 'Kurnool, Andhra Pradesh',
    bio: 'Former software engineer turned organic farmer, Kavitha grows heirloom vegetables and has inspired 20+ local farmers to go organic.',
    tag: 'Natural Farming',
    products: '200+ kg weekly',
  },
  {
    initials: 'SC',
    avatarColor: '#fff8e1', iconColor: '#e65100',
    name: 'Suresh Choudhary',
    location: 'Sikar, Rajasthan',
    bio: 'Specializing in cold-pressed mustard oil and traditional rajasthani spices, Suresh uses desert-adapted organic techniques.',
    tag: 'Traditional Farming',
    products: '180+ litres weekly',
  },
];

const FarmerStories = () => (
  <section className="ms-section">
    <div className="container">
      <div className="ms-section-header">
        <div className="ms-section-eyebrow">Our Farmers</div>
        <h2 className="ms-section-title">Meet the People Behind Your Food</h2>
        <p className="ms-section-sub">
          Every product you buy directly supports these verified, passionate farmers who grow with care and integrity.
        </p>
      </div>
      <div className="row g-4">
        {farmers.map((f) => (
          <div key={f.name} className="col-md-4">
            <div className="ms-farmer-card">
              <div className="ms-farmer-img-wrap" style={{ background: f.avatarColor, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: f.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', fontWeight: 800, color: '#fff', boxShadow: `0 4px 16px ${f.iconColor}44` }}>{f.initials}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: f.iconColor, textTransform: 'uppercase', letterSpacing: 1 }}><i className="bi bi-patch-check-fill" style={{ marginRight: 4 }} />Verified</div>
              </div>
              <div className="ms-farmer-body">
                <div className="ms-farmer-name">{f.name}</div>
                <div className="ms-farmer-location"><i className="bi bi-geo-alt-fill" style={{ color: '#e53935', marginRight: 4 }} />{f.location} · {f.products}</div>
                <p className="ms-farmer-bio">{f.bio}</p>
                <span className="ms-farmer-tag">{f.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FarmerStories;
