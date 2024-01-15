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
                client_id: process.env.GITHUB_ID,
                client_secret: process.env.GITHUB_SECRET,
                code,
                redirect_uri: 'http://localhost:3000/api/github-callback',
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