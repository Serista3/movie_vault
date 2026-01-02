import MainLayout, {loader as mainLayoutLoader, action as mainLayoutAction} from '../components/layout/MainLayout';
import Home, { loader as homeLoader } from '../pages/Home';
import Movies from '../pages/Movies';
import MediaDetail, { loader as mediaDetailLoader  } from '../pages/MediaDetail';
import TvShows from '../pages/TvShows';
import People from '../pages/People';
import PersonDetail from '../pages/PersonDetail';
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
      { index: true, Component: Home, loader: homeLoader },
      { path: 'movie', Component: Movies },
      { path: 'movie/:id', Component: MediaDetail, loader: mediaDetailLoader },
      { path: 'tv', Component: TvShows },
      { path: 'tv/:id', Component: MediaDetail, loader: mediaDetailLoader },
      { path: 'person', Component: People },
      { path: 'person/:id', Component: PersonDetail },
      { path: 'favorite', Component: Favorites },
      { path: 'watchlist', Component: WatchList },
    ],
  },
]);

export default router;
