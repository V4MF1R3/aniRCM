import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getTopAnime } from "../services/jikanService";
import AnimeCard from './AnimeCard';
// import './TopAnime.css'; // Or keep CSS in this file if you prefer

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
                        <AnimeCard key={anime.mal_id} anime={anime} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default TopAnime;
