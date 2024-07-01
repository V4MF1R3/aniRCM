import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4/';

export const getAnimeDetails = async (mal_id) => {
    try {
        const reponse = await axios.get('${BASE_URL}/anime/${mal_id}');
        return Response.data;
    } catch (error) {
        console.error('Error fetching anime details:', error);
        return null;
    }
};

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
        const response = await axios.get('${BASE_URL}/top/anime', { params });
        return response.data.top.slice(0, limit); // Limit the number of results
    } catch (error) {
        console.error('Error fetching top anime:', error);
        return []
    }
};