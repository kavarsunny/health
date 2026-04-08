import { Link } from 'react-router-dom';

const stores = [
  {
    id: 's1',
    name: "Organic Oasis Farm",
    location: "Punjab, India",
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop',
    logo: '🌿',
    rating: 4.8,
  },
  {
    id: 's2',
    name: "Golden Grains Collective",
    location: "Haryana, India",
    image: 'https://images.unsplash.com/photo-1595856461973-206d2d7c00e1?q=80&w=600&auto=format&fit=crop',
    logo: '🌾',
    rating: 4.9,
  },
  {
    id: 's3',
    name: "Spice Route Artisans",
    location: "Kerala, India",
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop',
    logo: '🌶️',
    rating: 4.7,
  },
  {
    id: 's4',
    name: "Himalayan Honey Co.",
    location: "Himachal, India",
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89134fc2?q=80&w=600&auto=format&fit=crop',
    logo: '🍯',
    rating: 5.0,
  }
];

const StoreGrid = () => {
  return (
    <section className="ms-section">
      <div className="container">
        <div className="ms-section-header text-center mb-5">
          <h2 className="ms-section-title" style={{ fontSize: '2rem', fontWeight: 800 }}>Shop by Certified Stores</h2>
          <p className="ms-section-sub mx-auto" style={{ maxWidth: '600px' }}>
            Discover unique product collections directly from our verified partner farmers and local cooperatives.
          </p>
        </div>

        <div className="row g-4">
          {stores.map((store) => (
            <div key={store.id} className="col-12 col-md-6 col-lg-3">
              <Link to={`/stores/${store.id}`} className="ms-store-card shadow-sm" style={{ textDecoration: 'none' }}>
                <div className="ms-store-banner">
                  <img src={store.image} alt={store.name} />
                  <div className="ms-store-logo-pill">{store.logo}</div>
                </div>
                <div className="ms-store-body">
                  <h3 className="ms-store-name">{store.name}</h3>
                  <div className="ms-store-loc">
                    <i className="bi bi-geo-alt me-1" /> {store.location}
                  </div>
                  <div className="ms-store-footer mt-3 pt-3">
                    <span className="ms-store-rating">
                      <i className="bi bi-star-fill me-1" /> {store.rating}
                    </span>
                    <span className="ms-store-link">View Store <i className="bi bi-chevron-right" /></span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ms-store-card {
           background: white;
           border-radius: var(--ms-radius-lg);
           overflow: hidden;
           display: block;
           transition: var(--ms-transition);
           border: 1px solid var(--ms-border);
        }
        .ms-store-card:hover {
           transform: translateY(-5px);
           box-shadow: var(--ms-shadow-md) !important;
        }
        .ms-store-banner {
           height: 140px;
           position: relative;
        }
        .ms-store-banner img {
           width: 100%; height: 100%; object-fit: cover;
        }
        .ms-store-logo-pill {
           position: absolute;
           bottom: -20px;
           left: 20px;
           width: 50px;
           height: 50px;
           background: white;
           border-radius: 50%;
           display: flex;
           align-items: center;
           justify-content: center;
           font-size: 1.5rem;
           box-shadow: var(--ms-shadow-sm);
           border: 2px solid white;
        }
        .ms-store-body {
           padding: 30px 20px 20px;
        }
        .ms-store-name {
           font-size: 1.15rem;
           font-weight: 700;
           color: var(--ms-heading);
           margin-bottom: 4px;
        }
        .ms-store-loc {
           font-size: 0.85rem;
           color: var(--ms-text-muted);
           font-weight: 500;
        }
        .ms-store-footer {
           display: flex;
           justify-content: space-between;
           align-items: center;
           border-top: 1px solid var(--ms-border);
        }
        .ms-store-rating {
           font-size: 0.9rem;
           font-weight: 700;
           color: #f59e0b;
        }
        .ms-store-link {
           font-size: 0.85rem;
           font-weight: 700;
           color: var(--ms-primary);
        }
      `}</style>
    </section>
  );
};

export default StoreGrid;
