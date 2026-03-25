import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { fetchProducts } from '../store/slices/productSlice';

import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import FarmerStories from '../components/home/FarmerStories';
import SeasonalBanner from '../components/home/SeasonalBanner';
import TrustBadges from '../components/home/TrustBadges';
import TestimonialsNewsletter from '../components/home/TestimonialsNewsletter';

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ limit: '8' }));
  }, [dispatch]);

  return (
    <>
      <HeroSection />

      {/* Featured Products */}
      <section className="hh-section">
        <div className="container">
          <div className="hh-section-header">
            <div className="hh-eyebrow">Handpicked for You</div>
            <h2 className="hh-section-title">Featured Products</h2>
            <p className="hh-section-sub">
              Top-rated farm-fresh produce, selected by our quality team every week.
            </p>
          </div>

          {loading ? (
            <div className="hh-loader"><div className="hh-spinner" /></div>
          ) : (
            <div className="row g-4">
              {products.slice(0, 8).map((product) => (
                <div key={product._id} className="col-6 col-md-4 col-lg-3">
                  <div className="hh-product-card">
                    <div className="hh-product-img-wrap">
                      <div style={{
                        width: '100%', height: '100%',
                        background: 'linear-gradient(145deg, #0d2e14, #0a1a0e)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '3.5rem', minHeight: 160,
                      }}>
                        🌿
                      </div>
                      <span className="hh-product-badge">Fresh</span>
                    </div>
                    <div className="hh-product-body">
                      <div className="hh-product-name">{product.name}</div>
                      <div className="hh-product-farmer">🌾 {(product as any).farmerName || 'Local Farm'}</div>
                      <div className="hh-product-price">
                        ₹{product.price}
                        {(product as any).mrp && <span className="old-price">₹{(product as any).mrp}</span>}
                      </div>
                    </div>
                    <div className="hh-product-footer">
                      <button className="hh-add-cart-btn">Add to Cart</button>
                      <button className="hh-wishlist-btn"><i className="bi bi-heart" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-4">
            <Link to="/products" className="hh-btn-primary" style={{ display: 'inline-flex' }}>
              View All Products <i className="bi bi-arrow-right ms-2" />
            </Link>
          </div>
        </div>
      </section>

      <CategoryGrid />
      <SeasonalBanner />
      <FarmerStories />
      <TrustBadges />
      <TestimonialsNewsletter />
    </>
  );
};

export default HomePage;
