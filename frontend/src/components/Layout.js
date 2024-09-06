import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import brand from '../brand.png';
import './Layout.css';  // Import custom CSS

function Layout() {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    function handleSearch(e) {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/results/${searchInput.trim()}`);
            setSearchInput('');
        }
    }

    function handleInputChange(e) {
        setSearchInput(e.target.value);
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
                                <input
                                    className="form-control search-input"
                                    type="search"
                                    placeholder="Search..."
                                    aria-label="Search"
                                    value={searchInput}
                                    onChange={handleInputChange}
                                />
                                {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
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
