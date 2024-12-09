import React, { useEffect, useState } from 'react';
import { fetchDataFromServer, imageBaseURL, api_key } from '../../utils/api';
import './HomePage.css';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Fetch popular movies and genres on load
    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;
        fetchDataFromServer(url, (data) => {
            setMovies(data.results);
            setFilteredMovies(data.results);
        });

        const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;
        fetchDataFromServer(genresUrl, (data) => setGenres(data.genres));
    }, []);

    // Filter movies by search query or genre
    useEffect(() => {
        let filtered = movies;

        if (searchQuery) {
            filtered = filtered.filter((movie) =>
                movie.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedGenre !== 'all') {
            filtered = filtered.filter((movie) =>
                movie.genre_ids.includes(Number(selectedGenre))
            );
        }

        setFilteredMovies(filtered);
    }, [searchQuery, selectedGenre, movies]);

    // Handle search functionality
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);

        const timeoutId = setTimeout(() => {
            const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuery}&page=1&include_adult=false`;
            fetchDataFromServer(searchUrl, ({ results }) => {
                setSearchResults(results || []);
                setIsSearching(false);
            });
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    return (
        <div className="container">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="title">Welcome to BingeBox</h1>
                    <p className="subtitle">
                        Discover the latest and greatest movies, curated just for you.
                    </p>
                    <button className="cta-button">Explore Now</button>
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
                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="genre-select"
                >
                    <option value="all">All Genres</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>

                {/* Search Results Modal */}
                {searchResults.length > 0 && (
                    <div className="search-modal">
                        <p className="label">Results for "{searchQuery}"</p>
                        <div className="movie-list">
                            <div className="grid-list">
                                {searchResults.map((movie) => (
                                    <div key={movie.id} className="movie-card">
                                        <img
                                            src={`${imageBaseURL}w500${movie.poster_path}`}
                                            alt={movie.title}
                                            className="movie-image"
                                        />
                                        <h3 className="movie-title">{movie.title}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading Indicator */}
                {isSearching && <p>Loading...</p>}
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
                            <h3 className="movie-title">{movie.title}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
