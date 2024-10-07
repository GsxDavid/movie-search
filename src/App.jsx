import { useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";

function App() {
	const [sort, setSort] = useState(false);
	const [search, setSearch] = useState("");
	const { movies, getMovies } = useMovies({ search, sort });


  const handleChange = event => {
    setSearch(event.target.value)  
  }

  const handleSort = () => {
	setSort(!sort)
  }

	const handleSubmit = event => {
		event.preventDefault();
		// Manejar las propieades del formularios sin tener que usar dependencias o hooks
		//const fields = Object.fromEntries(new window.FormData(event.target));
		getMovies();
	};

	return (
		<div>
			<form action='' onSubmit={handleSubmit}>
				<input type='text' onChange={handleChange} name='query' placeholder='Psycho, The Silence of the Lambs' />
				<button>Search</button>
				<input type="checkbox" onChange={handleSort} />
			</form>

			<Movies movies={movies} />
		</div>
	);
}

export default App;
