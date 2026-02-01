import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { LINKS } from './MainNavigation';

import Auth from '../Auth';
import Navigation from './Navigation';

interface SideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideNavigation({ isOpen, onClose }: SideNavigationProps) {
  const location = useLocation();

  const handleClick = function(e: React.MouseEvent<HTMLDivElement> ): void {
    if(!(e.target === e.currentTarget)) return;

    onClose();
  }

  useEffect(() => {
    onClose();
  }, [location.key, onClose]);

  return (
    <div className={`fixed bg-[rgba(0,0,0,0.75)] h-screen w-full z-20 
        ${isOpen ? 'visible' : 'invisible'}`} 
        onClick={handleClick}
      >
      <aside className={`w-3/4 bg-secondary-dark h-screen fixed z-25 transition-all 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <Auth />
        <Navigation items={LINKS}  />
      </aside>
    </div>
  );
};
