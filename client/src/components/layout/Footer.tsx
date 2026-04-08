import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { SVGFacebook, SVGInstagram, SVGTwitter, SVGWhatsapp } from '../common/SVGIcons';

const Footer = () => {
  return (
    <footer className="ms-footer py-5 d-flex justify-content-center">
      <div className="container px-4" style={{ maxWidth: '1000px', margin: '0 0' }}>
        <div className="row align-items-center g-4 text-center text-md-start">
          {/* Brand & Tagline */}
          <div className="col-md-4">
             <Logo width={140} />
             <div className="mt-2 smaller text-white-50 fw-bold" style={{ letterSpacing: '1px' }}>
                THE NATURAL WAY OF LIFE
             </div>
             <p className="smaller text-white-50 mt-2 mb-0">
                Connecting organic farmers with health-conscious consumers across India.
             </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-5">
            <div className="d-flex flex-wrap justify-content-center gap-3 gap-md-4">
              <Link to="/about" className="ms-footer-link mb-0">About</Link>
              <Link to="/products" className="ms-footer-link mb-0">Shop</Link>
              <Link to="/blog" className="ms-footer-link mb-0">Blog</Link>
              <Link to="/privacy" className="ms-footer-link mb-0">Privacy</Link>
              <Link to="/terms" className="ms-footer-link mb-0">Terms</Link>
              <Link to="/contact" className="ms-footer-link mb-0">Contact</Link>
            </div>
          </div>

          {/* Socials & Copyright */}
          <div className="col-md-3 text-md-end">
            <div className="ms-social-links justify-content-center justify-content-md-end mb-3">
              <a href="#" className="ms-social-link" style={{ width: '32px', height: '32px' }}>
                <SVGFacebook size={18} />
              </a>
              <a href="#" className="ms-social-link" style={{ width: '32px', height: '32px' }}>
                <SVGInstagram size={18} />
              </a>
              <a href="#" className="ms-social-link" style={{ width: '32px', height: '32px' }}>
                <SVGTwitter size={18} />
              </a>
              <a href="#" className="ms-social-link" style={{ width: '32px', height: '32px' }}>
                <SVGWhatsapp size={18} />
              </a>
            </div>
            <div className="smaller text-white-50">
               © 2026 HealthyHaat. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
