import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProducts } from '../../store/slices/productSlice';
import { fetchAllOrders } from '../../store/slices/orderSlice';
import { logout } from '../../store/slices/authSlice';
import { resetCart } from '../../store/slices/cartSlice';

const AdminSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth as any);

  const handleLogout = () => { dispatch(logout()); dispatch(resetCart()); navigate('/'); };

  const navItems = [
    { icon: 'bi-speedometer2', label: 'Dashboard', to: '/admin/dashboard' },
    { icon: 'bi-box-seam', label: 'Products', to: '/admin/products' },
    { icon: 'bi-cart-check', label: 'Orders', to: '/admin/orders' },
  ];

  return (
    <aside className="ms-admin-sidebar-v2">
      <div className="ms-sidebar-logo-v2">
        <div className="brand">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#336939"/>
            <path d="M12 5c0 0-4 4-4 8a4 4 0 008 0c0-4-4-8-4-8z" fill="white"/>
          </svg>
          HealthyHaat
        </div>
        <span className="role-tag">Admin Panel</span>
      </div>
      <div className="ms-sidebar-section">
        <div className="ms-sidebar-section-label">Navigation</div>
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} className={`ms-sidebar-link ${location.pathname === item.to ? 'active' : ''}`}>
            <i className={`bi ${item.icon}`} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="ms-sidebar-footer">
        <Link to="/" className="ms-sidebar-link"><i className="bi bi-shop" /><span>Back to Store</span></Link>
        <button onClick={handleLogout} className="ms-sidebar-link" style={{ width: '100%' }}>
          <i className="bi bi-box-arrow-right" /><span>Logout</span>
        </button>
        {user && (
          <div style={{ marginTop: 12, padding: '10px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="ms-admin-avatar" style={{ width: 32, height: 32, fontSize: '0.8rem' }}>{user.name?.charAt(0).toUpperCase()}</div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{user.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Admin</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

// Mini bar chart for revenue trend
const MiniBar = ({ vals, color }: { vals: number[]; color: string }) => {
  const max = Math.max(...vals);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 60 }}>
      {vals.map((v, i) => (
        <div key={i} style={{
          flex: 1, borderRadius: '3px 3px 0 0',
          background: `linear-gradient(180deg, ${color} 0%, ${color}55 100%)`,
          height: `${(v / max) * 100}%`, minWidth: 8,
        }} />
      ))}
    </div>
  );
};

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { total } = useSelector((state: RootState) => state.product);
  const { allOrders } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(fetchProducts({ limit: '1' }));
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const totalRevenue = allOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingCount = allOrders.filter((o) => o.status === 'pending').length;
  const deliveredCount = allOrders.filter((o) => o.status === 'delivered').length;

  const kpis = [
    { label: 'Total Products', value: total || 0, icon: 'bi-box-seam-fill', color: '#336939', trend: '+12 this week', up: true, to: '/admin/products', miniData: [45, 52, 48, 61, 55, 70, 65] },
    { label: 'Total Orders', value: allOrders.length, icon: 'bi-cart-check-fill', color: '#0ea5e9', trend: `${pendingCount} pending`, up: true, to: '/admin/orders', miniData: [20, 35, 28, 42, 38, 51, 44] },
    { label: 'Revenue', value: `₹${totalRevenue.toFixed(0)}`, icon: 'bi-graph-up-arrow', color: '#8b5cf6', trend: 'All time', up: true, to: '/admin/orders', miniData: [12000, 18000, 15000, 22000, 19000, 28000, 24000] },
    { label: 'Delivered', value: deliveredCount, icon: 'bi-check-circle-fill', color: '#22c55e', trend: 'Completed orders', up: true, to: '/admin/orders', miniData: [8, 12, 10, 18, 15, 22, 20] },
  ];

  const recentOrders = allOrders.slice(0, 5);

  const statusPill = (s: string) => {
    const map: Record<string, string> = {
      pending: 'ms-pill ms-pill-yellow',
      processing: 'ms-pill ms-pill-blue',
      shipped: 'ms-pill ms-pill-blue',
      delivered: 'ms-pill ms-pill-green',
      cancelled: 'ms-pill ms-pill-red',
    };
    return map[s] || 'ms-pill ms-pill-gray';
  };

  return (
    <div className="ms-admin-wrap">
      <AdminSidebar />
      <div className="ms-admin-content-v2">
        {/* Topbar */}
        <div className="ms-admin-topbar">
          <div className="ms-admin-topbar-left">
            <div>
              <h4>Admin Dashboard</h4>
              <div className="ms-admin-breadcrumb">
                <a href="/">Store</a>
                <i className="bi bi-chevron-right" style={{ fontSize: '0.65rem' }} />
                <span style={{ color: '#336939', fontWeight: 600 }}>Dashboard</span>
              </div>
            </div>
          </div>
          <div className="ms-admin-topbar-right">
            <Link to="/admin/products" className="ms-btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem', textDecoration: 'none' }}>
              <i className="bi bi-plus-lg" /> Add Product
            </Link>
            <button className="ms-admin-icon-btn"><i className="bi bi-bell" /></button>
            <div className="ms-admin-avatar">A</div>
          </div>
        </div>

        <div className="ms-admin-main">
          {/* KPI Cards */}
          <div className="row g-3 mb-4">
            {kpis.map((k) => (
              <div key={k.label} className="col-md-6 col-xl-3">
                <Link to={k.to} style={{ textDecoration: 'none' }}>
                  <div className="ms-kpi-card" style={{ '--kpi-color': k.color } as any}>
                    <div className="ms-kpi-top">
                      <div className="ms-kpi-icon" style={{ '--kpi-color': k.color } as any}>
                        <i className={`bi ${k.icon}`} style={{ color: k.color, fontSize: '1.2rem' }} />
                      </div>
                      <span className={`ms-kpi-trend ${k.up ? 'up' : 'down'}`}>
                        <i className="bi bi-arrow-up-right" />
                        {k.trend}
                      </span>
                    </div>
                    <div className="ms-kpi-value">{k.value}</div>
                    <div className="ms-kpi-label">{k.label}</div>
                    <div style={{ marginTop: 12 }}>
                      <MiniBar vals={k.miniData} color={k.color} />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="row g-3 mb-4">
            {[
              { icon: 'bi-plus-circle-fill', label: 'Add Product', sub: 'List new item', to: '/admin/products', bg: '#e8f5e9', color: '#336939' },
              { icon: 'bi-clipboard-check-fill', label: 'Manage Orders', sub: 'Update statuses', to: '/admin/orders', bg: '#f0f8ff', color: '#0ea5e9' },
              { icon: 'bi-download', label: 'Export Data', sub: 'Download CSV', to: '#', bg: '#f3e5f5', color: '#8b5cf6' },
              { icon: 'bi-shop', label: 'View Store', sub: 'Open storefront', to: '/', bg: '#fffde7', color: '#f59e0b' },
            ].map((a) => (
              <div key={a.label} className="col-6 col-xl-3">
                <Link to={a.to} className="ms-quick-action">
                  <div className="ms-quick-action-icon" style={{ background: a.bg }}>
                    <i className={`bi ${a.icon}`} style={{ color: a.color }} />
                  </div>
                  <div>
                    <div className="ms-quick-action-label">{a.label}</div>
                    <div className="ms-quick-action-sub">{a.sub}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="ms-chart-card">
            <div className="ms-chart-header">
              <div>
                <div className="ms-chart-title">Recent Orders</div>
                <div className="ms-chart-sub">Latest {recentOrders.length} orders from your store</div>
              </div>
              <Link to="/admin/orders" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#336939' }}>
                View All <i className="bi bi-arrow-right" />
              </Link>
            </div>
            <div style={{ overflowX: 'auto' }}>
              {recentOrders.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                  <i className="bi bi-inbox" style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }} />
                  No orders yet. Share your store to get started!
                </div>
              ) : (
                <table className="ms-data-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((o) => (
                      <tr key={o._id}>
                        <td className="ms-td-name">#{o._id.slice(-8).toUpperCase()}</td>
                        <td className="ms-td-muted">{new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="ms-tbl-avatar">{String(o.user).charAt(0).toUpperCase()}</span>
                            <span style={{ fontSize: '0.85rem' }}>{o.user}</span>
                          </div>
                        </td>
                        <td className="ms-td-muted">{o.items.length} items</td>
                        <td className="ms-td-name">₹{o.totalPrice.toFixed(0)}</td>
                        <td><span className={statusPill(o.status)}>{o.status}</span></td>
                        <td>
                          <Link to="/admin/orders" className="ms-tbl-btn ms-tbl-btn-view">
                            <i className="bi bi-eye" /> View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
