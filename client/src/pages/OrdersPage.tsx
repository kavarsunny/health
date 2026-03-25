import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Badge } from 'react-bootstrap';
import { AppDispatch, RootState } from '../store/store';
import { fetchMyOrders } from '../store/slices/orderSlice';
import Loader from '../components/common/Loader';
import AlertMessage from '../components/common/AlertMessage';

const statusColor: Record<string, string> = {
  pending: 'warning', processing: 'info', shipped: 'primary', delivered: 'success', cancelled: 'danger',
};

const OrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading, error } = useSelector((state: RootState) => state.order);

  useEffect(() => { dispatch(fetchMyOrders()); }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <AlertMessage variant="danger">{error}</AlertMessage>;

  return (
    <>
      <h2 className="fw-bold mb-4"><i className="bi bi-receipt me-2" />My Orders</h2>
      {orders.length === 0 ? (
        <AlertMessage variant="info">No orders yet.</AlertMessage>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr><th>Order ID</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th>Paid</th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td className="small">{o._id.slice(-8)}</td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td>{o.items.length}</td>
                <td className="fw-semibold">${o.totalPrice.toFixed(2)}</td>
                <td><Badge bg={statusColor[o.status] || 'secondary'} className="text-uppercase">{o.status}</Badge></td>
                <td>{o.isPaid ? <i className="bi bi-check-circle-fill text-success" /> : <i className="bi bi-x-circle text-danger" />}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrdersPage;
