import { Link } from 'react-router-dom';

const quickCats = [
  { image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=150&q=80', label: 'New Launches', to: '/products?sort=new' },
  { image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80', label: 'Bestsellers', to: '/products?sort=popular' },
  { image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=150&q=80', label: 'Vegetables', to: '/products?category=vegetables' },
  { image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=150&q=80', label: 'Fruits', to: '/products?category=fruits' },
  { image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&w=150&q=80', label: 'Grains', to: '/products?category=grains' },
  { image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=150&q=80', label: 'Dairy', to: '/products?category=dairy' },
  { image: 'https://images.unsplash.com/photo-1515940175183-6798529cb860?auto=format&fit=crop&w=150&q=80', label: 'Herbs', to: '/products?category=herbs' },
  { image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=150&q=80', label: 'Oils', to: '/products?category=oils' },
  { image: 'https://images.unsplash.com/photo-1599580665584-7221e5494191?auto=format&fit=crop&w=150&q=80', label: 'Dry Fruits', to: '/products?category=nuts' },
  { image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=150&q=80', label: 'Organic', to: '/products?organic=true' },
  { image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=150&q=80', label: 'Superfoods', to: '/products?category=superfoods' },
  { image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=150&q=80', label: 'Shop By Concern', to: '/products?concern=true' },
];

const QuickCategories = () => (
  <div className="ms-quick-cats">
    <div className="container">
      <div className="ms-quick-cats-grid">
        {quickCats.map((cat) => (
          <Link key={cat.to} to={cat.to} className="ms-quick-cat-item" style={{ textDecoration: 'none' }}>
            <div className="ms-quick-cat-icon" style={{ overflow: 'hidden', padding: 0, border: '2px solid var(--ms-border)' }}>
              <img src={cat.image} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </div>
            <div className="ms-quick-cat-label">{cat.label}</div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default QuickCategories;
