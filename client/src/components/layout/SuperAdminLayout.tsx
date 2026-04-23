import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { resetCart } from '../../store/slices/cartSlice';
import { RootState } from '../../store/store';
import type { AppDispatch } from '../../store/store';
import Logo from '../common/Logo';
import { 
  SVGDashboard, SVGUsers, SVGFarmersIcon, SVGInventory, SVGOrders, 
  SVGSecurityIcon, SVGPowerIcon
} from '../common/SVGIcons';

const navSections = [
  { label: 'Main', items: [{ icon: SVGDashboard, label: 'Overview', to: '/superadmin/dashboard' }] },
  { label: 'Management', items: [
    { icon: SVGUsers, label: 'All Users', to: '/superadmin/users' },
    { icon: SVGFarmersIcon, label: 'Approve Farmers', to: '/superadmin/farmers' },
    { icon: SVGInventory, label: 'Inventory', to: '/superadmin/products' },
    { icon: SVGOrders, label: 'Sales Orders', to: '/superadmin/orders' },
  ]},
  { label: 'Security', items: [{ icon: SVGSecurityIcon, label: 'Permissions', to: '/superadmin/permissions' }] }
];

const SuperSidebar = ({ isOpen, onClose, collapsed, setCollapsed }: { isOpen: boolean; onClose: () => void; collapsed: boolean; setCollapsed: any }) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth as any);

  const handleLogout = () => { dispatch(logout()); dispatch(resetCart()); navigate('/admin-login'); };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="ms-admin-sidebar-overlay d-lg-none" onClick={onClose} />}
      
      <aside className={`ms-admin-sidebar-v2 ${isOpen ? 'show' : ''} ${collapsed ? 'collapsed' : ''}`} style={{ top: 0, zIndex: 1050 }}>
        
        <div className="ms-sidebar-logo-v2">
          <div className="brand px-1 py-1 text-center d-flex justify-content-between align-items-center" style={{ color: 'white', fontWeight: 800, fontSize: '1rem', gap: '8px' }}>
            <div className="d-flex align-items-center gap-2 w-100 justify-content-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="12" fill="#4f46e5"/>
                <path d="M12 5c0 0-4 4-4 8a4 4 0 008 0c0-4-4-8-4-8z" fill="white"/>
              </svg>
              <span>HH SuperAdmin</span>
            </div>
            <button className="btn btn-sm btn-outline-light d-lg-none" onClick={onClose} style={{ border: 'none' }}>✕</button>
          </div>
          <div className="text-center mb-3">
             {!collapsed && <span className="role-tag">Super Admin</span>}
          </div>
        </div>

        <nav className="flex-grow-1 mt-3" style={{ overflowY: 'auto' }}>
          {navSections.map((section) => (
            <div className="ms-sidebar-section" key={section.label}>
              <div className="ms-sidebar-section-label">{!collapsed && section.label}</div>
              {section.items.map((item) => (
                <Link key={item.to} to={item.to} className={`ms-sidebar-link ${location.pathname === item.to ? 'active' : ''}`} onClick={() => onClose()} title={item.label}>
                  <item.icon size={20} /> <span className="ms-2">{item.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="ms-sidebar-footer p-2 mt-auto">
          {/* Removed Public Store link to ensure strict separation */}
          <button onClick={handleLogout} className="ms-sidebar-link text-danger border-0 bg-transparent w-100 text-start mt-0 mb-1" title="Sign Out">
            <SVGPowerIcon size={20} /> <span className="ms-2">Sign Out</span>
          </button>
          {user && (
            <div className={`mt-2 d-flex align-items-center justify-content-center gap-2 ${collapsed ? 'p-1' : 'p-1 px-2 bg-light rounded'}`} style={{ transition: 'all 0.3s' }}>
              <div className="ms-admin-avatar sm" style={{ background: '#4f46e5', color: 'white', flexShrink: 0, width: collapsed ? 38 : 28, height: collapsed ? 38 : 28, fontSize: collapsed ? '1.1rem' : '0.85rem', transition: 'all 0.3s' }}>{user.name?.charAt(0).toUpperCase()}</div>
              <div className="overflow-hidden" style={{ display: collapsed ? 'none' : 'block' }}>
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

const SuperAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`ms-admin-wrap ${collapsed ? 'collapsed' : ''}`} style={{ background: '#f8fafc' }}>
      <SuperSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} collapsed={collapsed} setCollapsed={setCollapsed} />
      
      {/* Main Content wrapper */}
      <div className="ms-admin-content-v2" style={{ marginLeft: collapsed ? '70px' : '260px', width: collapsed ? 'calc(100% - 70px)' : 'calc(100% - 260px)' }}>
        {/* Topbar */}
        <header className="ms-admin-topbar shadow-sm">
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-light d-none d-lg-flex align-items-center justify-content-center" onClick={() => setCollapsed(!collapsed)} style={{ width: 38, height: 38, borderRadius: 10 }}>
              <i className="bi bi-list fs-5"></i>
            </button>
            <button className="btn btn-light d-none d-lg-flex align-items-center justify-content-center" onClick={() => setCollapsed(!collapsed)} style={{ width: 38, height: 38, borderRadius: 10 }}>
              <i className="bi bi-list fs-5"></i>
            </button>
            <button className="btn btn-light d-none d-lg-flex align-items-center justify-content-center" onClick={() => setCollapsed(!collapsed)} style={{ width: 38, height: 38, borderRadius: 10 }}>
              <i className="bi bi-list fs-5"></i>
            </button>
            <button className="btn btn-light d-lg-none" onClick={() => setSidebarOpen(true)}>
              ☰
            </button>
            <h4 className="mb-0 d-none d-md-block">Super Admin Portal</h4>
          </div>
        </header>

        {/* Page Content injected here */}
        <Outlet />
      </div>

      {/* Responsive adjustments for mobile sidebar overlap */}
      <style>{`
        @media (max-width: 991px) {
          .ms-admin-content-v2 {
            margin-left: 0 !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SuperAdminLayout;
