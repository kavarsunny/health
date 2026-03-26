import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--ms-bg)' }}>
    <Navbar />
    <main style={{ flex: 1 }}>
      <Outlet />
    </main>
    <Footer />

    {/* WhatsApp Floating Button */}
    <a
      href="https://wa.me/919876543210?text=Hello%20HealthyHaat%2C%20I%20need%20help!"
      className="ms-whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <i className="bi bi-whatsapp" />
    </a>
  </div>
);

export default Layout;
