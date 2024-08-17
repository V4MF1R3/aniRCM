import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

// Fetch anime details by `mal_id`
export const getAnimeDetails = async (mal_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/anime/${mal_id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching anime details:', error);
        return null;
    }
};

// Fetch top anime with customizable parameters
export const getTopAnime = async ({
    type = 'tv',
    filter = 'bypopularity',
    rating = 'g',
    sfw = true,
    page = 1,
    limit = 10
} = {}) => {
    try {
        const params = {
            type,
            filter,
            rating,
            sfw,
            page,
            limit
        };
        const response = await axios.get(`${BASE_URL}/top/anime`, { params });
        return response.data.data.slice(0, limit); // Limit the number of results
    } catch (error) {
        console.error('Error fetching top anime:', error);
        return [];
    }
};

// Fetch current season's anime (first 10 anime)
export const getCurrentSeasonAnime = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/seasons/now`);
        return response.data.data.slice(0, 10); // Get first 10 anime
    } catch (error) {
        console.error('Error fetching current season anime:', error);
        return [];
    }
};
