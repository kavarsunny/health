import { Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IProduct } from '../../types';
import Rating from '../common/Rating';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => (
  <Card className="product-card h-100 border-0 shadow-sm">
    <Link to={`/products/${product._id}`}>
      <div className="product-img-wrapper overflow-hidden" style={{ height: '220px' }}>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
          className="w-100 h-100"
          style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
      </div>
    </Link>
    <Card.Body className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <Badge bg="secondary" className="text-uppercase" style={{ fontSize: '0.65rem' }}>
          {product.category}
        </Badge>
        {product.stock === 0 && <Badge bg="danger">Out of Stock</Badge>}
      </div>
      <Card.Title className="fs-6 fw-semibold mb-1">
        <Link to={`/products/${product._id}`} className="text-decoration-none text-dark stretched-link">
          {product.name}
        </Link>
      </Card.Title>
      <Rating value={product.rating} text={`${product.numReviews}`} />
      <div className="mt-auto pt-2 d-flex justify-content-between align-items-center">
        <span className="fs-5 fw-bold text-primary">${product.price.toFixed(2)}</span>
        <span className="text-muted small">{product.brand}</span>
      </div>
    </Card.Body>
  </Card>
);

export default ProductCard;
