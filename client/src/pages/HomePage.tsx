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
import SeasonalBanner from '../components/home/SeasonalBanner';

/* ─── How It Works Section ─── */
const HowItWorks = () => (
  <section className="hiw-section">
    <div className="container">
      <div className="text-center mb-5">
        <div className="hh-section-eyebrow">Simple & Transparent</div>
        <h2 className="hh-section-title">Farm to Your Door in 3 Steps</h2>
        <p className="hh-section-sub mx-auto" style={{ maxWidth: 480 }}>
          No warehouses, no middlemen. Direct from the farmer's hands to yours.
        </p>
      </div>

      <div className="hiw-steps">
        <div className="hiw-step">
          <div className="hiw-icon-wrap" style={{ background: '#d1fae5' }}>
            <i className="bi bi-patch-check" style={{ fontSize: '1.8rem', color: '#065f46' }} />
          </div>
          <div className="hiw-connector" />
          <div className="hiw-num">01</div>
          <h3 className="hiw-title">Farmers Harvest Fresh</h3>
          <p className="hiw-desc">Our certified farmers harvest produce at peak ripeness — no cold storage, no compromises.</p>
        </div>

        <div className="hiw-step">
          <div className="hiw-icon-wrap" style={{ background: '#fef3c7' }}>
            <i className="bi bi-box-seam" style={{ fontSize: '1.8rem', color: '#92400e' }} />
          </div>
          <div className="hiw-connector" />
          <div className="hiw-num">02</div>
          <h3 className="hiw-title">We Pack with Care</h3>
          <p className="hiw-desc">Same-day packing in eco-friendly, sustainable packaging to preserve freshness and nutrients.</p>
        </div>

        <div className="hiw-step">
          <div className="hiw-icon-wrap" style={{ background: '#dbeafe' }}>
            <i className="bi bi-truck" style={{ fontSize: '1.8rem', color: '#1e40af' }} />
          </div>
          <div className="hiw-num">03</div>
          <h3 className="hiw-title">Delivered to Your Door</h3>
          <p className="hiw-desc">Fast, reliable delivery within 24–48 hours so your food arrives fresh and full of life.</p>
        </div>
      </div>

      <div className="text-center mt-5">
        <Link to="/products" className="hiw-cta">
          Start Shopping Fresh <i className="bi bi-arrow-right" />
        </Link>
      </div>
    </div>

    <style>{`
      .hiw-section {
        background: #fff;
        padding: 64px 0;
        border-top: 1px solid #f1f5f9;
      }
      .hiw-steps {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 32px;
        position: relative;
      }
      .hiw-step {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        position: relative;
      }
      .hiw-icon-wrap {
        width: 80px;
        height: 80px;
        border-radius: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        transition: transform 0.25s;
      }
      .hiw-step:hover .hiw-icon-wrap { transform: translateY(-4px) scale(1.05); }
      .hiw-icon { font-size: 2.2rem; }
      .hiw-connector {
        position: absolute;
        top: 40px;
        right: -16px;
        width: 32px;
        height: 2px;
        background: repeating-linear-gradient(90deg, #d1d5db 0, #d1d5db 6px, transparent 6px, transparent 12px);
      }
      .hiw-step:last-child .hiw-connector { display: none; }
      .hiw-num {
        font-size: 0.65rem;
        font-weight: 800;
        color: #d1d5db;
        letter-spacing: 2px;
        margin-bottom: 6px;
        font-family: var(--font-display);
      }
      .hiw-title {
        font-size: 1.05rem;
        font-weight: 700;
        color: #111827;
        font-family: var(--font-display);
        margin-bottom: 8px;
        line-height: 1.3;
      }
      .hiw-desc {
        font-size: 0.88rem;
        color: #6b7280;
        line-height: 1.65;
        max-width: 220px;
        margin: 0 auto;
      }
      .hiw-cta {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #2D6A4F;
        color: #fff;
        font-weight: 700;
        font-size: 0.95rem;
        padding: 13px 32px;
        border-radius: 999px;
        text-decoration: none;
        transition: all 0.25s;
        box-shadow: 0 6px 20px rgba(45,106,79,0.3);
      }
      .hiw-cta:hover {
        background: #1E4D38;
        color: #fff;
        transform: translateY(-2px);
        box-shadow: 0 10px 28px rgba(45,106,79,0.4);
      }
      @media (max-width: 767px) {
        .hiw-steps { grid-template-columns: 1fr; gap: 28px; }
        .hiw-connector { display: none !important; }
        .hiw-desc { max-width: 320px; }
        .hiw-icon-wrap { width: 68px; height: 68px; border-radius: 18px; }
      }
    `}</style>
  </section>
);

/* ─── Testimonials Section ─── */
const testimonials = [
  {
    initials: 'PS', bg: '#d1fae5', color: '#065f46',
    name: 'Priya Sharma', loc: 'Mumbai, Maharashtra', rating: 5,
    text: 'HealthyHaat has completely changed how I shop. The vegetables taste so much fresher — my family can actually taste the difference!',
    purchase: 'Buys weekly vegetables',
  },
  {
    initials: 'RK', bg: '#dbeafe', color: '#1e40af',
    name: 'Rajesh Kumar', loc: 'Bangalore, Karnataka', rating: 5,
    text: 'I love knowing exactly where my food comes from. Delivery is always on time and the eco-friendly packaging is a huge bonus.',
    purchase: 'Loyal customer since 2024',
  },
  {
    initials: 'AP', bg: '#fef3c7', color: '#92400e',
    name: 'Anita Patel', loc: 'Ahmedabad, Gujarat', rating: 5,
    text: 'The Alphonso mangoes were absolutely divine — nothing like the ones in supermarkets. I\'ve already placed 3 orders this season!',
    purchase: 'Seasonal produce lover',
  },
  {
    initials: 'SV', bg: '#fee2e2', color: '#991b1b',
    name: 'Sanjay Verma', loc: 'Pune, Maharashtra', rating: 5,
    text: 'As a fitness enthusiast, finding pure cold-pressed oils and organic grains was a game changer. No more guessing about ingredients.',
    purchase: 'Health & fitness buyer',
  },
];

const TestimonialsSection = () => (
  <section className="ts2-section">
    <div className="container">
      <div className="text-center mb-5">
        <div className="hh-section-eyebrow">Customer Stories</div>
        <h2 className="hh-section-title">Loved by 2 Lakh+ Happy Families</h2>
        <p className="hh-section-sub mx-auto" style={{ maxWidth: 500 }}>
          Real people, real farms, real freshness — here's what our customers say.
        </p>
      </div>

      <div className="ts2-grid">
        {testimonials.map((t) => (
          <div key={t.name} className="ts2-card">
            <div className="ts2-stars">{'★'.repeat(t.rating)}</div>
            <p className="ts2-text">"{t.text}"</p>
            <div className="ts2-author">
              <div className="ts2-avatar" style={{ background: t.bg, color: t.color }}>{t.initials}</div>
              <div>
                <div className="ts2-name">{t.name}</div>
                <div className="ts2-loc">{t.loc}</div>
                <div className="ts2-purchase">{t.purchase}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <style>{`
      .ts2-section {
        background: #fafaf7;
        padding: 64px 0;
        border-top: 1px solid #e5e7eb;
      }
      .ts2-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
      }
      .ts2-card {
        background: #fff;
        border: 1.5px solid #f3f4f6;
        border-radius: 18px;
        padding: 22px;
        transition: all 0.25s;
        display: flex;
        flex-direction: column;
      }
      .ts2-card:hover {
        box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        transform: translateY(-4px);
        border-color: #e5e7eb;
      }
      .ts2-stars {
        color: #f59e0b;
        font-size: 0.95rem;
        margin-bottom: 12px;
        letter-spacing: 2px;
      }
      .ts2-text {
        font-size: 0.88rem;
        color: #4b5563;
        line-height: 1.75;
        font-style: italic;
        margin-bottom: 18px;
        flex: 1;
      }
      .ts2-author {
        display: flex;
        align-items: center;
        gap: 10px;
        border-top: 1px solid #f3f4f6;
        padding-top: 14px;
      }
      .ts2-avatar {
        width: 42px; height: 42px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 0.88rem; font-weight: 800; flex-shrink: 0;
      }
      .ts2-name { font-size: 0.88rem; font-weight: 700; color: #111827; }
      .ts2-loc { font-size: 0.72rem; color: #6b7280; margin-top: 1px; }
      .ts2-purchase {
        font-size: 0.68rem;
        color: #16a34a;
        font-weight: 600;
        margin-top: 2px;
      }
      @media (max-width: 991px) { .ts2-grid { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 575px)  { .ts2-grid { grid-template-columns: 1fr; gap: 12px; } .ts2-section { padding: 44px 0; } }
    `}</style>
  </section>
);

/* ─── Newsletter Section ─── */
const NewsletterSection = () => (
  <section className="nl2-section">
    <div className="container">
      <div className="nl2-card">
        {/* Left content */}
        <div className="nl2-left">
          <div className="nl2-pre">Stay Connected</div>
          <h2 className="nl2-title">Get Fresh Deals & Farm Stories</h2>
          <p className="nl2-sub">
            Weekly recipes, seasonal harvest alerts, exclusive discounts and notes from our farming community — straight to your inbox.
          </p>
          <form className="nl2-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" className="nl2-input" placeholder="Your email address…" />
            <button type="submit" className="nl2-btn">
              Subscribe <i className="bi bi-arrow-right" />
            </button>
          </form>
          <p className="nl2-note">No spam · Unsubscribe any time · Join 50,000+ subscribers</p>
        </div>

        {/* Right decorative image area */}
        <div className="nl2-right d-none d-lg-flex" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
        </div>
      </div>
    </div>

    <style>{`
      .nl2-section {
        background: #fff;
        padding: 40px 0 64px;
      }
      .nl2-card {
        background: linear-gradient(130deg, #0f2d1a 0%, #1a4a2e 45%, #2d6a4f 100%);
        border-radius: 28px;
        padding: 60px 60px;
        display: flex;
        align-items: center;
        gap: 0;
        position: relative;
        overflow: hidden;
      }
      .nl2-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at 70% 40%, rgba(144,204,160,0.12) 0%, transparent 60%);
      }
      .nl2-left { flex: 1; position: relative; z-index: 1; }
      .nl2-pre {
        font-size: 0.82rem;
        font-weight: 700;
        color: #86efac;
        margin-bottom: 10px;
        letter-spacing: 0.3px;
      }
      .nl2-title {
        font-size: clamp(1.4rem, 3vw, 2rem);
        font-weight: 800;
        color: #fff;
        font-family: var(--font-display);
        line-height: 1.2;
        margin-bottom: 10px;
      }
      .nl2-sub {
        font-size: 0.92rem;
        color: rgba(255,255,255,0.7);
        line-height: 1.65;
        margin-bottom: 24px;
        max-width: 440px;
      }
      .nl2-form {
        display: flex;
        max-width: 460px;
        border-radius: 999px;
        overflow: hidden;
        box-shadow: 0 6px 24px rgba(0,0,0,0.25);
      }
      .nl2-input {
        flex: 1;
        padding: 14px 22px;
        font-size: 0.9rem;
        border: none;
        outline: none;
        background: #fff;
        color: #111827;
        font-family: inherit;
      }
      .nl2-input::placeholder { color: #9ca3af; }
      .nl2-btn {
        background: #f59e0b;
        color: #1a1a1a;
        border: none;
        padding: 14px 26px;
        font-weight: 800;
        font-size: 0.88rem;
        cursor: pointer;
        transition: background 0.2s;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: inherit;
      }
      .nl2-btn:hover { background: #d97706; color: #fff; }
      .nl2-note {
        font-size: 0.72rem;
        color: rgba(255,255,255,0.45);
        margin-top: 14px;
      }
      .nl2-right {
        position: relative;
        width: 260px;
        height: 220px;
        flex-shrink: 0;
        z-index: 1;
      }
      @media (max-width: 991px) {
        .nl2-card { padding: 44px 36px; border-radius: 20px; }
      }
      @media (max-width: 767px) {
        .nl2-card { padding: 36px 24px; border-radius: 18px; }
        .nl2-form { flex-direction: column; border-radius: 14px; }
        .nl2-input { border-radius: 14px 14px 0 0; }
        .nl2-btn { border-radius: 0 0 14px 14px; justify-content: center; }
      }
    `}</style>
  </section>
);

/* ─── Main HomePage ─── */
const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ limit: '8' }));
  }, [dispatch]);

  return (
    <>
      {/* 1. Hero — Full-width farm imagery */}
      <HeroSection />

      {/* 2. Announcement + Marquee */}
      <AnnouncementBar />
      <MarqueeStrip />

      {/* 3. Quick Category Scroll */}
      <QuickCategories />

      {/* 4. Trust Badges Strip */}
      <TrustBadges />

      {/* 5. How It Works */}
      <HowItWorks />

      {/* 6. Seasonal Fresh Picks */}
      <SeasonalBanner />

      {/* 7. Flash Deals */}
      <FlashDeals />

      {/* 8. Featured Products */}
      <section className="hp-featured">
        <div className="container">
          <div className="hp-feat-hdr">
            <div>
              <div className="hh-section-eyebrow">Handpicked for You</div>
              <h2 className="hh-section-title">Featured Products</h2>
              <p className="hh-section-sub">Top-rated farm-fresh produce, selected by our quality team every week.</p>
            </div>
            <Link to="/products" className="hh-stores-viewall d-none d-md-flex">
              All Products <i className="bi bi-arrow-right" />
            </Link>
          </div>

          {loading ? (
            <div className="ms-loader"><div className="ms-spinner" /></div>
          ) : (
            <div className="row g-3">
              {products.slice(0, 8).map((product) => (
                <div key={product._id} className="col-6 col-md-4 col-lg-3">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-4 d-md-none">
            <Link to="/products" className="ms-btn-outline">View All Products <i className="bi bi-arrow-right" /></Link>
          </div>
        </div>

        <style>{`
          .hp-featured { background: #f9fafb; padding: 56px 0; border-top: 1px solid #f1f5f9; }
          .hp-feat-hdr {
            display: flex; align-items: flex-end;
            justify-content: space-between; flex-wrap: wrap;
            gap: 16px; margin-bottom: 28px;
          }
        `}</style>
      </section>

      {/* 9. Category Grid */}
      <CategoryGrid />

      {/* 10. Certified Stores */}
      <StoreGrid />

      {/* 11. Farmer Stories — with photos and testimonials */}
      <FarmerStories />

      {/* 12. Customer Testimonials */}
      <TestimonialsSection />

      {/* 13. Blog / Articles */}
      <BlogSection />

      {/* 14. Newsletter */}
      <NewsletterSection />
    </>
  );
};

export default HomePage;
