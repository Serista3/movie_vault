import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router';

import Auth from '../Auth';

interface SideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideNavigation({ isOpen, onClose }: SideNavigationProps) {
  const location = useLocation();

  const navLinkClass = `font-light hover:text-main-light transition-colors`;
  const activeNavLinkClass = navLinkClass + ' text-main-light';

  const activeNavLink = function ({ isActive }: { isActive: boolean }): string {
    return isActive ? activeNavLinkClass : navLinkClass;
  };

  const handleClick = function(e: React.MouseEvent<HTMLBaseElement> ): void {
    if(!(e.target === e.currentTarget)) return;

    onClose();
  }

  useEffect(() => {
    onClose();
  }, [location.key, onClose]);

  return (
    <aside className={`fixed bg-[rgba(0,0,0,0.75)] h-screen w-full z-20 ${isOpen ? 'visible' : 'invisible'}`} onClick={handleClick}>
      <nav
        className={`flex flex-col gap-6 p-6 bg-back-dark text-white w-3/4 h-screen fixed z-25 transition-all ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Auth />
        <ul className="flex flex-col gap-2 border-t border-gray-dark pt-8">
          <li>
            <NavLink to="movie" className={activeNavLink}>
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="tv" className={activeNavLink}>
              Tv Shows
            </NavLink>
          </li>
          <li>
            <NavLink to="favorite" className={activeNavLink}>
              Favorites
            </NavLink>
          </li>
          <li>
            <NavLink to="watchlist" className={activeNavLink}>
              Watch List
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
