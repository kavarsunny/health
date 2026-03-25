interface RatingProps {
  value: number;
  text?: string;
  max?: number;
}

const Rating = ({ value, text, max = 5 }: RatingProps) => {
  return (
    <div className="d-flex align-items-center gap-1">
      {[...Array(max)].map((_, i) => (
        <i
          key={i}
          className={
            value >= i + 1
              ? 'bi bi-star-fill text-warning'
              : value >= i + 0.5
              ? 'bi bi-star-half text-warning'
              : 'bi bi-star text-warning'
          }
          style={{ fontSize: '0.85rem' }}
        />
      ))}
      {text && <span className="text-muted small ms-1">({text})</span>}
    </div>
  );
};

export default Rating;
