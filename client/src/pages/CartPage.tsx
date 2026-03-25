import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { fetchCart, addItemToCart, removeItemFromCart } from '../store/slices/cartSlice';
import Loader from '../components/common/Loader';
import AlertMessage from '../components/common/AlertMessage';

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cart, loading } = useSelector((state: RootState) => state.cart);

  useEffect(() => { dispatch(fetchCart()); }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <>
      <h2 className="fw-bold mb-4"><i className="bi bi-cart3 me-2" />Shopping Cart</h2>
      {!cart || cart.items.length === 0 ? (
        <AlertMessage variant="info">
          Your cart is empty. <Link to="/products">Continue Shopping</Link>
        </AlertMessage>
      ) : (
        <Row className="g-4">
          <Col lg={8}>
            <ListGroup variant="flush">
              {cart.items.map((item) => (
                <ListGroup.Item key={typeof item.product === 'string' ? item.product : item.product._id} className="py-3">
                  <Row className="align-items-center">
                    <Col xs={2}>
                      <Image src={typeof item.product === 'string' ? '/placeholder.jpg' : item.product.image} alt="product" fluid rounded />
                    </Col>
                    <Col xs={3}>
                      <span className="fw-semibold">
                        {typeof item.product === 'string' ? 'Product' : item.product.name}
                      </span>
                    </Col>
                    <Col xs={2}><strong>${item.price.toFixed(2)}</strong></Col>
                    <Col xs={3}>
                      <Form.Select
                        size="sm"
                        value={item.quantity}
                        onChange={(e) => dispatch(addItemToCart({
                          productId: typeof item.product === 'string' ? item.product : item.product._id,
                          quantity: Number(e.target.value),
                        }))}
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col xs={2}>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => dispatch(removeItemFromCart(typeof item.product === 'string' ? item.product : item.product._id))}
                      >
                        <i className="bi bi-trash" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col lg={4}>
            <div className="p-4 rounded-3 shadow-sm" style={{ background: '#f8f9fa' }}>
              <h5 className="fw-bold mb-3">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Items ({cart.items.reduce((s, i) => s + i.quantity, 0)})</span>
                <strong>${cart.totalPrice.toFixed(2)}</strong>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Total</span>
                <span className="fw-bold fs-5 text-primary">${cart.totalPrice.toFixed(2)}</span>
              </div>
              <Button variant="primary" className="w-100 rounded-pill" size="lg" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CartPage;
