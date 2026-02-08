import { useFetcher } from 'react-router'

import type { User, MovieAccountStates, TvShowAccountStates, AppError } from '../../types'

import { FaHeart, FaList } from 'react-icons/fa6'

import AsyncBoundary from '../../components/AsyncBoundary'
import ErrorMessage from '../../components/common/ErrorMessage'
import Button from '../../components/common/Button'

interface MediaUserActionProps {
  isAuthenticated: boolean;
  sessionId: string;
  user: User;
  mediaAccountStates: Promise<MovieAccountStates | TvShowAccountStates | AppError>;
  path: string;
}

export default function MediaUserAction({ isAuthenticated, sessionId, user, mediaAccountStates, path }: MediaUserActionProps) {
  const fetcher = useFetcher();
  const mediaType = path.split('/')[1] === 'movie' ? 'movie' : 'tv';
  const mediaId = path.split('/')[2];
  const userDataPromise = Promise.resolve(user) as Promise<User | AppError>;
  
  if(!isAuthenticated || !sessionId) return null;

  return (
    <AsyncBoundary 
      resolve={mediaAccountStates} 
      errorElement={<div>Error loading account states.</div>}
    >
      {accountStatesData => {
        if ('isError' in accountStatesData) return <ErrorMessage error={accountStatesData} />

        return (
          <AsyncBoundary resolve={userDataPromise} errorElement={<div>Error loading user data.</div>}>
            {userData => {
              if ('isError' in userData) return <ErrorMessage error={userData} />

              const userId = userData.id;

              const isSubmitting = fetcher.state !== "idle";
              const actionType = fetcher.formData?.get("actionType");

              const isFavorite = (isSubmitting && actionType === "toggleFavorite")
                ? fetcher.formData?.get("isFavorite") === "true"
                : accountStatesData.favorite;

              const isWatchlist = (isSubmitting && actionType === "toggleWatchlist")
                ? fetcher.formData?.get("isWatchlist") === "true"
                : accountStatesData.watchlist;

              return (
                <div className="flex items-center gap-1.5">
                  
                  {/* --- FAVORITE FORM --- */}
                  <fetcher.Form method='post' action={path}>
                    <input type="hidden" name="actionType" value="toggleFavorite" />
                    <input type="hidden" name="mediaId" value={mediaId} />
                    <input type="hidden" name="mediaType" value={mediaType} />
                    <input type="hidden" name="accountId" value={userId} />
                    <input type="hidden" name="isFavorite" value={(!isFavorite).toString()} />
                    {/* --- FAVORITE BUTTON --- */}
                    <Button 
                      variant="secondary" 
                      shape="circular" 
                      disabled={isSubmitting && actionType === "toggleFavorite"}
                      className={`bg-secondary-dark hover:bg-gray-dark p-3 transition-colors duration-200 
                        ${isFavorite && 'text-red-500'} 
                        ${isSubmitting && actionType === "toggleFavorite" && 'opacity-50 cursor-auto'}
                      `}
                    >
                      <FaHeart />
                    </Button>
                  </fetcher.Form>

                  {/* --- WATCHLIST FORM --- */}
                  <fetcher.Form method='post' action={path}>
                    <input type="hidden" name="actionType" value="toggleWatchlist" />
                    <input type="hidden" name="mediaId" value={mediaId} />
                    <input type="hidden" name="mediaType" value={mediaType} />
                    <input type="hidden" name="accountId" value={userId} />
                    <input type="hidden" name="isWatchlist" value={(!isWatchlist).toString()} />
                    {/* --- WATCHLIST BUTTON --- */}
                    <Button 
                      variant="secondary" 
                      shape="circular" 
                      disabled={isSubmitting && actionType === "toggleWatchlist"}
                      className={`bg-secondary-dark hover:bg-gray-dark p-3 transition-colors duration-200 
                        ${isWatchlist && 'text-green-500'}
                        ${isSubmitting && actionType === "toggleWatchlist" && 'opacity-50 cursor-auto'}
                      `}
                    >
                      <FaList />
                    </Button>
                  </fetcher.Form>
                </div>
              );
            }}
          </AsyncBoundary>
        );
      }}
    </AsyncBoundary>
  )
}