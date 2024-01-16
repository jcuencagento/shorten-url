import React, { useState, useEffect } from 'react';

import '../styles/Header.css';
import { useToast } from "./ui/use-toast"
import { useNavigate } from 'react-router-dom';
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button";

const redirect_uri = 'https://my-shorten-url.vercel.app/api/github-callback';

function Auth() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            setIsAuthenticated(true);
            fetch('https://github.com/login/oauth/access_token', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                mode : 'no-cors',
                body: JSON.stringify({
                    client_id: '4480658ab13c7754b880',
                    client_secret: '823c4fbed2207fd7db31c16b5819c0f4a429c6c4',
                    code: code,
                    redirect_uri: redirect_uri
                }),
            })
            .then(response => response.text())
            .then(data => {
                const accessToken = new URLSearchParams(data).get('access_token');
                fetch('https://api.github.com/user', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                .then(userResponse => userResponse.json())
                .then(userData => {
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
                    toast({
                        variant: 'destructive',
                        title: 'Login Error',
                        description: 'Failed to fetch user data from GitHub.'
                    });
                });
            })
            .catch(error => {
                console.error('Error exchanging code for access token:', error);
                toast({
                    variant: 'destructive',
                    title: 'Login Error',
                    description: 'Failed to exchange code for access token.'
                });
            });
        }
    }, [navigate, toast]);

    const handleSignIn = async () => {
        console.log(process.env.GITHUB_ID);
        try {
            window.location.href = `https://github.com/login/oauth/authorize?client_id=4480658ab13c7754b880&redirect_uri=${redirect_uri}&scope=user`;
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
                        <AvatarFallback>You</AvatarFallback>
                        {userData.username}
                    </Avatar>
                ) : (
                    <p>Hi!</p>
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