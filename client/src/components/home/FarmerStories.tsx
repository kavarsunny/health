const farmers = [
  {
    name: 'Ramesh Patel',
    location: 'Anand, Gujarat',
    specialty: 'Organic Dairy Farmer',
    story: 'For three generations our family has been rearing cattle the traditional way — no hormones, no antibiotics. My A2 ghee and paneer reach your kitchen within 48 hours of production.',
    emoji: '🐄',
    products: 24,
    rating: 4.9,
  },
  {
    name: 'Sunita Devi',
    location: 'Nashik, Maharashtra',
    specialty: 'Certified Organic Grapes',
    story: 'I switched to organic farming 6 years ago and it transformed both my land and my income. Every bunch of grapes is hand-picked and cold-stored to preserve freshness.',
    emoji: '🍇',
    products: 12,
    rating: 4.8,
  },
  {
    name: 'Arjun Singh',
    location: 'Amritsar, Punjab',
    specialty: 'Heritage Grain Farmer',
    story: 'I grow ancient wheat varieties that were almost lost — Khorasan, Emmer, and Einkorn. These grains are higher in protein and nutrients than modern hybrids.',
    emoji: '🌾',
    products: 18,
    rating: 4.9,
  },
];

const FarmerStories = () => (
  <section className="hh-section">
    <div className="container">
      <div className="hh-section-header">
        <div className="hh-eyebrow">Real People. Real Fields.</div>
        <h2 className="hh-section-title">Farmer Stories</h2>
        <p className="hh-section-sub">
          Meet the passionate humans behind every bite — growing food with love, tradition, and science.
        </p>
      </div>

      <div className="row g-4">
        {farmers.map((f) => (
          <div key={f.name} className="col-md-4">
            <div className="hh-farmer-card">
              {/* Hero Band */}
              <div style={{
                background: 'linear-gradient(135deg, #0d2e14, #0a1a0e)',
                padding: '2rem 1.5rem',
                textAlign: 'center',
                fontSize: '4rem',
                borderBottom: '1px solid var(--hh-border)',
              }}>
                {f.emoji}
              </div>
              <div className="hh-farmer-body">
                <div className="hh-farmer-name">{f.name}</div>
                <div className="hh-farmer-location">
                  <i className="bi bi-geo-alt-fill" /> {f.location}
                </div>
                <p className="hh-farmer-story">{f.story}</p>
                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  <span className="hh-farmer-chip">📦 {f.products} Products</span>
                  <span className="hh-farmer-chip">⭐ {f.rating} Rating</span>
                  <span className="hh-farmer-chip">✅ Verified</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <a href="/farmers" className="hh-btn-outline" style={{ display: 'inline-flex' }}>
          Meet All Farmers <i className="bi bi-arrow-right ms-2" />
        </a>
      </div>
    </div>
  </section>
);

export default FarmerStories;
