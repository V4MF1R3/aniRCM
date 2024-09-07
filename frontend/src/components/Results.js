import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAnimeDetails } from "../services/jikanService";
import { fetchRecommendations } from "../services/flaskServices";
import './Result.css';

function Results() {

    const { mal_id } = useParams();
    const [animeDetails, setAnimeDetails] = useState();
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchDetailsAndRecommendations = async () => {
            try {
                const details = await getAnimeDetails(mal_id);
                console.log("Fetched Anime Details:", details); // Log the fetched details
                setAnimeDetails(details);
    
                const recommendedAnime = await fetchRecommendations(mal_id);
                setRecommendations(recommendedAnime);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchDetailsAndRecommendations();
    }, [mal_id]);

    const modifyEmbedUrl = (url) => {
        const urlObj = new URL(url);
        urlObj.searchParams.set('autoplay', '0'); // Turn off autoplay
        return urlObj.toString();
    };
    

    if (!animeDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4 text-white">
        {/* Anime Details Section */}
        <div className="row">
            <div className="ms-4 col-md-4">
                <img
                    className="img-fluid"
                    src={animeDetails.images.webp.large_image_url}
                    alt={animeDetails.title}
                />
            </div>
            <div className="p-4 col-md-7 d-flex align-items-center transparent-black-bg">
                <div><h2>{animeDetails.title}</h2>
                <p><strong>Score:</strong> {animeDetails.score}</p>
                <p><strong>Status:</strong> {animeDetails.status}</p>
                <p><strong>Episodes:</strong> {animeDetails.episodes}</p>
                <p>{animeDetails.synopsis}</p>
                <a
                    href={animeDetails.url}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View on MyAnimeList
                </a></div>
            </div>
        </div>
        {animeDetails.trailer?.embed_url && (
                <div className="mx-auto my-4 justify-content-center video-container">
                    <iframe
                        title={animeDetails.title}
                        src={modifyEmbedUrl(animeDetails.trailer.embed_url)}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="video-frame"
                    ></iframe>
                </div>
            )}
            
    </div>
    );
}

export default Results;