import {useEffect, useState} from "react";
import Search from "./components/Search.jsx";
import {useDebounce} from "react-use";
import MovieCard from "./components/MovieCard.jsx";
import Pagination from "./components/Pagination.jsx";
import Spinner from "./components/Spinner.jsx";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET', headers: {
        accept: 'application/json', Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
    const [movieList, setMovieList] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const fetchMovies = async (query = '') => {
        setIsLoading(true)
        setErrorMessage('')

        try {
            const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${currentPage}` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${currentPage}`;
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
            setCurrentPage(Number(data.page))
            setTotalPage(Number(data.total_pages))
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
    }, [debouncedSearchTerm, currentPage])

    return (<main>
        <div className="pattern"/>

        <div className="wrapper">
            <header>
                <img src="./hero.png" alt="Movies"/>
                <h1>Find <span className="text-gradient">Movies</span> You&#39;ll Love Without the Hassle</h1>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </header>

            <section className="trending">
                trending
            </section>

            <section className="all-movies">
                <h2>Popular</h2>
                {isLoading ? (<div className="flex justify-center items-center m-10">
                    <Spinner/>
                </div>) : errorMessage ? (<p className="text-red-500">{errorMessage}</p>) : (<ul>
                    {movieList.map(movie => (<MovieCard key={movie.id} movie={movie}/>))}
                </ul>)}

            </section>

            <Pagination currentPage={currentPage}
                        totalPage={totalPage}
                        nextPage={() => currentPage >= totalPage ? null : setCurrentPage((prevState) => prevState + 1)}
                        previousPage={() => currentPage <= 1 ? null : setCurrentPage((prevState) => prevState - 1)}/>
        </div>
    </main>);
};

export default App;
