import { useEffect } from 'react';
import { useLocation } from 'react-router';

import Auth from '../Auth';
import Navigation from './Navigation';

interface SideNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const LINKS = [
  { to: "movie", label: "Movies", end: true },
  { to: "tv", label: "Tv Shows", end: true },
  { to: "person", label: "People", end: true },
  { to: "favorite", label: "Favorites" },
  { to: "watchlist", label: "Watch List" },
]

export default function SideNavigation({ isOpen, onClose }: SideNavigationProps) {
  const location = useLocation();

  const handleClick = function(e: React.MouseEvent<HTMLBaseElement> ): void {
    if(!(e.target === e.currentTarget)) return;

    onClose();
  }

  useEffect(() => {
    onClose();
  }, [location.key, onClose]);

  return (
    <aside className={`fixed bg-[rgba(0,0,0,0.75)] h-screen w-full z-20 ${isOpen ? 'visible' : 'invisible'}`} onClick={handleClick}>
      <Auth />
      <Navigation items={LINKS} className={`w-3/4 h-screen fixed z-25 transition-all 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} />
      {/* <nav
        className={`flex flex-col gap-6 p-6 bg-secondary-dark text-tertiary-light 
        }`}
      >
        <Auth />
        <ul className="flex flex-col gap-2 border-t border-gray-dark pt-8">
          <li>
            <NavLink to="movie" end className={activeNavLink}>
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="tv" end className={activeNavLink}>
              Tv Shows
            </NavLink>
          </li>
          <li>
            <NavLink to="person" end className={activeNavLink}>
              People
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
      </nav> */}
    </aside>
  );
};
