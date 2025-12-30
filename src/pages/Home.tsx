import Slider from "../components/common/Slider";
import MediaSection from "../components/MediaSection";
import MediaList from "../components/MediaList";
import ToggleSwitch from "../components/ToggleSwitch";

import type { MediaSummary, MovieSummary } from "../types";

import { getMovieLists, getMovieVideos } from "../services/movie.service";
import { getTvShowList } from "../services/tv.service";
import { getTrending } from "../services/trending.service";

import { useLoaderData } from "react-router";

export default function Home() {
  const loaderData = useLoaderData<{top3NowPlaying: MediaSummary[]}>()

  return (
    <div className="home flex flex-col gap-10 pb-8">
      <Slider items={loaderData.top3NowPlaying} />
      <MediaSection title="Trending" className="max-w-300 mx-auto mb-8">
        <ToggleSwitch modes={['Today', 'This Week']} />
        <MediaList fetchFunction={getTrending<MovieSummary>} fetchArgs={['all', 'day']} />
      </MediaSection>
      <MediaSection title="Top Rated" className="max-w-300 mx-auto mb-8">
        <ToggleSwitch modes={['Movies', 'TvShows']} />
        <MediaList fetchFunction={getMovieLists} fetchArgs={["top_rated", 1]} />
      </MediaSection>
      <MediaSection title="Popular" className="max-w-300 mx-auto mb-8">
        <ToggleSwitch modes={['Movies', 'TvShows']} />
        <MediaList fetchFunction={getTvShowList} fetchArgs={["popular", 1]} />
      </MediaSection>
    </div>
  );
}

export const loader = async function() {
  const nowPlayingMovies = await getMovieLists("now_playing", 1);

  if(!nowPlayingMovies || !('results' in nowPlayingMovies))
    return { top3NowPlaying: [] };

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

  return { top3NowPlaying: movieWithTrailers };
}
