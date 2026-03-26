import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../store/slices/authSlice';
import { resetCart } from '../../store/slices/cartSlice';
import { RootState } from '../../store/store';
import Logo from '../common/Logo';

const categories = [
  { label: 'Fruits & Vegetables', to: '/products?category=vegetables' },
  { label: 'Organic Grains', to: '/products?category=grains' },
  { label: 'Dairy & Eggs', to: '/products?category=dairy' },
  { label: 'Herbs & Spices', to: '/products?category=herbs' },
  { label: 'Cold Pressed Oils', to: '/products?category=oils' },
  { label: 'Dry Fruits & Nuts', to: '/products?category=nuts' },
  { label: 'Superfoods', to: '/products?category=superfoods' },
];

const Navbar = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => { setMenuOpen(false); setDropdownOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    navigate('/');
  };

  const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const role: string = (user as any)?.role || 'customer';

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/products' },
    { label: 'Farmers', to: '/farmers' },
    { label: 'About', to: '/about' },
  ];

  return (
    <nav className="ms-navbar scrolled">
      <div className="container">
        <div className="ms-navbar-inner">
          <Logo width={140} />

          {/* Desktop Nav */}
          <ul className="ms-nav-links">
            {navLinks.map((l) => (
              <li key={l.to} className="ms-nav-item">
                <Link to={l.to} className={`ms-nav-link ${location.pathname === l.to ? 'active' : ''}`}>
                  {l.label}
                </Link>
              </li>
            ))}
            {/* Category Dropdown */}
            <li className="ms-nav-item">
              <span className="ms-nav-link" style={{ cursor: 'pointer' }}>
                Shop by Category <i className="bi bi-chevron-down" style={{ fontSize: '0.7rem' }} />
              </span>
              <div className="ms-nav-dropdown">
                {categories.map((c) => (
                  <Link key={c.to} to={c.to}>{c.label}</Link>
                ))}
              </div>
            </li>
          </ul>

          {/* Search */}
          <div className="ms-search-wrap d-none d-md-block">
            <i className="bi bi-search" />
            <input
              className="ms-search-bar"
              placeholder="Search produce, farmers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && search.trim())
                  navigate(`/products?q=${encodeURIComponent(search.trim())}`);
              }}
            />
          </div>

          {/* Actions */}
          <div className="ms-nav-actions">
            {/* Cart */}
            <Link to="/cart" className="ms-nav-icon-btn" style={{ textDecoration: 'none' }}>
              <i className="bi bi-bag" />
              {cartCount > 0 && <span className="ms-nav-badge">{cartCount}</span>}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <button
                  className="ms-nav-user-btn"
                  onClick={() => setDropdownOpen((p) => !p)}
                >
                  <i className="bi bi-person-circle" />
                  <span className="d-none d-sm-inline">{user?.name?.split(' ')[0]}</span>
                  <i className={`bi bi-chevron-${dropdownOpen ? 'up' : 'down'}`} style={{ fontSize: '0.7rem' }} />
                </button>

                {dropdownOpen && (
                  <div className="ms-user-dropdown">
                    <div className="ms-user-role-label">
                      {role === 'superadmin' ? '⚡ Super Admin' : role === 'farmer' ? '🌾 Farmer' : '👤 Customer'}
                    </div>
                    <Link to="/profile" className="ms-user-dropdown-item">👤 My Profile</Link>
                    <Link to="/orders" className="ms-user-dropdown-item">📦 My Orders</Link>

                    {(role === 'farmer' || isAdmin) && (
                      <>
                        <hr />
                        <Link to="/farmer/dashboard" className="ms-user-dropdown-item">🌾 Farmer Dashboard</Link>
                        <Link to="/farmer/products" className="ms-user-dropdown-item">📋 My Products</Link>
                        <Link to="/farmer/orders" className="ms-user-dropdown-item">🛒 Farmer Orders</Link>
                      </>
                    )}

                    {(role === 'superadmin' || isAdmin) && (
                      <>
                        <hr />
                        <Link to="/superadmin/dashboard" className="ms-user-dropdown-item">⚡ Super Admin</Link>
                        <Link to="/superadmin/users" className="ms-user-dropdown-item">👥 Manage Users</Link>
                        <Link to="/superadmin/farmers" className="ms-user-dropdown-item">🌾 Manage Farmers</Link>
                      </>
                    )}

                    {isAdmin && (
                      <>
                        <hr />
                        <Link to="/admin/dashboard" className="ms-user-dropdown-item">⚙️ Admin Panel</Link>
                      </>
                    )}

                    <hr />
                    <button
                      onClick={handleLogout}
                      className="ms-user-dropdown-item"
                      style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to="/login" className="ms-btn-outline" style={{ padding: '7px 18px', fontSize: '0.85rem' }}>Login</Link>
                <Link to="/register" className="ms-btn-primary" style={{ padding: '7px 18px', fontSize: '0.85rem' }}>Sign Up</Link>
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              className="ms-hamburger"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Menu"
            >
              <i className={`bi bi-${menuOpen ? 'x' : 'list'}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="ms-mobile-menu">
            {[
              { label: 'Home', to: '/' },
              { label: 'Shop', to: '/products' },
              { label: 'Farmers', to: '/farmers' },
              { label: 'About', to: '/about' },
              { label: '🛒 Cart', to: '/cart' },
              { label: '👤 Profile', to: '/profile' },
              { label: '📦 Orders', to: '/orders' },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="ms-mobile-link">{l.label}</Link>
            ))}
            {!isAuthenticated && (
              <>
                <Link to="/login" className="ms-mobile-link">Login</Link>
                <Link to="/register" className="ms-mobile-link">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
