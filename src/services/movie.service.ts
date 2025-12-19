import { API_READ_ACCESS_TOKEN } from "./config";

export const fetchMovies = async function(category: string, page: number){
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + API_READ_ACCESS_TOKEN
            }
        })

        if (!res.ok) {
            throw new Error('Failed to fetch movies data');
        }

        const data = await res.json();
        return data;

    } catch (error) {
        return { isError: true, message: (error as Error).message }
    }

}
