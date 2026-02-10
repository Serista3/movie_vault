// --- IMPORTS ---
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayout, {loader as mainLayoutLoader, action as mainLayoutAction} from '@/components/layout/MainLayout';
import RootErrorBoundary from '@/components/layout/boundary/RootErrorBoundary';

import { loader as homeLoader } from '@/pages/home/loader';
import { loader as searchLoader } from '@/pages/Search';
import { discoverMovieLoader, discoverTvShowLoader } from '@/pages/Discover';
import { mediaDetailLoader } from '@/pages/mediaDetail/loader';
import { mediaDetailAction } from '@/pages/mediaDetail/action';
import { loader as creditsLoader } from '@/pages/Credits';
import { loader as reviewsLoader } from '@/pages/Reviews';
import { loader as seasonsLoader  } from '@/pages/Seasons';
import { loader as seasonDetailLoader } from '@/pages/SeasonDetail';
import { loader as peopleLoader } from '@/pages/People';
import { loader as personDetailLoader } from '@/pages/PersonDetail';
import { loader as favoritesLoader } from '@/pages/Favorites';
import { loader as watchListLoader } from '@/pages/WatchList';

// --- LAZY COMPONENTS ---
const Home = lazy(() => import('@/pages/home/Home'))
const Search = lazy(() => import('@/pages/Search'))
const Discover = lazy(() => import('@/pages/Discover'))
const MediaDetail = lazy(() => import('@/pages/mediaDetail/MediaDetail'))
const Credits = lazy(() => import('@/pages/Credits'))
const Reviews = lazy(() => import('@/pages/Reviews'))
const Seasons = lazy(() => import('@/pages/Reviews'))
const SeasonDetail = lazy(() => import('@/pages/SeasonDetail'))
const People = lazy(() => import('@/pages/People'))
const PersonDetail = lazy(() => import('@/pages/PersonDetail'))
const Favorites = lazy(() => import('@/pages/Favorites'))
const WatchList = lazy(() => import('@/pages/WatchList'))

// --- ROUTER ---
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