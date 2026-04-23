const fs = require('fs');

let content = fs.readFileSync('f:/health/client/src/pages/admin/DashboardPage.tsx', 'utf8');

const replacement = `                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="ms-chart-card">
            <div className="ms-chart-header">
              <div>
                <div className="ms-chart-title">Recent Orders</div>
                <div className="ms-chart-sub">Latest {recentOrders.length} orders from your store</div>
              </div>
              <Link to="/admin/orders" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#4f46e5' }}>
                View All <i className="bi bi-arrow-right" />
              </Link>
            </div>
            <div style={{ overflowX: 'auto' }}>
              {recentOrders.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                  <i className="bi bi-inbox" style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }} />
                  No orders yet. Share your store to get started!
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
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((o) => (
                      <tr key={o._id}>
                        <td className="ms-td-name">#{o._id.slice(-8).toUpperCase()}</td>
                        <td className="ms-td-muted">{new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="ms-tbl-avatar">{String(o.user?.name || o.user || '?').charAt(0).toUpperCase()}</span>
                            <span style={{ fontSize: '0.85rem' }}>{o.user?.name || o.user || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="ms-td-muted">{o.items.length} items</td>
                        <td className="ms-td-name">₹{o.totalPrice.toFixed(0)}</td>
                        <td><span className={statusPill(o.status)}>{o.status}</span></td>
                        <td>
                          <Link to="/admin/orders" className="ms-tbl-btn ms-tbl-btn-view">
                            <i className="bi bi-eye" /> View
                          </Link>
                        </td>`;

content = content.replace(/[\s]*<\/Link>\s*\}\)\s*<\/div>\s*\}\)\}\s*<\/div>\s*<\/td>[\s\S]*?<td className="ms-td-name">₹\{o\.totalPrice\.toFixed\(0\)\}<\/td>[\s\S]*?<\/td>/, replacement);

fs.writeFileSync('f:/health/client/src/pages/admin/DashboardPage.tsx', content);

// WAIT, my previous replace removed EVERYTHING!
// Let me write a direct regex using literal string replacement for the exact lines in the current file.
