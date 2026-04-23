import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { login, clearError } from '../../store/slices/authSlice';
import { useAuth } from '../../hooks/useAuth';
import AlertMessage from '../../components/common/AlertMessage';
import Logo from '../../components/common/Logo';

const AdminLoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, user, loading, error } = useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'superadmin') {
        navigate('/superadmin/dashboard');
      } else {
        // Not a staff member
        navigate('/');
      }
    }
    return () => { dispatch(clearError()); };
  }, [isAuthenticated, user, navigate, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ emailOrPhone, password }));
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0f172a', /* Dark, professional slate background for admin */
      position: 'relative'
    }}>
      <div style={{
        position: 'relative', zIndex: 10, width: '100%', maxWidth: 420,
        background: '#ffffff',
        borderRadius: 16, padding: '3rem 2.5rem',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Logo width={160} />
          <div style={{ color: '#64748b', fontWeight: 700, fontSize: '0.85rem', marginTop: 16, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Staff Portal
          </div>
        </div>

        <h5 className="text-center mb-4" style={{ color: '#1e293b', fontWeight: 800, fontSize: '1.25rem' }}>
          Admin Sign In
        </h5>

        {error && <AlertMessage variant="danger">{error}</AlertMessage>}
        {(user && user.role !== 'admin' && user.role !== 'superadmin' && isAuthenticated) && (
          <AlertMessage variant="danger">Access Denied. Staff only.</AlertMessage>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px', display: 'block' }}>Email Address</label>
            <input 
              type="text" 
              value={emailOrPhone} 
              onChange={(e) => setEmailOrPhone(e.target.value)} 
              required 
              placeholder="admin@example.com" 
              style={{ 
                width: '100%', padding: '12px 16px', borderRadius: 8, 
                border: '1px solid #cbd5e1', background: '#f8fafc', 
                color: '#0f172a', fontSize: '0.95rem', outline: 'none'
              }} 
            />
          </div>
          
          <div className="mb-4">
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '6px', display: 'block' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••" 
              style={{ 
                width: '100%', padding: '12px 16px', borderRadius: 8, 
                border: '1px solid #cbd5e1', background: '#f8fafc', 
                color: '#0f172a', fontSize: '0.95rem', outline: 'none'
              }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              width: '100%', padding: '12px', borderRadius: 8, 
              background: '#2563eb', /* Professional blue */
              color: '#fff', fontSize: '1rem', fontWeight: 600, 
              border: 'none', cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
