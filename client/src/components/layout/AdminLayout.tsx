import React from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import { resetCart } from '../../store/slices/cartSlice';


const AdminSidebar = ({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: any }) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth as any);

  const handleLogout = () => { dispatch(logout()); dispatch(resetCart()); navigate('/admin-login'); };

  const navItems = [
    { icon: 'bi-speedometer2', label: 'Dashboard', to: '/admin/dashboard' },
    { icon: 'bi-box-seam', label: 'Products', to: '/admin/products' },
    { icon: 'bi-cart-check', label: 'Orders', to: '/admin/orders' },
    { icon: 'bi-people', label: 'Customers', to: '/admin/customers' },
    { icon: 'bi-gear', label: 'Settings', to: '/admin/settings' },
  ];

  return (
    <aside className={`ms-admin-sidebar-v2 ${collapsed ? 'collapsed' : ''}`} style={{ position: 'relative' }}>
      
      <div className="ms-sidebar-logo-v2">
        <div className="brand d-flex align-items-center justify-content-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="12" fill="#4f46e5"/>
            <path d="M12 5c0 0-4 4-4 8a4 4 0 008 0c0-4-4-8-4-8z" fill="white"/>
          </svg>
          <span className="ms-2">HH Admin</span>
        </div>
        {!collapsed && <span className="role-tag">Admin Panel</span>}
      </div>
      <div className="ms-sidebar-section" style={{ flexGrow: 1, overflowY: 'auto' }}>
        <div className="ms-sidebar-section-label">{!collapsed && 'Navigation'}</div>
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} className={`ms-sidebar-link ${location.pathname === item.to ? 'active' : ''}`} title={item.label}>
            <i className={`bi ${item.icon}`} />
            <span className="ms-2">{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="ms-sidebar-footer">
        <button onClick={handleLogout} className="ms-sidebar-link text-danger border-0 bg-transparent w-100 mt-0 mb-1" title="Logout">
          <i className="bi bi-box-arrow-right" /><span className="ms-2">Logout</span>
        </button>
        {user && (
          <div style={{ marginTop: 6, padding: collapsed ? '4px' : '6px 8px', background: collapsed ? 'transparent' : 'rgba(255,255,255,0.05)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all 0.3s' }}>
            <div className="ms-admin-avatar" style={{ width: collapsed ? 38 : 28, height: collapsed ? 38 : 28, fontSize: collapsed ? '1.1rem' : '0.8rem', flexShrink: 0, transition: 'all 0.3s' }}>{user.name?.charAt(0).toUpperCase()}</div>
            <div style={{ display: collapsed ? 'none' : 'block' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{user.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>Admin</div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

const AdminLayout = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div className={`ms-admin-wrap ${collapsed ? 'collapsed' : ''}`}>
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="ms-admin-content-v2" style={{ paddingBottom: '3rem', minHeight: '100vh', overflowY: 'auto' }}>
        <Outlet context={{ toggleSidebar: () => setCollapsed(!collapsed) }} />
      </div>
    </div>
  );
};

export default AdminLayout;
