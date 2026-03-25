import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Pagination } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { fetchProducts } from '../store/slices/productSlice';
import ProductCard from '../components/product/ProductCard';
import Loader from '../components/common/Loader';
import AlertMessage from '../components/common/AlertMessage';

const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error, page, totalPages } = useSelector((state: RootState) => state.product);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');

  useEffect(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((val, key) => { params[key] = val; });
    dispatch(fetchProducts(params));
  }, [dispatch, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      setSearchParams({ keyword: keyword.trim(), page: '1' });
    } else {
      setSearchParams({ page: '1' });
    }
  };

  const handlePageChange = (p: number) => {
    const params: Record<string, string> = {};
    searchParams.forEach((val, key) => { params[key] = val; });
    params.page = p.toString();
    setSearchParams(params);
  };

  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-3 mb-md-0"><i className="bi bi-grid me-2" />All Products</h2>
        <Form onSubmit={handleSearch} className="d-flex" style={{ maxWidth: '350px', width: '100%' }}>
          <Form.Control
            type="text"
            placeholder="Search products…"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="rounded-pill rounded-end-0"
          />
          <button type="submit" className="btn btn-primary rounded-pill rounded-start-0 px-3">
            <i className="bi bi-search" />
          </button>
        </Form>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant="danger">{error}</AlertMessage>
      ) : products.length === 0 ? (
        <AlertMessage variant="info">No products found.</AlertMessage>
      ) : (
        <>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {products.map((p) => (
              <Col key={p._id}>
                <ProductCard product={p} />
              </Col>
            ))}
          </Row>
          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-4">
              <Pagination.Prev disabled={page <= 1} onClick={() => handlePageChange(page - 1)} />
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item key={i + 1} active={i + 1 === page} onClick={() => handlePageChange(i + 1)}>
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next disabled={page >= totalPages} onClick={() => handlePageChange(page + 1)} />
            </Pagination>
          )}
        </>
      )}
    </>
  );
};

export default ProductsPage;
