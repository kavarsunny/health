import { Link } from 'react-router-dom';

const categories = [
  { image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=400&q=80', name: 'Vegetables', count: '120+ items', to: '/products?category=vegetables' },
  { image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80', name: 'Fruits', count: '80+ items', to: '/products?category=fruits' },
  { image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80', name: 'Grains & Cereals', count: '60+ items', to: '/products?category=grains' },
  { image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80', name: 'Dairy & Eggs', count: '45+ items', to: '/products?category=dairy' },
  { image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80', name: 'Herbs & Spices', count: '90+ items', to: '/products?category=herbs' },
  { image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80', name: 'Cold Pressed Oils', count: '30+ items', to: '/products?category=oils' },
  { image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=400&q=80', name: 'Dry Fruits & Nuts', count: '50+ items', to: '/products?category=nuts' },
  { image: 'https://images.unsplash.com/photo-1587049352851-8d4e89134fc2?auto=format&fit=crop&w=400&q=80', name: 'Honey & Sweeteners', count: '25+ items', to: '/products?category=honey' },
  { image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80', name: 'Superfoods', count: '35+ items', to: '/products?category=superfoods' },
];

const CategoryGrid = () => (
  <section className="ms-section ms-section-alt">
    <div className="container">
      <div className="ms-section-header">
        <div className="ms-section-eyebrow">Browse</div>
        <h2 className="ms-section-title">Shop by Category</h2>
        <p className="ms-section-sub">
          Explore our wide range of certified organic products, sourced directly from trusted Indian farmers.
        </p>
      </div>
      
      {/* CSS for hover effect on the new photo cards */}
      <style>{`
        .ms-photo-card {
          border-radius: var(--ms-radius-md);
          overflow: hidden;
          background: var(--ms-bg-card);
          border: 1px solid var(--ms-border);
          box-shadow: var(--ms-shadow-sm);
          transition: var(--ms-transition);
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .ms-photo-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--ms-shadow-md);
          border-color: var(--ms-border-dark);
        }
        .ms-photo-img-wrap {
          height: 160px;
          width: 100%;
          overflow: hidden;
        }
        .ms-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .ms-photo-card:hover .ms-photo-img {
          transform: scale(1.08);
        }
      `}</style>

      <div className="row g-4">
        {categories.map((cat) => (
          <div key={cat.name} className="col-6 col-md-4 col-lg-4">
            <Link to={cat.to} style={{ textDecoration: 'none' }}>
              <div className="ms-photo-card">
                <div className="ms-photo-img-wrap">
                  <img src={cat.image} alt={cat.name} className="ms-photo-img" loading="lazy" />
                </div>
                <div style={{ padding: '1.4rem', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ color: 'var(--ms-text)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '4px' }}>{cat.name}</div>
                  <div style={{ color: 'var(--ms-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{cat.count}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-5">
        <Link to="/products" className="ms-btn-outline">
          View All Categories <i className="bi bi-arrow-right" />
        </Link>
      </div>
    </div>
  </section>
);

export default CategoryGrid;
