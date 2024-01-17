const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

const redirect_uri = 'https://my-shorten-url.vercel.app/api/github-callback';
app.post('/api(github-callback', async (req, res) => {
    const { code } = req.body;
    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            client_id: '4480658ab13c7754b880',
            client_secret: '823c4fbed2207fd7db31c16b5819c0f4a429c6c4',
            code: code,
            redirect_uri: redirect_uri
        }),
    });

    const data = await response.json();
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});