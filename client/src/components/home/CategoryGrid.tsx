import { Link } from 'react-router-dom';

const categories = [
  { name: 'Cereals & Grains',    color: '#fef3c7', accent: '#d97706', to: '/products?category=Cereals+%26+Grains',              img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=300&q=75' },
  { name: 'Pulses & Lentils',    color: '#dcfce7', accent: '#16a34a', to: '/products?category=Pulses+%26+Lentils',              img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=75' },
  { name: 'Oils & Ghee',          color: '#ffedd5', accent: '#ea580c', to: '/products?category=Oils+%26+Ghee',                   img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=75' },
  { name: 'Honey & Sweeteners',  color: '#fef3c7', accent: '#d97706', to: '/products?category=Natural+Sweeteners',              img: 'https://images.unsplash.com/photo-1587049352851-8d4e89134fc2?auto=format&fit=crop&w=300&q=75' },
  { name: 'Spices',               color: '#fee2e2', accent: '#dc2626', to: '/products?category=Spices',                          img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=75' },
  { name: 'Dry Fruits & Nuts',   color: '#fef3c7', accent: '#b45309', to: '/products?category=Dry+Fruits+%26+Nuts',             img: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=300&q=75' },
  { name: 'Seeds',                color: '#d1fae5', accent: '#16a34a', to: '/products?category=Seeds',                           img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=300&q=75' },
  { name: 'Healthy Snacks',       color: '#ede9fe', accent: '#7c3aed', to: '/products?category=Healthy+Snacks',                  img: 'https://images.unsplash.com/photo-1621193793262-4127d9855c91?auto=format&fit=crop&w=300&q=75' },
  { name: 'Herbal Beverages',     color: '#dbeafe', accent: '#1d4ed8', to: '/products?category=Beverages',                       img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=300&q=75' },
  { name: 'Ayurvedic',            color: '#d1fae5', accent: '#15803d', to: '/products?category=Ayurvedic+%26+Herbal+Products',   img: 'https://images.unsplash.com/photo-1615485296573-0b9e4f4f9b01?auto=format&fit=crop&w=300&q=75' },
  { name: 'Cow Wellness',         color: '#fef9c3', accent: '#a16207', to: '/products?category=Cow-Based+Wellness+Products',     img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=300&q=75' },
  { name: 'Eco-Friendly',          color: '#d1fae5', accent: '#15803d', to: '/products?category=Eco-Friendly+Products',           img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=75' },
];

const CategoryGrid = () => (
  <section className="cg2-section">
    <div className="container">
      <div className="cg2-hdr">
        <div>
          <div className="hh-section-eyebrow">Browse</div>
          <h2 className="hh-section-title">Shop by Category</h2>
          <p className="hh-section-sub">Organic, natural & eco-friendly products sourced from trusted Indian farmers.</p>
        </div>
        <Link to="/products" className="hh-stores-viewall d-none d-md-flex">
          All Categories <i className="bi bi-arrow-right" />
        </Link>
      </div>

      <div className="cg2-grid">
        {categories.map((cat) => (
          <Link key={cat.name} to={cat.to} className="cg2-card">
            <div className="cg2-img-wrap" style={{ background: cat.color }}>
              <img src={cat.img} alt={cat.name} loading="lazy" />
              <div className="cg2-img-scrim" />
            </div>
            <div className="cg2-label" style={{ color: cat.accent }}>{cat.name}</div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-4 d-md-none">
        <Link to="/products" className="ms-btn-outline">All Categories <i className="bi bi-arrow-right" /></Link>
      </div>
    </div>

    <style>{`
      .cg2-section {
        background: #fff;
        padding: 56px 0;
        border-top: 1px solid #f1f5f9;
      }
      .cg2-hdr {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
        margin-bottom: 28px;
      }
      .cg2-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 12px;
      }
      .cg2-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        cursor: pointer;
        transition: transform 0.25s;
      }
      .cg2-card:hover { transform: translateY(-6px); }
      .cg2-img-wrap {
        position: relative;
        width: 100%;
        aspect-ratio: 1;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 3px 12px rgba(0,0,0,0.08);
        transition: box-shadow 0.25s;
      }
      .cg2-card:hover .cg2-img-wrap {
        box-shadow: 0 10px 28px rgba(0,0,0,0.14);
      }
      .cg2-img-wrap img {
        width: 100%; height: 100%;
        object-fit: cover;
        opacity: 0.75;
        transition: transform 0.45s, opacity 0.25s;
      }
      .cg2-card:hover .cg2-img-wrap img {
        transform: scale(1.08);
        opacity: 0.85;
      }
      .cg2-img-scrim {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.25) 100%);
      }
      .cg2-label {
        font-size: 0.75rem;
        font-weight: 700;
        text-align: center;
        line-height: 1.3;
        transition: color 0.2s;
      }
      @media (max-width: 991px) {
        .cg2-grid { grid-template-columns: repeat(4, 1fr); }
      }
      @media (max-width: 575px) {
        .cg2-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .cg2-section { padding: 40px 0; }
      }
    `}</style>
  </section>
);

export default CategoryGrid;
