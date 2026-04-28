import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { resetCart } from '../../store/slices/cartSlice';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    navigate('/');
  };

  const navItems = [
    { icon: '', label: 'Dashboard',   to: '/farmer/dashboard' },
    { icon: '', label: 'My Products', to: '/farmer/products' },
    { icon: '', label: 'Orders',      to: '/farmer/orders' },
    { icon: '', label: 'Earnings',    to: '/farmer/earnings' },
    { icon: '', label: 'Analytics',   to: '/farmer/analytics' },
    { icon: '', label: 'Settings',    to: '/farmer/settings' },
  ];

  return (
    <aside className="hh-admin-sidebar">
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--hh-border)', marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.4rem', fontWeight: 800, background: 'var(--hh-grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Farmer Portal
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--hh-text-muted)', marginTop: '0.2rem' }}>HealthyHaat</div>
      </div>
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`hh-sidebar-item ${location.pathname === item.to ? 'active' : ''}`}
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
      <div style={{ borderTop: '1px solid var(--hh-border)', marginTop: '1rem', paddingTop: '0.5rem' }}>
        <Link to="/" className="hh-sidebar-item"><span></span><span>Back to Store</span></Link>
        <button onClick={handleLogout} className="hh-sidebar-item" style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}>
          <span></span><span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

const FarmerDashboard = () => {
  const { user } = useAuth();
  
  const stats = [
    { label: 'Total Products', value: '24', icon: '', change: '+3 this week' },
    { label: 'Active Orders',  value: '12', icon: '', change: '+2 today' },
    { label: 'This Month',     value: '₹48,200', icon: '', change: '+18% vs last month' },
    { label: 'Avg Rating',     value: '4.9', icon: '', change: 'Top 5% of farmers' },
  ];

  const recentOrders = [
    { id: '#ORD-001', product: 'Organic Tomatoes 5kg', customer: 'Priya S.', amount: '₹320', status: 'Delivered' },
    { id: '#ORD-002', product: 'A2 Ghee 500ml',        customer: 'Aryan M.', amount: '₹680', status: 'Shipped' },
    { id: '#ORD-003', product: 'Basmati Rice 10kg',    customer: 'Kavita N.', amount: '₹940', status: 'Pending' },
    { id: '#ORD-004', product: 'Mixed Greens 2kg',     customer: 'Raj K.',    amount: '₹210', status: 'Processing' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="hh-admin-content">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>
            Welcome back, {(user as any)?.name || 'Farmer'}
          </h1>
          <p style={{ color: 'var(--hh-text-muted)', fontSize: '0.9rem' }}>
            Here's what's happening with your farm today.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="row g-4 mb-4">
          {stats.map((s) => (
            <div key={s.label} className="col-md-6 col-xl-3">
              <div className="hh-stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                  <span style={{ fontSize: '1.8rem' }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--hh-primary)', background: 'rgba(0,200,83,0.1)', borderRadius: 6, padding: '2px 8px', fontWeight: 600 }}>{s.change}</span>
                </div>
                <div className="hh-stat-card-num">{s.value}</div>
                <div className="hh-stat-card-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div style={{ marginBottom: '2rem' }}>
          <h5 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Recent Orders</h5>
          <div style={{ overflowX: 'auto' }}>
            <table className="hh-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id}>
                    <td style={{ color: 'var(--hh-primary)', fontWeight: 600 }}>{o.id}</td>
                    <td>{o.product}</td>
                    <td>{o.customer}</td>
                    <td style={{ fontWeight: 700 }}>{o.amount}</td>
                    <td>
                      <span className={
                        o.status === 'Delivered'  ? 'hh-badge-success' :
                        o.status === 'Pending'    ? 'hh-badge-warning' :
                        o.status === 'Shipped'    ? 'hh-badge-success' :
                        'hh-badge-warning'
                      }>{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h5 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Quick Actions</h5>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Manage My Products', to: '/farmer/products', style: 'primary' },
              { label: 'View All Orders',  to: '/farmer/orders',       style: 'outline' },
              { label: 'View Analytics',   to: '/farmer/analytics',    style: 'outline' },
            ].map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className={a.style === 'primary' ? 'hh-btn-primary' : 'hh-btn-outline'}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
