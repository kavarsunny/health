import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
  const categories = [
    { name: 'Cereals & Grains', icon: '🌾' },
    { name: 'Pulses & Lentils', icon: '🥣' },
    { name: 'Flours (Atta)', icon: '🥖' },
    { name: 'Oils & Ghee', icon: '🫙' },
    { name: 'Natural Sweeteners', icon: '🍯' },
    { name: 'Spices', icon: '🌶️' },
    { name: 'Dry Fruits & Nuts', icon: '🌰' },
    { name: 'Healthy Snacks', icon: '🍪' },
    { name: 'Beverages', icon: '☕' },
  ];

  return (
    <div className="container py-5" style={{ minHeight: '60vh' }}>
      <div className="text-center mb-5">
        <h1 className="fw-bold" style={{ color: 'var(--ms-primary)' }}>All Categories</h1>
        <p className="text-muted">Browse our wide selection of 100% natural and organic products.</p>
      </div>

      <div className="row g-4">
        {categories.map((cat, idx) => (
          <div className="col-md-4 col-lg-3" key={idx}>
            <Link to={`/products?category=${encodeURIComponent(cat.name)}`} className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm text-center p-4 ms-category-card-hover" style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}>
                <div className="display-4 mb-3">{cat.icon}</div>
                <h5 className="fw-bold text-dark mb-0">{cat.name}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
