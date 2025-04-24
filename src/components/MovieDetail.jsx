import React from 'react'
import {Dialog, DialogPanel, DialogTitle} from '@headlessui/react'
import { formatNumberToText } from '../utilities/formatNumberToText.js'
import { formatDateToText } from '../utilities/formatDateToText.js'
import { formatNumberToTimeLength } from '../utilities/formatNumberToTimeLength.js'
const MovieDetail = ({props: isLoading, isOpen, setIsOpen, movie}) => {

    const noText = 'N/A'

    return (
        <>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-10 bg-white/20">
                    {
                        isLoading ? null : (
                        <DialogPanel
                            className="min-h-full space-y-4 bg-dark-100 p-12 rounded-lg shadow-xl shadow-dark-100/50 text-white overflow-y-scroll">
                        <div className="flex flex-wrap gap-4 items-center justify-between">
                            <DialogTitle className="font-bold">{movie.title || noText}</DialogTitle>
                            <div className="flex flex-wrap  justify-start sm:justify-center items-center gap-4">
                                <div className="bg-dark-200 p-3 flex items-center justify-center gap-2 text-white rounded-xl">
                                    <img src="star.svg" alt="Star" />
                                    <p>{movie.vote_average ?? movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} <span className="text-gray-100"> / 10 ({movie.popularity.toFixed(0)}) </span></p>
                                </div>
                                <a href={movie.homepage} target="_blank">
                                    Visit Homepage
                                </a>
                            </div>
                        </div>

                        <div className="flex gap-3 text-gray-100">
                            <p className="year">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>

                            <span>•</span>
                            <p className="lang">{movie.original_language}</p>

                            <span>•</span>
                            <p>{formatNumberToTimeLength(movie.runtime)}</p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-5 max-h-[27rem]">
                            <div className="flex flex-wrap gap-4 items-center justify-center">
                                <img src={movie.poster_path ?
                                    `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'} className="rounded-lg max-h-80"/>
                                <img src={movie.backdrop_path ?
                                    `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}` : '/no-movie.png'} className="rounded-lg max-h-80"/>
                            </div>

                            <div className="mt-5">
                                <div className="movie-detail">
                                    <div className="topic">
                                        Genres
                                    </div>
                                    <div className="detail flex flex-wrap gap-3">
                                        {movie.genres.map((genre) => (
                                            <span className="bg-dark-200 px-5 py-1 flex items-center justify-center gap-2 text-white rounded-lg" key={genre.id}>{genre.name}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="movie-detail">
                                    <div className="topic">
                                        Overview
                                    </div>
                                    <div className="detail text-white">
                                        {movie.overview || noText}
                                    </div>
                                </div>
                                <div className="movie-detail">
                                    <div className="topic">
                                        Release Date
                                    </div>
                                    <div className="detail">
                                        {formatDateToText(new Date(movie.release_date)) || noText}
                                    </div>
                                </div>
                                <div className="movie-detail">
                                    <div className="topic">
                                        Countries
                                    </div>
                                    <div className="detail flex flex-wrap gap-2">
                                        {
                                            movie.production_countries.map((country, index) => (
                                                <div className="flex gap-2" key={country.iso_3166_1}>
                                                    <span className="text-nowrap">{country.name}</span>
                                                    { index < movie.production_countries.length - 1 && <span>•</span>}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="movie-detail">
                                    <div className="topic">
                                        Status
                                    </div>
                                    <div className="detail">
                                        {movie.status || noText}
                                    </div>
                                </div>
                                <div className="movie-detail">
                                    <div className="topic">
                                        Language
                                    </div>
                                    <div className="detail flex flex-wrap gap-2">
                                        {
                                            movie.spoken_languages.map((language, index) => (
                                                <div className="flex gap-2" key={language.id}>
                                                    <span className="text-nowrap">{language.name}</span>
                                                    { index < movie.spoken_languages.length - 1 && <span>•</span>}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="movie-detail">
                                    <div className="topic">
                                        Budget
                                    </div>
                                    <div className="detail">
                                        ${ formatNumberToText(movie.budget) || noText}
                                    </div>
                                </div>
                                <div className="movie-detail">
                                    <div className="topic">
                                        Revenue
                                    </div>
                                    <div className="detail">
                                        ${ formatNumberToText(movie.revenue) || noText}
                                    </div>
                                </div>
                                <div className="movie-detail">
                                    <div className="topic">
                                        Tagline
                                    </div>
                                    <div className="detail">
                                        {movie.tagline || noText}
                                    </div>
                                </div>
                                <div className="movie-detail">
                                    <div className="topic">
                                        Production Companies
                                    </div>
                                    <div className="detail flex flex-wrap gap-2">
                                        {
                                            movie.production_companies.map((company, index) => (
                                                    <div key={company.id} className="flex gap-2">
                                                        <span className="text-nowrap">{company.name}</span>
                                                        {index < movie.production_companies.length - 1 && <span>•</span>}
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </DialogPanel>
                        )
                    }
                </div>
            </Dialog>
        </>
    )
}
export default MovieDetail
