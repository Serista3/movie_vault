import type { MediaSummary, AppError } from "../../types";
import { getMovieLists, getMovieVideos } from "../../services/movie.service";

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
