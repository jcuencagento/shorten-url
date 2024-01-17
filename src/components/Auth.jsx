import React, { useState, useEffect } from 'react';

import '../styles/Header.css';
import { useToast } from "./ui/use-toast"
import { useNavigate } from 'react-router-dom';
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button";

function Auth() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const redirectToGitHubOAuth = () => {
        const clientId = '4480658ab13c7754b880';
        const redirectUri = 'https://my-shorten-url.vercel.app/dashboard';
        const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
      
        window.location.href = githubOAuthUrl;
    };     

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        console.log({ code });
        if (code) {
            setIsAuthenticated(true);         
            fetch('https://github.com/login/oauth/access_token', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: '4480658ab13c7754b880',
                    client_secret: '823c4fbed2207fd7db31c16b5819c0f4a429c6c4',
                    code: code,
                }),
            })
            .then(response => response.json())
            .then(data => {
                const accessToken = data.access_token;
                console.log(accessToken);
                fetch('https://api.github.com/user', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                .then(userResponse => userResponse.json())
                .then(userData => {
                    if (userData.message === 'Bad credentials') {
                        throw new Error('Bad credentials');
                    }

                    setUserData({
                        username: userData.login,
                        avatarUrl: userData.avatar_url
                    });

                    console.log(userData);
                    navigate('/dashboard');
                    toast({
                        title: 'Login Successful',
                        description: 'You have successfully logged in with GitHub.'
                    });
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    navigate('/');
                    toast({
                        variant: 'destructive',
                        title: 'Login Error',
                        description: 'Failed to fetch user data from GitHub.'
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching access token:', error);
                navigate('/');
                toast({
                    variant: 'destructive',
                    title: 'Login Error',
                    description: 'Failed to fetch access token from GitHub.'
                });
            });
        }
    }, [navigate, toast]);

    const handleSignIn = async () => {
        try {
            redirectToGitHubOAuth();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Login Error",
                description: "Unknown GItHub error, pleasy try again later."
            })
        }
    };

    return (
        <div>
            {isAuthenticated 
                ? userData ? (
                    <Avatar>
                        <AvatarImage src={userData.avatarUrl} />
                        <AvatarFallback>...</AvatarFallback>
                        {userData.username}
                    </Avatar>
                ) : (
                    <Button className="button-github" variant="ghost" disabled>
                        <GitHubLogoIcon className="mr-2 h-6 w-8" /> Hi! Try to login later
                    </Button>
            ) : (
                <Button
                    className="button-github"
                    variant="ghost"
                    onClick={handleSignIn}>
                    <GitHubLogoIcon className="mr-2 h-6 w-6" /> Login GitHub
                </Button>
            )}
        </div>
    )
};

export default Auth;