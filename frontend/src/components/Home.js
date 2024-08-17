import React, { useEffect, useState, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCurrentSeasonAnime } from '../services/jikanService';
import './Home.css';

function Home() {
    const [animeList, setAnimeList] = useState([]);
    const videoRefs = useRef([]);

    useEffect(() => {
        const fetchAnime = async () => {
            const data = await getCurrentSeasonAnime();
            setAnimeList(data);
        };

        fetchAnime();
    }, []);

    const handleSlide = (selectedIndex) => {
        // Pause the video on the previous slide
        videoRefs.current.forEach((video, index) => {
            if (video && index !== selectedIndex) {
                video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
        });
    };

    return (
        <div className="container">
            <Carousel onSlide={handleSlide}>
                {animeList.map((anime, index) => (
                    <Carousel.Item key={anime.mal_id} className="slide-element">
                        <div className="video-container">
                            <iframe
                                title={anime.title}
                                src={anime.trailer.embed_url}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="video-frame"
                                ref={(el) => (videoRefs.current[index] = el)}
                            ></iframe>
                        </div>
                        <Carousel.Caption className="is-caption">
                            <div className="caption-content">
                                <div className="text-content">
                                    <h2 className="heading-xl sum-2">
                                        <a href="#" title={anime.title_english} target="_blank" rel="noopener noreferrer">
                                            {anime.title_english}
                                        </a>
                                    </h2>
                                    <div className="film-info">
                                        <span className="item">{anime.year}</span>
                                    </div>
                                    <p className="description">{anime.synopsis}</p>
                                    <div className="div-buttons">
                                        <a href={`https://www.youtube.com/watch?v=${anime.youtube_id}`} className="btn w-icon btn-watch" target="_blank" rel="noopener noreferrer">
                                            <i className="fas fa-play mr-3"></i> Watch now
                                        </a>
                                    </div>
                                </div>
                                <div className="image-content">
                                    <img src={anime.images.webp.large_image_url} alt={anime.title} className="anime-image" />
                                </div>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default Home;
