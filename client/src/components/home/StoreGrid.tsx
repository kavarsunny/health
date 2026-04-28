import { Link } from 'react-router-dom';

const stores = [
  {
    id: 's1',
    name: 'Organic Oasis Farm',
    location: 'Punjab, India',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviews: 312,
    badge: 'Top Seller',
  },
  {
    id: 's2',
    name: 'Golden Grains Collective',
    location: 'Haryana, India',
    image: 'https://images.unsplash.com/photo-1595856461973-206d2d7c00e1?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviews: 521,
    badge: 'Premium',
  },
  {
    id: 's3',
    name: 'Spice Route Artisans',
    location: 'Kerala, India',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    reviews: 183,
    badge: 'Organic',
  },
  {
    id: 's4',
    name: 'Himalayan Honey Co.',
    location: 'Himachal, India',
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89134fc2?q=80&w=600&auto=format&fit=crop',
    rating: 5.0,
    reviews: 897,
    badge: 'Best Rated',
  },
];

const StoreGrid = () => (
  <section className="hh-stores-section">
    <div className="container">
      <div className="hh-stores-hdr">
        <div>
          <div className="hh-section-eyebrow">Certified Partners</div>
          <h2 className="hh-section-title">Shop by Store</h2>
          <p className="hh-section-sub">Discover curated collections from our verified farm partners and local cooperatives.</p>
        </div>
        <Link to="/stores" className="hh-stores-viewall d-none d-md-flex">
          All Stores <i className="bi bi-arrow-right" />
        </Link>
      </div>

      <div className="row g-3">
        {stores.map((store) => (
          <div key={store.id} className="col-6 col-md-3">
            <Link to={`/stores/${store.id}`} className="hh-store-card">
              <div className="hh-store-img-wrap">
                <img src={store.image} alt={store.name} loading="lazy" />
                <div className="hh-store-overlay" />
                <div className="hh-store-badge-top">{store.badge}</div>

              </div>
              <div className="hh-store-body">
                <div className="hh-store-name">{store.name}</div>
                <div className="hh-store-loc">
                  <i className="bi bi-geo-alt" /> {store.location}
                </div>
                <div className="hh-store-rating-row">
                  <span className="hh-store-stars">
                    {'★'.repeat(Math.floor(store.rating))}
                  </span>
                  <span className="hh-store-rating-val">{store.rating}</span>
                  <span className="hh-store-reviews">({store.reviews})</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>

    <style>{`
      .hh-stores-section {
        background: #f9fafb;
        padding: 56px 0;
        border-top: 1px solid #f1f5f9;
      }
      .hh-stores-hdr {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
        margin-bottom: 28px;
      }
      .hh-stores-viewall {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 0.85rem;
        font-weight: 700;
        color: var(--ms-primary);
        text-decoration: none;
        transition: gap 0.2s;
      }
      .hh-stores-viewall:hover { gap: 9px; color: var(--ms-primary); }

      .hh-store-card {
        display: block;
        background: #fff;
        border: 1.5px solid #f1f5f9;
        border-radius: 16px;
        overflow: hidden;
        text-decoration: none;
        transition: all 0.25s;
        height: 100%;
      }
      .hh-store-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 14px 36px rgba(0,0,0,0.1);
        border-color: #e5e7eb;
      }
      .hh-store-img-wrap {
        height: 140px;
        position: relative;
        overflow: hidden;
      }
      .hh-store-img-wrap img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s;
      }
      .hh-store-card:hover .hh-store-img-wrap img { transform: scale(1.06); }
      .hh-store-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.3) 100%);
      }
      .hh-store-badge-top {
        position: absolute;
        top: 8px;
        right: 8px;
        background: rgba(0,0,0,0.6);
        color: #fff;
        font-size: 0.65rem;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 999px;
        backdrop-filter: blur(6px);
      }
      .hh-store-emoji-pill {
        position: absolute;
        bottom: -18px;
        left: 14px;
        width: 40px;
        height: 40px;
        background: #fff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.12);
        border: 2px solid #fff;
      }
      .hh-store-body {
        padding: 26px 14px 14px;
      }
      .hh-store-name {
        font-size: 0.9rem;
        font-weight: 700;
        color: #111827;
        margin-bottom: 3px;
        line-height: 1.3;
      }
      .hh-store-loc {
        font-size: 0.75rem;
        color: #6b7280;
        font-weight: 500;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 3px;
      }
      .hh-store-rating-row {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .hh-store-stars { color: #f59e0b; font-size: 0.75rem; }
      .hh-store-rating-val {
        font-size: 0.8rem;
        font-weight: 700;
        color: #111827;
      }
      .hh-store-reviews {
        font-size: 0.72rem;
        color: #9ca3af;
      }
    `}</style>
  </section>
);

export default StoreGrid;
