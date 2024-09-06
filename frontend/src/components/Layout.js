import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import brand from '../brand.png';
import './Layout.css';  // Import custom CSS
import axios from 'axios';

function Layout() {
    const [searchInput, setSearchInput] = useState('');
    const [animeResults, setAnimeResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchInput.trim().length > 2) {
            axios.get(`https://api.jikan.moe/v4/anime?q=${searchInput.trim()}&sfw=true&limit=5`)
                .then(response => {
                    setAnimeResults(response.data.data);
                    setShowDropdown(true);
                })
                .catch(error => console.error(error));
        } else {
            setAnimeResults([]);
            setShowDropdown(false);
        }
    }, [searchInput]);

    function handleSearch(e) {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/results/${searchInput.trim()}`);
            setSearchInput('');
            setAnimeResults([]);
            setShowDropdown(false);
        }
    }

    function handleInputChange(e) {
        setSearchInput(e.target.value);
    }

    function handleSelectAnime(anime) {
        setSearchInput(anime.title);
        navigate(`/results/${anime.mal_id}`);
        setAnimeResults([]);
        setShowDropdown(false);
    }

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to='/'>
                            <img src={brand} className="img-fluid brand-image" alt="Brand" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to='/anime?filter=bypopularity'>Most Popular</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/anime?filter=airing'>Top Airing</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/anime?type=movie'>Movies</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/anime?type=tv'>TV Series</Link>
                                </li>
                            </ul>
                            <form className="d-flex search-form" onSubmit={handleSearch}>
                                <div className="position-relative">
                                    <input
                                        className="form-control search-input"
                                        type="search"
                                        placeholder="Search..."
                                        aria-label="Search"
                                        value={searchInput}
                                        onChange={handleInputChange}
                                    />
                                    {showDropdown && (
                                        <div className="dropdown-menu show position-absolute w-100">
                                            {animeResults.map(anime => (
                                                <div
                                                    key={anime.mal_id}
                                                    className="dropdown-item d-flex align-items-center"
                                                    onClick={() => handleSelectAnime(anime)}
                                                >
                                                    <img src={anime.images.jpg.image_url} alt={anime.title_english || anime.title} className="me-2" style={{ width: '50px', height: '70px', objectFit: 'cover' }} />
                                                    <span>{anime.title_english || anime.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="main-content">
                <Outlet />
            </main>
        </>
    )
}

export default Layout;
