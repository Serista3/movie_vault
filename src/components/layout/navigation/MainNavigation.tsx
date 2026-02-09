// --- IMPORTS ---
import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useLockDownScreen, useWindowResizer } from '@/hooks';
import type { MediaType } from '@/@types';
import { Button, Logo } from '@/components/common';
import { SideNavigation, Navigation } from '@/components/layout'
import { SearchInput } from '@/features/search/';
import { Auth } from '@/features/auth';
import { IconContext } from 'react-icons';
import { AiOutlineMenu } from "react-icons/ai";
import { IoIosSearch, IoMdClose } from "react-icons/io";

// --- CONSTANTS ---
export const LINKS = [
  { to: "movie", label: "Movies", end: true },
  { to: "tv", label: "Tv Shows", end: true },
  { to: "person", label: "People", end: true },
]

export const BREAK_POINT = 1200

export default function MainNavigation() {
  // --- MAIN NAVIGATION STATE ---
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useWindowResizer();
  useLockDownScreen(isSideNavOpen);
  
  // --- HANDLERS ---
  const toggleSideNav = function(): void {
    setIsSideNavOpen(prev => !prev);
  };

  const onCloseSideNav = useCallback(function(): void {
    setIsSideNavOpen(false);
  }, []);

  const toggleSearchBar = function(): void{
    setIsSearchBarOpen(prev => !prev);
  }

  // --- SUBMIT SEARCH HANDLER ---
  const onSubmitSearch = function(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const query = formData.get('main-search-bar') as string;

    // --- VALIDATE SEARCH QUERY ---
    if (query.trim().length === 0) 
      return;

    // --- NAVIGATE TO SEARCH PAGE ---
    const curPath = location.pathname.split('/').at(-1);
    const validPaths: MediaType[] = ['movie', 'tv', 'person'];
    navigate(`/search/${validPaths.find(path => path === curPath) || 'movie'}?query=${encodeURIComponent(query.trim())}`);
    setIsSearchBarOpen(false);
  }

  return (
    <>
      <header className='bg-primary-light text-secondary-light border-b border-gray-dark shadow-md sticky top-0 z-10'>
        {/* --- MAIN NAVIGATION --- */}
        <nav className='max-w-300 mx-auto w-full flex items-center justify-between p-4'>

          {/* --- MENU BUTTON --- */}
          {width < BREAK_POINT && (
            <Button variant="secondary" shape='circular' onClick={toggleSideNav}>
              <IconContext.Provider value={{ className: 'text-xl text-primary-light' }}>
                <AiOutlineMenu />
              </IconContext.Provider>
            </Button>
          )}
          <Logo />

          {/* --- NAVIGATION --- */}
          <div className='flex items-center gap-2'>
            {width >= BREAK_POINT && (
              <Navigation 
                items={LINKS} 
                direction='row'
                className='py-2 px-6' 
              />
            )}

            {/* --- AUTH --- */}
            {width >= BREAK_POINT && <Auth className='mt-0 mb-0' />}

            {/* --- SEARCH BUTTON --- */}
            <Button variant="secondary" shape='circular' onClick={toggleSearchBar}>
              <IconContext.Provider value={{ className: 'text-xl text-primary-light' }}>
                {isSearchBarOpen ? <IoMdClose /> : <IoIosSearch />}
              </IconContext.Provider>
            </Button>
          </div>
        </nav>

        {/* --- SEARCH INPUT --- */}
        {isSearchBarOpen && (
          <SearchInput onSubmitSearch={onSubmitSearch} />
        )}
      </header>

      {/* --- SIDE BAR NAVIGATION --- */}
      {width < BREAK_POINT && (
        <SideNavigation isOpen={isSideNavOpen} onClose={onCloseSideNav} />
      )}
    </>
  );
}