import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getTopAnime } from "../services/jikanService";
import './TopAnime.css';

function TopAnime() {
    const [searchParams] = useSearchParams();
    const filter = searchParams.get('filter'); // Get the filter query param
    const type = searchParams.get('type'); // Get the type query param
    const [topAnime, setTopAnime] = useState([]);

    useEffect(() => {
        const fetchTopAnime = async () => {
            const animeList = await getTopAnime({ filter, type });
            setTopAnime(animeList);
        };

        fetchTopAnime();
    }, [filter, type]);

    const getHeading = () => {
        if (filter === 'bypopularity') {
            return 'Most Popular Animes';
        } else if (filter === 'airing') {
            return 'Top Airing Animes';
        } else if (type === 'tv') {
            return 'Top TV Series';
        } else if (type === 'movie') {
            return 'Top Movies';
        } else {
            return 'Anime List';
        }
    };

    return (
        <>
            <h1 className="ms-4 mb-4 text-white">{getHeading()}</h1>
            <div className="container">
                <div className="row">
                    {topAnime.map(anime => (
                        <div key={anime.mal_id} className="col-md-3 mb-5">
                                <div className="card h-100 card-bg position-relative text-white">
                                    <img className="card-img-top" src={anime.images.jpg.image_url} alt={anime.title} />
                                    <div className="card-body d-flex flex-column">
                                        <div className="mt-auto">
                                            <h5 className="card-title">{anime.title}</h5>
                                            <p className="card-text">
                                                {anime.synopsis
                                                    ? anime.synopsis.substring(0, 120) + "..."
                                                    : "No description available."}
                                            </p>
                                        </div>
                                    </div>
                                    <Link to={`/results/${anime.mal_id}`}>
                                        <div className="overlay d-flex align-items-center justify-content-center">
                                            <span className="more-details">More Details</span>
                                        </div>
                                    </Link>
                                </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TopAnime;