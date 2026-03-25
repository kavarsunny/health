import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { fetchProducts } from '../store/slices/productSlice';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/common/Loader';
import AlertMessage from '../components/common/AlertMessage';

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ limit: '8' }));
  }, [dispatch]);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section text-center text-white rounded-4 mb-5 p-5" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '350px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <h1 className="display-4 fw-bold mb-3" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
          Welcome to <span style={{ color: '#ffd700' }}>ShopVerse</span>
        </h1>
        <p className="lead mb-4 opacity-90">
          Discover premium products at unbeatable prices. Shop the latest trends today.
        </p>
        <div>
          <Button as={Link as any} to="/products" variant="light" size="lg" className="fw-semibold px-5 rounded-pill shadow">
            Shop Now <i className="bi bi-arrow-right ms-2" />
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">
            <i className="bi bi-fire text-danger me-2" />Featured Products
          </h2>
          <Link to="/products" className="btn btn-outline-primary btn-sm rounded-pill px-3">
            View All <i className="bi bi-arrow-right ms-1" />
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <AlertMessage variant="danger">{error}</AlertMessage>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {products.map((product) => (
              <Col key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </section>

      {/* Features */}
      <section className="mt-5 pt-4">
        <Row className="g-4">
          {[
            { icon: 'bi-truck', title: 'Free Shipping', desc: 'On orders over $500' },
            { icon: 'bi-shield-check', title: 'Secure Payment', desc: '100% protected transactions' },
            { icon: 'bi-arrow-repeat', title: 'Easy Returns', desc: '30-day return policy' },
            { icon: 'bi-headset', title: '24/7 Support', desc: 'Dedicated customer service' },
          ].map((f, i) => (
            <Col key={i} md={3} sm={6}>
              <div className="text-center p-4 rounded-3 h-100" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                <i className={`bi ${f.icon} fs-1 text-primary mb-3 d-block`} />
                <h6 className="fw-bold">{f.title}</h6>
                <p className="text-muted small mb-0">{f.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
};

export default HomePage;
