// vercel-functions/github-callback.js
module.exports = async (req, res) => {
    try {
        const code = req.query.code;
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                client_id: '4480658ab13c7754b880',
                client_secret: '823c4fbed2207fd7db31c16b5819c0f4a429c6c4',
                code,
                redirect_uri: 'https://my-shorten-url.vercel.app/api/github-callback',
            }),
        });

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const userData = await userResponse.json();
        console.log('GitHub User:', userData);

        res.writeHead(302, {
            'Location': '/dashboard', // Redirect to your desired route
        });

        res.end();
    } catch (error) {
        console.error('Error during GitHub authentication:', error);
        res.status(500).send('Internal Server Error');
    }
};