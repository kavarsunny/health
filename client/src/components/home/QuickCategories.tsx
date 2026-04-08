import { Link } from 'react-router-dom';

const quickCats = [
  {
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=150&q=80',
    label: 'Cereals & Grains',
    to: '/products?category=Cereals+%26+Grains',
  },
  {
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=150&q=80',
    label: 'Pulses & Lentils',
    to: '/products?category=Pulses+%26+Lentils',
  },
  {
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80',
    label: 'Flours (Atta)',
    to: '/products?category=Flours+(Atta)',
  },
  {
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=150&q=80',
    label: 'Oils & Ghee',
    to: '/products?category=Oils+%26+Ghee',
  },
  {
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89134fc2?auto=format&fit=crop&w=150&q=80',
    label: 'Sweeteners',
    to: '/products?category=Natural+Sweeteners',
  },
  {
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80',
    label: 'Spices',
    to: '/products?category=Spices',
  },
  {
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=150&q=80',
    label: 'Dry Fruits & Nuts',
    to: '/products?category=Dry+Fruits+%26+Nuts',
  },
  {
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=150&q=80',
    label: 'Seeds',
    to: '/products?category=Seeds',
  },
  {
    image: 'https://images.unsplash.com/photo-1621193793262-4127d9855c91?auto=format&fit=crop&w=150&q=80',
    label: 'Healthy Snacks',
    to: '/products?category=Healthy+Snacks',
  },
  {
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=150&q=80',
    label: 'Beverages',
    to: '/products?category=Beverages',
  },
  {
    image: 'https://images.unsplash.com/photo-1615485296573-0b9e4f4f9b01?auto=format&fit=crop&w=150&q=80',
    label: 'Ayurvedic & Herbal',
    to: '/products?category=Ayurvedic+%26+Herbal+Products',
  },
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=150&q=80',
    label: 'Cow Wellness',
    to: '/products?category=Cow-Based+Wellness+Products',
  },
  {
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80',
    label: 'Eco-Friendly',
    to: '/products?category=Eco-Friendly+Products',
  },
];

const QuickCategories = () => (
  <section className="ms-quick-cats-section py-4">
    <div className="container">
      <div className="ms-quick-cats-scroll">
        {quickCats.map((cat) => (
          <Link key={cat.to} to={cat.to} className="ms-qc-item">
            <div className="ms-qc-circle shadow-sm">
              <img src={cat.image} alt={cat.label} loading="lazy" />
            </div>
            <span className="ms-qc-label text-center">{cat.label}</span>
          </Link>
        ))}
      </div>
    </div>

    <style>{`
      .ms-quick-cats-scroll {
        display: flex;
        gap: 24px;
        overflow-x: auto;
        padding: 10px 5px 20px;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .ms-quick-cats-scroll::-webkit-scrollbar { display: none; }
      
      .ms-qc-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        min-width: 100px;
        text-decoration: none;
        transition: var(--ms-transition);
      }
      .ms-qc-item:hover { transform: translateY(-5px); }
      .ms-qc-item:hover .ms-qc-label { color: var(--ms-primary); font-weight: 700; }

      .ms-qc-circle {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #f1f5f9;
        overflow: hidden;
        border: 2px solid white;
        transition: var(--ms-transition);
        display: flex; align-items: center; justify-content: center;
      }
      .ms-qc-circle img {
        width: 100%; height: 100%; object-fit: cover;
      }
      .ms-qc-label {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--ms-text);
        max-width: 90px;
        line-height: 1.2;
      }
    `}</style>
  </section>
);

export default QuickCategories;
