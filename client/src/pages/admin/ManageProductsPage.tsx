import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProducts } from '../../store/slices/productSlice';
import { createProduct, updateProduct, deleteProduct } from '../../api/product.api';
import Loader from '../../components/common/Loader';
import AlertMessage from '../../components/common/AlertMessage';
import { IProduct } from '../../types';

const emptyForm = { name: '', description: '', price: 0, image: '', category: '', brand: '', stock: 0 };

const ManageProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.product);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [msg, setMsg] = useState('');

  useEffect(() => { dispatch(fetchProducts({ limit: '100' })); }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      if (editId) { await updateProduct(editId, form); setMsg('Product updated'); }
      else { await createProduct(form); setMsg('Product created'); }
      setShowModal(false);
      dispatch(fetchProducts({ limit: '100' }));
    } catch { setMsg('Error saving product'); }
    setTimeout(() => setMsg(''), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product?')) return;
    await deleteProduct(id);
    dispatch(fetchProducts({ limit: '100' }));
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0"><i className="bi bi-boxes me-2" />Manage Products</h2>
        <Button variant="primary" className="rounded-pill" onClick={openCreate}><i className="bi bi-plus-lg me-1" />Add Product</Button>
      </div>
      {msg && <AlertMessage variant="success">{msg}</AlertMessage>}
      {error && <AlertMessage variant="danger">{error}</AlertMessage>}
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr><th>Image</th><th>Name</th><th>Price</th><th>Stock</th><th>Category</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td><img src={p.image} alt={p.name} style={{ width: 50, height: 50, objectFit: 'cover' }} className="rounded" /></td>
              <td>{p.name}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.stock}</td>
              <td>{p.category}</td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openEdit(p)}><i className="bi bi-pencil" /></Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p._id)}><i className="bi bi-trash" /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton><Modal.Title>{editId ? 'Edit' : 'Add'} Product</Modal.Title></Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control name="name" value={form.name} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Price</Form.Label><Form.Control type="number" step="0.01" name="price" value={form.price} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Image URL</Form.Label><Form.Control name="image" value={form.image} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Category</Form.Label><Form.Control name="category" value={form.category} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Brand</Form.Label><Form.Control name="brand" value={form.brand} onChange={handleChange} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Stock</Form.Label><Form.Control type="number" name="stock" value={form.stock} onChange={handleChange} required /></Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="primary">{editId ? 'Update' : 'Create'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ManageProductsPage;
