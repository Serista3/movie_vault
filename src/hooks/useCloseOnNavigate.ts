import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function useCloseOnNavigate(onClose: () => void): void {
  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location.key, onClose]);
}