import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  whiteFilter?: boolean;
}

const Logo = ({ className = '', width = 160, height = 'auto', whiteFilter = false }: LogoProps) => {
  return (
    <Link to="/" className={`ms-brand-logo-wrap ${className}`} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
      <img
        src="/logo.png"
        alt="Healthify Haat Logo"
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          objectFit: 'contain',
          filter: whiteFilter ? 'brightness(0) invert(1)' : 'none',
        }}
        onError={(e) => {
          // Fallback if the user hasn't copied the image yet
          e.currentTarget.style.display = 'none';
          if (e.currentTarget.nextElementSibling) {
            (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'inline-block';
          }
        }}
      />
      <span className="ms-brand-fallback" style={{ display: 'none', fontWeight: 800, fontSize: '1.4rem', color: 'var(--ms-primary)' }}>
        Healthify<span style={{ color: 'var(--ms-text)' }}>Haat</span>
      </span>
    </Link>
  );
};

export default Logo;
