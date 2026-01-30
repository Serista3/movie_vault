import MainLayout, {loader as mainLayoutLoader, action as mainLayoutAction} from '../components/layout/MainLayout';
import Home from '../pages/home/Home';
import { loader as homeLoader } from '../pages/home/loader';
import Search, { loader as searchLoader } from '../pages/Search';
import Movies from '../pages/Movies';
import MediaDetail, { loader as mediaDetailLoader } from '../pages/MediaDetail';
import TvShows from '../pages/TvShows';
import People, { loader as peopleLoader } from '../pages/People';
import PersonDetail from '../pages/PersonDetail';
import Favorites from '../pages/Favorites';
import WatchList from '../pages/WatchList';
import RootErrorBoundary from '../components/layout/RootErrorBoundary';

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
      { index: true, Component: Home, loader: homeLoader },
      { path: 'search', Component: Search, loader: searchLoader, children: [
        { path: 'movie', Component: Search },
        { path: 'tv', Component: Search },
        { path: 'person', Component: Search }
      ] },
      { path: 'movie', Component: Movies },
      { path: 'movie/:id', Component: MediaDetail, loader: mediaDetailLoader },
      { path: 'tv', Component: TvShows },
      { path: 'tv/:id', Component: MediaDetail, loader: mediaDetailLoader },
      { path: 'person', Component: People, loader: peopleLoader },
      { path: 'person/:id', Component: PersonDetail },
      { path: 'favorite', Component: Favorites },
      { path: 'watchlist', Component: WatchList },
    ],
  },
]);

export default router;
