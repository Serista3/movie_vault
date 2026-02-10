// --- IMPORTS ----
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function useCloseOnNavigate(onClose: () => void): void {
  const location = useLocation();

  // --- AUTO CLOSE BASE ON LOCATION KEY ---
  useEffect(() => {
    onClose();
  }, [location.key, onClose]);
}