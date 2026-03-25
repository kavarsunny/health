import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProtectedRoute from './ProtectedRoute';

// Pages
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import OrdersPage from '../pages/OrdersPage';

// Admin Pages
import DashboardPage from '../pages/admin/DashboardPage';
import ManageProductsPage from '../pages/admin/ManageProductsPage';
import ManageOrdersPage from '../pages/admin/ManageOrdersPage';

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      {/* Public */}
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected */}
      <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><DashboardPage /></ProtectedRoute>} />
      <Route path="/admin/products" element={<ProtectedRoute adminOnly><ManageProductsPage /></ProtectedRoute>} />
      <Route path="/admin/orders" element={<ProtectedRoute adminOnly><ManageOrdersPage /></ProtectedRoute>} />
    </Route>
  </Routes>
);

export default AppRoutes;
