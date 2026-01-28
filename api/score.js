const axios = require('axios');

module.exports = async (req, res) => {
    try {
        // Hum data ko empty string rakhenge taaki format sahi rahe
        const response = await axios({
            method: 'post',
            url: 'https://api.mycricketapi.com/api/v3/match/home/web',
            data: '', // Empty body (IMPORTANT: {} nahi, empty string)
            headers: {
                // Wohi chabi jo aapne nikali thi
                'Authorization': 'Basic Y3JpYzM2MGRldmxpdmU6Y0g0YkhzZ3hubkNoODVKclVnOGo=',
                'platform': '3',
                'version': '1',
                // Fresh timestamp har baar
                'timestamp': Date.now().toString(),
                'Content-Type': 'text/plain',
                'Accept': 'application/json, text/plain, */*',
                // Browser ban kar request bhejo
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        // Agar data mil gaya, toh frontend ko bhejo
        res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=59');
        res.status(200).json(response.data);

    } catch (error) {
        // Asli error pata karne ke liye ye console mein print hoga
        console.error("API FAIL REASON:", error.message);
        
        if (error.response) {
            // Agar API ne khud mana kiya hai (401/403)
            console.error("Server Responded:", error.response.status, error.response.data);
            return res.status(error.response.status).json({ 
                error: "API Blocked Request", 
                details: error.response.data 
            });
        }
        
        // Agar code mein galti hai
        return res.status(500).json({ 
            error: "Internal Code Error", 
            message: error.message 
        });
    }
};
