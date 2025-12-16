import { Outlet } from 'react-router';

import MainNavigation from './MainNavigation';
import FooterNavigation from './FooterNavigation';

export default function MainLayout() {
  return (
    <>
      <MainNavigation />
      <Outlet />
      <FooterNavigation />
    </>
  );
}
