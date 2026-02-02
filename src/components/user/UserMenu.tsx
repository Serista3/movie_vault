import { Suspense } from 'react';
import { Await, Link, useFetcher } from 'react-router';
import type { User, AppError } from '../../types';

import Button from '../common/Button';
import DropdownMenu  from '../common/DropdownMenu';
import UserAvatar from './UserAvatar';

const BASE_LINK_CLASS = `text-tertiary-light hover:text-tertiary-dark transition-colors duration-300`;

interface UserMenuProps {
  userData: User | AppError;
  isAuthenticated: boolean;
}

export default function UserMenu({ userData, isAuthenticated }: UserMenuProps) {
  const fetcher = useFetcher();

  return (
    <DropdownMenu className='user-menu' menuTrigger={
        <Suspense fallback={<div>Anonymous</div>}>
          <Await resolve={userData} errorElement={<div>Error loading user</div>}>
            {data => <UserAvatar data={data} isAuthenticated={isAuthenticated} />} 
          </Await>
        </Suspense>
      }
    >
      <li>
        <Link to="/favorite" className={BASE_LINK_CLASS}>
          Favorite
        </Link>
      </li>
      <li>
        <Link to="/watchlist" className={BASE_LINK_CLASS}>
          Watchlist
        </Link>
      </li>
      <li>
          <fetcher.Form method="post" action="/">
            <Button
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