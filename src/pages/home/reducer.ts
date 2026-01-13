import { getMovieLists } from "../../services/movie.service";
import { getTvShowList } from "../../services/tv.service";
import { getTrending } from "../../services/trending.service";

import type { MediaResponse, MediaSummary, AppError, TrendingType, TimeWindow } from "../../types";

type TrendingParams = [TrendingType, TimeWindow];
type MediaListParams = [string, number];

interface SectionAction {
  type: 'CHANGE_MODE';
  title: string;
  mode: string;
}

interface BaseSection {
  modes: string[];
  curMode: string;
}

interface TrendingSection extends BaseSection {
  title: 'Trending';
  fetchFunction: (...args: TrendingParams) => Promise<MediaResponse<MediaSummary> | AppError>;
  fetchArgs: TrendingParams;
}

interface CommonMediaSection extends BaseSection {
  title: 'Tv Series' | 'Popular' | 'Movies';
  fetchFunction: (...args: MediaListParams) => Promise<MediaResponse<MediaSummary> | AppError>;
  fetchArgs: MediaListParams;
}

type SectionState = TrendingSection | CommonMediaSection;

export const defaultSections: SectionState[] = [
  { 
    title: 'Trending', 
    modes: ['Today', 'This Week'], 
    curMode: 'Today', 
    fetchFunction: getTrending<MediaSummary>, 
    fetchArgs: ['all', 'day'] 
  },
  { 
    title: 'Tv Series', 
    modes: ['Airing Today', 'On The Air'], 
    curMode: 'Airing Today', 
    fetchFunction: getTvShowList, 
    fetchArgs: ["airing_today", 1] 
  },
  { 
    title: 'Popular', 
    modes: ['Movies', 'TvShows'], 
    curMode: 'Movies', 
    fetchFunction: getMovieLists, 
    fetchArgs: ["popular", 1] 
  },
  { 
    title: 'Movies', 
    modes: ['Now Playing', 'Upcoming'], 
    curMode: 'Now Playing', 
    fetchFunction: getMovieLists, 
    fetchArgs: ["now_playing", 1] 
  },
];

function getArgsByMode(title: string, mode: string): [string, number | string] {
  switch (title) {
    case 'Trending': 
      return mode === 'Today' ? ['all', 'day'] : ['all', 'week'];
    case 'Tv Series': 
      return mode === 'Airing Today' ? ['airing_today', 1] : ['on_the_air', 1];
    case 'Popular': 
      return mode === 'Movies' ? ['popular', 1] : ['popular', 1];
    case 'Movies': 
      return mode === 'Now Playing' ? ['now_playing', 1] : ['upcoming', 1];
    default: 
      return [mode, 1];
  }
}

export const selectModeReducer = function(prevState: SectionState[], action: SectionAction): SectionState[] {
  if(!(action.type === 'CHANGE_MODE')) return prevState;

  return prevState.map(section => {
    if(section.title !== action.title) return section;

    const newFetchArgs = getArgsByMode(section.title, action.mode);
    let newFetchFunction = section.fetchFunction;

    if(section.title === 'Popular'){
      newFetchFunction = action.mode === 'TvShows' ? getTvShowList : getMovieLists;
    }

    return {
      ...section,
      curMode: action.mode,
      fetchFunction: newFetchFunction,
      fetchArgs: newFetchArgs
    } as SectionState;
  })
}
