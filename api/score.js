// api/score.js
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Hum ESPN Cricinfo ki public internal API use karenge
        const response = await axios.get(
            'https://hs-consumer-api.espncricinfo.com/v1/pages/matches/current?lang=en&latest=true',
            {
                headers: {
                    // Browser ban kar request bhejenge taaki block na ho
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            }
        );

        // Data mil gaya! Ab frontend ko bhej do
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30'); // 1 min cache
        res.status(200).json(response.data);

    } catch (error) {
        console.error("ESPN API Error:", error.message);
        res.status(500).json({ error: "Failed to fetch from ESPN" });
    }
};
