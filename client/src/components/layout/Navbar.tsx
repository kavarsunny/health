import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../store/slices/authSlice';
import { resetCart } from '../../store/slices/cartSlice';
import { RootState } from '../../store/store';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setDropdownOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    navigate('/');
  };

  const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const role: string = (user as any)?.role || 'customer';

  return (
    <nav className={`hh-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Brand */}
          <Link to="/" className="hh-brand" style={{ textDecoration: 'none', marginRight: '0.5rem' }}>
            🌿 HealthyHaat
          </Link>

          {/* Desktop Nav */}
          <div className="d-none d-lg-flex align-items-center gap-1" style={{ flex: 1 }}>
            {[
              { label: 'Home',     to: '/' },
              { label: 'Shop',     to: '/products' },
              { label: 'Farmers',  to: '/farmers' },
              { label: 'About',    to: '/about' },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`hh-nav-link ${location.pathname === l.to ? 'active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="d-none d-md-flex align-items-center" style={{ position: 'relative' }}>
            <i className="bi bi-search" style={{ position: 'absolute', left: 12, color: 'var(--hh-text-muted)', fontSize: '0.85rem' }} />
            <input
              className="hh-search-bar"
              style={{ paddingLeft: '2.2rem' }}
              placeholder="Search produce, farmers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && search.trim()) navigate(`/products?q=${encodeURIComponent(search.trim())}`); }}
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              background: 'rgba(0,200,83,0.1)',
              border: '1px solid var(--hh-border)',
              borderRadius: '50%',
              width: 38, height: 38,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.25s',
              color: 'var(--hh-primary)',
              flexShrink: 0,
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {/* Cart */}
          <Link to="/cart" className="hh-btn-cart" style={{ textDecoration: 'none' }}>
            <i className="bi bi-cart3" />
            {cartCount > 0 && <span className="hh-cart-badge">{cartCount}</span>}
          </Link>

          {/* Auth */}
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                className="hh-btn-login"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer' }}
                onClick={() => setDropdownOpen((p) => !p)}
              >
                <i className="bi bi-person-circle" />
                <span className="d-none d-sm-inline">{user?.name?.split(' ')[0]}</span>
                <i className={`bi bi-chevron-${dropdownOpen ? 'up' : 'down'}`} style={{ fontSize: '0.7rem' }} />
              </button>

              {dropdownOpen && (
                <div className="hh-dropdown-menu" style={{ position: 'absolute', right: 0, top: '120%', minWidth: 200 }}>
                  {/* Role Indicator */}
                  <div style={{ padding: '0.6rem 1.2rem', borderBottom: '1px solid var(--hh-border)', fontSize: '0.75rem', color: 'var(--hh-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                    {role === 'superadmin' ? '⚡ Super Admin' : role === 'farmer' ? '🌾 Farmer' : '👤 Customer'}
                  </div>
                  <Link to="/profile" className="hh-dropdown-item" style={{ display: 'block' }}>👤 My Profile</Link>
                  <Link to="/orders"  className="hh-dropdown-item" style={{ display: 'block' }}>📦 My Orders</Link>

                  {/* Farmer Portal */}
                  {(role === 'farmer' || isAdmin) && (
                    <>
                      <div style={{ borderTop: '1px solid var(--hh-border)', margin: '0.3rem 0' }} />
                      <Link to="/farmer/dashboard" className="hh-dropdown-item" style={{ display: 'block' }}>🌾 Farmer Dashboard</Link>
                      <Link to="/farmer/products"  className="hh-dropdown-item" style={{ display: 'block' }}>📋 My Products</Link>
                      <Link to="/farmer/orders"    className="hh-dropdown-item" style={{ display: 'block' }}>🛒 My Orders</Link>
                    </>
                  )}

                  {/* Super Admin Panel */}
                  {(role === 'superadmin' || isAdmin) && (
                    <>
                      <div style={{ borderTop: '1px solid var(--hh-border)', margin: '0.3rem 0' }} />
                      <Link to="/superadmin/dashboard" className="hh-dropdown-item" style={{ display: 'block' }}>⚡ Super Admin</Link>
                      <Link to="/superadmin/users"     className="hh-dropdown-item" style={{ display: 'block' }}>👥 Manage Users</Link>
                      <Link to="/superadmin/farmers"   className="hh-dropdown-item" style={{ display: 'block' }}>🌾 Manage Farmers</Link>
                    </>
                  )}

                  {/* Legacy admin */}
                  {isAdmin && (
                    <>
                      <div style={{ borderTop: '1px solid var(--hh-border)', margin: '0.3rem 0' }} />
                      <Link to="/admin/dashboard" className="hh-dropdown-item" style={{ display: 'block' }}>⚙️ Admin Panel</Link>
                    </>
                  )}

                  <div style={{ borderTop: '1px solid var(--hh-border)', margin: '0.3rem 0' }} />
                  <button onClick={handleLogout} className="hh-dropdown-item" style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/login"    className="hh-btn-outline" style={{ padding: '0.45rem 1.1rem', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center' }}>Login</Link>
              <Link to="/register" className="hh-btn-login"  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>Sign Up</Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            className="d-lg-none"
            style={{ background: 'rgba(0,200,83,0.1)', border: '1px solid var(--hh-border)', color: 'var(--hh-text)', borderRadius: 8, padding: '0.45rem 0.7rem', cursor: 'pointer', fontSize: '1.1rem' }}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Menu"
          >
            <i className={`bi bi-${menuOpen ? 'x' : 'list'}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--hh-border)' }} className="d-lg-none">
            {[
              { label: 'Home',     to: '/' },
              { label: 'Shop',     to: '/products' },
              { label: 'Cart',     to: '/cart' },
              { label: 'Profile',  to: '/profile' },
              { label: 'Orders',   to: '/orders' },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="hh-nav-link" style={{ display: 'block', marginBottom: 4 }}>{l.label}</Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
