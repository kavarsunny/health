import { downloadPDF } from '../../utils/pdfExport';
import { useOutletContext } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../api/auth.api';
import { IUser } from '../../types';

const ManageCustomersPage = () => {
  const { toggleSidebar } = useOutletContext<any>() || {};
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        if (res.success) {
          // Filter to show only regular customers (you could adjust this to show all users)
          setUsers(res.data.filter((u: IUser) => u.role === 'customer'));
        }
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filtered = users.filter((u) => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.phone?.includes(search)
  );
  const handleExport = () => {
    const head = [['Name', 'Email', 'Phone', 'Role']];
    const body = filtered.map(u => [
      u.name,
      u.email || 'N/A',
      u.phone || 'N/A',
      u.role.toUpperCase()
    ]);
    downloadPDF('Customers_Report', head, body);
  };

  return (
    <>
      <div className="ms-admin-topbar">
        <div className="ms-admin-topbar-left">
          <button className="btn btn-light d-none d-lg-flex align-items-center justify-content-center me-3" onClick={toggleSidebar} style={{ width: 38, height: 38, borderRadius: 10, border: '1px solid #e2e8f0' }}>
            <i className="bi bi-list fs-5"></i>
          </button>
          <div>
            <h4>Manage Customers</h4>
            <div className="ms-admin-breadcrumb">
              <a href="/">Store</a>
              <i className="bi bi-chevron-right" style={{ fontSize: '0.65rem' }} />
              <span style={{ color: '#4f46e5', fontWeight: 600 }}>Customers</span>
            </div>
          </div>
        </div>
        <div className="ms-admin-topbar-right">
          <button className="ms-admin-icon-btn" title="Export PDF" onClick={handleExport}><i className="bi bi-download" /></button>
        </div>
      </div>

      <div className="ms-admin-main">
        {/* KPI Row */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="ms-kpi-card" style={{ '--kpi-color': '#4f46e5' } as any}>
              <div className="ms-kpi-top">
                <div className="ms-kpi-icon" style={{ '--kpi-color': '#4f46e5' } as any}>
                  <i className="bi bi-people-fill" style={{ color: '#4f46e5', fontSize: '1.2rem' }} />
                </div>
              </div>
              <div className="ms-kpi-value">{users.length}</div>
              <div className="ms-kpi-label">Total Customers</div>
            </div>
          </div>
        </div>

        <div className="ms-chart-card">
          <div className="ms-chart-header">
            <div>
              <div className="ms-chart-title">Customer Directory</div>
              <div className="ms-chart-sub">List of all registered customers</div>
            </div>
            <div className="ms-search-wrap" style={{ maxWidth: 280 }}>
              <i className="bi bi-search" />
              <input
                className="ms-search-bar"
                placeholder="Search customers…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            {loading ? (
              <div className="ms-loader"><div className="ms-spinner" /></div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                <i className="bi bi-people" style={{ fontSize: '2.5rem', display: 'block', marginBottom: 12 }} />
                No customers found.
              </div>
            ) : (
              <table className="ms-data-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Contact Info</th>
                    <th>Address</th>
                    <th>Joined Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span className="ms-tbl-avatar bg-primary text-white">{u.name.charAt(0)}</span>
                          <div className="ms-td-name">{u.name}</div>
                        </div>
                      </td>
                      <td>
                        <div className="ms-td-muted" style={{ fontSize: '0.85rem', color: '#334155' }}>
                          <div><i className="bi bi-envelope me-2" />{u.email || '—'}</div>
                          <div className="mt-1"><i className="bi bi-telephone me-2" />{u.phone || '—'}</div>
                        </div>
                      </td>
                      <td className="ms-td-muted" style={{ maxWidth: '200px' }}>{u.address || 'Not provided'}</td>
                      <td className="ms-td-muted">{new Date(u.createdAt).toLocaleDateString()}</td>
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

export default ManageCustomersPage;
