import { useState, useCallback } from 'react';
import { useLockDownScreen } from '../../hooks/useLockDownScreen';

import Button from '../common/Button';
import Logo from '../common/Logo';
import SideNavigation from './SideNavigation';

import { IconContext } from 'react-icons';
import { AiOutlineMenu } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";

export default function MainNavigation() {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  useLockDownScreen(isSideNavOpen);
  
  const toggleSideNav = function(): void {
    setIsSideNavOpen(prev => !prev);
  };

  const onCloseSideNav = useCallback(function(): void {
    setIsSideNavOpen(false);
  }, []);

  return (
    <>
      <header className='p-3 bg-primary-light text-secondary-light flex items-center justify-between border-b border-gray-dark shadow-md sticky top-0 z-30'>
        <Button variant="secondary" shape='circular' onClick={toggleSideNav}>
          <IconContext.Provider value={{ className: 'text-xl text-primary-light' }}>
            <AiOutlineMenu />
          </IconContext.Provider>
        </Button>
        <Logo />
        <Button variant="secondary" shape='circular'>
          <IconContext.Provider value={{ className: 'text-xl text-primary-light' }}>
            <IoIosSearch />
          </IconContext.Provider>
        </Button>
      </header>
      <SideNavigation isOpen={isSideNavOpen} onClose={onCloseSideNav} />
    </>
  );
}
