import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAnimeDetails } from "../services/jikanService";
import { fetchRecommendations } from "../services/flaskServices";
import AnimeCard from "../components/AnimeCard"; // Import the AnimeCard component
import './Result.css';

function Results() {
    const { mal_id } = useParams();
    const [animeDetails, setAnimeDetails] = useState();
    const [recommendationDetails, setRecommendationDetails] = useState([]);

    useEffect(() => {
        const fetchDetailsAndRecommendations = async () => {
            try {
                // Fetch details for the current anime
                const details = await getAnimeDetails(mal_id);
                setAnimeDetails(details);

                // Fetch recommended anime mal_id from Flask service
                const recommendedAnimeIds = await fetchRecommendations(mal_id);
                console.log("recommendedAnimeIds: ", recommendedAnimeIds);

                // Check if recommendedAnimeIds is a valid array
                if (Array.isArray(recommendedAnimeIds)) {
                    // Initialize an array with the same length as recommendedAnimeIds
                    const recommendationsArray = new Array(recommendedAnimeIds.length);

                    // Fetch the details for each recommended anime using its mal_id
                    await Promise.all(
                        recommendedAnimeIds.map(async (rec, index) => {
                            if (rec) {
                                // Fetch the anime details
                                const animeDetail = await getAnimeDetails(rec);
                                // Store the anime details at the same index as in recommendedAnimeIds
                                recommendationsArray[index] = animeDetail;
                            }
                        })
                    );

                    // Set the recommendationDetails to the filled recommendationsArray
                    setRecommendationDetails(recommendationsArray);
                } else {
                    console.error("Invalid recommendations format:", recommendedAnimeIds);
                }
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

    console.log("recommendationDetails: ", recommendationDetails);

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
                    <div>
                        <h2>{animeDetails.title}</h2>
                        <p><strong>Score:</strong> {animeDetails.score} <i class="fa-solid fa-star text-warning"></i></p>
                        <p><strong>Status:</strong> {animeDetails.status}</p>
                        <p><strong>Episodes:</strong> {animeDetails.episodes}</p>
                        <p>{animeDetails.synopsis}</p>
                        <a
                            href={animeDetails.url}
                            className="btn btn-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on MyAnimeList.com
                        </a>
                    </div>
                </div>
            </div>

            {animeDetails.trailer?.embed_url && (
                <div className="mx-auto m-4 justify-content-center video-container-result">
                    <iframe
                        title={animeDetails.title}
                        src={modifyEmbedUrl(animeDetails.trailer.embed_url)}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="video-frame-result"
                    ></iframe>
                </div>
            )}

            {/* Recommendations Section */}
            <h3 className="ms-4 mb-4 text-white">AI Based Recommended Anime</h3>
            <div className="container">
                <div className="row">
                    {recommendationDetails.map((anime, index) => (
                        anime ? (
                            <AnimeCard key={index} anime={anime} />
                        ) : (
                            <div key={index} className="col-md-3 mb-4">
                                <p>Loading...</p>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Results;
