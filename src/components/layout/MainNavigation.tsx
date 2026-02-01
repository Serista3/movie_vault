import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useLockDownScreen } from '../../hooks/useLockDownScreen';
import type { MediaType } from '../../types';

import Button from '../common/Button';
import Logo from '../common/Logo';
import SideNavigation from './SideNavigation';
import Navigation from './Navigation';
import SearchInput from '../SearchInput';

import { IconContext } from 'react-icons';
import { AiOutlineMenu } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const LINKS = [
  { to: "movie", label: "Movies", end: true },
  { to: "tv", label: "Tv Shows", end: true },
  { to: "person", label: "People", end: true },
  { to: "favorite", label: "Favorites" },
  { to: "watchlist", label: "Watch List" },
]

export default function MainNavigation() {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  useLockDownScreen(isSideNavOpen);
  
  const toggleSideNav = function(): void {
    setIsSideNavOpen(prev => !prev);
  };

  const onCloseSideNav = useCallback(function(): void {
    setIsSideNavOpen(false);
  }, []);

  const toggleSearchBar = function(): void{
    setIsSearchBarOpen(prev => !prev);
  }

  const onSubmitSearch = function(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const query = formData.get('main-search-bar') as string;
    if (query.trim().length === 0) 
      return;

    const curPath = location.pathname.split('/').at(-1);
    const validPaths: MediaType[] = ['movie', 'tv', 'person'];
    navigate(`/search/${validPaths.find(path => path === curPath) || 'movie'}?query=${encodeURIComponent(query.trim())}`);
    setIsSearchBarOpen(false);
  }

  return (
    <>
      <header className='header-nav bg-primary-light text-secondary-light border-b border-gray-dark shadow-md sticky top-0 z-10'>
        <nav className='max-w-300 mx-auto w-full flex items-center justify-between p-4'>
          <Button variant="secondary" shape='circular' onClick={toggleSideNav}>
            <IconContext.Provider value={{ className: 'text-xl text-primary-light' }}>
              <AiOutlineMenu />
            </IconContext.Provider>
          </Button>
          <Logo />
          <Button variant="secondary" shape='circular' onClick={toggleSearchBar}>
            <IconContext.Provider value={{ className: 'text-xl text-primary-light' }}>
              {isSearchBarOpen ? <IoMdClose /> : <IoIosSearch />}
            </IconContext.Provider>
          </Button>
        </nav>
        {isSearchBarOpen && (
          <SearchInput onSubmitSearch={onSubmitSearch} />
        )}
      </header>
      <SideNavigation isOpen={isSideNavOpen} onClose={onCloseSideNav} />
    </>
  );
}
