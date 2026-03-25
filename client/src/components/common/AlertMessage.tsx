import { Alert } from 'react-bootstrap';

interface AlertMessageProps {
  variant?: 'danger' | 'success' | 'warning' | 'info';
  children: React.ReactNode;
  dismissible?: boolean;
  onClose?: () => void;
}

const AlertMessage = ({ variant = 'info', children, dismissible, onClose }: AlertMessageProps) => (
  <Alert variant={variant} dismissible={dismissible} onClose={onClose} className="my-3">
    {children}
  </Alert>
);

export default AlertMessage;
