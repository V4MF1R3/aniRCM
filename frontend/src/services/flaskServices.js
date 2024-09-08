import axios from 'axios';

export const fetchRecommendations = async (mal_id) => {
    try {
        // Make GET request to the recommendation API with mal_id as a query param
        const response = await axios.get(`/recommend`, {
            params: { mal_id: mal_id } // Ensure mal_id is sent in query params
        });

        // Since the response is now an array of mal_id, just return the array directly
        return response.data; // Assuming data is an array of mal_id
    } catch (error) {
        console.error('Error fetching recommendation:', error);
        return [];
    }
};
