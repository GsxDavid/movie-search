import { useMemo, useState } from "react";
import withoutResults from "../mocks/no-results.json";

export function useMovies({ search, sort }) {
	const [responseMovies, setResponseMovies] = useState([]);
	const api_key = import.meta.env.VITE_MOVIE_API_KEY;
	
	const movies = responseMovies.Search;

	const mappedMovies = movies?.map(movie => ({
		id: movie.imdbID,
		title: movie.Title,
		year: movie.Year,
		poster: movie.Poster,
	}));

	const getMovies = useMemo(() => {
		return () => {
			if (search) {
				fetch(`https://www.omdbapi.com/?apikey=${api_key}=${search}`)
					.then(res => res.json())
					.then(json => {
						setResponseMovies(json);
					});
			} else {
				setResponseMovies(withoutResults);
			}
		};
	}, [search, api_key]);

	const sortedMovies = sort ? [...mappedMovies].sort((a, b) => a.title.localeCompare(b.title)) : mappedMovies;

	return { movies: sortedMovies, getMovies };
}
