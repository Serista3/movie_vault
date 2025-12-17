import { Link } from "react-router";
import { formatUppercaseFirstLetter } from "../../utils/formatters";

import Logo from "../common/Logo";

export default function FooterNavigation() {
  const genres = ['action', 'comedy', 'horror', 'history', 'romance', 'other'];

  return (
    <footer className="bg-main-light py-6 px-3 border-t border-gray-dark flex flex-col items-center gap-6">
      <Logo />
      <div className="flex justify-center w-full gap-14 border-b border-back-light pb-6">
        <div>
          <h3 className="text-base text-back-light font-semibold mb-3">Movie</h3>
          <ul className="flex flex-col">
            {genres.map(genre => {
              return (
                <li key={genre}>
                  <Link to={`search?genre=${genre}`} className="text-back-light">{formatUppercaseFirstLetter(genre)}</Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <h3 className="text-base text-back-light font-semibold mb-3">TV Shows</h3>
          <ul className="flex flex-col">
            {genres.map(genre => {
              return (
                <li key={genre}>
                  <Link to={`search?genre=${genre}`} className="text-back-light">{formatUppercaseFirstLetter(genre)}</Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <h3 className="text-base text-back-light font-semibold mb-3">People</h3>
          <ul className="flex flex-col">
            <li><Link to="search" className="text-back-light">Popular</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-back-light text-center">
        <p className="font-semibold">Credit: Data provided by TMDB</p>
        <p className="font-light text-sm">Copy right @2025 by Serista</p>
      </div>
    </footer>
  );
}
