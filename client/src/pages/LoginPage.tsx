import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store/store';
import { login, clearError } from '../store/slices/authSlice';
import { useAuth } from '../hooks/useAuth';
import AlertMessage from '../components/common/AlertMessage';
import Logo from '../components/common/Logo';

// Reusable SVG Grains/Leaves for the border decoration
const FloatingDeco = ({ emoji, top, left, right, bottom, size = 32, rotate = 0 }: any) => (
  <div style={{
    position: 'absolute', top, left, right, bottom,
    fontSize: size, transform: `rotate(${rotate}deg)`,
    filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.1))',
    zIndex: 2, pointerEvents: 'none'
  }}>
    {emoji}
  </div>
);

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) navigate('/');
    return () => { dispatch(clearError()); };
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ emailOrPhone, password }));
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2600&auto=format&fit=crop")',
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
      position: 'relative'
    }}>
      {/* Dark overlay for contrast */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))' }} />

      <div style={{
        position: 'relative', zIndex: 10, width: '100%', maxWidth: 460,
        background: '#fdfbf3', /* Cream background like the image */
        borderRadius: 24, padding: '3rem 2rem', border: '1px solid #e8e4d3',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)'
      }}>
        
        {/* Botanical border decorations matching "Crop Connect" style */}
        <FloatingDeco emoji="🌿" top="-20px" left="-20px" size={40} rotate={-30} />
        <FloatingDeco emoji="🌾" top="10%" right="-25px" size={48} rotate={15} />
        <FloatingDeco emoji="🥔" bottom="20%" left="-15px" size={28} rotate={-10} />
        <FloatingDeco emoji="🍂" bottom="-15px" right="-10px" size={36} rotate={45} />
        <FloatingDeco emoji="🥜" top="50%" left="-20px" size={24} rotate={20} />
        <FloatingDeco emoji="🌰" top="30%" right="-15px" size={20} rotate={-20} />

        {/* Logo matching the Sun/Leaf burst */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Logo width={180} />
          <div style={{ color: '#6b2110', fontWeight: 600, fontSize: '1.1rem', marginTop: 16 }}>
            AGRICULTURE LOGIN
          </div>
        </div>

        {/* Inner Card */}
        <div style={{
          background: '#f6eed8', /* Inner sandy background */
          borderRadius: 16, padding: '2rem 1.5rem',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)'
        }}>
          <h5 className="text-center mb-4" style={{ color: '#4a2c11', fontWeight: 600, fontSize: '1rem' }}>
            Sign in to your account
          </h5>

          {error && <AlertMessage variant="danger">{error}</AlertMessage>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3 position-relative">
              <input 
                type="text" 
                value={emailOrPhone} 
                onChange={(e) => setEmailOrPhone(e.target.value)} 
                required 
                placeholder="Mobile Number or Email" 
                style={{ 
                  width: '100%', padding: '12px 16px', borderRadius: 8, 
                  border: '1px solid #d1cab3', background: '#fdfbf3', 
                  color: '#4a2c11', fontSize: '0.95rem' 
                }} 
              />
            </div>
            
            <div className="mb-4 position-relative">
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="Password" 
                style={{ 
                  width: '100%', padding: '12px 16px', borderRadius: 8, 
                  border: '1px solid #d1cab3', background: '#fdfbf3', 
                  color: '#4a2c11', fontSize: '0.95rem' 
                }} 
              />
              <i className="bi bi-eye-slash" style={{ position: 'absolute', right: 14, top: 14, color: '#826142', cursor: 'pointer' }} />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              style={{ 
                width: '100%', padding: '14px', borderRadius: 8, 
                background: '#5a6524', /* Earthy olive green */
                color: '#fff', fontSize: '1rem', fontWeight: 600, 
                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(90, 101, 36, 0.3)'
              }}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="text-center mt-3" style={{ fontSize: '0.85rem', color: '#826142' }}>
            <Link to="#" style={{ color: '#826142', textDecoration: 'none' }}>Forgot Password?</Link>
          </div>
          
          <div className="text-center mt-4" style={{ fontSize: '0.9rem', color: '#4a2c11' }}>
            New User? <Link to="/register" style={{ color: '#5a6524', fontWeight: 700, textDecoration: 'none' }}>Create an Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
