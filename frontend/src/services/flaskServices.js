import axios from 'axios';

const Base_URL = 'http://localhost:5000';

export const fetchRecommendations = async (mal_id) => {
    try {
        const response = await axios.get('${BASE_URL}/recommend', {
            params: { mal_id: mal_id }
        });

        // Transform into array
        const recommendationsArray = Object.entries(response.data)
            .map(([mal_id, sim_score]) => ({ mal_id: parseInt(mal_id), sim_score }))
            .sort((a, b) => b.sim_score - a.sim_score);
        return recommendationsArray;
    } catch (error) {
        console.error('Error fetching recommendation:', error);
        return [];
    }
}