import { useState, useEffect } from 'react';

const farmers = [
  {
    name: 'Ramu Patil',
    location: 'Nashik, Maharashtra',
    bio: 'Third-generation farmer growing premium grapes and tomatoes using natural farming methods passed down through his family.',
    tag: 'Organic Certified',
    products: '350+ kg weekly',
  },
  {
    name: 'Kavitha Reddy',
    location: 'Kurnool, Andhra Pradesh',
    bio: 'Former software engineer turned organic farmer, Kavitha grows heirloom vegetables and has inspired 20+ local farmers to go organic.',
    tag: 'Natural Farming',
    products: '200+ kg weekly',
  },
  {
    name: 'Suresh Choudhary',
    location: 'Sikar, Rajasthan',
    bio: 'Specializing in cold-pressed mustard oil and traditional rajasthani spices, Suresh uses desert-adapted organic techniques.',
    tag: 'Traditional Farming',
    products: '180+ litres weekly',
  },
];

const FarmerStories = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % farmers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="ms-section py-5">
      <div className="container">
        <div className="ms-section-header text-center mb-5">
          <div className="ms-section-eyebrow">Our Farmers</div>
          <h2 className="ms-section-title">People Behind Your Food</h2>
        </div>

        <div className="ms-story-swapper" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div 
            key={current} 
            className="ms-story-item text-center" 
            style={{ maxWidth: '850px', animation: 'fadeIn 0.8s ease-out' }}
          >
            <i className="bi bi-quote" style={{ fontSize: '3.5rem', color: 'var(--ms-primary)', opacity: 0.15, display: 'block', marginBottom: '-20px' }} />
            
            <p className="ms-farmer-bio mx-auto mb-4" style={{ 
              fontSize: '1.4rem', 
              fontWeight: 500, 
              lineHeight: 1.6, 
              color: 'var(--ms-heading)',
              fontStyle: 'italic',
              maxWidth: '750px'
            }}>
              "{farmers[current].bio}"
            </p>

            <div className="ms-farmer-info mt-4">
              <div className="ms-farmer-name" style={{ fontSize: '1.2rem', fontWeight: 800 }}>{farmers[current].name}</div>
              <div className="ms-farmer-location text-muted small mt-1">
                <i className="bi bi-geo-alt-fill me-1" style={{ color: '#ef4444' }} />
                {farmers[current].location} • {farmers[current].products}
              </div>
              <div className="mt-3">
                <span className="ms-farmer-tag" style={{ 
                  background: 'var(--ms-bg-alt)', 
                  color: 'var(--ms-primary)', 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: 700 
                }}>
                  {farmers[current].tag}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center gap-2 mt-5">
          {farmers.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? '30px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: i === current ? 'var(--ms-primary)' : 'var(--ms-border-dark)',
                border: 'none',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FarmerStories;
