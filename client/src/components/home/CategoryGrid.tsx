import { Link } from 'react-router-dom';

const categories = [
  {
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80',
    name: 'Cereals & Grains',
    count: '10 products',
    to: '/products?category=Cereals+%26+Grains',
  },
  {
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80',
    name: 'Pulses & Lentils',
    count: '9 products',
    to: '/products?category=Pulses+%26+Lentils',
  },
  {
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
    name: 'Flours (Atta)',
    count: '5 products',
    to: '/products?category=Flours+(Atta)',
  },
  {
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80',
    name: 'Oils & Ghee',
    count: '5 products',
    to: '/products?category=Oils+%26+Ghee',
  },
  {
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89134fc2?auto=format&fit=crop&w=400&q=80',
    name: 'Natural Sweeteners',
    count: '5 products',
    to: '/products?category=Natural+Sweeteners',
  },
  {
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80',
    name: 'Spices',
    count: '6 products',
    to: '/products?category=Spices',
  },
  {
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=400&q=80',
    name: 'Dry Fruits & Nuts',
    count: '5 products',
    to: '/products?category=Dry+Fruits+%26+Nuts',
  },
  {
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
    name: 'Seeds',
    count: '5 products',
    to: '/products?category=Seeds',
  },
  {
    image: 'https://images.unsplash.com/photo-1621193793262-4127d9855c91?auto=format&fit=crop&w=400&q=80',
    name: 'Healthy Snacks',
    count: '5 products',
    to: '/products?category=Healthy+Snacks',
  },
  {
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80',
    name: 'Beverages',
    count: '5 products',
    to: '/products?category=Beverages',
  },
  {
    image: 'https://images.unsplash.com/photo-1615485296573-0b9e4f4f9b01?auto=format&fit=crop&w=400&q=80',
    name: 'Ayurvedic & Herbal',
    count: '8 products',
    to: '/products?category=Ayurvedic+%26+Herbal+Products',
  },
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
    name: 'Cow-Based Wellness',
    count: '5 products',
    to: '/products?category=Cow-Based+Wellness+Products',
  },
  {
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
    name: 'Eco-Friendly Products',
    count: '5 products',
    to: '/products?category=Eco-Friendly+Products',
  },
];

const CategoryGrid = () => (
  <section className="ms-section ms-section-alt">
    <div className="container">
      <div className="ms-section-header">
        <div className="ms-section-eyebrow">Browse</div>
        <h2 className="ms-section-title">Shop by Category</h2>
        <p className="ms-section-sub">
          Explore our wide range of natural, organic & eco-friendly products sourced directly from trusted Indian farmers.
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

      <div className="row g-4 justify-content-center">
        {categories.map((cat) => (
          <div key={cat.name} className="col-6 col-md-4 col-xl-2">
            <Link to={cat.to} style={{ textDecoration: 'none' }}>
              <div className="ms-qc-item" style={{ minWidth: 'unset' }}>
                <div className="ms-qc-circle shadow-sm" style={{ width: '120px', height: '120px' }}>
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <div className="ms-qc-label text-center mt-2 fw-bold" style={{ fontSize: '0.9rem' }}>{cat.name}</div>
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
