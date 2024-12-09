import React, { useEffect, useState } from 'react';
import { fetchDataFromServer, imageBaseURL, api_key } from '../../utils/api';

//import { fetchDataFromServer, imageBaseURL, api_key } from './api'; // Adjust path as necessary

const HomePage = () => {
    const [movies, setMovies] = useState([]); // State to store fetched movies

    // Fetch movies when the component mounts
    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;
        fetchDataFromServer(url, (data) => setMovies(data.results));
    }, []);

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <section style={styles.hero}>
                <h1 style={styles.title}>Welcome to BingeBox</h1>
                <p style={styles.subtitle}>
                    Discover the latest and greatest movies, curated just for you.
                </p>
                <button style={styles.ctaButton}>Explore Now</button>
            </section>

            {/* Featured Movies */}
            <section style={styles.featuredSection}>
                <h2 style={styles.sectionTitle}>Featured Movies</h2>
                <div style={styles.movieGrid}>
                    {movies.map((movie) => (
                        <div key={movie.id} style={styles.movieCard}>
                            <img
                                src={`${imageBaseURL}w500${movie.poster_path}`}
                                alt={movie.title}
                                style={styles.movieImage}
                            />
                            <h3 style={styles.movieTitle}>{movie.title}</h3>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        margin: '0 auto',
        maxWidth: '1200px',
        padding: '20px',
    },
    hero: {
        textAlign: 'center',
        backgroundColor: '#1c1c1c',
        color: '#fff',
        padding: '50px 20px',
        borderRadius: '10px',
    },
    title: {
        fontSize: '3rem',
        marginBottom: '10px',
    },
    subtitle: {
        fontSize: '1.5rem',
        marginBottom: '20px',
    },
    ctaButton: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#e50914',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    featuredSection: {
        marginTop: '40px',
    },
    sectionTitle: {
        fontSize: '2rem',
        marginBottom: '20px',
    },
    movieGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
    },
    movieCard: {
        textAlign: 'center',
        padding: '10px',
        backgroundColor: '#f4f4f4',
        borderRadius: '10px',
    },
    movieImage: {
        width: '100%',
        height: 'auto',
        borderRadius: '5px',
    },
    movieTitle: {
        marginTop: '10px',
        fontSize: '1.2rem',
    },
};

export default HomePage;
