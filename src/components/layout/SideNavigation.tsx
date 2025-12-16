import { NavLink } from 'react-router';

const SideNavigation: React.FC<{ isOpen: boolean }> = function (props) {
  const navLinkClass = `font-light hover:text-main-light transition-colors`;
  const activeNavLinkClass = navLinkClass + ' text-main-light';

  const activeNavLink = function ({ isActive }: { isActive: boolean }): string {
    return isActive ? activeNavLinkClass : navLinkClass;
  };

  return (
    <>
      <div className={`fixed bg-back-dark backdrop-blur-xs h-screen w-full ${props.isOpen ? '' : 'hidden'}`}></div>
      <nav
        className={`flex flex-col gap-8 p-6 bg-back-light text-white w-3/4 h-screen fixed z-20 transition-all ${
          props.isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul className="flex flex-col gap-2">
          <li>
            <NavLink to="movies" className={activeNavLink}>
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="tv-shows" className={activeNavLink}>
              Tv Shows
            </NavLink>
          </li>
          <li>
            <NavLink to="favorites" className={activeNavLink}>
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
    </>
  );
};

export default SideNavigation;
