import MainLayout, {loader as mainLayoutLoader, action as mainLayoutAction} from '@/components/layout/MainLayout';
import Home from '@/pages/home/Home';
import { loader as homeLoader } from '@/pages/home/loader';
import Search, { loader as searchLoader } from '@/pages/Search';
import Discover, { discoverMovieLoader, discoverTvShowLoader } from '@/pages/Discover';
import MediaDetail from '@/pages/mediaDetail/MediaDetail';
import { mediaDetailLoader } from '@/pages/mediaDetail/loader';
import { mediaDetailAction } from '@/pages/mediaDetail/action';
import Credits, { loader as creditsLoader } from '@/pages/Credits';
import Reviews, { loader as reviewsLoader } from '@/pages/Reviews';
import Seasons, { loader as seasonsLoader  } from '@/pages/Seasons';
import SeasonDetail, { loader as seasonDetailLoader } from '@/pages/SeasonDetail';
import People, { loader as peopleLoader } from '@/pages/People';
import PersonDetail, { loader as personDetailLoader } from '@/pages/PersonDetail';
import Favorites, { loader as favoritesLoader } from '@/pages/Favorites';
import WatchList, { loader as watchListLoader } from '@/pages/WatchList';
import RootErrorBoundary from '@/components/layout/boundary/RootErrorBoundary';

import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    id: 'root',
    loader: mainLayoutLoader,
    action: mainLayoutAction,
    ErrorBoundary: RootErrorBoundary,
    children: [
      { 
        index: true, 
        Component: Home, 
        loader: homeLoader 
      },
      { 
        path: 'search', 
        Component: Search, 
        loader: searchLoader, 
        shouldRevalidate: ({ currentUrl, nextUrl }) => {
          return currentUrl.toString() !== nextUrl.toString();
        },
        children: [
        { 
          path: 'movie', 
          Component: Search 
        },
        { 
          path: 'tv', 
          Component: Search 
        },
        { 
          path: 'person', 
          Component: Search 
        }
      ] },
      { path: 'movie', Component: Discover, loader: discoverMovieLoader },
      { path: 'movie/:id', Component: MediaDetail, loader: mediaDetailLoader, action: mediaDetailAction },
      { path: 'movie/:id/cast', Component: Credits, loader: creditsLoader },
      { path: 'movie/:id/reviews', Component: Reviews, loader: reviewsLoader },
      { path: 'tv', Component: Discover, loader: discoverTvShowLoader },
      { path: 'tv/:id', Component: MediaDetail, loader: mediaDetailLoader, action: mediaDetailAction },
      { path: 'tv/:id/cast', Component: Credits, loader: creditsLoader },
      { path: 'tv/:id/reviews', Component: Reviews, loader: reviewsLoader },
      { path: 'tv/:id/seasons', Component: Seasons, loader: seasonsLoader },
      { path: 'tv/:id/season/:seasonNumber', Component: SeasonDetail, loader: seasonDetailLoader },
      { path: 'person', Component: People, loader: peopleLoader },
      { path: 'person/:id', Component: PersonDetail, loader: personDetailLoader },
      { path: 'user/:id/favorites/movie', Component: Favorites, loader: favoritesLoader },
      { path: 'user/:id/favorites/tv', Component: Favorites, loader: favoritesLoader },
      { path: 'user/:id/watchlist/movie', Component: WatchList, loader: watchListLoader },
      { path: 'user/:id/watchlist/tv', Component: WatchList, loader: watchListLoader },
    ],
  },
]);

export default router;