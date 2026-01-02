import { useLoaderData, type LoaderFunctionArgs } from "react-router"

import { getMovie, getMovieVideos } from "../services/movie.service";
import { getTvShow } from "../services/tv.service";

export default function MediaDetail(){
  const data = useLoaderData();
  console.log('Media Detail Data:', data);

  return (
    <div>Media Detail Page</div>
  )
}



export const loader = async function({ request, params }: LoaderFunctionArgs) {
  const { id } = params;
  const url = new URL(request.url);
  const mediaType = url.pathname.split('/')[1] === 'movie' ? 'movie' : 'tv';
  const mediaId = id ? parseInt(id) : null;
  
  if (!mediaId) return { isError: true, message: 'Invalid media ID.' };
  
  const mediaData = mediaType === 'movie'
    ? await getMovie(mediaId)
    : await getTvShow(mediaId);

  return {
    ...mediaData,
    trailerPromise: getMovieVideos(mediaId)
  }
}
