import MediaSlider from "../components/MediaSlider";
import MediaSection from "../components/MediaSection";
import LazyMediaRow from "../components/LazyMediaRow";
import ToggleSwitch from "../components/ToggleSwitch";

import type { MediaResponse, MediaSummary, AppError } from "../types";

import { getMovieLists, getMovieVideos } from "../services/movie.service";
import { getTvShowList } from "../services/tv.service";
import { getTrending } from "../services/trending.service";

import { useReducer } from "react";

interface SectionAction {
  type: 'CHANGE_MODE';
  title: string;
  mode: string;
}

interface SectionState {
  title: string;
  modes: string[];
  curMode: string;
  fetchFunction: (...args: any[]) => Promise<MediaResponse<MediaSummary> | AppError>;
  fetchArgs: any[];
}

const defaultSections: SectionState[] = [
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

function getArgsByMode(title: string, mode: string): any[] {
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

const selectModeReducer = function(prevState: SectionState[], action: SectionAction): SectionState[] {
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
    }
    
  })
}

export default function Home() {
  const [sections, dispatchSection] = useReducer(selectModeReducer, defaultSections);

  const handleToggleChange = function(title: string, mode: string) {
    dispatchSection({ type: 'CHANGE_MODE', title, mode });
  }

  return (
    <div className="home flex flex-col gap-10 pb-8">
      <MediaSlider />
      <div className="media-sections flex flex-col items-center gap-15 mb-20">
        {sections.map((section) => {
          return (
            <MediaSection key={section.title} title={section.title} className="max-w-300">
              <ToggleSwitch 
                title={section.title}
                modes={section.modes} 
                onChange={handleToggleChange} 
                activeMode={section.curMode} 
              />
              <LazyMediaRow
                key={`${section.title}-${section.curMode}`}
                fetchFunction={section.fetchFunction} 
                fetchArgs={section.fetchArgs} 
              />
            </MediaSection>
          )
        })}
      </div>
    </div>
  );
}

export const loader = async function(): Promise<MediaSummary[] | AppError> {
  const nowPlayingMovies = await getMovieLists("now_playing", 1);

  if('isError' in nowPlayingMovies)
    return nowPlayingMovies;

  const top3NowPlaying = nowPlayingMovies.results.slice(0, 3);
  
  const movieWithTrailers = await Promise.all(
    top3NowPlaying.map(async (movie) => {
      const movieVideos = await getMovieVideos(movie.id);

      if('results' in movieVideos){
        const trailer = movieVideos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        return {
          ...movie,
          trailerKey: trailer ? trailer.key : undefined
        }
      }

      return movie;
    })
  )

  return movieWithTrailers;
}
