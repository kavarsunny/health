import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

const Footer = () => {
  const categories = [
    { label: 'Fruits & Vegetables', to: '/products?category=vegetables' },
    { label: 'Organic Grains', to: '/products?category=grains' },
    { label: 'Dairy & Eggs', to: '/products?category=dairy' },
    { label: 'Herbs & Spices', to: '/products?category=herbs' },
    { label: 'Cold Pressed Oils', to: '/products?category=oils' },
    { label: 'Dry Fruits', to: '/products?category=nuts' },
  ];

  const general = [
    { label: 'About Us', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Franchise Enquiry', to: '/franchise' },
    { label: 'Careers', to: '/careers' },
    { label: 'Contact Us', to: '/contact' },
  ];

  const connect = [
    { label: 'My Account', to: '/profile' },
    { label: 'Track Order', to: '/orders' },
    { label: 'Returns & Refunds', to: '/returns' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms & Conditions', to: '/terms' },
  ];

  return (
    <footer className="ms-footer">
      <div className="container">
        {/* Newsletter */}
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="ms-footer-heading" style={{ fontSize: '0.72rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)' }}>STAY UPDATED</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>
            Subscribe to our Newsletter ✨
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
            Get recipes, farming stories, and exclusive deals delivered to your inbox.
          </p>
          <form
            className="ms-newsletter-form"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="ms-newsletter-input"
              style={{ background: 'transparent', color: '#fff' }}
              placeholder="Enter your email…"
              type="email"
            />
            <button className="ms-newsletter-btn" type="submit">Subscribe</button>
          </form>
        </div>

        {/* Grid */}
        <div className="row g-4" style={{ paddingTop: '3rem' }}>
          {/* Brand */}
          <div className="col-lg-3 col-md-6">
            <div className="mb-3"><Logo width={160} /></div>
            <div className="ms-footer-tagline">THE NATURAL WAY OF LIFE</div>
            <p className="ms-footer-desc">
              India's most trusted farm-to-table marketplace connecting verified organic farmers with health-conscious consumers.
            </p>
            <div className="ms-social-links">
              {[
                { icon: 'bi-facebook',  url: '#' },
                { icon: 'bi-instagram', url: '#' },
                { icon: 'bi-twitter-x', url: '#' },
                { icon: 'bi-youtube',   url: '#' },
                { icon: 'bi-whatsapp',  url: '#' },
              ].map((s) => (
                <a key={s.icon} href={s.url} className="ms-social-link" aria-label={s.icon}>
                  <i className={`bi ${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-3 col-6">
            <div className="ms-footer-heading">Categories</div>
            {categories.map((l) => (
              <Link key={l.label} to={l.to} className="ms-footer-link">{l.label}</Link>
            ))}
          </div>

          {/* General */}
          <div className="col-lg-2 col-md-3 col-6">
            <div className="ms-footer-heading">General</div>
            {general.map((l) => (
              <Link key={l.label} to={l.to} className="ms-footer-link">{l.label}</Link>
            ))}
          </div>

          {/* Connect */}
          <div className="col-lg-2 col-md-3 col-6">
            <div className="ms-footer-heading">Connect</div>
            {connect.map((l) => (
              <Link key={l.label} to={l.to} className="ms-footer-link">{l.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-3 col-6">
            <div className="ms-footer-heading">Store Info</div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.9 }}>
              📧 hello@healthyhaat.in<br />
              📞 +91 98765 43210<br />
              📍 Pune, Maharashtra, India<br />
              🕒 Mon–Sat, 9 AM – 7 PM
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['App Store', 'Google Play'].map((s) => (
                <a key={s} href="#" style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '8px', color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.78rem', fontWeight: 600, padding: '8px 14px',
                  textDecoration: 'none', display: 'block', transition: 'all 0.25s',
                }}>
                  📱 {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="ms-footer-divider" />
        <div className="ms-footer-bottom">
          <span>© 2026 HealthyHaat. All rights reserved.</span>
          <span style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/sitemap">Sitemap</Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
