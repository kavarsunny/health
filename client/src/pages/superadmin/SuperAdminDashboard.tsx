import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { resetCart } from '../../store/slices/cartSlice';

const SuperSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    navigate('/');
  };

  const navItems = [
    { icon: '⚡', label: 'Overview',       to: '/superadmin/dashboard' },
    { icon: '👥', label: 'All Users',      to: '/superadmin/users' },
    { icon: '🌾', label: 'All Farmers',    to: '/superadmin/farmers' },
    { icon: '📦', label: 'All Products',   to: '/superadmin/products' },
    { icon: '🛒', label: 'All Orders',     to: '/superadmin/orders' },
    { icon: '💳', label: 'Transactions',   to: '/superadmin/transactions' },
    { icon: '📣', label: 'Announcements',  to: '/superadmin/announcements' },
    { icon: '⚙️', label: 'Platform Config',to: '/superadmin/config' },
  ];

  return (
    <aside className="hh-admin-sidebar">
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--hh-border)', marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.35rem', fontWeight: 800, background: 'linear-gradient(135deg, #ffd600, #ff6d00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          ⚡ Super Admin
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--hh-text-muted)', marginTop: '0.2rem' }}>HealthyHaat Control Center</div>
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
        <Link to="/" className="hh-sidebar-item"><span>🏠</span><span>Back to Store</span></Link>
        <button onClick={handleLogout} className="hh-sidebar-item" style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}>
          <span>🚪</span><span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

const SuperAdminDashboard = () => {
  const stats = [
    { label: 'Total Users',    value: '2,14,500', icon: '👥', change: '+320 today',        color: '#00c853' },
    { label: 'Active Farmers', value: '15,240',   icon: '🌾', change: '+42 this week',     color: '#1de9b6' },
    { label: 'Products Live',  value: '8,320',    icon: '📦', change: '+115 this week',    color: '#76ff03' },
    { label: 'Revenue (MTD)',  value: '₹1.8 Cr',  icon: '💰', change: '+22% vs last month', color: '#ffd600' },
  ];

  const recentUsers = [
    { name: 'Priya Sharma',  email: 'priya@mail.com',  role: 'Customer', joined: '2026-03-24', status: 'Active' },
    { name: 'Ramesh Patel',  email: 'ramesh@farm.in',  role: 'Farmer',   joined: '2026-03-23', status: 'Active' },
    { name: 'Anita Verma',   email: 'anita@mail.com',  role: 'Customer', joined: '2026-03-22', status: 'Active' },
    { name: 'Sunita Devi',   email: 'sunita@farm.in',  role: 'Farmer',   joined: '2026-03-22', status: 'Pending' },
    { name: 'Raj Kumar',     email: 'raj@mail.com',    role: 'Customer', joined: '2026-03-21', status: 'Active' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <SuperSidebar />
      <div className="hh-admin-content">
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>
              Platform Overview ⚡
            </h1>
            <p style={{ color: 'var(--hh-text-muted)', fontSize: '0.9rem' }}>
              Real-time pulse of HealthyHaat. Last updated just now.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button className="hh-btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              📊 Export Report
            </button>
            <Link to="/superadmin/users/new" className="hh-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              + Add User
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="row g-4 mb-4">
          {stats.map((s) => (
            <div key={s.label} className="col-md-6 col-xl-3">
              <div className="hh-stat-card" style={{ borderColor: `${s.color}22` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                  <span style={{ fontSize: '0.72rem', color: s.color, background: `${s.color}18`, borderRadius: 6, padding: '2px 8px', fontWeight: 600 }}>{s.change}</span>
                </div>
                <div className="hh-stat-card-num" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.value}</div>
                <div className="hh-stat-card-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Users */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h5 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: '#fff', margin: 0 }}>Recent Registrations</h5>
            <Link to="/superadmin/users" style={{ color: 'var(--hh-primary)', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
              View All →
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="hh-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u) => (
                  <tr key={u.email}>
                    <td style={{ fontWeight: 600, color: '#fff' }}>{u.name}</td>
                    <td style={{ color: 'var(--hh-text-muted)' }}>{u.email}</td>
                    <td>
                      <span className={u.role === 'Farmer' ? 'hh-badge-success' : 'hh-badge-warning'}>{u.role}</span>
                    </td>
                    <td style={{ color: 'var(--hh-text-muted)', fontSize: '0.82rem' }}>{u.joined}</td>
                    <td>
                      <span className={u.status === 'Active' ? 'hh-badge-success' : 'hh-badge-warning'}>{u.status}</span>
                    </td>
                    <td>
                      <button style={{ background: 'none', border: '1px solid var(--hh-border)', borderRadius: 6, color: 'var(--hh-text-muted)', padding: '2px 10px', cursor: 'pointer', fontSize: '0.78rem', marginRight: 4 }}>Edit</button>
                      <button style={{ background: 'none', border: '1px solid rgba(255,82,82,0.3)', borderRadius: 6, color: '#ff5252', padding: '2px 10px', cursor: 'pointer', fontSize: '0.78rem' }}>Ban</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Platform Health */}
        <div>
          <h5 style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: '#fff', marginBottom: '1rem' }}>Platform Health</h5>
          <div className="row g-3">
            {[
              { label: 'API Uptime',          value: '99.98%', icon: '🟢' },
              { label: 'Avg Response Time',   value: '142ms',  icon: '⚡' },
              { label: 'Orders Today',        value: '2,841',  icon: '🛒' },
              { label: 'Pending Verifications', value: '47',   icon: '⏳' },
            ].map((h) => (
              <div key={h.label} className="col-md-6 col-xl-3">
                <div className="hh-trust-card" style={{ padding: '1.2rem', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{h.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--hh-primary)' }}>{h.value}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--hh-text-muted)' }}>{h.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
