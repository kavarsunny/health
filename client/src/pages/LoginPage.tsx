import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store/store';
import { login, clearError } from '../store/slices/authSlice';
import { useAuth } from '../hooks/useAuth';
import AlertMessage from '../components/common/AlertMessage';

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) navigate('/');
    return () => { dispatch(clearError()); };
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col md={5}>
        <Card className="border-0 shadow">
          <Card.Body className="p-4">
            <h3 className="text-center fw-bold mb-4"><i className="bi bi-box-arrow-in-right me-2" />Login</h3>
            {error && <AlertMessage variant="danger">{error}</AlertMessage>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100 rounded-pill mb-3" size="lg" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Form>
            <p className="text-center text-muted mb-0">
              Don't have an account? <Link to="/register" className="fw-semibold">Register</Link>
            </p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
