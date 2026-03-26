import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store/store';
import { register, clearError } from '../store/slices/authSlice';
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

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (isAuthenticated) navigate('/');
    return () => { dispatch(clearError()); };
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    setLocalError('');
    dispatch(register({ name, email, password }));
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2600&auto=format&fit=crop")',
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
      position: 'relative', padding: '2rem 0'
    }}>
      {/* Dark overlay for contrast */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))' }} />

      <div style={{
        position: 'relative', zIndex: 10, width: '100%', maxWidth: 500,
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
            CREATE YOUR ACCOUNT
          </div>
          <p style={{ color: '#826142', fontSize: '0.9rem', marginTop: 4, marginBottom: 0 }}>Join our farming community</p>
        </div>

        {/* Inner Card */}
        <div style={{
          background: '#f6eed8', /* Inner sandy background */
          borderRadius: 16, padding: '2rem 1.5rem',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)'
        }}>
          {(error || localError) && <AlertMessage variant="danger">{error || localError}</AlertMessage>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3 position-relative">
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                placeholder="Full Name" 
                style={{ 
                  width: '100%', padding: '10px 14px', borderRadius: 8, 
                  border: '1px solid #d1cab3', background: '#fdfbf3', 
                  color: '#4a2c11', fontSize: '0.9rem' 
                }} 
              />
            </div>
            
            <div className="mb-3 position-relative">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="Email Address" 
                style={{ 
                  width: '100%', padding: '10px 14px', borderRadius: 8, 
                  border: '1px solid #d1cab3', background: '#fdfbf3', 
                  color: '#4a2c11', fontSize: '0.9rem' 
                }} 
              />
            </div>

            <div className="row g-2 mb-4">
              <div className="col-sm-6">
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  minLength={6}
                  placeholder="Password" 
                  style={{ 
                    width: '100%', padding: '10px 14px', borderRadius: 8, 
                    border: '1px solid #d1cab3', background: '#fdfbf3', 
                    color: '#4a2c11', fontSize: '0.9rem' 
                  }} 
                />
              </div>
              <div className="col-sm-6">
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                  placeholder="Confirm Password" 
                  style={{ 
                    width: '100%', padding: '10px 14px', borderRadius: 8, 
                    border: '1px solid #d1cab3', background: '#fdfbf3', 
                    color: '#4a2c11', fontSize: '0.9rem' 
                  }} 
                />
              </div>
            </div>

            <div className="mb-3" style={{ fontSize: '0.8rem', color: '#4a2c11', display: 'flex', alignItems: 'center', gap: 6 }}>
              <input type="checkbox" id="terms" required style={{ accentColor: '#d49a37' }} />
              <label htmlFor="terms">I agree to Terms & Conditions</label>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              style={{ 
                width: '100%', padding: '12px', borderRadius: 8, 
                background: '#d49a37', /* Mustard Gold */
                color: '#fff', fontSize: '1rem', fontWeight: 600, 
                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(212, 154, 55, 0.3)'
              }}
            >
              {loading ? 'Registering...' : 'Register Now'}
            </button>
          </form>

          <div className="text-center mt-3" style={{ fontSize: '0.9rem', color: '#4a2c11' }}>
            Already have an account? <Link to="/login" style={{ color: '#d49a37', fontWeight: 700, textDecoration: 'none' }}>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
