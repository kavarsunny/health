import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { fetchProducts } from '../store/slices/productSlice';
import ProductCard from '../components/product/ProductCard';

const CATEGORIES = ['vegetables', 'fruits', 'grains', 'dairy', 'herbs', 'oils', 'nuts', 'honey', 'superfoods'];

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
    if (keyword.trim()) setSearchParams({ keyword: keyword.trim(), page: '1' });
    else setSearchParams({ page: '1' });
  };

  const setCategory = (cat: string) => {
    if (searchParams.get('category') === cat) setSearchParams({ page: '1' });
    else setSearchParams({ category: cat, page: '1' });
  };

  const handlePage = (p: number) => {
    const params: Record<string, string> = {};
    searchParams.forEach((val, key) => { params[key] = val; });
    params.page = p.toString();
    setSearchParams(params);
  };

  const activeCategory = searchParams.get('category') || '';

  return (
    <>
      {/* Page Banner */}
      <div className="ms-page-banner">
        <div className="container">
          <h1 className="ms-page-banner-title">All Products</h1>
          <div className="ms-page-banner-breadcrumb">
            <a href="/">Home</a> / Products
            {activeCategory && <> / <span style={{ textTransform: 'capitalize' }}>{activeCategory}</span></>}
          </div>
        </div>
      </div>

      <div className="ms-section">
        <div className="container">
          <div className="row g-4">
            {/* Sidebar */}
            <div className="col-lg-3 col-md-4 d-none d-md-block">
              <div className="ms-filter-sidebar">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--ms-heading)' }}>
                    <i className="bi bi-funnel" /> Filters
                  </span>
                  {activeCategory && (
                    <button className="ms-filter-clear" onClick={() => setSearchParams({ page: '1' })}>
                      Clear
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div className="ms-filter-heading">Category</div>
                {CATEGORIES.map((cat) => (
                  <label key={cat} className="ms-filter-check">
                    <input
                      type="radio"
                      name="category"
                      checked={activeCategory === cat}
                      onChange={() => setCategory(cat)}
                    />
                    <span style={{ textTransform: 'capitalize' }}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Products */}
            <div className="col-lg-9 col-md-8">
              {/* Search + Sort Bar */}
              <div style={{ display: 'flex', gap: 10, marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: 0, flex: 1, minWidth: 200, maxWidth: 360 }}>
                  <div className="ms-search-wrap" style={{ width: '100%' }}>
                    <i className="bi bi-search" />
                    <input
                      className="ms-search-bar"
                      style={{ width: '100%' }}
                      placeholder="Search products…"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>
                </form>
                <div style={{ fontSize: '0.85rem', color: 'var(--ms-text-muted)' }}>
                  {products.length} products found
                </div>
              </div>

              {loading ? (
                <div className="ms-loader"><div className="ms-spinner" /></div>
              ) : error ? (
                <div className="ms-alert ms-alert-danger">{error}</div>
              ) : products.length === 0 ? (
                <div className="ms-alert ms-alert-info">No products found. Try a different search or category.</div>
              ) : (
                <>
                  <div className="row g-3">
                    {products.map((p) => (
                      <div key={p._id} className="col-6 col-xl-4">
                        <ProductCard product={p} />
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="ms-pagination mt-4">
                      <button className="ms-page-btn" disabled={page <= 1} onClick={() => handlePage(page - 1)}>
                        <i className="bi bi-chevron-left" />
                      </button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          className={`ms-page-btn ${i + 1 === page ? 'active' : ''}`}
                          onClick={() => handlePage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button className="ms-page-btn" disabled={page >= totalPages} onClick={() => handlePage(page + 1)}>
                        <i className="bi bi-chevron-right" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
