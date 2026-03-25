import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const useAuth = () => {
  const { user, loading, error } = useSelector((state: RootState) => state.auth);
  const role = user?.role;
  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin:      role === 'admin' || role === 'superadmin',
    isFarmer:     role === 'farmer' || role === 'superadmin' || role === 'admin',
    isSuperAdmin: role === 'superadmin',
  };
};
