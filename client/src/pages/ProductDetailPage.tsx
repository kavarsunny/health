import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, Badge, Button, Form } from 'react-bootstrap';
import { AppDispatch, RootState } from '../store/store';
import { fetchProductById, clearProduct } from '../store/slices/productSlice';
import { addItemToCart } from '../store/slices/cartSlice';
import Rating from '../components/common/Rating';
import Loader from '../components/common/Loader';
import AlertMessage from '../components/common/AlertMessage';
import { useAuth } from '../hooks/useAuth';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state: RootState) => state.product);
  const { isAuthenticated } = useAuth();
  const [qty, setQty] = useState(1);
  const [addedMsg, setAddedMsg] = useState('');

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
    return () => { dispatch(clearProduct()); };
  }, [dispatch, id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    if (product) {
      await dispatch(addItemToCart({ productId: product._id, quantity: qty }));
      setAddedMsg('Added to cart!');
      setTimeout(() => setAddedMsg(''), 2000);
    }
  };

  if (loading) return <Loader />;
  if (error) return <AlertMessage variant="danger">{error}</AlertMessage>;
  if (!product) return <AlertMessage variant="info">Product not found</AlertMessage>;

  return (
    <>
      <Button variant="outline-secondary" size="sm" className="mb-3 rounded-pill" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left me-1" /> Back
      </Button>
      <Row className="g-4">
        <Col md={5}>
          <Image src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg'} alt={product.name} fluid rounded className="shadow" />
        </Col>
        <Col md={7}>
          <Badge bg="secondary" className="mb-2 text-uppercase">{product.category}</Badge>
          <h2 className="fw-bold">{product.name}</h2>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          <h3 className="text-primary fw-bold my-3">${product.price.toFixed(2)}</h3>
          <p className="text-muted">{product.description}</p>

          <div className="d-flex align-items-center gap-3 mb-3">
            <span className="fw-semibold">Brand:</span>
            <span>{product.brand}</span>
          </div>
          <div className="d-flex align-items-center gap-3 mb-3">
            <span className="fw-semibold">Status:</span>
            {product.stock > 0 ? (
              <Badge bg="success">In Stock ({product.stock})</Badge>
            ) : (
              <Badge bg="danger">Out of Stock</Badge>
            )}
          </div>

          {product.stock > 0 && (
            <div className="d-flex align-items-center gap-3 mt-4">
              <Form.Select value={qty} onChange={(e) => setQty(Number(e.target.value))} style={{ width: '80px' }}>
                {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </Form.Select>
              <Button variant="primary" size="lg" className="rounded-pill px-4" onClick={handleAddToCart}>
                <i className="bi bi-cart-plus me-2" />Add to Cart
              </Button>
            </div>
          )}

          {addedMsg && <AlertMessage variant="success">{addedMsg}</AlertMessage>}
        </Col>
      </Row>
    </>
  );
};

export default ProductDetailPage;
