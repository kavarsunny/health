import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { getAllUsers, getAllFarmers, updateUserRole, deleteUser } from '../../api/auth.api';
import { logout } from '../../store/slices/authSlice';
import { resetCart } from '../../store/slices/cartSlice';
import { RootState } from '../../store/store';
import type { AppDispatch } from '../../store/store';
import { getPendingFarmers, approveFarmer } from '../../api/auth.api';
import { IUser } from '../../types';
import Logo from '../../components/common/Logo';
import { 
  SVGDashboard, SVGUsers, SVGFarmersIcon, SVGInventory, SVGOrders, 
  SVGSecurityIcon, SVGSearchIcon, SVGBellIcon, SVGPowerIcon, SVGArrowLeft 
} from '../../components/common/SVGIcons';

// Mock Data for Production Visualization
const platformData = [
  { name: 'Mon', users: 400, revenue: 2400 },
  { name: 'Tue', users: 300, revenue: 1398 },
  { name: 'Wed', users: 200, revenue: 9800 },
  { name: 'Thu', users: 278, revenue: 3908 },
  { name: 'Fri', users: 189, revenue: 4800 },
  { name: 'Sat', users: 239, revenue: 3800 },
  { name: 'Sun', users: 349, revenue: 4300 },
];

const roleDistribution = [
  { name: 'Customers', value: 450, color: '#2b3d84' },
  { name: 'Farmers', value: 120, color: '#0ea5e9' },
  { name: 'Admins', value: 15, color: '#f59e0b' },
];

const navSections = [
  { label: 'Main', items: [{ icon: SVGDashboard, label: 'Overview', to: '/superadmin/dashboard' }] },
  { label: 'Management', items: [
    { icon: SVGUsers, label: 'All Users', to: '/superadmin/users' },
    { icon: SVGFarmersIcon, label: 'Approve Farmers', to: '/superadmin/farmers' },
    { icon: SVGInventory, label: 'Inventory', to: '/admin/products' },
    { icon: SVGOrders, label: 'Sales Orders', to: '/admin/orders' },
  ]},
  { label: 'Security', items: [{ icon: SVGSecurityIcon, label: 'Permissions', to: '/superadmin/permissions' }] }
];

const SuperSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth as any);

  const handleLogout = () => { dispatch(logout()); dispatch(resetCart()); navigate('/'); };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="ms-admin-sidebar-overlay d-lg-none" onClick={onClose} />}
      
      <aside className={`ms-admin-sidebar-v2 ${isOpen ? 'show' : ''}`}>
        <div className="ms-sidebar-logo-v2">
          <div className="brand px-3 py-4 text-center d-flex justify-content-between align-items-center">
            <Logo width={140} />
            <button className="btn btn-sm btn-light d-lg-none" onClick={onClose}>✕</button>
          </div>
        </div>

        <nav className="flex-grow-1">
          {navSections.map((section) => (
            <div className="ms-sidebar-section" key={section.label}>
              <div className="ms-sidebar-section-label">{section.label}</div>
              {section.items.map((item) => (
                <Link key={item.to} to={item.to} className={`ms-sidebar-link ${location.pathname === item.to ? 'active' : ''}`} onClick={() => onClose()}>
                  <item.icon size={20} /> <span className="ms-2">{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="ms-sidebar-footer p-3 mt-auto">
          <Link to="/" className="ms-sidebar-link border-top pt-3">
            <SVGArrowLeft size={20} /> <span className="ms-2">Public Store</span>
          </Link>
          <button onClick={handleLogout} className="ms-sidebar-link text-danger border-0 bg-transparent w-100 text-start">
            <SVGPowerIcon size={20} /> <span className="ms-2">Sign Out</span>
          </button>
          {user && (
            <div className="mt-3 p-2 bg-light rounded d-flex align-items-center gap-2">
              <div className="ms-admin-avatar sm" style={{ background: 'var(--ms-primary)', color: 'white' }}>{user.name?.charAt(0)}</div>
              <div className="overflow-hidden">
                <div className="fw-bold small text-dark truncate">{user.name}</div>
                <div className="text-muted smaller">Super Admin</div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

const UserManagementTable = ({ title, type = 'all' }: { title: string; type?: 'all' | 'farmers' }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = type === 'farmers' ? await getAllFarmers() : await getAllUsers();
      if (res.success) setUsers(res.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, [type]);

  const filtered = useMemo(() => 
    users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase())),
    [users, query]
  );

  const handleRoleUpdate = async (id: string, newRole: string) => {
    try {
      setUpdatingId(id);
      const res = await updateUserRole(id, newRole);
      if (res.success) setUsers(users.map(u => u._id === id ? { ...u, role: newRole as any } : u));
    } finally { setUpdatingId(null); }
  };

  return (
    <div className="ms-chart-card shadow-sm border-0">
      <div className="ms-chart-header border-bottom p-3 d-flex justify-content-between align-items-center bg-white rounded-top">
        <div>
          <h5 className="mb-0 fw-bold">{title}</h5>
          <p className="small text-muted mb-0">Manage roles and platform access</p>
        </div>
        <div className="d-flex gap-2">
          <div className="position-relative">
            <div className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" style={{ zIndex: 5, paddingLeft: '8px' }}>
               <SVGSearchIcon size={16} />
            </div>
            <input 
              type="text" 
              className="form-control form-control-sm ps-5" 
              placeholder="Search users..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ borderRadius: '8px', width: '220px' }}
            />
          </div>
          <button className="btn btn-outline-secondary btn-sm" onClick={loadData}>
            ↻
          </button>
        </div>
      </div>
      <div className="table-responsive bg-white">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th className="ps-3">User Instance</th>
              <th>Role</th>
              <th>Created At</th>
              <th className="text-end pe-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="text-center py-5"><div className="spinner-border spinner-border-sm text-primary" /></td></tr>
            ) : filtered.map(u => (
              <tr key={u._id} style={{ opacity: updatingId === u._id ? 0.5 : 1 }}>
                <td className="ps-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="ms-tbl-avatar bg-primary text-white">{u.name.charAt(0)}</div>
                    <div>
                      <div className="fw-bold truncate" style={{ maxWidth: '150px' }}>{u.name}</div>
                      <div className="small text-muted truncate" style={{ maxWidth: '150px' }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`badge rounded-pill bg-${u.role === 'superadmin' ? 'dark' : u.role === 'admin' ? 'primary' : u.role === 'farmer' ? 'info' : 'secondary'}`}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td className="text-muted small">{new Date(u.createdAt as any).toLocaleDateString()}</td>
                <td className="text-end pe-3">
                  <select 
                    className="form-select form-select-sm d-inline-block w-auto me-2"
                    value={u.role}
                    onChange={(e) => handleRoleUpdate(u._id, e.target.value)}
                    disabled={u.role === 'superadmin'}
                  >
                    <option value="user">User</option>
                    <option value="farmer">Farmer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FarmerApprovalTable = () => {
  const [farmers, setFarmers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getPendingFarmers();
      if (res.success) setFarmers(res.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { loadData(); }, []);

  const handleApprove = async (id: string) => {
    try {
      setApprovingId(id);
      const res = await approveFarmer(id);
      if (res.success) setFarmers(farmers.filter(f => f.userId !== id));
    } finally { setApprovingId(null); }
  };

  return (
    <div className="ms-chart-card shadow-sm border-0">
      <div className="ms-chart-header border-bottom p-3 d-flex justify-content-between align-items-center bg-white rounded-top">
        <div>
          <h5 className="mb-0 fw-bold">Pending Farmer Approvals</h5>
          <p className="small text-muted mb-0">Review and approve farmer applications</p>
        </div>
        <button className="btn btn-outline-secondary btn-sm" onClick={loadData}>
          ↻
        </button>
      </div>
      <div className="table-responsive bg-white">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th className="ps-3">Farmer Details</th>
              <th>Type</th>
              <th>Location</th>
              <th>Submitted</th>
              <th className="text-end pe-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-5"><div className="spinner-border spinner-border-sm text-primary" /></td></tr>
            ) : farmers.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-5 text-muted">No pending approvals</td></tr>
            ) : farmers.map(f => (
              <tr key={f.userId} style={{ opacity: approvingId === f.userId ? 0.5 : 1 }}>
                <td className="ps-3">
                  <div className="d-flex align-items-center gap-2">
                    <div className="ms-tbl-avatar bg-info text-white">{f.user.name.charAt(0)}</div>
                    <div>
                      <div className="fw-bold truncate" style={{ maxWidth: '150px' }}>{f.user.name}</div>
                      <div className="small text-muted truncate" style={{ maxWidth: '150px' }}>{f.user.phone}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge bg-secondary">{f.farmerType}</span>
                </td>
                <td className="text-muted small">{f.district}, {f.state}</td>
                <td className="text-muted small">{new Date(f.createdAt).toLocaleDateString()}</td>
                <td className="text-end pe-3">
                  <button 
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleApprove(f.userId)}
                    disabled={approvingId === f.userId}
                  >
                    {approvingId === f.userId ? 'Approving...' : 'Approve'}
                  </button>
                  <button className="btn btn-outline-danger btn-sm">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SuperAdminDashboard = () => {
  const location = useLocation();
  const [stats, setStats] = useState({ users: 0, farmers: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const [u, f] = await Promise.all([getAllUsers(), getAllFarmers()]);
      if (u.success && f.success) setStats({ users: u.data.length, farmers: f.data.length });
    })();
  }, []);

  const renderOverview = () => (
    <div className="row g-4">
      {/* Top row stats */}
      {[
        { label: 'Total Members', value: stats.users, trend: '+12%', up: true, icon: SVGUsers },
        { label: 'Verified Farmers', value: stats.farmers, trend: '+4%', up: true, icon: SVGFarmersIcon },
        { label: 'Active Listings', value: '4,210', trend: '+18%', up: true, icon: SVGInventory },
        { label: 'MRR Growth', value: '₹12.4L', trend: '-2%', up: false, icon: SVGOrders },
      ].map(s => (
        <div className="col-md-3" key={s.label}>
          <div className="card border-0 shadow-sm p-3 h-100">
            <div className="d-flex justify-content-between mb-2">
              <div className={`p-2 rounded bg-light`}><s.icon size={24} color="#2b3d84" /></div>
              <span className={`badge bg-${s.up ? 'success-subtle text-success' : 'danger-subtle text-danger'} rounded-pill shadow-none`} style={{ height: 'fit-content', fontSize: '0.7rem' }}>
                {s.up ? '↑' : '↓'} {s.trend}
              </span>
            </div>
            <div className="h3 fw-bold mb-0">{s.value}</div>
            <div className="small text-muted">{s.label}</div>
          </div>
        </div>
      ))}

      {/* Analytics Chart */}
      <div className="col-lg-8">
        <div className="card border-0 shadow-sm p-4 h-100">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold mb-0">Platform Performance</h5>
            <select className="form-select form-select-sm w-auto"><option>Last 7 Days</option><option>Last 30 Days</option></select>
          </div>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
              <AreaChart data={platformData}>
                <defs>
                   <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#2b3d84" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#2b3d84" stopOpacity={0}/>
                   </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
                  cursor={{ stroke: '#2b3d84', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2b3d84" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Activity Feed & Distribution */}
      <div className="col-lg-4">
        <div className="card border-0 shadow-sm p-4 mb-4">
          <h5 className="fw-bold mb-3">User Segments</h5>
          <div style={{ width: '100%', height: 160 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={roleDistribution} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                  {roleDistribution.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3">
            {roleDistribution.map(r => (
               <div key={r.name} className="d-flex justify-content-between small mb-1">
                 <span><i className="bi bi-circle-fill me-2" style={{ color: r.color, fontSize: '0.6rem' }} />{r.name}</span>
                 <span className="fw-bold">{r.value}</span>
               </div>
            ))}
          </div>
        </div>

        <div className="card border-0 shadow-sm p-4">
           <h5 className="fw-bold mb-3">Recent Activity</h5>
          {[
            { text: 'Auth: Admin@test logged in', time: '2 min ago', dot: 'bg-primary' },
            { text: 'Role: Suresh C. updated to Farmer', time: '1 hr ago', dot: 'bg-info' },
            { text: 'Order: #HH-921 completed', time: '3 hrs ago', dot: 'bg-success' },
            { text: 'System: New DB backup stored', time: '4 hrs ago', dot: 'bg-warning' },
          ].map((a, i) => (
            <div key={i} className="d-flex gap-3 mb-3 border-start ps-3 position-relative">
              <div className={`rounded-circle ${a.dot} position-absolute`} style={{ width: 10, height: 10, left: -5, top: 4, border: '2px solid white' }} />
              <div>
                <div className="small fw-bold lh-1">{a.text}</div>
                <div className="smaller text-muted">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (location.pathname === '/superadmin/users') return <UserManagementTable title="User Directory" />;
    if (location.pathname === '/superadmin/farmers') return <FarmerApprovalTable />;
    return renderOverview();
  };

  return (
    <div className="ms-admin-wrap">
      <SuperSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="ms-admin-content-v2">
        <div className="ms-admin-dashboard-header p-4 pb-0 d-flex justify-content-between align-items-center">
           <div>
              <h4 className="fw-bold mb-0">Platform Hub</h4>
              <p className="small text-muted mb-0">Platform performance & management</p>
           </div>
           <div className="d-flex gap-2">
              <button className="btn btn-white shadow-sm btn-sm">Export Data</button>
              <button className="btn btn-primary btn-sm shadow-sm">+ Add New Member</button>
           </div>
        </div>

        <main className="p-4" style={{ minHeight: 'calc(100vh - 150px)' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
