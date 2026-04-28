import { Link } from 'react-router-dom';

const quickCats = [
  { img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=120&q=75', label: 'Cereals', to: '/products?category=Cereals+%26+Grains' },
  { img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=120&q=75', label: 'Pulses', to: '/products?category=Pulses+%26+Lentils' },
  { img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=120&q=75', label: 'Flours', to: '/products?category=Flours+(Atta)' },
  { img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=120&q=75', label: 'Oils & Ghee', to: '/products?category=Oils+%26+Ghee' },
  { img: 'https://images.unsplash.com/photo-1587049352851-8d4e89134fc2?auto=format&fit=crop&w=120&q=75', label: 'Honey', to: '/products?category=Natural+Sweeteners' },
  { img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=120&q=75', label: 'Spices', to: '/products?category=Spices' },
  { img: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=120&q=75', label: 'Dry Fruits', to: '/products?category=Dry+Fruits+%26+Nuts' },
  { img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=120&q=75', label: 'Seeds', to: '/products?category=Seeds' },
  { img: 'https://images.unsplash.com/photo-1621193793262-4127d9855c91?auto=format&fit=crop&w=120&q=75', label: 'Snacks', to: '/products?category=Healthy+Snacks' },
  { img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=120&q=75', label: 'Beverages', to: '/products?category=Beverages' },
  { img: 'https://images.unsplash.com/photo-1615485296573-0b9e4f4f9b01?auto=format&fit=crop&w=120&q=75', label: 'Ayurvedic', to: '/products?category=Ayurvedic+%26+Herbal+Products' },
  { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=120&q=75', label: 'Cow Wellness', to: '/products?category=Cow-Based+Wellness+Products' },
  { img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&q=75', label: 'Eco-Friendly', to: '/products?category=Eco-Friendly+Products' },
];

const QuickCategories = () => (
  <section className="qc2-section">
    <div className="container">
      <div className="qc2-header">
        <span className="qc2-title">Quick Browse</span>
        <Link to="/products" className="hh-stores-viewall">View All <i className="bi bi-arrow-right" /></Link>
      </div>
      <div className="qc2-scroll">
        {quickCats.map((cat) => (
          <Link key={cat.to} to={cat.to} className="qc2-item">
            <div className="qc2-circle">
              <img src={cat.img} alt={cat.label} loading="lazy" />
            </div>
            <span className="qc2-label">{cat.label}</span>
          </Link>
        ))}
      </div>
    </div>

    <style>{`
      .qc2-section {
        background: #fff;
        padding: 22px 0;
        border-bottom: 1px solid #f1f5f9;
      }
      .qc2-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
      }
      .qc2-title {
        font-size: 0.95rem;
        font-weight: 800;
        color: #111827;
        font-family: var(--font-display);
      }
      .qc2-scroll {
        display: flex;
        gap: 14px;
        overflow-x: auto;
        padding-bottom: 8px;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .qc2-scroll::-webkit-scrollbar { display: none; }
      .qc2-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        min-width: 72px;
        text-decoration: none;
        transition: transform 0.25s;
        cursor: pointer;
      }
      .qc2-item:hover { transform: translateY(-5px); }
      .qc2-item:hover .qc2-label { color: #2D6A4F; font-weight: 700; }
      .qc2-circle {
        width: 68px;
        height: 68px;
        border-radius: 50%;
        overflow: hidden;
        border: 2.5px solid #f3f4f6;
        position: relative;
        box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        transition: border-color 0.25s, box-shadow 0.25s;
        background: #f9fafb;
      }
      .qc2-item:hover .qc2-circle {
        border-color: #f59e0b;
        box-shadow: 0 6px 18px rgba(245,158,11,0.2);
      }
      .qc2-circle img {
        width: 100%; height: 100%;
        object-fit: cover;
        opacity: 0.85;
      }
      .qc2-label {
        font-size: 0.72rem;
        font-weight: 600;
        color: #374151;
        text-align: center;
        line-height: 1.2;
        transition: color 0.2s;
        max-width: 70px;
      }
    `}</style>
  </section>
);

export default QuickCategories;
