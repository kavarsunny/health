import Navbar from './Navbar';
import Footer from './Footer';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="d-flex flex-column min-vh-100">
    <Navbar />
    <Container className="flex-grow-1 py-4">
      <Outlet />
    </Container>
    <Footer />
  </div>
);

export default Layout;
