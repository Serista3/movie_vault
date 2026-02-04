// --- HOOKS ---
import { useRouteLoaderData } from 'react-router';
import { useFetchData } from '../hooks/useFetchData';

// --- HELPERS ---
import { cn } from '../utils/helperClassName';

// --- SERVICES ---
import { createRequestToken } from '../services/auth.service';

// --- TYPES ---
import type { UserDataResponse, RequestToken, AppError } from '../types';

// --- COMPONENTS ---
import Button from './common/Button';
import UserMenu from './user/UserMenu';

export default function Auth({ className }: { className?: string }) {
  // --- FETCH USER DATA FROM ROOT LOADER ---
  const { fetchData, isLoading, error } = useFetchData<RequestToken | AppError, []>(createRequestToken , []);
  const data = useRouteLoaderData('root') as UserDataResponse;
  
  const isAuthenticated = data?.isAuthenticated;

  const handleLogin = async function () {
    const resData = await fetchData();

    // --- REDIRECT TO TMDB AUTHENTICATION PAGE ---
    if (resData && 'request_token' in resData) {
      const requestToken = resData.request_token;
      window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/`;
    }
  };

  return (
    <div className={cn("mx-6 mt-6 mb-1", className)}>
      {/* --- LOGIN BUTTON --- */}
      {!isAuthenticated && (
        <form>
          <Button variant='secondary' onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login With TMDB'}
          </Button>
        </form>
      )}

      {/* --- USER MENU --- */}
      {isAuthenticated && (
        <UserMenu userData={data?.userData} isAuthenticated={isAuthenticated} />
      )}
      {error?.isError && <div>{error.message}</div>}
    </div>
  );
}