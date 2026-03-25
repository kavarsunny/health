import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../store/slices/authSlice';
import { resetCart } from '../../store/slices/cartSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    navigate('/');
  };

  const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <BSNavbar expand="lg" variant="dark" className="navbar-custom shadow-sm sticky-top" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      <Container>
        <BSNavbar.Brand as={Link} to="/" className="fw-bold fs-4">
          <i className="bi bi-shop me-2" />Healthyhaat
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="main-nav" />
        <BSNavbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/cart" className="position-relative me-3">
              <i className="bi bi-cart3 fs-5" />
              {cartCount > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle" style={{ fontSize: '0.6rem' }}>
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
            {isAuthenticated ? (
              <NavDropdown title={<><i className="bi bi-person-circle me-1" />{user?.name}</>} id="user-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orders">My Orders</NavDropdown.Item>
                {isAdmin && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/admin/dashboard">Admin Dashboard</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/products">Manage Products</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/admin/orders">Manage Orders</NavDropdown.Item>
                  </>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login" className="btn btn-outline-light btn-sm px-3">Login</Nav.Link>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
