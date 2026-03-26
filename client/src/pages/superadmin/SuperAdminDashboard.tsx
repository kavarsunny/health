import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { resetCart } from '../../store/slices/cartSlice';
import { RootState } from '../../store/store';
import type { AppDispatch } from '../../store/store';

const navSections = [
  {
    label: 'Main',
    items: [
      { icon: 'bi-speedometer2', label: 'Overview', to: '/superadmin/dashboard' },
    ],
  },
  {
    label: 'Management',
    items: [
      { icon: 'bi-people', label: 'All Users', to: '/superadmin/users', badge: '47' },
      { icon: 'bi-person-badge', label: 'All Farmers', to: '/superadmin/farmers' },
      { icon: 'bi-box-seam', label: 'All Products', to: '/superadmin/products' },
      { icon: 'bi-cart-check', label: 'All Orders', to: '/superadmin/orders' },
    ],
  },
  {
    label: 'Finance',
    items: [
      { icon: 'bi-credit-card', label: 'Transactions', to: '/superadmin/transactions' },
      { icon: 'bi-graph-up-arrow', label: 'Analytics', to: '/superadmin/analytics' },
    ],
  },
  {
    label: 'Platform',
    items: [
      { icon: 'bi-megaphone', label: 'Announcements', to: '/superadmin/announcements' },
      { icon: 'bi-gear', label: 'Platform Config', to: '/superadmin/config' },
    ],
  },
];

const SuperSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth as any);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    navigate('/');
  };

  return (
    <aside className="ms-admin-sidebar-v2">
      <div className="ms-sidebar-logo-v2">
        <div className="brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#336939"/>
            <path d="M12 5C12 5 8 9 8 13a4 4 0 008 0c0-4-4-8-4-8z" fill="white"/>
          </svg>
          HealthyHaat
        </div>
        <span className="role-tag">Super Admin</span>
      </div>

      {navSections.map((section) => (
        <div className="ms-sidebar-section" key={section.label}>
          <div className="ms-sidebar-section-label">{section.label}</div>
          {section.items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`ms-sidebar-link ${location.pathname === item.to ? 'active' : ''}`}
            >
              <i className={`bi ${item.icon}`} />
              <span>{item.label}</span>
              {item.badge && <span className="ms-sidebar-link-badge">{item.badge}</span>}
            </Link>
          ))}
        </div>
      ))}

      <div className="ms-sidebar-footer">
        <Link to="/" className="ms-sidebar-link">
          <i className="bi bi-shop" /> <span>Back to Store</span>
        </Link>
        <button onClick={handleLogout} className="ms-sidebar-link" style={{ width: '100%' }}>
          <i className="bi bi-box-arrow-right" /> <span>Logout</span>
        </button>
        {user && (
          <div style={{ marginTop: '12px', padding: '10px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="ms-admin-avatar" style={{ width: 32, height: 32, fontSize: '0.8rem' }}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{user.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Super Admin</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

// ──────────────────────────────────────────────
// SVG Inline Bar Chart
// ──────────────────────────────────────────────
const BarChart = ({ data, color = '#336939' }: { data: number[]; color?: string }) => {
  const max = Math.max(...data);
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div>
      <div className="ms-bar-chart">
        {data.map((v, i) => (
          <div
            key={i}
            className="ms-bar"
            title={`${labels[i]}: ${v}`}
            style={{
              height: `${(v / max) * 100}%`,
              background: i === data.length - 1
                ? `linear-gradient(180deg, ${color} 0%, ${color}88 100%)`
                : `linear-gradient(180deg, ${color}55 0%, ${color}22 100%)`,
            }}
          />
        ))}
      </div>
      <div className="ms-bar-labels">
        {labels.map((l) => <span key={l} className="ms-bar-label">{l}</span>)}
      </div>
    </div>
  );
};

// SVG Donut Chart
const DonutChart = () => {
  const data = [
    { label: 'Vegetables', pct: 38, color: '#336939' },
    { label: 'Fruits', pct: 24, color: '#4caf50' },
    { label: 'Grains', pct: 18, color: '#81c784' },
    { label: 'Others', pct: 20, color: '#c8e6c9' },
  ];
  const r = 36, cx = 44, cy = 44;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="ms-donut-wrap">
      <svg className="ms-donut-svg" width="88" height="88" viewBox="0 0 88 88">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth="14" />
        {data.map((d, i) => {
          const dash = (d.pct / 100) * circumference;
          const gap = circumference - dash;
          const circle = (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={d.color}
              strokeWidth="14"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '44px 44px' }}
            />
          );
          offset += (d.pct / 100) * circumference;
          return circle;
        })}
        <text x={cx} y={cy} textAnchor="middle" dy="0.35em" fontSize="11" fontWeight="800" fill="#1a2e1c">62%</text>
      </svg>
      <div className="ms-donut-legend">
        {data.map((d) => (
          <div key={d.label} className="ms-donut-legend-item">
            <span className="ms-donut-legend-dot" style={{ background: d.color }} />
            {d.label}
            <span className="ms-donut-legend-val">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Main Dashboard
// ──────────────────────────────────────────────
const SuperAdminDashboard = () => {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('7d');

  const kpis = [
    { label: 'Total Users', value: '2,14,500', icon: 'bi-people-fill', color: '#336939', trend: '+320', up: true, sub: 'Registered accounts' },
    { label: 'Active Farmers', value: '15,240', icon: 'bi-person-badge-fill', color: '#0ea5e9', trend: '+42', up: true, sub: 'Verified this week' },
    { label: 'Products Live', value: '8,320', icon: 'bi-box-seam-fill', color: '#f59e0b', trend: '+115', up: true, sub: 'Across all categories' },
    { label: 'Revenue (MTD)', value: '₹1.8 Cr', icon: 'bi-graph-up-arrow', color: '#8b5cf6', trend: '+22%', up: true, sub: 'vs last month' },
  ];

  const recentUsers = [
    { name: 'Priya Sharma', email: 'priya@mail.com', role: 'Customer', joined: '24 Mar 2026', status: 'Active' },
    { name: 'Ramesh Patel', email: 'ramesh@farm.in', role: 'Farmer', joined: '23 Mar 2026', status: 'Active' },
    { name: 'Anita Verma', email: 'anita@mail.com', role: 'Customer', joined: '22 Mar 2026', status: 'Active' },
    { name: 'Sunita Devi', email: 'sunita@farm.in', role: 'Farmer', joined: '22 Mar 2026', status: 'Pending' },
    { name: 'Raj Kumar', email: 'raj@mail.com', role: 'Customer', joined: '21 Mar 2026', status: 'Active' },
  ];

  const activity = [
    { icon: 'bi-person-check-fill', bg: '#e8f5e9', text: 'New farmer Ramesh Patel verified and onboarded', time: '2 min ago' },
    { icon: 'bi-cart-check-fill', bg: '#f0f8ff', text: '₹12,400 order #ORD-8832 marked as delivered', time: '18 min ago' },
    { icon: 'bi-shield-exclamation', bg: '#fff5f5', text: 'Suspicious login attempt detected for user #4421', time: '45 min ago' },
    { icon: 'bi-box-seam-fill', bg: '#fffde7', text: '115 new products listed across 6 categories', time: '1 hr ago' },
    { icon: 'bi-megaphone-fill', bg: '#f3e5f5', text: 'Announcement "Holi Sale" scheduled for tomorrow', time: '2 hrs ago' },
  ];

  const weekly = [42000, 58000, 51000, 74000, 63000, 89000, 72000];

  const health = [
    { label: 'API Uptime', value: '99.98%', sub: 'Last 30 days', color: '#336939' },
    { label: 'Avg Response', value: '142ms', sub: 'P95 latency', color: '#0ea5e9' },
    { label: 'Orders Today', value: '2,841', sub: '↑ 12% vs yesterday', color: '#f59e0b' },
    { label: 'Pending Reviews', value: '47', sub: 'Farmer verifications', color: '#ef4444' },
  ];

  const quickActions = [
    { icon: 'bi-person-plus-fill', label: 'Add User', sub: 'Create account', to: '/superadmin/users/new', bg: '#e8f5e9', color: '#336939' },
    { icon: 'bi-box-seam', label: 'Add Product', sub: 'List new item', to: '/superadmin/products/new', bg: '#f0f8ff', color: '#0ea5e9' },
    { icon: 'bi-megaphone', label: 'Announcement', sub: 'Broadcast message', to: '/superadmin/announcements', bg: '#fffde7', color: '#f59e0b' },
    { icon: 'bi-download', label: 'Export Report', sub: 'Download CSV', to: '#', bg: '#f3e5f5', color: '#8b5cf6' },
  ];

  const roleProgress = [
    { label: 'Customers', pct: 68, val: '1,45,860' },
    { label: 'Farmers', pct: 23, val: '49,320' },
    { label: 'Admins', pct: 9, val: '19,320' },
  ];

  return (
    <div className="ms-admin-wrap">
      <SuperSidebar />
      <div className="ms-admin-content-v2">
        {/* Topbar */}
        <div className="ms-admin-topbar">
          <div className="ms-admin-topbar-left">
            <div>
              <h4>Platform Overview</h4>
              <div className="ms-admin-breadcrumb">
                <a href="/">Store</a>
                <i className="bi bi-chevron-right" style={{ fontSize: '0.65rem' }} />
                <span>Super Admin</span>
                <i className="bi bi-chevron-right" style={{ fontSize: '0.65rem' }} />
                <span style={{ color: '#336939', fontWeight: 600 }}>Dashboard</span>
              </div>
            </div>
          </div>
          <div className="ms-admin-topbar-right">
            {/* Period Tabs */}
            <div style={{ display: 'flex', gap: 4, background: '#f1f5f9', borderRadius: 10, padding: 4 }}>
              {(['7d', '30d', '90d'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  style={{
                    padding: '4px 12px', border: 'none', borderRadius: 7,
                    fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer',
                    background: period === p ? '#fff' : 'transparent',
                    color: period === p ? '#336939' : '#94a3b8',
                    boxShadow: period === p ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            <button className="ms-admin-icon-btn" title="Search">
              <i className="bi bi-search" />
            </button>
            <button className="ms-admin-icon-btn" title="Notifications" style={{ position: 'relative' }}>
              <i className="bi bi-bell" />
              <span className="ms-admin-notif-dot" />
            </button>
            <div className="ms-admin-avatar">S</div>
          </div>
        </div>

        <div className="ms-admin-main">
          {/* KPI Cards */}
          <div className="row g-3 mb-4">
            {kpis.map((k) => (
              <div key={k.label} className="col-md-6 col-xl-3">
                <div className="ms-kpi-card" style={{ '--kpi-color': k.color } as any}>
                  <div className="ms-kpi-top">
                    <div className="ms-kpi-icon" style={{ '--kpi-color': k.color } as any}>
                      <i className={`bi ${k.icon}`} style={{ color: k.color }} />
                    </div>
                    <span className={`ms-kpi-trend ${k.up ? 'up' : 'down'}`}>
                      <i className={`bi bi-arrow-${k.up ? 'up' : 'down'}-right`} />
                      {k.trend} today
                    </span>
                  </div>
                  <div className="ms-kpi-value">{k.value}</div>
                  <div className="ms-kpi-label">{k.label}</div>
                  <div className="ms-kpi-sub">{k.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="row g-3 mb-4">
            {/* Revenue Chart */}
            <div className="col-lg-8">
              <div className="ms-chart-card">
                <div className="ms-chart-header">
                  <div>
                    <div className="ms-chart-title">Revenue Overview</div>
                    <div className="ms-chart-sub">Weekly revenue trend (₹)</div>
                  </div>
                  <span className="ms-pill ms-pill-green">↑ 18% this week</span>
                </div>
                <div className="ms-chart-body">
                  <BarChart data={weekly} color="#336939" />
                </div>
              </div>
            </div>

            {/* Product Mix Donut */}
            <div className="col-lg-4">
              <div className="ms-chart-card h-100">
                <div className="ms-chart-header">
                  <div>
                    <div className="ms-chart-title">Product Mix</div>
                    <div className="ms-chart-sub">By category</div>
                  </div>
                </div>
                <div className="ms-chart-body">
                  <DonutChart />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="row g-3 mb-4">
            {quickActions.map((a) => (
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

          {/* Middle Row */}
          <div className="row g-3 mb-4">
            {/* Recent Users */}
            <div className="col-lg-8">
              <div className="ms-chart-card">
                <div className="ms-chart-header">
                  <div>
                    <div className="ms-chart-title">Recent Registrations</div>
                    <div className="ms-chart-sub">Latest users across all roles</div>
                  </div>
                  <Link to="/superadmin/users" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#336939' }}>
                    View All <i className="bi bi-arrow-right" />
                  </Link>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="ms-data-table">
                    <thead>
                      <tr>
                        <th>User</th>
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
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span className="ms-tbl-avatar">{u.name.charAt(0)}</span>
                              <span className="ms-td-name">{u.name}</span>
                            </div>
                          </td>
                          <td className="ms-td-muted">{u.email}</td>
                          <td>
                            <span className={u.role === 'Farmer' ? 'ms-pill ms-pill-green' : 'ms-pill ms-pill-blue'}>
                              {u.role}
                            </span>
                          </td>
                          <td className="ms-td-muted">{u.joined}</td>
                          <td>
                            <span className={u.status === 'Active' ? 'ms-pill ms-pill-green' : 'ms-pill ms-pill-yellow'}>
                              {u.status}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: 6 }}>
                              <button className="ms-tbl-btn ms-tbl-btn-edit"><i className="bi bi-pencil" /> Edit</button>
                              <button className="ms-tbl-btn ms-tbl-btn-del"><i className="bi bi-slash-circle" /> Ban</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* User Role Breakdown + Health */}
            <div className="col-lg-4">
              <div className="ms-chart-card mb-3">
                <div className="ms-chart-header">
                  <div className="ms-chart-title">User Breakdown</div>
                </div>
                <div className="ms-chart-body">
                  {roleProgress.map((r) => (
                    <div key={r.label} className="ms-progress-bar-wrap">
                      <div className="ms-progress-bar-label">
                        <span>{r.label}</span>
                        <span>{r.val}</span>
                      </div>
                      <div className="ms-progress-track">
                        <div className="ms-progress-fill" style={{ width: `${r.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform Health */}
              <div className="ms-chart-card">
                <div className="ms-chart-header">
                  <div className="ms-chart-title">Platform Health</div>
                  <span className="ms-pill ms-pill-green">All Systems OK</span>
                </div>
                <div className="ms-chart-body" style={{ padding: '1rem 1.5rem' }}>
                  {health.map((h) => (
                    <div key={h.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>{h.label}</div>
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{h.sub}</div>
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: h.color }}>{h.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="ms-chart-card">
            <div className="ms-chart-header">
              <div>
                <div className="ms-chart-title">Recent Activity</div>
                <div className="ms-chart-sub">Platform events in real-time</div>
              </div>
            </div>
            <div className="ms-chart-body">
              {activity.map((a, i) => (
                <div key={i} className="ms-activity-item">
                  <div className="ms-activity-dot" style={{ background: a.bg }}>
                    <i className={`bi ${a.icon}`} style={{ color: '#336939', fontSize: '0.9rem' }} />
                  </div>
                  <div>
                    <div className="ms-activity-text">{a.text}</div>
                    <div className="ms-activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
