import Slider from "../components/common/Slider";
import MediaRow from "../components/MediaRow";
import MediaList from "../components/MediaList";
import ToggleSwitch from "../components/ToggleSwitch";

import type { MediaSummary, MovieSummary } from "../types";

import { getMovieLists } from "../services/movie.service";
import { getTvShowList } from "../services/tv.service";
import { getTrending } from "../services/trending.service";

import { useLoaderData } from "react-router";

export default function Home() {
  const loaderData = useLoaderData<{top3NowPlaying: MediaSummary[]}>()

  return (
    <div className="home flex flex-col gap-10 py-8">
      <Slider items={loaderData.top3NowPlaying} />
      <MediaRow title="Trending">
        <ToggleSwitch modes={['Today', 'This Week']} />
        <MediaList fetchFunction={getTrending<MovieSummary>} fetchArgs={['all', 'day']} />
      </MediaRow>
      <MediaRow title="Top Rated">
        <ToggleSwitch modes={['Movies', 'TvShows']} />
        <MediaList fetchFunction={getMovieLists} fetchArgs={["top_rated", 1]} />
      </MediaRow>
      <MediaRow title="Popular">
        <ToggleSwitch modes={['Movies', 'TvShows']} />
        <MediaList fetchFunction={getTvShowList} fetchArgs={["popular", 1]} />
      </MediaRow>
    </div>
  );
}

export const loader = async function() {
  const nowPlayingMovies = await getMovieLists("now_playing", 1);

  if('results' in nowPlayingMovies){
    return { top3NowPlaying: nowPlayingMovies?.results.slice(0, 3) };
  }

  return null;
}
