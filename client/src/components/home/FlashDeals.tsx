import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';

const FlashDeals = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 45, s: 30 });

  const flashProducts = products.slice(0, 4).map((p, i) => ({
    ...p,
    soldPercent: [78, 45, 92, 62][i % 4],
    mrp: Math.round(p.price * 1.5),
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { h, m, s } = prev;
        if (s > 0) s--;
        else if (m > 0) { s = 59; m--; }
        else if (h > 0) { s = 59; m = 59; h--; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  if (flashProducts.length === 0) return null;

  return (
    <section className="hh-flash-section">
      <div className="container">
        {/* Header */}
        <div className="hh-flash-header">
          <div className="hh-flash-left">
            <div className="hh-flash-badge">
              <span className="hh-flash-dot" /> FLASH SALE
            </div>
            <h2 className="hh-flash-title">Deals of the Day</h2>
          </div>
          <div className="hh-flash-right">
            <div className="hh-timer-wrap">
              <span className="hh-timer-ends">Ends in:</span>
              <div className="hh-timer-boxes">
                {[pad(timeLeft.h), pad(timeLeft.m), pad(timeLeft.s)].map((val, i) => (
                  <span key={i}>
                    <div className="hh-timer-box">
                      <span className="hh-timer-num">{val}</span>
                    </div>
                    {i < 2 && <span className="hh-timer-sep">:</span>}
                  </span>
                ))}
              </div>
            </div>
            <Link to="/products?sale=true" className="hh-flash-viewall d-none d-md-flex">
              View All <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="row g-3 mt-1">
          {flashProducts.map((product) => {
            const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
            const isAlmostGone = product.soldPercent > 80;
            return (
              <div key={product._id} className="col-6 col-md-3">
                <Link to={`/products/${product._id}`} className="hh-flash-card">
                  <div className="hh-flash-img-wrap">
                    <img
                      src={product.images && product.images.length > 0 ? product.images[0] : `https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&q=80`}
                      alt={product.name}
                      loading="lazy"
                    />
                    <div className="hh-flash-badge-off">-{discount}%</div>
                    {isAlmostGone && <div className="hh-flash-almost">🔥 Almost Gone!</div>}
                  </div>
                  <div className="hh-flash-body">
                    <div className="hh-flash-name">{product.name}</div>
                    <div className="hh-flash-price-row">
                      <span className="hh-flash-price">₹{product.price}</span>
                      <span className="hh-flash-mrp">₹{product.mrp}</span>
                    </div>
                    <div className="hh-flash-stock-wrap">
                      <div className="hh-flash-stock-bar">
                        <div
                          className="hh-flash-stock-fill"
                          style={{
                            width: `${product.soldPercent}%`,
                            background: isAlmostGone ? '#ef4444' : 'var(--ms-primary)'
                          }}
                        />
                      </div>
                      <span className="hh-flash-sold">{product.soldPercent}% sold</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .hh-flash-section {
          background: #fff;
          padding: 40px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .hh-flash-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 4px;
        }
        .hh-flash-left { display: flex; flex-direction: column; gap: 4px; }
        .hh-flash-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .hh-flash-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fef2f2;
          color: #ef4444;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid #fecaca;
          width: fit-content;
        }
        .hh-flash-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ef4444;
          animation: hh-pulse 1.2s infinite;
        }
        @keyframes hh-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        .hh-flash-title {
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          font-weight: 800;
          color: #111827;
          font-family: var(--font-display);
          margin: 0;
        }
        .hh-timer-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .hh-timer-ends {
          font-size: 0.78rem;
          color: #6b7280;
          font-weight: 600;
        }
        .hh-timer-boxes {
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .hh-timer-box {
          background: #111827;
          color: #fff;
          border-radius: 6px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hh-timer-num {
          font-size: 1rem;
          font-weight: 800;
          font-family: var(--font-display);
          font-variant-numeric: tabular-nums;
        }
        .hh-timer-sep {
          font-size: 1.1rem;
          font-weight: 800;
          color: #374151;
          margin: 0 1px;
        }
        .hh-flash-viewall {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--ms-primary);
          text-decoration: none;
          transition: gap 0.2s;
        }
        .hh-flash-viewall:hover { gap: 9px; color: var(--ms-primary); }

        .hh-flash-card {
          display: block;
          background: #fff;
          border: 1.5px solid #f1f5f9;
          border-radius: 14px;
          overflow: hidden;
          text-decoration: none;
          transition: all 0.25s;
        }
        .hh-flash-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
          border-color: #e5e7eb;
        }
        .hh-flash-img-wrap {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          background: #f9fafb;
        }
        .hh-flash-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .hh-flash-card:hover .hh-flash-img-wrap img { transform: scale(1.06); }
        .hh-flash-badge-off {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #ef4444;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 999px;
        }
        .hh-flash-almost {
          position: absolute;
          bottom: 8px;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 0.72rem;
          font-weight: 700;
          color: #ef4444;
          background: rgba(255,255,255,0.9);
          padding: 3px 0;
        }
        .hh-flash-body { padding: 12px; }
        .hh-flash-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
        }
        .hh-flash-price-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 8px;
        }
        .hh-flash-price {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--ms-primary);
        }
        .hh-flash-mrp {
          font-size: 0.8rem;
          color: #9ca3af;
          text-decoration: line-through;
        }
        .hh-flash-stock-wrap {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .hh-flash-stock-bar {
          height: 5px;
          background: #f3f4f6;
          border-radius: 999px;
          overflow: hidden;
        }
        .hh-flash-stock-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.5s ease;
        }
        .hh-flash-sold {
          font-size: 0.7rem;
          color: #6b7280;
          font-weight: 500;
        }
      `}</style>
    </section>
  );
};

export default FlashDeals;
