import { downloadPDF } from '../../utils/pdfExport';
import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchAllOrders, changeOrderStatus } from '../../store/slices/orderSlice';

const statuses = ['pending', 'confirmed', 'packed', 'out_for_delivery', 'delivered', 'cancelled'];

const statusPill = (s: string) => {
  const map: Record<string, string> = {
    pending: 'ms-pill ms-pill-yellow',
    confirmed: 'ms-pill ms-pill-blue',
    packed: 'ms-pill ms-pill-blue',
    out_for_delivery: 'ms-pill ms-pill-blue',
    delivered: 'ms-pill ms-pill-green',
    cancelled: 'ms-pill ms-pill-red',
  };
  return map[s] || 'ms-pill ms-pill-gray';
};

const ManageOrdersPage = () => {
  const { toggleSidebar } = useOutletContext<any>() || {};
  const dispatch = useDispatch<AppDispatch>();
  const { allOrders, loading, error } = useSelector((state: RootState) => state.order);

  useEffect(() => { dispatch(fetchAllOrders()); }, [dispatch]);

  const handleStatusChange = (id: string, status: string) => {
    dispatch(changeOrderStatus({ id, status }));
  };
  const handleExport = () => {
    const head = [['ID', 'Customer Name', 'Status', 'Total (Rs)', 'Date']];
    const body = allOrders.map(o => [
      o._id.substring(0, 8),
      o.user?.name || 'Unknown',
      o.status.toUpperCase(),
      o.totalPrice.toFixed(0),
      new Date(o.createdAt).toLocaleDateString()
    ]);
    downloadPDF('Orders_Report', head, body);
  };

  return (
    <>
      <div className="ms-admin-topbar">
        <div className="ms-admin-topbar-left">
          <button className="btn btn-light d-none d-lg-flex align-items-center justify-content-center me-3" onClick={toggleSidebar} style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid #e2e8f0' }}>
            <i className="bi bi-list fs-5"></i>
          </button>
          <div>
            <h4>Manage Orders</h4>
            <div className="ms-admin-breadcrumb">
              <a href="/">Store</a>
              <i className="bi bi-chevron-right" style={{ fontSize: '0.65rem' }} />
              <span style={{ color: '#4f46e5', fontWeight: 600 }}>Orders</span>
            </div>
          </div>
        </div>
        <div className="ms-admin-topbar-right">
          <button className="ms-admin-icon-btn" title="Export PDF" onClick={handleExport}>
            <i className="bi bi-download" />
          </button>
          <button className="ms-admin-icon-btn" title="Refresh" onClick={() => dispatch(fetchAllOrders())}>
            <i className="bi bi-arrow-clockwise" />
          </button>
        </div>
      </div>

      <div className="ms-admin-main">
        {loading && (
          <div className="ms-loader"><div className="ms-spinner" /></div>
        )}
        {error && (
          <div className="ms-alert ms-alert-danger">{error}</div>
        )}

        {/* Stats Row */}
        <div className="row g-3 mb-4">
          {[
            { label: 'Total Orders', val: allOrders.length, color: '#4f46e5', icon: 'bi-cart-check-fill' },
            { label: 'Pending', val: allOrders.filter(o => o.status === 'pending').length, color: '#f59e0b', icon: 'bi-clock-fill' },
            { label: 'Confirmed', val: allOrders.filter(o => o.status === 'confirmed').length, color: '#0ea5e9', icon: 'bi-check-circle' },
            { label: 'Packed', val: allOrders.filter(o => o.status === 'packed').length, color: '#0ea5e9', icon: 'bi-box-seam' },
            { label: 'Out for Delivery', val: allOrders.filter(o => o.status === 'out_for_delivery').length, color: '#0ea5e9', icon: 'bi-truck' },
            { label: 'Delivered', val: allOrders.filter(o => o.status === 'delivered').length, color: '#22c55e', icon: 'bi-check-circle-fill' },
          ].map((s) => (
            <div key={s.label} className="col-6 col-xl-3">
              <div className="ms-kpi-card" style={{ '--kpi-color': s.color } as any}>
                <div className="ms-kpi-top">
                  <div className="ms-kpi-icon" style={{ '--kpi-color': s.color } as any}>
                    <i className={`bi ${s.icon}`} style={{ color: s.color, fontSize: '1.2rem' }} />
                  </div>
                </div>
                <div className="ms-kpi-value">{s.val}</div>
                <div className="ms-kpi-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="ms-chart-card">
          <div className="ms-chart-header">
            <div>
              <div className="ms-chart-title">All Orders</div>
              <div className="ms-chart-sub">{allOrders.length} total orders</div>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            {allOrders.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                <i className="bi bi-inbox" style={{ fontSize: '2.5rem', display: 'block', marginBottom: 12 }} />
                No orders found.
              </div>
            ) : (
              <table className="ms-data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Paid</th>
                    <th>Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map((o) => (
                    <tr key={o._id}>
                      <td className="ms-td-name">#{o._id.slice(-8).toUpperCase()}</td>
                      <td className="ms-td-muted">{new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span className="ms-tbl-avatar">{String(o.user).charAt(0).toUpperCase()}</span>
                          <span style={{ fontSize: '0.85rem', color: '#334155' }}>{o.user}</span>
                        </div>
                      </td>
                      <td className="ms-td-muted">{o.items.length}</td>
                      <td style={{ fontWeight: 700, color: '#4f46e5' }}>₹{o.totalPrice.toFixed(0)}</td>
                      <td><span className={statusPill(o.status)}>{o.status}</span></td>
                      <td>
                        {o.isPaid
                          ? <span className="ms-pill ms-pill-green"><i className="bi bi-check" />Paid</span>
                          : <span className="ms-pill ms-pill-red"><i className="bi bi-x" />Unpaid</span>}
                      </td>
                      <td>
                        <select
                          className="ms-admin-form-control ms-admin-form-select"
                          style={{ width: 140, padding: '5px 32px 5px 10px', fontSize: '0.82rem' }}
                          value={o.status}
                          onChange={(e) => handleStatusChange(o._id, e.target.value)}
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageOrdersPage;
