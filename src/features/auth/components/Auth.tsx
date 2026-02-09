// --- IMPORTS ---
import { useRouteLoaderData } from 'react-router';
import { useFetchData } from '@/hooks';
import { cn } from '@/utils/helper';
import { createRequestToken } from '@/services';
import type { UserDataResponse, RequestToken, AppError } from '@/@types';
import { isRequestToken } from '@/guards';
import { Button } from '@/components/common';
import { UserMenu } from '@/features/auth';

export default function Auth({ className }: { className?: string }) {
  // --- FETCH USER DATA FROM ROOT LOADER ---
  const { fetchData, isLoading, error } = useFetchData<RequestToken | AppError, []>(createRequestToken , []);
  const data = useRouteLoaderData('root') as UserDataResponse;
  
  const isAuthenticated = data?.isAuthenticated;

  const handleLogin = async function () {
    const resData = await fetchData();

    // --- REDIRECT TO TMDB AUTHENTICATION PAGE ---
    if (isRequestToken(resData)) {
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