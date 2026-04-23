import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import { SVGSearchIcon } from '../common/SVGIcons';

const FlashDeals = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 45, s: 30 });

  // Get products with highest discounts or just slice some
  const flashProducts = products.slice(0, 4).map((p, i) => ({
    ...p,
    soldPercent: [78, 45, 92, 12][i % 4], // Mock stock progress
    mrp: Math.round(p.price * 1.5) // Ensure they look like deals
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

  return (
    <section className="ms-section ms-flash-deals-section" id="flash-deals">
      <div className="container">
        <div className="ms-flash-header">
           <div className="ms-flash-title-wrap">
              <div className="ms-flash-badge">FLASH SALE</div>
              <h2 className="ms-flash-title">Deals of the Day</h2>
           </div>
           
           <div className="ms-flash-timer-wrap">
              <span className="ms-timer-label">Ends in:</span>
              <div className="ms-flash-timer">
                 <div className="ms-timer-unit"><span>{pad(timeLeft.h)}</span></div>
                 <span className="ms-timer-sep">:</span>
                 <div className="ms-timer-unit"><span>{pad(timeLeft.m)}</span></div>
                 <span className="ms-timer-sep">:</span>
                 <div className="ms-timer-unit"><span>{pad(timeLeft.s)}</span></div>
              </div>
           </div>
           
           <Link to="/products?sale=true" className="ms-flash-view-all d-none d-md-block">
              View All Deals <i className="bi bi-arrow-right" />
           </Link>
        </div>

        <div className="row g-4 mt-2">
           {flashProducts.map((product) => {
             const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
             return (
               <div key={product._id} className="col-6 col-md-3">
                 <div className="ms-flash-card">
                   <Link to={`/products/${product._id}`} className="ms-flash-img-link">
                      <div className="ms-flash-img">
                         <img src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/300?text=Fresh+Deal'} alt={product.name} />
                         <div className="ms-flash-off">-{discount}%</div>
                      </div>
                   </Link>
                   
                   <div className="ms-flash-body">
                      <Link to={`/products/${product._id}`} className="ms-flash-name text-truncate d-block">
                         {product.name}
                      </Link>
                      
                      <div className="ms-flash-price-row">
                         <span className="ms-flash-price">₹{product.price}</span>
                         <span className="ms-flash-mrp">₹{product.mrp}</span>
                      </div>
                      
                      <div className="ms-flash-stock">
                         <div className="d-flex justify-content-between smaller mb-1">
                            <span className="text-muted">Sold: <b>{product.soldPercent}%</b></span>
                            <span className="text-danger fw-bold">{product.soldPercent > 80 ? 'Almost Gone!' : ''}</span>
                         </div>
                         <div className="ms-flash-progress">
                            <div className="ms-flash-progress-bar" style={{ width: `${product.soldPercent}%` }} />
                         </div>
                      </div>
                   </div>
                 </div>
               </div>
             );
           })}
        </div>
      </div>
    </section>
  );
};

export default FlashDeals;
