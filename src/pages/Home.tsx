import { useEffect } from "react";
import { getMovieImages } from "../services/movie.service";

export default function Home() {
  const getData = async () => {
    const data = await getMovieImages(123);
    console.log(data);
  }

  useEffect(() => {
    getData()
  }, [])

  return <h1>Home Page</h1>;
}
