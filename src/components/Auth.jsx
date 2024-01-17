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
            const hashParams = new URLSearchParams(window.location.hash.slice(1));
            const accessToken = hashParams.get('access_token');
            console.log(window.location);
            console.log(hashParams);
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
                toast({
                    variant: 'destructive',
                    title: 'Login Error',
                    description: 'Failed to fetch user data from GitHub.'
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
                    <p>Hi! Try to login later</p>
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