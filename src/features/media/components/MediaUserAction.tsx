import { useFetcher } from 'react-router'
import type { User, MovieAccountStates, TvShowAccountStates, AppError } from '@/@types'
import { isAppError } from '@/guards'
import { FaHeart, FaList } from 'react-icons/fa6'
import { AsyncBoundary, ErrorMessage, Button } from '@/components/common'

interface MediaUserActionProps {
  isAuthenticated: boolean;
  sessionId: string;
  user: User;
  mediaAccountStates: Promise<MovieAccountStates | TvShowAccountStates | AppError>;
  path: string;
}

export default function MediaUserAction({ 
  isAuthenticated, 
  sessionId, 
  user, 
  mediaAccountStates, 
  path 
}: MediaUserActionProps) {
  const favFetcher = useFetcher();
  const watchlistFetcher = useFetcher();

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
        if (isAppError(accountStatesData)) return <ErrorMessage error={accountStatesData} />

        return (
          <AsyncBoundary resolve={userDataPromise} errorElement={<div>Error loading user data.</div>}>
            {userData => {
              if (isAppError(userData)) return <ErrorMessage error={userData} />

              const userId = userData.id;

              const isFavSubmitting = favFetcher.state !== "idle" && favFetcher.formData?.get("actionType") === "toggleFavorite";
              const isFavorite = isFavSubmitting
                ? favFetcher.formData?.get('isFavorite') === "true"
                : accountStatesData.favorite;

              const isWatchlistSubmitting = watchlistFetcher.state !== "idle" && watchlistFetcher.formData?.get("actionType") === "toggleWatchlist";
              const isWatchlist = isWatchlistSubmitting
                ? watchlistFetcher.formData?.get('isWatchlist') === "true"
                : accountStatesData.watchlist;

              return (
                <div className="flex items-center gap-1.5">
                  
                  {/* --- FAVORITE FORM --- */}
                  <favFetcher.Form method='post' action={path}>
                    <input type="hidden" name="actionType" value="toggleFavorite" />
                    <input type="hidden" name="mediaId" value={mediaId} />
                    <input type="hidden" name="mediaType" value={mediaType} />
                    <input type="hidden" name="accountId" value={userId} />
                    <input type="hidden" name="isFavorite" value={(!isFavorite).toString()} />
                    
                    <Button 
                      variant="secondary" 
                      shape="circular" 
                      disabled={isFavSubmitting}
                      className={`bg-secondary-dark hover:bg-gray-dark p-3 transition-colors duration-200 ${
                        isFavorite ? 'text-red-500' : 'text-tertiary-light'
                      }`}
                    >
                      <FaHeart />
                    </Button>
                  </favFetcher.Form>

                  {/* --- WATCHLIST FORM --- */}
                  <watchlistFetcher.Form method='post' action={path}>
                    <input type="hidden" name="actionType" value="toggleWatchlist" />
                    <input type="hidden" name="mediaId" value={mediaId} />
                    <input type="hidden" name="mediaType" value={mediaType} />
                    <input type="hidden" name="accountId" value={userId} />
                    <input type="hidden" name="isWatchlist" value={(!isWatchlist).toString()} />
                    
                    <Button 
                      variant="secondary" 
                      shape="circular" 
                      disabled={isWatchlistSubmitting}
                      className={`bg-secondary-dark hover:bg-gray-dark p-3 transition-colors duration-200 ${
                        isWatchlist ? 'text-green-500' : 'text-tertiary-light'
                      }`}
                    >
                      <FaList />
                    </Button>
                  </watchlistFetcher.Form>
                </div>
              );
            }}
          </AsyncBoundary>
        );
      }}
    </AsyncBoundary>
  )
}