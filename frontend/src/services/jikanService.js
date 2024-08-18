import axios from 'axios';

const BASE_URL = 'https://api.jikan.moe/v4';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // Set a timeout for requests
});

// Retry logic
axiosInstance.interceptors.response.use(null, async (error) => {
    const { config, response: { status } } = error;
    const maxRetries = 3;

    if (status === 429 && !config.__retryCount) {
        config.__retryCount = 1;
        const retryAfter = parseInt(error.response.headers['retry-after'] || '1', 10) * 1000;
        await new Promise(res => setTimeout(res, retryAfter));
        return axiosInstance(config);
    } else if (config.__retryCount && config.__retryCount < maxRetries) {
        config.__retryCount++;
        return axiosInstance(config);
    }

    return Promise.reject(error);
});

export const getAnimeDetails = async (mal_id) => {
    try {
        const response = await axiosInstance.get(`/anime/${mal_id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching anime details:', error);
        return null;
    }
};

export const getTopAnime = async ({
    type,
    filter,
    rating,
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
        const response = await axiosInstance.get('/top/anime', { params });
        return response.data.data.slice(0, limit);
    } catch (error) {
        console.error('Error fetching top anime:', error);
        return [];
    }
};

export const getCurrentSeasonAnime = async () => {
    try {
        const response = await axiosInstance.get('/seasons/now');
        return response.data.data.slice(0, 20);
    } catch (error) {
        console.error('Error fetching current season anime:', error);
        return [];
    }
};
