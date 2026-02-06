// --- HOOKS && REACT COMPONENT --- 
import { Suspense } from 'react';
import { Await, Link, useFetcher } from 'react-router';

// --- TYPES ---
import type { User, AppError } from '../../types';

// --- COMPONENTS ---
import Button from '../common/Button';
import DropdownMenu  from '../common/DropdownMenu';
import UserAvatar from './UserAvatar';

const BASE_LINK_CLASS = `inline-block w-full text-tertiary-light hover:text-primary-light transition-colors duration-300`;

// --- TYPES FOR USER MENU PROPS ---
interface UserMenuProps {
  userData: User | AppError;
  isAuthenticated: boolean;
}

export default function UserMenu({ userData, isAuthenticated }: UserMenuProps) {
  const fetcher = useFetcher();

  return (
    <DropdownMenu className='user-menu' menuTrigger={
      // --- USER AVATAR WITH USERNAME ---
        <Suspense fallback={<div>Loading user...</div>}>
          <Await resolve={userData} errorElement={<div>Error loading user</div>}>
            {data => <UserAvatar data={data} isAuthenticated={isAuthenticated} />} 
          </Await>
        </Suspense>
      }
    >

      {/* --- DROPDOWN MENU ITEMS --- */}
      <li className='w-full'>
        <Link to="/favorite" className={BASE_LINK_CLASS}>
          Favorite
        </Link>
      </li>
      <li className='w-full'>
        <Link to="/watchlist" className={BASE_LINK_CLASS}>
          Watchlist
        </Link>
      </li>

      {/* --- LOGOUT BUTTON --- */}
      <li className='w-full'>
          <fetcher.Form method="post" action="/">
            <Button
              className='w-full mt-4'
              variant='danger'
              type="submit"
              name="type"
              value="logout"
              disabled={fetcher.state === 'submitting'} >
              {fetcher.state === 'submitting' ? 'Logging out...' : 'Logout'}
            </Button>
          </fetcher.Form>
      </li>
    </DropdownMenu>
  )
}