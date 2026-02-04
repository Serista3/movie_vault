import { createContext, useState, useEffect, useCallback, useContext } from "react";

import type { MediaGenre } from "../types";
import { getGenreMovieList, getGenreTvList } from "../services/genre.service";

interface GenresContextType {
  movieGenres: MediaGenre[];
  tvGenres: MediaGenre[];
}

export const GenresContext = createContext<GenresContextType>({
  movieGenres: [],
  tvGenres: [],
});

export default function GenresProvider({ children }: {children: React.ReactNode}) {
  const [movieGenres, setMovieGenres] = useState<MediaGenre[]>([]);
  const [tvGenres, setTvGenres] = useState<MediaGenre[]>([]);

  const fetchGenres = useCallback(async function() {
    const [movieGenres, tvGenres] = await Promise.all([getGenreMovieList(), getGenreTvList()]);
    setMovieGenres(Array.isArray(movieGenres) ? movieGenres : []);
    setTvGenres(Array.isArray(tvGenres) ? tvGenres : []);
  }, []);


  useEffect(() => {
    fetchGenres();
  }, [fetchGenres])

  const ctxValue: GenresContextType = {
    movieGenres,
    tvGenres,
  }

  return (
    <GenresContext.Provider value={ctxValue}>
      {children}
    </GenresContext.Provider>
  )
}

export const useGenres = () => useContext(GenresContext);