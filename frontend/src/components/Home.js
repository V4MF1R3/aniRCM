import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { getCurrentSeasonAnime, getTopAnime } from '../services/jikanService'; // Import the functions
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Home.css';
import { Navigation, Scrollbar } from 'swiper/modules';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Home() {
    const [airingAnime, setAiringAnime] = useState([]);
    const [popularAnime, setPopularAnime] = useState([]);
    const [favoriteAnime, setFavoriteAnime] = useState([]);
    const [animeList, setAnimeList] = useState([]);
    const videoRefs = useRef([]);


    useEffect(() => {
        const fetchAnime = async () => {
            const currentSeason = await getCurrentSeasonAnime();
            setAnimeList(currentSeason);

            const airing = await getTopAnime({ filter: 'airing', limit: 10});
            setAiringAnime(airing);

            const popular = await getTopAnime({ filter: 'bypopularity', limit: 10});
            setPopularAnime(popular);

            const favorite = await getTopAnime({ filter: 'favorite', limit: 10});
            setFavoriteAnime(favorite);
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

    const modifyEmbedUrl = (url) => {
        const urlObj = new URL(url);
        urlObj.searchParams.set('autoplay', '0'); // Turn off autoplay
        return urlObj.toString();
    };

    return (
        <div className="container">
            {/* Carousel Component */}
            <Carousel onSlide={handleSlide}>
                {animeList.map((anime, index) => (
                    <Carousel.Item key={anime.mal_id} className="slide-element">
                        <div className="video-container">
                            <iframe
                                title={anime.title}
                                src={modifyEmbedUrl(anime.trailer.embed_url)}
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
                                        <Link className="btn w-icon btn-watch" to={`/results/${anime.mal_id}`}>
                                            <i className="fa fa-info-circle"></i> More Details
                                        </Link>
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

            {/* Swipers for Airing, Popular, and Favorite Anime */}
            <div className="swiper-container">
                <h2 className="heading-xl heading-xl-left mt-4 mb-4 text-white">Top 10 Airing Anime</h2>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={5}
                    freeMode={true}
                    navigation={true} // Enable navigation
                    scrollbar={{ draggable: true }} // Enable scrollbar
                    modules={[Navigation, Scrollbar]}
                >
                    {airingAnime.map(anime => (
                        <SwiperSlide key={anime.mal_id}>
                            <Link to={`/results/${anime.mal_id}`} className="anime-link">
                                <img src={anime.images.webp.large_image_url} alt={anime.title} />
                                <p className='aniName'>{anime.title_english || anime.title}</p>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <h2 className="heading-xl heading-xl-left mt-4 mb-4 text-white">Top 10 Popular Anime</h2>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={5}
                    freeMode={true}
                    navigation={true} // Enable navigation
                    scrollbar={{ draggable: true }} // Enable scrollbar
                    modules={[Navigation, Scrollbar]}
                >
                    {popularAnime.map(anime => (
                        <SwiperSlide key={anime.mal_id}>
                            <Link to={`/results/${anime.mal_id}`} className="anime-link">
                                <img src={anime.images.webp.large_image_url} alt={anime.title} />
                                <p className='aniName'>{anime.title_english || anime.title}</p>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <h2 className="heading-xl heading-xl-left mt-4 mb-4 text-white">Top 10 Favorite Anime</h2>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={5}
                    freeMode={true}
                    navigation={true} // Enable navigation
                    scrollbar={{ draggable: true }} // Enable scrollbar
                    modules={[Navigation, Scrollbar]}
                >
                    {favoriteAnime.map(anime => (
                        <SwiperSlide key={anime.mal_id}>
                            <Link to={`/results/${anime.mal_id}`} className="anime-link">
                                <img src={anime.images.webp.large_image_url} alt={anime.title} />
                                <p className='aniName'>{anime.title_english || anime.title}</p>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Home;
