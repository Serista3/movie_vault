import { useState } from 'react';
import { useRouteLoaderData, useFetcher } from 'react-router';
import { createRequestToken } from '../services/auth.service';
import { type User } from '../types/auth';

import Button from './common/Button';

interface Session {
  sessionId?: string;
  userData?: User;
  isAuthenticated?: boolean;
}

export default function Auth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<{ isError: boolean; message: string }>(
    {
      isError: false,
      message: '',
    }
  );

  const fetcher = useFetcher();
  const data = useRouteLoaderData<Session>('root');
  const isAuthenticated = data?.isAuthenticated;

  const handleLogin = async function () {
    setIsError({ isError: false, message: '' });
    setIsLoading(true);

    const data = await createRequestToken();

    if ('request_token' in data) {
      const requestToken = data.request_token;
      window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/`;
    }

    if ('isError' in data && data.isError) {
      setIsError({ isError: true, message: data.message });
      setIsLoading(false);
    }
  };

  return (
    <div className="user flex flex-col gap-4">
      <div className="username font-semibold text-xl flex items-center gap-3 mb-1">
        <div className='rounded-full bg-back-light w-8 h-8 flex items-center justify-center overflow-hidden text-base'>
          {isAuthenticated ? data?.userData?.username.at(0)?.toUpperCase() : 'G'}
        </div>
        {!isAuthenticated && <div>Guest</div>}
        {isAuthenticated && <div>{data?.userData?.username}</div>}
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
            className="rounded-md px-4 text-alert-light bg-back-dark border border-alert-light shadow-lg hover:bg-gray-dark hover:shadow-xl active:scale-95"
            type="submit"
            name="type"
            value="logout"
            disabled={fetcher.state === 'submitting'}
          >
            {fetcher.state === 'submitting' ? 'Logging out...' : 'Logout'}
          </Button>
        </fetcher.Form>
      )}
      {isError.isError && <div>{isError.message}</div>}
    </div>
  );
}
