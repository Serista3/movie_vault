// --- IMPORTS ---
import { createContext, useState, useEffect, useCallback, useContext } from "react";
import type { MediaGenre } from "@/@types";
import { getGenreMovieList, getGenreTvList } from "@/services";

// --- TYPE DEFINATIONS ---
interface GenresContextType {
  movieGenres: MediaGenre[];
  tvGenres: MediaGenre[];
}

// --- CONTEXT ---
export const GenresContext = createContext<GenresContextType>({
  movieGenres: [],
  tvGenres: [],
});

export default function GenresProvider({ children }: {children: React.ReactNode}) {
  const [movieGenres, setMovieGenres] = useState<MediaGenre[]>([]);
  const [tvGenres, setTvGenres] = useState<MediaGenre[]>([]);

  // --- FUNCTION FETCH GENRES API ---
  const fetchGenres = useCallback(async function() {
    const [movieGenres, tvGenres] = await Promise.all([getGenreMovieList(), getGenreTvList()]);
    setMovieGenres('genres' in movieGenres && Array.isArray(movieGenres.genres) ? movieGenres.genres : []);
    setTvGenres('genres' in tvGenres && Array.isArray(tvGenres.genres) ? tvGenres.genres : []);
  }, []);

  // --- INIT FETCH FUNCTION ---
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

// --- CUSTOM HOOK GENRES ---
export const useGenres = () => useContext(GenresContext);