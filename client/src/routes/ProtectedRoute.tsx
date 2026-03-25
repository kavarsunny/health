import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface Props {
  children: React.ReactNode;
  adminOnly?:      boolean;
  farmerOnly?:     boolean;
  superAdminOnly?: boolean;
}

const ProtectedRoute = ({
  children,
  adminOnly      = false,
  farmerOnly     = false,
  superAdminOnly = false,
}: Props) => {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const role: string = (user as any)?.role || 'customer';

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly      && !isAdmin)                                         return <Navigate to="/"      replace />;
  if (farmerOnly     && role !== 'farmer'     && role !== 'superadmin')   return <Navigate to="/"      replace />;
  if (superAdminOnly && role !== 'superadmin')                            return <Navigate to="/"      replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
