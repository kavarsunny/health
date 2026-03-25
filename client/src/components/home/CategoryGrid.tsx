import { Link } from 'react-router-dom';

const categories = [
  { icon: '🥦', name: 'Vegetables', count: '120+ items', path: '/products?category=vegetables' },
  { icon: '🍎', name: 'Fruits',     count: '80+ items',  path: '/products?category=fruits' },
  { icon: '🌾', name: 'Grains',     count: '60+ items',  path: '/products?category=grains' },
  { icon: '🫚', name: 'Oils',       count: '35+ items',  path: '/products?category=oils' },
  { icon: '🌿', name: 'Herbs',      count: '50+ items',  path: '/products?category=herbs' },
  { icon: '🥛', name: 'Dairy',      count: '40+ items',  path: '/products?category=dairy' },
  { icon: '🍯', name: 'Honey',      count: '25+ items',  path: '/products?category=honey' },
  { icon: '🫙', name: 'Pickles',    count: '45+ items',  path: '/products?category=pickles' },
];

const CategoryGrid = () => (
  <section className="hh-section hh-section-alt">
    <div className="container">
      <div className="hh-section-header">
        <div className="hh-eyebrow">Browse Categories</div>
        <h2 className="hh-section-title">Shop by Category</h2>
        <p className="hh-section-sub">
          Explore a rich variety of farm-fresh produce across carefully curated categories.
        </p>
      </div>

      <div className="row g-3">
        {categories.map((cat) => (
          <div key={cat.name} className="col-6 col-sm-4 col-md-3 col-xl-3">
            <Link to={cat.path} style={{ textDecoration: 'none' }}>
              <div className="hh-category-card" style={{ minHeight: 160 }}>
                <span className="hh-category-icon">{cat.icon}</span>
                <div className="hh-category-name">{cat.name}</div>
                <div className="hh-category-count">{cat.count}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CategoryGrid;
