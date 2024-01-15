import React, { useState } from 'react';

import '../styles/Header.css';
import toast from "react-hot-toast";
import { toastStyles } from "../styles/toast";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

const redirect_uri = 'http://localhost:3000/api/github-callback';

function Auth() {

    /*const oauth2 = simpleOauth2.create({
        client: {
          id: id_github,
          secret: secret_github,
        },
        auth: {
            tokenHost: 'https://github.com',
            tokenPath: '/login/oauth/access_token',
            authorizePath: '/login/oauth/authorize',
        }
    });

    const redirectUri = 'http://localhost:3000/';
    const authorizationUri = oauth2.authorizationCode.authorizeURL({
        redirect_uri: redirectUri, // What do I put here
        scope: 'read:user',
    });

    console.log('Authorize URL: ', authorizationUri);*/

    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        try {
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_ID}&redirect_uri=${redirect_uri}&scope=user`;
        } catch (error) {
            toast(
                "Login error",
                {
                    icon: "🤔",
                    style: toastStyles,
                }
            );
        }
    };

    /*
    if (location.pathname === '/callback') {
        const { code } = new URLSearchParams(location.search);
    
        try {
          const tokenConfig = {
            code,
            redirect_uri: redirectUri,
          };
    
          const result = await oauth2.authorizationCode.getToken(tokenConfig);
          const accessToken = oauth2.accessToken.create(result);
    
          // Now you can use the accessToken to make API requests on behalf of the user
          console.log('Access Token:', accessToken.token);
    
          // Redirect to the home page or another appropriate page
          history.push('/dashboard');
        } catch (error) {
          console.error('Access Token Error', error.message);
          // Handle the error, e.g., show an error message to the user
          history.push('/');
        }
      }*/

    /*
    return (
        <div>
            {session?.user ? (
                <>
                    {session.user.image && (
                        <span style={{ backgroundImage: `url('${session.user.image}')` }} className="avatar" />
                    )}
                    <span className="signed_as">
                        <small>Signed in as</small>
                        <br />
                        <strong>{session.user.email ?? session.user.name}</strong>
                    </span>
                    <Button 
                        variant="ghost"
                        onClick={(e) => {
                            e.preventDefault()
                            signOut()
                        }}>
                        Sign out
                     </Button>
                </>
            ) : (
                <Button
                    className="button-github"
                    variant="ghost"
                    onClick={handleSignIn}
                    isLoading={loading}
                    loadingText="Loading...">
                    <GitHubLogoIcon className="mr-2 h-6 w-6" /> Login GitHub
                </Button>
            )}
        </div>
    )*/

    return (
        <Button
            className="button-github"
            variant="ghost"
            onClick={handleSignIn}
            isLoading={loading}
            loadingText="Loading...">
            <GitHubLogoIcon className="mr-2 h-6 w-6" /> Login GitHub
        </Button>
    )
};

export default Auth;