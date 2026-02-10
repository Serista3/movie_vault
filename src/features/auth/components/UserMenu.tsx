// --- IMPORTS --- 
import { useFetcher } from 'react-router';
import type { User, AppError } from '@/@types';
import { isAppError } from '@/guards';
import { Anchor, Button, DropdownMenu, AsyncBoundary, ErrorMessage } from '@/components/common';
import { UserAvatar } from '@/features/auth';

// --- TYPE DEFINATIONS ---
interface UserMenuProps {
  userData: User | AppError;
  isAuthenticated: boolean;
}

export default function UserMenu({ userData, isAuthenticated }: UserMenuProps) {
  const fetcher = useFetcher();
  const userDataPromise = Promise.resolve(userData)

  return (
    <DropdownMenu className='user-menu' menuTrigger={
      // --- USER AVATAR WITH USERNAME ---
      <AsyncBoundary resolve={userDataPromise} errorElement={<div>Error loading user</div>}>
        {data => (
          <>
            {isAppError(data) && <ErrorMessage error={data} />}
            {!isAppError(data) && isAuthenticated && (
              <UserAvatar data={data} isAuthenticated={isAuthenticated} />
            )}
          </>
        )}
      </AsyncBoundary>
      }
    >

      {/* --- DROPDOWN MENU ITEMS --- */}
      <AsyncBoundary resolve={userDataPromise} errorElement={<div>Error loading user</div>}>
        {data => (
          <>
            {isAppError(data) && <ErrorMessage error={data} />}
            {!isAppError(data) && isAuthenticated && (
              <>
                <li className='w-full'>
                  <Anchor to={`/user/${data.id}/favorites/movie`} className='text-tertiary-light'>Favorite</Anchor>
                </li>
                <li className='w-full'>
                  <Anchor to={`/user/${data.id}/watchlist/movie`} className='text-tertiary-light'>Watchlist</Anchor>
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
              </>
            )}
          </>
        )}
      </AsyncBoundary>
    </DropdownMenu>
  )
}