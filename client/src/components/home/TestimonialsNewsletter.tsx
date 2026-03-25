import { useState } from 'react';

const testimonials = [
  { name: 'Priya Sharma', role: 'Home Chef, Bangalore', body: 'The tomatoes I received were so fresh I could smell the vine! Taste is incomparable to supermarket produce. Will never go back!', rating: 5, initials: 'PS' },
  { name: 'Aryan Mehta',  role: 'Nutritionist, Mumbai',   body: 'I recommend HealthyHaat to all my clients. The organic certification and direct farmer connect gives me complete confidence in food safety.', rating: 5, initials: 'AM' },
  { name: 'Kavita Nair',  role: 'Mother of 2, Kochi',   body: 'My kids now actually love vegetables! The spinach and carrots are so flavourful and the packaging is eco-friendly too. Absolute win!', rating: 5, initials: 'KN' },
];

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); }
  };

  return (
    <>
      {/* Testimonials */}
      <section className="hh-section">
        <div className="container">
          <div className="hh-section-header">
            <div className="hh-eyebrow">Customer Voices</div>
            <h2 className="hh-section-title">What People Are Saying</h2>
            <p className="hh-section-sub">
              Real reviews from real customers who care about what they eat.
            </p>
          </div>
          <div className="row g-4">
            {testimonials.map((t) => (
              <div key={t.name} className="col-md-4">
                <div className="hh-testimonial-card">
                  <span className="quote-icon">"</span>
                  <div className="hh-stars">{'★'.repeat(t.rating)}</div>
                  <p className="hh-testimonial-body">"{t.body}"</p>
                  <div className="hh-testimonial-author">
                    <div style={{
                      width: 46, height: 46, borderRadius: '50%',
                      background: 'var(--hh-grad-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#000', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0,
                    }}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="hh-testimonial-name">{t.name}</div>
                      <div className="hh-testimonial-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="hh-section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="hh-newsletter">
            <div className="hh-eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>Stay in the Loop</div>
            <h2 className="hh-section-title">Get ₹100 off your First Order</h2>
            <p className="hh-section-sub">
              Join 50,000+ subscribers and get seasonal recipes, farm news & exclusive deals — no spam, ever.
            </p>

            {subscribed ? (
              <div style={{ marginTop: '2rem', padding: '1rem 2rem', background: 'rgba(0,200,83,0.12)', border: '1px solid rgba(0,200,83,0.35)', borderRadius: 'var(--hh-radius-md)', color: 'var(--hh-primary)', fontWeight: 600 }}>
                🎉 You're subscribed! Check your inbox for your ₹100 coupon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="hh-newsletter-form">
                <input
                  type="email"
                  className="hh-newsletter-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="hh-btn-primary">
                  Subscribe & Save <i className="bi bi-envelope-check" />
                </button>
              </form>
            )}

            <p style={{ fontSize: '0.75rem', color: 'var(--hh-text-muted)', marginTop: '1rem' }}>
              🔒 No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
