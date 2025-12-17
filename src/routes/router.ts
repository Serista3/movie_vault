import MainLayout, {loader as mainLayoutLoader, action as mainLayoutAction} from '../components/layout/MainLayout';
import Home from '../pages/Home';
import Movies from '../pages/Movies';
import TvShows from '../pages/TvShows';
import People from '../pages/People';
import Favorites from '../pages/Favorites';
import WatchList from '../pages/WatchList';

import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    id: 'root',
    loader: mainLayoutLoader,
    action: mainLayoutAction,
    children: [
      { index: true, Component: Home },
      { path: 'movies', Component: Movies },
      { path: 'tv-shows', Component: TvShows },
      { path: 'people', Component: People },
      { path: 'favorites', Component: Favorites },
      { path: 'watchlist', Component: WatchList },
    ],
  },
]);

export default router;
