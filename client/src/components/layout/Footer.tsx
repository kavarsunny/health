import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="hh-footer">
    <div className="container">
      <div className="row g-4">
        {/* Brand */}
        <div className="col-lg-4 col-md-6">
          <div className="hh-footer-brand">🌿 HealthyHaat</div>
          <p className="hh-footer-desc">
            India's most trusted farm-to-table marketplace connecting verified organic farmers with health-conscious consumers across the country.
          </p>
          <div style={{ marginTop: '1.2rem', display: 'flex' }}>
            {[
              { icon: 'bi-facebook',  url: '#' },
              { icon: 'bi-instagram', url: '#' },
              { icon: 'bi-twitter-x', url: '#' },
              { icon: 'bi-youtube',   url: '#' },
              { icon: 'bi-whatsapp',  url: '#' },
            ].map((s) => (
              <a key={s.icon} href={s.url} className="hh-social-link" aria-label={s.icon}>
                <i className={`bi ${s.icon}`} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-lg-2 col-md-3 col-6">
          <div className="hh-footer-heading">Quick Links</div>
          {[
            { label: 'Home',          to: '/' },
            { label: 'All Products',  to: '/products' },
            { label: 'Farmers',       to: '/farmers' },
            { label: 'About Us',      to: '/about' },
            { label: 'Blog',          to: '/blog' },
          ].map((l) => (
            <Link key={l.label} to={l.to} className="hh-footer-link">{l.label}</Link>
          ))}
        </div>

        {/* Account */}
        <div className="col-lg-2 col-md-3 col-6">
          <div className="hh-footer-heading">My Account</div>
          {[
            { label: 'Login',         to: '/login' },
            { label: 'Register',      to: '/register' },
            { label: 'My Orders',     to: '/orders' },
            { label: 'My Profile',    to: '/profile' },
            { label: 'Wishlist',      to: '/wishlist' },
          ].map((l) => (
            <Link key={l.label} to={l.to} className="hh-footer-link">{l.label}</Link>
          ))}
        </div>

        {/* Support */}
        <div className="col-lg-2 col-md-6 col-6">
          <div className="hh-footer-heading">Support</div>
          {[
            { label: 'Help Center',   to: '/help' },
            { label: 'Returns',       to: '/returns' },
            { label: 'Privacy Policy',to: '/privacy' },
            { label: 'Terms',         to: '/terms' },
            { label: 'Contact Us',    to: '/contact' },
          ].map((l) => (
            <Link key={l.label} to={l.to} className="hh-footer-link">{l.label}</Link>
          ))}
        </div>

        {/* Contact */}
        <div className="col-lg-2 col-md-6 col-6">
          <div className="hh-footer-heading">Contact</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--hh-text-muted)', lineHeight: 1.8 }}>
            📧 hello@healthyhaat.in<br />
            📞 +91 98765 43210<br />
            📍 Pune, Maharashtra<br />
            🕒 Mon–Sat, 9 AM–7 PM
          </p>
          {/* App Badges */}
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['App Store', 'Google Play'].map((s) => (
              <a key={s} href="#" style={{
                background: 'rgba(0,200,83,0.08)',
                border: '1px solid var(--hh-border)',
                borderRadius: 'var(--hh-radius-sm)',
                color: 'var(--hh-text)',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.4rem 0.9rem',
                textDecoration: 'none',
                transition: 'var(--hh-transition)',
                display: 'block',
              }}>
                📱 Download on {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="hh-footer-bottom">
        <span>© 2026 HealthyHaat. All rights reserved.</span>
        <span style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/privacy" style={{ color: 'var(--hh-text-muted)', textDecoration: 'none' }}>Privacy</Link>
          <Link to="/terms"   style={{ color: 'var(--hh-text-muted)', textDecoration: 'none' }}>Terms</Link>
          <Link to="/sitemap" style={{ color: 'var(--hh-text-muted)', textDecoration: 'none' }}>Sitemap</Link>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
