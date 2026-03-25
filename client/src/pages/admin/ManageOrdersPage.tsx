import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Badge, Form } from 'react-bootstrap';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAllOrders, changeOrderStatus } from '../../store/slices/orderSlice';
import Loader from '../../components/common/Loader';
import AlertMessage from '../../components/common/AlertMessage';

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const statusColor: Record<string, string> = {
  pending: 'warning', processing: 'info', shipped: 'primary', delivered: 'success', cancelled: 'danger',
};

const ManageOrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allOrders, loading, error } = useSelector((state: RootState) => state.order);

  useEffect(() => { dispatch(fetchAllOrders()); }, [dispatch]);

  const handleStatusChange = (id: string, status: string) => {
    dispatch(changeOrderStatus({ id, status }));
  };

  if (loading) return <Loader />;
  if (error) return <AlertMessage variant="danger">{error}</AlertMessage>;

  return (
    <>
      <h2 className="fw-bold mb-4"><i className="bi bi-clipboard-data me-2" />Manage Orders</h2>
      {allOrders.length === 0 ? (
        <AlertMessage variant="info">No orders found.</AlertMessage>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr><th>ID</th><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Paid</th><th>Update</th></tr>
          </thead>
          <tbody>
            {allOrders.map((o) => (
              <tr key={o._id}>
                <td className="small">{o._id.slice(-8)}</td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td>{o.user}</td>
                <td>{o.items.length}</td>
                <td className="fw-semibold">${o.totalPrice.toFixed(2)}</td>
                <td><Badge bg={statusColor[o.status] || 'secondary'} className="text-uppercase">{o.status}</Badge></td>
                <td>{o.isPaid ? <i className="bi bi-check-circle-fill text-success" /> : <i className="bi bi-x-circle text-danger" />}</td>
                <td>
                  <Form.Select size="sm" value={o.status} onChange={(e) => handleStatusChange(o._id, e.target.value)} style={{ minWidth: 130 }}>
                    {statuses.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ManageOrdersPage;
