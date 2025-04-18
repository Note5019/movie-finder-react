import {useEffect, useState} from "react";
import Search from "./components/Search.jsx";
import {useDebounce} from "react-use";
import MovieCard from "./components/MovieCard.jsx";

const Card = ({title}) => {
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        console.log(`${title} has been liked: ${hasLiked}`)
    });

    return (
        <div className="card">
            <h2>{title}</h2>

            <button onClick={() => setHasLiked(!hasLiked)}>
                {hasLiked ? "Liked" : "Like"}
            </button>
        </div>
    );
};

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
    const [movieList, setMovieList] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const fetchMovies = async (query = '') => {
        setIsLoading(true)
        setErrorMessage('')

        try {
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS)

            if (!response.ok) {
                throw new Error('Failed to fetch movies')
            }

            const data = await response.json()
            console.log('data', data)
            if (data.Response === 'False') {
                setErrorMessage(data.Error || 'Failed to fetch movies')
                setMovieList([])
            }

            setMovieList(data.results || [])
            console.log('movieList', movieList)
        } catch (error) {
            console.error(error)
            setErrorMessage('Error fetching movies. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

    useEffect(() => {
        fetchMovies(debouncedSearchTerm)
    }, [debouncedSearchTerm])

    return (
        <main>
            <div className="pattern"/>

            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Movies"/>
                    <h1>Find <span className="text-gradient">Movies</span> You&#39;ll Love Without the Hassle</h1>

                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                    <span className="text-white">{searchTerm}</span>
                </header>

                <section className="trending">
                    trending
                </section>

                <section className="all-movies">
                    <h2>Popular</h2>
                    <ul>
                        {
                            movieList.map(movie => (<MovieCard key={movie.id} movie={movie}/>))
                        }
                    </ul>
                </section>
            </div>
        </main>
    );
};

export default App;
