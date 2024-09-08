import React from 'react';
import { Link } from 'react-router-dom';
import './AnimeCard.css';

function AnimeCard({ anime }) {
    console.log("Anime: ", anime);
    return (
        <div className="col-md-3 mb-5">
            <div className="card h-100 card-bg position-relative text-white">
                <img className="card-img-top" src={anime.images.jpg.large_image_url} alt={anime.title} />
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
                        <span className="more-details"><i class="fa-solid fa-star fs-1 text-warning"></i> {anime.score}<br/><i className="fa fa-info-circle"></i> More Details</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default AnimeCard;
