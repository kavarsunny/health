import { Container } from 'react-bootstrap';

const Footer = () => (
  <footer className="py-4 mt-auto" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
    <Container>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-light">
        <div className="mb-2 mb-md-0">
          <i className="bi bi-shop me-1" /><strong>ShopVerse</strong>
          <span className="text-secondary ms-2">© {new Date().getFullYear()}</span>
        </div>
        <div className="d-flex gap-3">
          <a href="#" className="text-secondary text-decoration-none small">Privacy</a>
          <a href="#" className="text-secondary text-decoration-none small">Terms</a>
          <a href="#" className="text-secondary text-decoration-none small">Contact</a>
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
