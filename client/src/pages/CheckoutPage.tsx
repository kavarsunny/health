import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { placeOrder } from '../store/slices/orderSlice';
import AlertMessage from '../components/common/AlertMessage';
import Loader from '../components/common/Loader';

const CheckoutPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.cart);
  const { loading, error } = useSelector((state: RootState) => state.order);

  const [form, setForm] = useState({
    fullName: '', address: '', city: '', postalCode: '', country: '', paymentMethod: 'COD',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { paymentMethod, ...shippingAddress } = form;
    const result = await dispatch(placeOrder({ shippingAddress, paymentMethod }));
    if (placeOrder.fulfilled.match(result)) {
      navigate('/orders');
    }
  };

  if (!cart || cart.items.length === 0) {
    return <AlertMessage variant="warning">Your cart is empty. Add items before checkout.</AlertMessage>;
  }

  return (
    <>
      <h2 className="fw-bold mb-4"><i className="bi bi-credit-card me-2" />Checkout</h2>
      {error && <AlertMessage variant="danger">{error}</AlertMessage>}
      <Row className="g-4">
        <Col md={7}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="fw-bold mb-3">Shipping Address</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control name="fullName" value={form.fullName} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control name="address" value={form.address} onChange={handleChange} required />
                </Form.Group>
                <Row className="mb-3">
                  <Col><Form.Group><Form.Label>City</Form.Label><Form.Control name="city" value={form.city} onChange={handleChange} required /></Form.Group></Col>
                  <Col><Form.Group><Form.Label>Postal Code</Form.Label><Form.Control name="postalCode" value={form.postalCode} onChange={handleChange} required /></Form.Group></Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control name="country" value={form.country} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                    <option value="UPI">UPI</option>
                    <option value="COD">Cash on Delivery</option>
                  </Form.Select>
                </Form.Group>
                <button type="submit" className="btn btn-primary w-100 rounded-pill py-3" disabled={loading} style={{ background: '#2D6A4F', border: 'none' }}>
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Card className="border-0 shadow-sm" style={{ borderRadius: '16px' }}>
            <Card.Body>
              <h5 className="fw-bold mb-3">Order Summary</h5>
              {cart.items.map((item, i) => (
                <div key={i} className="d-flex justify-content-between mb-2">
                  <span className="small">{typeof item.product === 'string' ? 'Product' : item.product.name} x{item.quantity}</span>
                  <span className="small fw-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total Amount</span>
                <span style={{ color: '#2D6A4F' }}>₹{cart.totalPrice.toFixed(2)}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CheckoutPage;
