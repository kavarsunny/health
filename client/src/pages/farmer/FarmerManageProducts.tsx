import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { resetCart } from '../../store/slices/cartSlice';
import { createProduct, updateProduct, deleteProduct, getProducts } from '../../api/product.api';
import { useAuth } from '../../hooks/useAuth';

/* ─── Sidebar (reused) ─── */
const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => { dispatch(logout()); dispatch(resetCart()); navigate('/'); };
  const navItems = [
    { icon: '📊', label: 'Dashboard',   to: '/farmer/dashboard' },
    { icon: '📦', label: 'My Products', to: '/farmer/products' },
    { icon: '🛒', label: 'Orders',      to: '/farmer/orders' },
    { icon: '💰', label: 'Earnings',    to: '/farmer/earnings' },
    { icon: '📈', label: 'Analytics',   to: '/farmer/analytics' },
    { icon: '⚙️', label: 'Settings',    to: '/farmer/settings' },
  ];
  return (
    <aside className="hh-admin-sidebar">
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--hh-border)', marginBottom: '1rem' }}>
        <div style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: '1.4rem', fontWeight: 800, background: 'var(--hh-grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>🌾 Farmer Portal</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--hh-text-muted)', marginTop: '0.2rem' }}>HealthyHaat</div>
      </div>
      {navItems.map(item => (
        <Link key={item.to} to={item.to} className={`hh-sidebar-item ${location.pathname === item.to ? 'active' : ''}`}>
          <span>{item.icon}</span><span>{item.label}</span>
        </Link>
      ))}
      <div style={{ borderTop: '1px solid var(--hh-border)', marginTop: '1rem', paddingTop: '0.5rem' }}>
        <Link to="/" className="hh-sidebar-item"><span>🏠</span><span>Back to Store</span></Link>
        <button onClick={handleLogout} className="hh-sidebar-item" style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}><span>🚪</span><span>Logout</span></button>
      </div>
    </aside>
  );
};

/* ─── Empty form ─── */
const emptyForm = {
  name: '', description: '', price: '', category: '', brand: '', stock: '', unit: 'kg',
  image1: '', image2: '', image3: '', image4: ''
};

type FormData = typeof emptyForm;

/* ─── Categories ─── */
const CATEGORIES = [
  'Cereals & Grains',
  'Pulses & Lentils',
  'Flours (Atta)',
  'Oils & Ghee',
  'Natural Sweeteners',
  'Spices',
  'Dry Fruits & Nuts',
  'Seeds',
  'Healthy Snacks',
  'Beverages',
  'Ayurvedic & Herbal Products',
  'Cow-Based Wellness Products',
  'Eco-Friendly Products',
];

/* ─── Main Page ─── */
const FarmerManageProducts = () => {
  const { user } = useAuth();
  const [products, setProducts]   = useState<any[]>([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId]       = useState<string | null>(null);
  const [form, setForm]           = useState<FormData>(emptyForm);
  const [saving, setSaving]       = useState(false);
  const [msg, setMsg]             = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const farmerName = (user as any)?.name || '';

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts({ limit: '200' });
      setProducts((res.data as any)?.products || []);
    } catch { setProducts([]); }
    setLoading(false);
  };

  useEffect(() => { loadProducts(); }, []);

  const showMsg = (text: string, type: 'success' | 'error' = 'success') => {
    setMsg({ text, type });
    setTimeout(() => setMsg(null), 3000);
  };

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (p: any) => {
    setEditId(p._id);
    setForm({
      name: p.name || '', description: p.description || '',
      price: String(p.price || ''), 
      image1: p.images?.[0] || '', image2: p.images?.[1] || '', image3: p.images?.[2] || '', image4: p.images?.[3] || '', 
      category: p.category || '', brand: p.brand || '', 
      stock: String(p.stock || ''), unit: p.unit || 'kg',
    });
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const imagesArray = [form.image1, form.image2, form.image3, form.image4].filter(img => img.trim() !== '');
      if (imagesArray.length === 0) {
        showMsg('Please provide at least one image', 'error');
        setSaving(false);
        return;
      }

      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        images: imagesArray,
        category: form.category,
        brand: form.brand,
        stock: Number(form.stock),
        unit: form.unit,
        farmerId: user?._id
      };
      if (editId) {
        await updateProduct(editId, payload);
        showMsg('✅ Product updated successfully!');
      } else {
        await createProduct(payload);
        showMsg('✅ Product added successfully!');
      }
      setShowModal(false);
      loadProducts();
    } catch (err: any) {
      showMsg(err?.response?.data?.message || 'Failed to save product', 'error');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      showMsg('Product deleted');
      loadProducts();
    } catch { showMsg('Failed to delete product', 'error'); }
    setConfirmDelete(null);
  };

  /* ─── Render ─── */
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="hh-admin-content">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '0.2rem' }}>
              📦 My Products
            </h1>
            <p style={{ color: 'var(--hh-text-muted)', fontSize: '0.88rem', margin: 0 }}>Manage your farm produce listings</p>
          </div>
          <button className="hh-btn-primary" onClick={openCreate} style={{ cursor: 'pointer' }}>
            + Add New Product
          </button>
        </div>

        {/* Alert */}
        {msg && (
          <div style={{
            padding: '0.9rem 1.3rem', borderRadius: 'var(--hh-radius-md)', marginBottom: '1.5rem',
            background: msg.type === 'success' ? 'rgba(0,200,83,0.12)' : 'rgba(255,82,82,0.12)',
            border: `1px solid ${msg.type === 'success' ? 'rgba(0,200,83,0.35)' : 'rgba(255,82,82,0.35)'}`,
            color: msg.type === 'success' ? 'var(--hh-primary)' : '#ff5252',
            fontWeight: 600, fontSize: '0.9rem',
          }}>
            {msg.text}
          </div>
        )}

        {/* Products Table */}
        {loading ? (
          <div className="hh-loader"><div className="hh-spinner" /></div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--hh-text-muted)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
            <h3 style={{ color: '#fff', fontFamily: 'Rajdhani,sans-serif' }}>No products yet</h3>
            <p>Click "Add New Product" to get started.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="hh-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>MRP</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div style={{
                          width: 42, height: 42, borderRadius: 8, overflow: 'hidden',
                          background: 'rgba(0,200,83,0.1)', border: '1px solid var(--hh-border)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          {p.images && p.images.length > 0 ? (
                            <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e: any) => { e.target.style.display='none'; }} />
                          ) : <span style={{ fontSize: '1.2rem' }}>🌿</span>}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.88rem' }}>{p.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--hh-text-muted)' }}>{p.brand || 'No brand'}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="hh-badge-success">{p.category}</span></td>
                    <td style={{ fontWeight: 700, color: 'var(--hh-primary)' }}>₹{p.price} / {p.unit || 'kg'}</td>
                    <td style={{ color: 'var(--hh-text-muted)', textDecoration: 'line-through', fontSize: '0.83rem' }}>—</td>
                    <td>
                      <span className={p.stock > 0 ? 'hh-badge-success' : 'hh-badge-danger'}>
                        {p.stock > 0 ? `${p.stock} units` : 'Out of Stock'}
                      </span>
                    </td>
                    <td><span className={p.status === 'Approved' ? 'hh-badge-success' : p.status === 'Rejected' ? 'hh-badge-danger' : 'hh-badge-warning'}>{p.status || 'Pending'}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => openEdit(p)}
                          style={{ background: 'rgba(0,200,83,0.1)', border: '1px solid var(--hh-border)', borderRadius: 6, color: 'var(--hh-primary)', padding: '4px 12px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}
                        >✏️ Edit</button>
                        <button
                          onClick={() => setConfirmDelete(p._id)}
                          style={{ background: 'rgba(255,82,82,0.1)', border: '1px solid rgba(255,82,82,0.3)', borderRadius: 6, color: '#ff5252', padding: '4px 12px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}
                        >🗑️ Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ─── Add/Edit Modal ─── */}
        {showModal && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2000, padding: '1rem',
          }}>
            <div style={{
              background: 'var(--hh-bg-card)', border: '1px solid var(--hh-border)',
              borderRadius: 'var(--hh-radius-xl)', width: '100%', maxWidth: 640,
              maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
            }}>
              {/* Modal Header */}
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--hh-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: 'Rajdhani,sans-serif', fontWeight: 800, color: '#fff', margin: 0, fontSize: '1.5rem' }}>
                  {editId ? '✏️ Edit Product' : '+ New Product'}
                </h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--hh-text-muted)', fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} style={{ overflowY: 'auto', flex: 1 }}>
                <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                  {/* Row 1 — Name & Category */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Product Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Organic Tomatoes" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Category *</label>
                      <select name="category" value={form.category} onChange={handleChange} required style={inputStyle}>
                        <option value="">Select category...</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Row 2 — Price, Stock, Unit */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Price (₹) *</label>
                      <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required placeholder="0.00" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Unit</label>
                      <input name="unit" value={form.unit} onChange={handleChange} placeholder="e.g. kg, liter, piece" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Stock (units) *</label>
                      <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required placeholder="0" style={inputStyle} />
                    </div>
                  </div>

                  {/* Brand */}
                  <div>
                    <label style={labelStyle}>Brand / Variety</label>
                    <input name="brand" value={form.brand} onChange={handleChange} placeholder="e.g. Desi, Hybrid, Organic" style={inputStyle} />
                  </div>

                  {/* Product Images */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Image 1 URL * (Primary)</label>
                      <input name="image1" value={form.image1} onChange={handleChange} required placeholder="https://..." style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Image 2 URL</label>
                      <input name="image2" value={form.image2} onChange={handleChange} placeholder="https://..." style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Image 3 URL</label>
                      <input name="image3" value={form.image3} onChange={handleChange} placeholder="https://..." style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Image 4 URL</label>
                      <input name="image4" value={form.image4} onChange={handleChange} placeholder="https://..." style={inputStyle} />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label style={labelStyle}>Description *</label>
                    <textarea name="description" value={form.description} onChange={handleChange} required rows={3} placeholder="Describe your product — freshness, farming method, usage..." style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }} />
                  </div>
                </div>

                {/* Modal Footer */}
                <div style={{ padding: '1rem 2rem', borderTop: '1px solid var(--hh-border)', display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setShowModal(false)} className="hh-btn-outline" style={{ cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" className="hh-btn-primary" style={{ cursor: 'pointer', minWidth: 120, justifyContent: 'center' }} disabled={saving}>
                    {saving ? '⏳ Saving...' : editId ? '✅ Update Product' : '✅ Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ─── Delete Confirm Dialog ─── */}
        {confirmDelete && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2100 }}>
            <div style={{ background: 'var(--hh-bg-card)', border: '1px solid rgba(255,82,82,0.35)', borderRadius: 'var(--hh-radius-lg)', padding: '2rem', maxWidth: 400, width: '100%', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.8rem' }}>🗑️</div>
              <h4 style={{ color: '#fff', fontFamily: 'Rajdhani,sans-serif', marginBottom: '0.5rem' }}>Delete Product?</h4>
              <p style={{ color: 'var(--hh-text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>This action cannot be undone.</p>
              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
                <button onClick={() => setConfirmDelete(null)} className="hh-btn-outline" style={{ cursor: 'pointer' }}>Cancel</button>
                <button onClick={() => handleDelete(confirmDelete)} style={{ background: 'rgba(255,82,82,0.8)', border: 'none', borderRadius: 'var(--hh-radius-sm)', color: '#fff', fontWeight: 700, padding: '0.6rem 1.5rem', cursor: 'pointer' }}>Yes, Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Shared input style ─── */
const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--hh-border)',
  borderRadius: 'var(--hh-radius-sm)',
  color: 'var(--hh-text)',
  fontSize: '0.88rem',
  padding: '0.65rem 1rem',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: 700,
  color: 'var(--hh-text-muted)',
  letterSpacing: '0.5px',
  marginBottom: '0.4rem',
  textTransform: 'uppercase',
};

export default FarmerManageProducts;
