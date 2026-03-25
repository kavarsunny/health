import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProducts } from '../../store/slices/productSlice';
import { fetchAllOrders } from '../../store/slices/orderSlice';

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { total } = useSelector((state: RootState) => state.product);
  const { allOrders } = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(fetchProducts({ limit: '1' }));
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const totalRevenue = allOrders.reduce((sum, o) => sum + o.totalPrice, 0);

  const cards = [
    { icon: 'bi-box-seam', title: 'Products', value: total, bg: '#667eea', link: '/admin/products' },
    { icon: 'bi-cart-check', title: 'Orders', value: allOrders.length, bg: '#764ba2', link: '/admin/orders' },
    { icon: 'bi-currency-dollar', title: 'Revenue', value: `$${totalRevenue.toFixed(2)}`, bg: '#f093fb', link: '/admin/orders' },
    { icon: 'bi-people', title: 'Pending', value: allOrders.filter(o => o.status === 'pending').length, bg: '#4facfe', link: '/admin/orders' },
  ];

  return (
    <>
      <h2 className="fw-bold mb-4"><i className="bi bi-speedometer2 me-2" />Admin Dashboard</h2>
      <Row className="g-4">
        {cards.map((c, i) => (
          <Col key={i} md={3} sm={6}>
            <Card as={Link} to={c.link} className="border-0 text-decoration-none text-white shadow" style={{ background: c.bg }}>
              <Card.Body className="d-flex align-items-center gap-3 p-4">
                <i className={`bi ${c.icon} fs-1`} />
                <div>
                  <div className="small opacity-75">{c.title}</div>
                  <div className="fs-4 fw-bold">{c.value}</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default DashboardPage;
