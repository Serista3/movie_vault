import { Suspense } from 'react';
import { Await } from 'react-router';

import type { User, AppError } from '../types';

interface UserAvatarProps {
  userData: User | AppError;
  isAuthenticated: boolean;
}

export default function UserAvatar({ userData, isAuthenticated }: UserAvatarProps) {
  return (
    <Suspense fallback={<div>Anonymous</div>}>
      <Await resolve={userData} errorElement={<div>Error loading user</div>}>
        {data => {
          const isValidData = isAuthenticated && data && 'username' in data;
          const username = isValidData ? data.username : 'Guest';
          const avatarInitial = isValidData ? username.charAt(0).toUpperCase() : 'G';

          return (
            <>
              <div className='rounded-full bg-secondary-light w-8 h-8 flex items-center justify-center overflow-hidden text-base'>
                {avatarInitial}
              </div>
              <div>{username}</div>
            </>
          )
        }}
      </Await>
    </Suspense>
  )
}
