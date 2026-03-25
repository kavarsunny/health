import { Spinner } from 'react-bootstrap';

interface LoaderProps {
  size?: 'sm' | undefined;
  text?: string;
}

const Loader = ({ size, text = 'Loading...' }: LoaderProps) => (
  <div className="d-flex flex-column justify-content-center align-items-center py-5">
    <Spinner animation="border" role="status" size={size} className="text-primary mb-2">
      <span className="visually-hidden">{text}</span>
    </Spinner>
    <span className="text-muted small">{text}</span>
  </div>
);

export default Loader;
