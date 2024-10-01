const express = require('express');
const axios = require('axios');
const router = express.Router();

const redirectUri = 'http://localhost:3000/auth/callback'; // Adjust this to your actual callback URL

router.get('/login', (req, res) => {
    const scope = 'identify guilds';
    const url = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`;
    res.redirect(url);
});

router.get('/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const response = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            'client_id': process.env.CLIENT_ID,
            'client_secret': process.env.CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': redirectUri,
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const accessToken = response.data.access_token;

        // Optionally, fetch user info from Discord API
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const user = userResponse.data;

        // Store user information in session
        req.session.user = user;

        res.redirect('/');
    } catch (error) {
        console.error('Error during OAuth2 callback:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;

