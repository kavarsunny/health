import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IProduct } from '../../types';
import { addItemToCart } from '../../store/slices/cartSlice';
import type { AppDispatch } from '../../store/store';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [wished, setWished] = useState(false);

  const mrp = (product as any).mrp;
  const discount = mrp && mrp > product.price
    ? Math.round(((mrp - product.price) / mrp) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addItemToCart({ productId: product._id, quantity: 1 }));
  };

  return (
    <div className="ms-product-card">
      <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div className="ms-product-img-wrap">
          {product.images && product.images.length > 0 ? (
            <img src={product.images[0]} alt={product.name} />
          ) : (
            <div className="ms-product-img-placeholder" style={{ background: '#f8fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M5 8h14l1.5 12H3.5L5 8z" fill="#a5d6a7" />
                <path d="M9 8V6a3 3 0 016 0v2" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 11v3" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          )}

          {/* Badges */}
          {discount && discount > 5 && (
            <span className="ms-product-badge ms-product-badge-sale">Sale {discount}%</span>
          )}
          {!mrp && <span className="ms-product-badge ms-product-badge-new">Fresh</span>}

          {/* Wishlist */}
          <button
            className={`ms-product-wishlist ${wished ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); setWished((p) => !p); }}
            aria-label="Add to wishlist"
          >
            <i className={`bi bi-heart${wished ? '-fill' : ''}`} />
          </button>
        </div>
      </Link>

      <div className="ms-product-body">
        <div className="ms-product-category">{product.category || 'Organic'}</div>
        <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
          <div className="ms-product-name">{product.name}</div>
        </Link>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="ms-product-rating">
            <span className="ms-stars">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
            <span className="ms-rating-count">({product.numReviews})</span>
          </div>
        )}

        <div className="ms-product-price-row">
          <span className="ms-product-price">₹{product.price}</span>
          {mrp && mrp > product.price && (
            <span className="ms-product-mrp">₹{mrp}</span>
          )}
          {discount && discount > 5 && (
            <span className="ms-product-discount">{discount}% off</span>
          )}
        </div>
      </div>

      <div className="ms-product-footer d-flex justify-content-between align-items-center mt-3">
        <div className="ms-product-price-col">
          <div className="ms-product-price" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ms-text)' }}>₹{product.price}</div>
          {mrp && mrp > product.price && (
            <div className="ms-product-mrp-row d-flex align-items-center gap-2">
               <span className="ms-product-mrp text-decoration-line-through text-muted small">₹{mrp}</span>
               <span className="ms-product-discount-badge">{discount}% OFF</span>
            </div>
          )}
        </div>
        <button
          className="ms-pill-btn-sm"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          style={{ padding: '6px 16px', fontSize: '0.8rem' }}
        >
          {product.stock === 0 ? 'Out' : 'Add +'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
