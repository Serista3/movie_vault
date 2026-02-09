// --- IMPORTS ---
import type { User, AppError } from '@/@types';
import { BASE_USER_AVATAR_CLASS, GUEST_USERNAME, GUEST_AVATAR_INITIAL } from '../constants';

// --- TYPE DEFINATIONS ---
interface UserAvatarProps {
  data: User | AppError;
  isAuthenticated: boolean;
}

export default function UserAvatar({ data, isAuthenticated }: UserAvatarProps) {
  // --- DETERMINE USERNAME & AVATAR INITIAL ---
  const isValidData = isAuthenticated && data && 'username' in data;
  const username = isValidData ? data.username : GUEST_USERNAME;
  const avatarInitial = isValidData ? username.charAt(0).toUpperCase() : GUEST_AVATAR_INITIAL;

  return (
    <>
      {/* --- USER AVATAR --- */}
      <div className={BASE_USER_AVATAR_CLASS}>
        {avatarInitial}
      </div>

      {/* --- USERNAME --- */}
      <div>{username}</div>
    </>
  )
}