import React, { useEffect, useState } from 'react';
import { ReactTyped } from 'react-typed';
import { fetchDataFromServer, imageBaseURL, api_key } from '../../utils/api';
import './HomePage.css';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = (page = 1, append = false) => {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${page}`;
        setIsLoading(true);
        fetchDataFromServer(url, (data) => {
            if (append) {
                setMovies((prevMovies) => [...prevMovies, ...data.results]);
                setFilteredMovies((prevMovies) => [...prevMovies, ...data.results]);
            } else {
                setMovies(data.results);
                setFilteredMovies(data.results);
            }
            setIsLoading(false);
        });
    };

    const fetchGenres = () => {
        const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;
        fetchDataFromServer(genresUrl, (data) => setGenres(data.genres));
    };

    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, []);

    useEffect(() => {
        let filtered = movies;

        if (searchQuery) {
            filtered = filtered.filter((movie) =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedGenres.length > 0) {
            filtered = filtered.filter((movie) =>
                selectedGenres.every((genre) => movie.genre_ids.includes(Number(genre)))
            );
        }

        setFilteredMovies(filtered);
    }, [searchQuery, selectedGenres, movies]);

    const loadMoreMovies = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchMovies(nextPage, true);
    };

    const toggleGenreSelection = (genreId) => {
        setSelectedGenres((prev) =>
            prev.includes(genreId)
                ? prev.filter((id) => id !== genreId)
                : [...prev, genreId]
        );
    };

    const openTrailer = (movieId) => {
        const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
            `Trailer ${movieId}`
        )}`;
        window.open(trailerUrl, '_blank');
    };

    return (
        <div className="container">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="title">Welcome to BingeBox</h1>
                    <ReactTyped
                        strings={[
                            'Welcome to BingeBox!',
                            'Discover your next favorite movie.',
                            'Stay updated with the latest hits!',
                        ]}
                        typeSpeed={50}
                        backSpeed={30}
                        loop
                        className="typed-title"
                    />
                   {/* <button className="cta-button">Explore Now</button>*/}
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="filter-section">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <div className="genre-filters">
                    {genres.map((genre) => (
                        <button
                            key={genre.id}
                            onClick={() => toggleGenreSelection(genre.id)}
                            className={`genre-button ${
                                selectedGenres.includes(genre.id) ? 'selected' : ''
                            }`}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
            </section>

            {/* Featured Movies */}
            <section className="featured-section">
                <h2 className="section-title">Featured Movies</h2>
                <div className="movie-grid">
                    {filteredMovies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={`${imageBaseURL}w500${movie.poster_path}`}
                                alt={movie.title}
                                className="movie-image"
                            />
                            <div className="movie-details">
                                <h3 className="movie-title">{movie.title}</h3>
                                <p className="movie-info">
                                    ⭐ {movie.vote_average} | 📅{' '}
                                    {new Date(movie.release_date).getFullYear()}
                                </p>
                                <button
                                    className="trailer-button"
                                    onClick={() => openTrailer(movie.title)}
                                >
                                    Watch Trailer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {isLoading && <p className="loading-text">Loading...</p>}
                {!isLoading && (
                    <button className="load-more-button" onClick={loadMoreMovies}>
                        Load More
                    </button>
                )}
            </section>
        </div>
    );
};

export default HomePage;
