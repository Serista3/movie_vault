// --- TYPES ---
import type { User, AppError } from '../../types';

// --- TYPES FOR USER AVATAR PROPS ---
interface UserAvatarProps {
  data: User | AppError;
  isAuthenticated: boolean;
}

const BASE_CLASS = `rounded-full text-tertiary-light bg-secondary-light w-8 h-8 
  flex items-center justify-center overflow-hidden text-base`;

export default function UserAvatar({ data, isAuthenticated }: UserAvatarProps) {
  // --- DETERMINE USERNAME & AVATAR INITIAL ---
  const isValidData = isAuthenticated && data && 'username' in data;
  const username = isValidData ? data.username : 'Guest';
  const avatarInitial = isValidData ? username.charAt(0).toUpperCase() : 'G';

  return (
    <>
      {/* --- USER AVATAR --- */}
      <div className={BASE_CLASS}>
        {avatarInitial}
      </div>

      {/* --- USERNAME --- */}
      <div>{username}</div>
    </>
  )
}