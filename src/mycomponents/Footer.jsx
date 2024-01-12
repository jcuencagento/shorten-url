import React from 'react';

import '../styles/Footer.css'
import logo from '../logo.svg';
import { GitHubLogoIcon, LinkedInLogoIcon, IdCardIcon, LockClosedIcon, CodeIcon } from "@radix-ui/react-icons";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

function Footer () {
    const github_URL = 'https://github.com/jcuencagento';
    const linkedin_URL = 'https://www.linkedin.com/in/javiercuencagento/';
    const code_URL = 'https://github.com/jcuencagento/shorten-url';
    return (
        <footer className="App-footer">
            <div className="contacts-left">
                <Button variant="ghost" onClick={() => { window.open(linkedin_URL, '_blank') }}>
                    <IdCardIcon className="mr-2 h-4 w-4" /> Contact  
                </Button>
                <Button variant="ghost" onClick={() => { window.open(linkedin_URL, '_blank') }}>
                    <LockClosedIcon className="mr-2 h-4 w-4" /> Terms  
                </Button>
                <Button variant="ghost" onClick={() => { window.open(code_URL, '_blank') }}>
                    <CodeIcon className="mr-2 h-4 w-4" /> Code  
                </Button>
            </div>
            <Badge variant="secondary">
                <img src={logo} className="mr-4 h-5 w-6" alt="logo" /> Made with 🧠 by Javier Cuenca Gento
            </Badge>
            <div className="links-right">
                <Button variant="ghost" onClick={() => { window.open(linkedin_URL, '_blank') }}>
                    <LinkedInLogoIcon className="mr-2 h-4 w-4" /> Linkedin  
                </Button>
                <Button variant="ghost" onClick={() => { window.open(github_URL, '_blank') }}>
                    <GitHubLogoIcon className="mr-2 h-4 w-4" /> GitHub  
                </Button>
            </div>
        </footer>
    )
}

export default Footer;