import { useState } from 'react';

import Button from '../common/Button';
import Logo from '../common/Logo';
import SideNavigation from './SideNavigation';

import { IconContext } from 'react-icons';
import { AiOutlineMenu } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";

export default function MainNavigation() {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);
  
  const toggleSidenNav = function(): void {
    setIsSideNavOpen(prev => !prev);
  }

  return (
    <>
      <header className='p-3 bg-main-light flex items-center justify-between border-b border-gray-dark shadow-md'>
        <Button className='rounded-full bg-back-light hover:bg-back-dark px-2' onClick={toggleSidenNav}>
          <IconContext.Provider value={{ className: 'text-xl text-main-light' }}>
            <AiOutlineMenu />
          </IconContext.Provider>
        </Button>
        <Logo />
        <Button className='rounded-full bg-back-light hover:bg-back-dark px-2'>
          <IconContext.Provider value={{ className: 'text-xl text-main-light' }}>
            <IoIosSearch />
          </IconContext.Provider>
        </Button>
      </header>
      <SideNavigation isOpen={isSideNavOpen} />
    </>
  );
}
