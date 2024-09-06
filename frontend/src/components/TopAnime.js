import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getTopAnime } from "../services/jikanService";

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
            <h1 className="text-center mb-4">{getHeading()}</h1>
            <div className="container">
                <div className="row">
                    {topAnime.map(anime => (
                        <div key={anime.mal_id} className="col-md-3 mb-5">
                            <div className="card h-100">
                                <img className="card-img-top" src={anime.images.jpg.image_url} alt={anime.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{anime.title}</h5>
                                    <p className="card-text">
                                        {anime.synopsis
                                            ? anime.synopsis.substring(0, 100) + "..."
                                            : "No description available."}
                                    </p>
                                    <a
                                        href={anime.url}
                                        className="btn btn-primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TopAnime;
