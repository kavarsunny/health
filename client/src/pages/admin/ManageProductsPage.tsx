import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProducts } from '../../store/slices/productSlice';
import { createProduct, updateProduct, deleteProduct } from '../../api/product.api';
import { IProduct } from '../../types';

const emptyForm = { name: '', description: '', price: 0, image: '', category: '', brand: '', stock: 0 };
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

const ManageProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.product);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => { dispatch(fetchProducts({ limit: '100' })); }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'price' || name === 'stock' ? Number(value) : value });
  };

  const openCreate = () => { setEditId(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (p: IProduct) => {
    setEditId(p._id);
    setForm({ name: p.name, description: p.description, price: p.price, image: p.image, category: p.category, brand: p.brand, stock: p.stock });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) { await updateProduct(editId, form); setMsg('Product updated successfully!'); }
      else { await createProduct(form); setMsg('Product created successfully!'); }
      setShowModal(false);
      dispatch(fetchProducts({ limit: '100' }));
    } catch { setMsg('Error saving product. Please try again.'); }
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;
    await deleteProduct(id);
    dispatch(fetchProducts({ limit: '100' }));
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="ms-admin-topbar">
        <div className="ms-admin-topbar-left">
          <div>
            <h4>Manage Products</h4>
            <div className="ms-admin-breadcrumb">
              <a href="/">Store</a>
              <i className="bi bi-chevron-right" style={{ fontSize: '0.65rem' }} />
              <span style={{ color: '#336939', fontWeight: 600 }}>Products</span>
            </div>
          </div>
        </div>
        <div className="ms-admin-topbar-right">
          <button className="ms-btn-primary" onClick={openCreate} style={{ padding: '8px 18px', fontSize: '0.85rem', cursor: 'pointer' }}>
            <i className="bi bi-plus-lg" /> Add Product
          </button>
        </div>
      </div>

      <div className="ms-admin-main">
        {msg && (
          <div className={`ms-alert ${msg.includes('Error') ? 'ms-alert-danger' : 'ms-alert-success'}`} style={{ marginBottom: 16 }}>
            <i className={`bi ${msg.includes('Error') ? 'bi-exclamation-triangle' : 'bi-check-circle'}`} /> {msg}
          </div>
        )}

        {/* Stats */}
        <div className="row g-3 mb-4">
          {[
            { label: 'Total Products', val: products.length, icon: 'bi-box-seam-fill', color: '#336939' },
            { label: 'In Stock', val: products.filter(p => p.stock > 0).length, icon: 'bi-check-circle-fill', color: '#22c55e' },
            { label: 'Low Stock', val: products.filter(p => p.stock > 0 && p.stock < 10).length, icon: 'bi-exclamation-triangle-fill', color: '#f59e0b' },
            { label: 'Out of Stock', val: products.filter(p => p.stock === 0).length, icon: 'bi-x-circle-fill', color: '#ef4444' },
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

        {/* Table Card */}
        <div className="ms-chart-card">
          <div className="ms-chart-header">
            <div>
              <div className="ms-chart-title">Product Catalog</div>
              <div className="ms-chart-sub">{filtered.length} products</div>
            </div>
            <div className="ms-search-wrap" style={{ maxWidth: 280 }}>
              <i className="bi bi-search" />
              <input
                className="ms-search-bar"
                placeholder="Search products…"
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
                <i className="bi bi-box-seam" style={{ fontSize: '2.5rem', display: 'block', marginBottom: 12 }} />
                No products found.
              </div>
            ) : (
              <table className="ms-data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          {p.image ? (
                            <img src={p.image} alt={p.name} style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', border: '1px solid #e2e8f0' }} />
                          ) : (
                            <div style={{ width: 44, height: 44, borderRadius: 10, background: '#f0faf0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <i className="bi bi-box-seam" style={{ color: '#336939' }} />
                            </div>
                          )}
                          <div>
                            <div className="ms-td-name">{p.name}</div>
                            <div className="ms-td-muted" style={{ fontSize: '0.72rem' }}>{p.brand || '—'}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="ms-pill ms-pill-green" style={{ textTransform: 'capitalize' }}>{p.category}</span>
                      </td>
                      <td style={{ fontWeight: 700, color: '#336939' }}>₹{p.price.toFixed(0)}</td>
                      <td>
                        <span style={{ fontWeight: 700, color: p.stock === 0 ? '#ef4444' : p.stock < 10 ? '#f59e0b' : '#334155' }}>
                          {p.stock}
                        </span>
                      </td>
                      <td>
                        {p.stock === 0 ? (
                          <span className="ms-pill ms-pill-red">Out of Stock</span>
                        ) : p.stock < 10 ? (
                          <span className="ms-pill ms-pill-yellow">Low Stock</span>
                        ) : (
                          <span className="ms-pill ms-pill-green">In Stock</span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="ms-tbl-btn ms-tbl-btn-edit" onClick={() => openEdit(p)}>
                            <i className="bi bi-pencil" /> Edit
                          </button>
                          <button className="ms-tbl-btn ms-tbl-btn-del" onClick={() => handleDelete(p._id)}>
                            <i className="bi bi-trash" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Slide-over Modal */}
      {showModal && (
        <div className="ms-admin-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="ms-admin-modal">
            <div className="ms-admin-modal-header">
              <div className="ms-admin-modal-title">
                <i className={`bi bi-${editId ? 'pencil-fill' : 'plus-circle-fill'}`} style={{ color: '#336939', marginRight: 8 }} />
                {editId ? 'Edit Product' : 'Add New Product'}
              </div>
              <button className="ms-admin-modal-close" onClick={() => setShowModal(false)}>
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <div className="ms-admin-form-group">
                    <label className="ms-admin-form-label">Product Name *</label>
                    <input className="ms-admin-form-control" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Organic Tomatoes" required />
                  </div>
                </div>
                <div className="col-12">
                  <div className="ms-admin-form-group">
                    <label className="ms-admin-form-label">Description *</label>
                    <textarea className="ms-admin-form-control" name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Describe the product…" required />
                  </div>
                </div>
                <div className="col-6">
                  <div className="ms-admin-form-group">
                    <label className="ms-admin-form-label">Price (₹) *</label>
                    <input className="ms-admin-form-control" type="number" step="0.01" name="price" value={form.price} onChange={handleChange} placeholder="0.00" required />
                  </div>
                </div>
                <div className="col-6">
                  <div className="ms-admin-form-group">
                    <label className="ms-admin-form-label">Stock *</label>
                    <input className="ms-admin-form-control" type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="0" required />
                  </div>
                </div>
                <div className="col-6">
                  <div className="ms-admin-form-group">
                    <label className="ms-admin-form-label">Category *</label>
                    <select className="ms-admin-form-control ms-admin-form-select" name="category" value={form.category} onChange={handleChange} required>
                      <option value="">Select category</option>
                      {CATEGORIES.map((c) => <option key={c} value={c} style={{ textTransform: 'capitalize' }}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="ms-admin-form-group">
                    <label className="ms-admin-form-label">Brand / Farm Name</label>
                    <input className="ms-admin-form-control" name="brand" value={form.brand} onChange={handleChange} placeholder="e.g. Patil Farm" />
                  </div>
                </div>
                <div className="col-12">
                  <div className="ms-admin-form-group">
                    <label className="ms-admin-form-label">Image URL</label>
                    <input className="ms-admin-form-control" name="image" value={form.image} onChange={handleChange} placeholder="https://…" />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', border: '1px solid #e2e8f0', borderRadius: 10, background: '#f8fafc', color: '#64748b', cursor: 'pointer', fontWeight: 600 }}>
                  Cancel
                </button>
                <button type="submit" className="ms-btn-primary" style={{ flex: 2, padding: '10px', cursor: 'pointer', fontSize: '0.92rem' }}>
                  <i className={`bi bi-${editId ? 'check-lg' : 'plus-lg'}`} /> {editId ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageProductsPage;
