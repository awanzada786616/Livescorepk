// api/score.js
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Hum yaha se 'sniffed' API call karenge
        const response = await axios.post(
            'https://api.mycricketapi.com/api/v3/match/home/web',
            {}, // Empty body
            {
                headers: {
                    'Authorization': 'Basic Y3JpYzM2MGRldmxpdmU6Y0g0YkhzZ3hubkNoODVKclVnOGo=',
                    'platform': '3',
                    'version': '1',
                    'timestamp': Date.now(),
                    'Content-Type': 'text/plain',
                    'User-Agent': 'Mozilla/5.0'
                }
            }
        );

        // Data frontend ko wapas bhejenge
        res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=59');
        res.status(200).json(response.data);

    } catch (error) {
        console.error("API Error", error.message);
        res.status(500).json({ error: "Score fetch failed" });
    }
};
