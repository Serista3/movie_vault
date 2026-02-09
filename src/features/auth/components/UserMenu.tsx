// --- IMPORTS --- 
import { Suspense } from 'react';
import { Await, useFetcher } from 'react-router';
import type { User, AppError } from '@/@types';
import { Anchor, Button, DropdownMenu } from '@/components/common';
import { UserAvatar } from '@/features/auth';

// --- TYPE DEFINATIONS ---
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
        <Anchor to="/favorite">Favorite</Anchor>
      </li>
      <li className='w-full'>
        <Anchor to="/watchlist">Watchlist</Anchor>
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