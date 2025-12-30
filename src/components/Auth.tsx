import { useFetcher, useRouteLoaderData } from 'react-router';
import { useFetchData } from '../hooks/useFetchData';

import { createRequestToken } from '../services/auth.service';
import type { UserDataResponse, RequestToken, AppError } from '../types';

import Button from './common/Button';
import UserAvatar from './UserAvatar';

export default function Auth() {
  const { fetchData, isLoading, error } = useFetchData<RequestToken | AppError, []>(createRequestToken , []);
  const data = useRouteLoaderData('root') as UserDataResponse;
  const fetcher = useFetcher();
  const isAuthenticated = data?.isAuthenticated;

  const handleLogin = async function () {
    const resData = await fetchData();

    if (resData && 'request_token' in resData) {
      const requestToken = resData.request_token;
      window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/`;
    }
  };

  return (
    <div className="user flex flex-col gap-4">
      <div className="username font-semibold text-xl flex items-center gap-3 mb-1">
        <UserAvatar userData={data?.userData} isAuthenticated={isAuthenticated} />
      </div>
      {!isAuthenticated && (
        <form>
          <Button onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login With TMDB'}
          </Button>
        </form>
      )}
      {isAuthenticated && (
        <fetcher.Form method="post" action="/">
          <Button
            className="rounded-[10px] px-4 text-alert-light bg-back-dark border border-alert-light hover:bg-gray-dark"
            type="submit"
            name="type"
            value="logout"
            disabled={fetcher.state === 'submitting'} >
            {fetcher.state === 'submitting' ? 'Logging out...' : 'Logout'}
          </Button>
        </fetcher.Form>
      )}
      {error?.isError && <div>{error.message}</div>}
    </div>
  );
}
