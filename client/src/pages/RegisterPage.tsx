import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store/store';
import { register, clearError } from '../store/slices/authSlice';
import { useAuth } from '../hooks/useAuth';
import AlertMessage from '../components/common/AlertMessage';

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
    <Row className="justify-content-center mt-5">
      <Col md={5}>
        <Card className="border-0 shadow">
          <Card.Body className="p-4">
            <h3 className="text-center fw-bold mb-4"><i className="bi bi-person-plus me-2" />Register</h3>
            {(error || localError) && <AlertMessage variant="danger">{error || localError}</AlertMessage>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter your name" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="Min 6 characters" />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirm your password" />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100 rounded-pill mb-3" size="lg" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </Form>
            <p className="text-center text-muted mb-0">
              Already have an account? <Link to="/login" className="fw-semibold">Login</Link>
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterPage;
