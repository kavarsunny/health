const testimonials = [
  {
    initials: 'PS', bg: '#e8f5e9', color: '#336939',
    name: 'Priya Sharma',
    loc: 'Mumbai, Maharashtra',
    rating: 5,
    text: '"HealthyHaat has completely changed how I shop for groceries. The vegetables are so fresh and I can actually taste the difference. My family loves it!"',
  },
  {
    initials: 'RK', bg: '#e3f2fd', color: '#1565c0',
    name: 'Rajesh Kumar',
    loc: 'Bangalore, Karnataka',
    rating: 5,
    text: '"Finally a platform that connects me directly with farmers. I know exactly where my food comes from. Delivery is prompt and packaging is eco-friendly."',
  },
  {
    initials: 'AP', bg: '#fff8e1', color: '#e65100',
    name: 'Anita Patel',
    loc: 'Ahmedabad, Gujarat',
    rating: 5,
    text: '"The organic mangoes were absolutely divine! Way better than what I get in the supermarket. Will definitely be ordering every season!"',
  },
];

const TestimonialsNewsletter = () => (
  <section className="ms-section">
    <div className="container">
      {/* Testimonials */}
      <div className="ms-section-header">
        <div className="ms-section-eyebrow">Customer Love</div>
        <h2 className="ms-section-title">What Our Customers Say</h2>
        <p className="ms-section-sub">Join over 2 lakh happy customers who trust HealthyHaat for their daily nutrition.</p>
      </div>
      <div className="row g-4 mb-5">
        {testimonials.map((t) => (
          <div key={t.name} className="col-md-4">
            <div className="ms-testimonial-card">
              <div className="ms-testimonial-stars">
                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
              </div>
              <p className="ms-testimonial-text">{t.text}</p>
              <div className="ms-testimonial-author">
                <div className="ms-testimonial-avatar" style={{ background: t.bg, color: t.color, fontWeight: 800, fontSize: '0.95rem' }}>{t.initials}</div>
                <div>
                  <div className="ms-testimonial-name">{t.name}</div>
                  <div className="ms-testimonial-loc">{t.loc}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <div className="ms-newsletter-section">
        <div className="ms-section-eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>NEWSLETTER</div>
        <h3 className="ms-newsletter-title">Stay Fresh with HealthyHaat</h3>
        <p className="ms-newsletter-sub">
          Get exclusive deals, seasonal recipes, and updates from our farming community — right in your inbox.
        </p>
        <form className="ms-newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            className="ms-newsletter-input"
            placeholder="Enter your email address…"
          />
          <button type="submit" className="ms-newsletter-btn">
            Subscribe <i className="bi bi-arrow-right" />
          </button>
        </form>
        <p style={{ marginTop: '12px', fontSize: '0.78rem', color: 'var(--ms-text-muted)' }}>
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </div>
  </section>
);

export default TestimonialsNewsletter;
