import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from '../components/layout/AdminLayout';
import SuperAdminLayout from '../components/layout/SuperAdminLayout';
import AdminLoginPage from '../pages/admin/AdminLoginPage';

// ── Customer Pages ──
import HomePage          from '../pages/HomePage';
import ProductsPage      from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage          from '../pages/CartPage';
import CheckoutPage      from '../pages/CheckoutPage';
import LoginPage         from '../pages/LoginPage';
import RegisterPage      from '../pages/RegisterPage';
import FarmerRegisterPage from '../pages/FarmerRegisterPage';
import ProfilePage       from '../pages/ProfilePage';
import OrdersPage        from '../pages/OrdersPage';

// ── Informational Pages ──
import AboutPage from '../pages/AboutPage';
import BlogPage from '../pages/BlogPage';
import PrivacyPage from '../pages/PrivacyPage';
import TermsPage from '../pages/TermsPage';
import ContactPage from '../pages/ContactPage';
import HelpPage from '../pages/HelpPage';
import StoresPage from '../pages/StoresPage';
import CategoriesPage from '../pages/CategoriesPage';

// ── Legacy Admin Pages ──
import DashboardPage        from '../pages/admin/DashboardPage';
import ManageProductsPage   from '../pages/admin/ManageProductsPage';
import ManageOrdersPage     from '../pages/admin/ManageOrdersPage';
import ManageCustomersPage  from '../pages/admin/ManageCustomersPage';
import AdminSettingsPage    from '../pages/admin/AdminSettingsPage';

// ── Farmer Module ──
import FarmerDashboard        from '../pages/farmer/FarmerDashboard';
import FarmerManageProducts   from '../pages/farmer/FarmerManageProducts';

// ── Super Admin Module ──
import SuperAdminDashboard from '../pages/superadmin/SuperAdminDashboard';

const AppRoutes = () => (
  <Routes>
    {/* ── Standalone Auth Pages ── */}
    <Route path="/login"       element={<LoginPage />} />
    <Route path="/register"    element={<RegisterPage />} />
    <Route path="/farmer-register" element={<FarmerRegisterPage />} />
    <Route path="/admin-login" element={<AdminLoginPage />} />

    <Route element={<Layout />}>
      {/* ── Public ── */}
      <Route path="/"            element={<HomePage />} />
      <Route path="/products"    element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/about"       element={<AboutPage />} />
      <Route path="/blog"        element={<BlogPage />} />
      <Route path="/privacy"     element={<PrivacyPage />} />
      <Route path="/terms"       element={<TermsPage />} />
      <Route path="/contact"     element={<ContactPage />} />
      <Route path="/help"        element={<HelpPage />} />
      <Route path="/stores"      element={<StoresPage />} />
      <Route path="/categories"  element={<CategoriesPage />} />

      {/* ── Customer Protected ── */}
      <Route path="/cart"     element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
      <Route path="/profile"  element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/orders"   element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />

      {/* ── Farmer Module ── */}
      <Route path="/farmer/dashboard" element={<ProtectedRoute farmerOnly><FarmerDashboard /></ProtectedRoute>} />
      <Route path="/farmer/products"  element={<ProtectedRoute farmerOnly><FarmerManageProducts /></ProtectedRoute>} />
      <Route path="/farmer/orders"    element={<ProtectedRoute farmerOnly><ManageOrdersPage /></ProtectedRoute>} />
    </Route>

    {/* ── Legacy Admin (with dedicated layout) ── */}
    <Route element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
      <Route path="/admin/dashboard" element={<DashboardPage />} />
      <Route path="/admin/products"  element={<ManageProductsPage />} />
      <Route path="/admin/orders"    element={<ManageOrdersPage />} />
      <Route path="/admin/customers" element={<ManageCustomersPage />} />
      <Route path="/admin/settings"  element={<AdminSettingsPage />} />
    </Route>
  
    {/* ── Super Admin (with dedicated layout) ── */}
        <Route element={<ProtectedRoute superAdminOnly><SuperAdminLayout /></ProtectedRoute>}>
      <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
      <Route path="/superadmin/users"     element={<SuperAdminDashboard />} />
      <Route path="/superadmin/farmers"   element={<SuperAdminDashboard />} />
      <Route path="/superadmin/products"  element={<ManageProductsPage />} />
      <Route path="/superadmin/orders"    element={<ManageOrdersPage />} />
      <Route path="/superadmin/permissions" element={<AdminSettingsPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
