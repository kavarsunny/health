import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { fetchProducts } from '../store/slices/productSlice';

import AnnouncementBar from '../components/layout/AnnouncementBar';
import MarqueeStrip from '../components/layout/MarqueeStrip';
import HeroSection from '../components/home/HeroSection';
import QuickCategories from '../components/home/QuickCategories';
import CategoryGrid from '../components/home/CategoryGrid';
import FarmerStories from '../components/home/FarmerStories';
import BlogSection from '../components/home/BlogSection';
import TrustBadges from '../components/home/TrustBadges';
import ProductCard from '../components/product/ProductCard';
import StoreGrid from '../components/home/StoreGrid';
import FlashDeals from '../components/home/FlashDeals';

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ limit: '8' }));
  }, [dispatch]);

  return (
    <>
      <HeroSection />
      <AnnouncementBar />
      <MarqueeStrip />
      <QuickCategories />
      <TrustBadges />
      <FlashDeals />

      {/* Featured Products */}
      <section className="ms-section">
        <div className="container">
          <div className="ms-section-header">
            <div className="ms-section-eyebrow">Handpicked for You</div>
            <h2 className="ms-section-title">Featured Products ✨</h2>
            <p className="ms-section-sub">
              Top-rated farm-fresh produce, selected by our quality team every week.
            </p>
          </div>

          {loading ? (
            <div className="ms-loader"><div className="ms-spinner" /></div>
          ) : (
            <div className="row g-4">
              {products.slice(0, 8).map((product) => (
                <div key={product._id} className="col-6 col-md-4 col-lg-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-4">
            <Link to="/products" className="ms-btn-outline">
              View All Products <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      <CategoryGrid />
      <StoreGrid />
      <FarmerStories />
      <BlogSection />
    </>
  );
};

export default HomePage;
