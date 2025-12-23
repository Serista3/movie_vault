import MediaList from "../components/MediaList";

import type { MovieSummary } from "../types";

import { getMovieLists } from "../services/movie.service";
import { getTvShowList } from "../services/tv.service";
import { getTrending } from "../services/trending.service";

export default function Home() {
  return (
    <div className="home flex flex-col gap-25 py-8">
      <div className="px-4">
        <MediaList fetchFunction={getTrending<MovieSummary>} fetchArgs={['movie', 'day']} />
      </div>
      <div className="px-4">
        <MediaList fetchFunction={getMovieLists} fetchArgs={["top_rated", 1]} />
      </div>
      <div className="px-4">
        <MediaList fetchFunction={getTvShowList} fetchArgs={["popular", 1]} />
      </div>
    </div>
  );
}
