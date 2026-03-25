import AnnouncementBar from './AnnouncementBar';
import MarqueeStrip from './MarqueeStrip';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--hh-bg)' }}>
    <AnnouncementBar />
    <Navbar />
    <MarqueeStrip />
    <main style={{ flex: 1 }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
