import { useAuth } from '../hooks/useAuth';
import { Card, Row, Col, Badge } from 'react-bootstrap';

const ProfilePage = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <Row className="justify-content-center mt-4">
      <Col md={6}>
        <Card className="border-0 shadow">
          <Card.Body className="p-4 text-center">
            <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 80, height: 80, fontSize: '2rem' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h3 className="fw-bold">{user.name}</h3>
            <p className="text-muted">{user.email}</p>
            <Badge bg={user.role === 'admin' ? 'danger' : 'primary'} className="text-uppercase">{user.role}</Badge>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProfilePage;
