import MainLayout, {loader as mainLayoutLoader, action as mainLayoutAction} from '../components/layout/MainLayout';
import Home from '../pages/home/Home';
import { loader as homeLoader } from '../pages/home/loader';
import Search, { loader as searchLoader } from '../pages/Search';
import Discover, { discoverMovieLoader, discoverTvShowLoader } from '../pages/discover';
import MediaDetail from '../pages/mediaDetail/MediaDetail';
import { mediaDetailLoader } from '../pages/mediaDetail/loader';
import { mediaDetailAction } from '../pages/mediaDetail/action';
import People, { loader as peopleLoader } from '../pages/People';
import PersonDetail, { loader as personDetailLoader } from '../pages/PersonDetail';
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
      { path: 'tv', Component: Discover, loader: discoverTvShowLoader },
      { path: 'tv/:id', Component: MediaDetail, loader: mediaDetailLoader, action: mediaDetailAction },
      { path: 'person', Component: People, loader: peopleLoader },
      { path: 'person/:id', Component: PersonDetail, loader: personDetailLoader },
      { path: 'favorite', Component: Favorites },
      { path: 'watchlist', Component: WatchList },
    ],
  },
]);

export default router;
