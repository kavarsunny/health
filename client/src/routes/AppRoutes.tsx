import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './ProtectedRoute';

// ── Customer Pages ──
import HomePage          from '../pages/HomePage';
import ProductsPage      from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage          from '../pages/CartPage';
import CheckoutPage      from '../pages/CheckoutPage';
import LoginPage         from '../pages/LoginPage';
import RegisterPage      from '../pages/RegisterPage';
import ProfilePage       from '../pages/ProfilePage';
import OrdersPage        from '../pages/OrdersPage';

// ── Legacy Admin Pages ──
import DashboardPage        from '../pages/admin/DashboardPage';
import ManageProductsPage   from '../pages/admin/ManageProductsPage';
import ManageOrdersPage     from '../pages/admin/ManageOrdersPage';

// ── Farmer Module ──
import FarmerDashboard        from '../pages/farmer/FarmerDashboard';
import FarmerManageProducts   from '../pages/farmer/FarmerManageProducts';

// ── Super Admin Module ──
import SuperAdminDashboard from '../pages/superadmin/SuperAdminDashboard';

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      {/* ── Public ── */}
      <Route path="/"            element={<HomePage />} />
      <Route path="/products"    element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/login"       element={<LoginPage />} />
      <Route path="/register"    element={<RegisterPage />} />

      {/* ── Customer Protected ── */}
      <Route path="/cart"     element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
      <Route path="/profile"  element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/orders"   element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />

      {/* ── Farmer Module ── */}
      <Route path="/farmer/dashboard" element={<ProtectedRoute farmerOnly><FarmerDashboard /></ProtectedRoute>} />
      <Route path="/farmer/products"  element={<ProtectedRoute farmerOnly><FarmerManageProducts /></ProtectedRoute>} />
      <Route path="/farmer/orders"    element={<ProtectedRoute farmerOnly><ManageOrdersPage /></ProtectedRoute>} />

      {/* ── Super Admin Module ── */}
      <Route path="/superadmin/dashboard" element={<ProtectedRoute superAdminOnly><SuperAdminDashboard /></ProtectedRoute>} />
      <Route path="/superadmin/users"     element={<ProtectedRoute superAdminOnly><SuperAdminDashboard /></ProtectedRoute>} />
      <Route path="/superadmin/farmers"   element={<ProtectedRoute superAdminOnly><SuperAdminDashboard /></ProtectedRoute>} />
      <Route path="/superadmin/products"  element={<ProtectedRoute superAdminOnly><SuperAdminDashboard /></ProtectedRoute>} />
      <Route path="/superadmin/orders"    element={<ProtectedRoute superAdminOnly><SuperAdminDashboard /></ProtectedRoute>} />

      {/* ── Legacy Admin ── */}
      <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><DashboardPage /></ProtectedRoute>} />
      <Route path="/admin/products"  element={<ProtectedRoute adminOnly><ManageProductsPage /></ProtectedRoute>} />
      <Route path="/admin/orders"    element={<ProtectedRoute adminOnly><ManageOrdersPage /></ProtectedRoute>} />
    </Route>
  </Routes>
);

export default AppRoutes;
