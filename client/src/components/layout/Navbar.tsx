import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../store/slices/authSlice';
import { resetCart } from '../../store/slices/cartSlice';
import { RootState } from '../../store/store';
import Logo from '../common/Logo';
import { SVGSearchIcon, SVGUsers, SVGOrders, SVGArrowLeft } from '../common/SVGIcons';

const categories = [
  'All Categories',
  'Cereals & Grains',
  'Pulses & Lentils',
  'Flours (Atta)',
  'Oils & Ghee',
  'Natural Sweeteners',
  'Spices',
  'Dry Fruits & Nuts',
  'Seeds',
  'Healthy Snacks',
  'Beverages',
  'Ayurvedic & Herbal Products',
  'Cow-Based Wellness Products',
  'Eco-Friendly Products',
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
  const [selectedCat, setSelectedCat] = useState('All Categories');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <header className={`ms-navbar-v3 ${scrolled ? 'scrolled' : ''}`}>
      <div className="ms-nav-main-wrapper">
        <div className="container">
          <div className="ms-nav-inner-v3">
            
            {/* Hamburger (Mobile/Global Toggle) */}
            <button className="ms-nav-toggle" onClick={() => setMenuOpen(true)}>
              <i className="bi bi-list" />
            </button>

            {/* Logo */}
            <Link to="/" className="ms-nav-logo-wrap">
              <Logo width={130} />
            </Link>

            {/* Location (Desktop) */}
            <div className="ms-nav-loc d-none d-xl-flex">
               <i className="bi bi-geo-alt" />
               <div className="ms-nav-loc-text">
                  <span className="smaller">Deliver to</span>
                  <div className="fw-bold">Select Location</div>
               </div>
            </div>

            {/* Search - Pro Style */}
            <div className="ms-nav-search-container d-none d-md-flex">
              <div className="ms-nav-search-bar">
                <div className="ms-nav-search-cat">
                  <select 
                    value={selectedCat}
                    onChange={(e) => setSelectedCat(e.target.value)}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <i className="bi bi-chevron-down" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/products?q=${search}`)}
                />
                <button className="ms-nav-search-btn">
                  <SVGSearchIcon size={20} />
                </button>
              </div>
            </div>

            {/* Quick Links (Desktop) */}
            <div className="ms-nav-extra-links d-none d-lg-flex">
               <Link to="/farmer/register" className="ms-nav-extra-link">Sell</Link>
               <span className="ms-nav-divider" />
               <Link to="/help" className="ms-nav-extra-link">Help</Link>
            </div>

            {/* Icons & Actions */}
            <div className="ms-nav-actions-v3">
              {/* Account Dropdown */}
              <div className="ms-nav-action-group">
                {isAuthenticated ? (
                  <div className="position-relative">
                    <button className="ms-nav-icon-link" onClick={() => setDropdownOpen(!dropdownOpen)}>
                       <div className="ms-nav-icon-circle"><SVGUsers size={22} /></div>
                       <span className="d-none d-xxl-block">Profile</span>
                    </button>
                    {dropdownOpen && (
                      <div className="ms-dropdown-v3">
                        <div className="ms-dropdown-header">
                           <div className="fw-bold">{user?.name}</div>
                           <div className="smaller text-muted">{user?.email}</div>
                        </div>
                        <Link to="/profile" className="ms-dropdown-item">My Profile</Link>
                        <Link to="/orders" className="ms-dropdown-item">My Orders</Link>
                        {(isAdmin || role === 'superadmin') && (
                          <Link to="/superadmin/dashboard" className="ms-dropdown-item highlight">Admin Dashboard</Link>
                        )}
                        <hr className="my-1" />
                        <button onClick={handleLogout} className="ms-dropdown-item text-danger">Sign Out</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/login" className="ms-nav-icon-link">
                    <div className="ms-nav-icon-circle"><SVGUsers size={22} /></div>
                    <span className="d-none d-xxl-block">Sign In</span>
                  </Link>
                )}
              </div>

              {/* Cart */}
              <Link to="/cart" className="ms-nav-icon-link">
                <div className="ms-nav-icon-circle" style={{ position: 'relative' }}>
                  <SVGOrders size={22} />
                  {cartCount > 0 && <span className="ms-icon-badge">{cartCount}</span>}
                </div>
                <span className="d-none d-xxl-block">Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`ms-mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="ms-drawer-overlay" onClick={() => setMenuOpen(false)} />
        <div className="ms-drawer-content">
          <div className="ms-drawer-header">
            <Logo width={120} />
            <button className="ms-drawer-close" onClick={() => setMenuOpen(false)}>✕</button>
          </div>
          <div className="ms-drawer-body">
            <div className="ms-drawer-section">
               <div className="ms-drawer-label">GENERAL</div>
               <Link to="/" className="ms-drawer-link">Home</Link>
               <Link to="/products" className="ms-drawer-link">Shop Products</Link>
               <Link to="/stores" className="ms-drawer-link">Find Stores</Link>
            </div>
            <div className="ms-drawer-section">
               <div className="ms-drawer-label">CATEGORIES</div>
               {categories.slice(1, 10).map(c => (
                 <Link key={c} to={`/products?category=${c}`} className="ms-drawer-link">{c}</Link>
               ))}
               <Link to="/categories" className="ms-drawer-link text-primary fw-bold">View All Categories</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
