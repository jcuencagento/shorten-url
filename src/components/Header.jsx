import React from 'react';

import '../styles/Header.css';
import logo from '../logo.svg';
//import Menu from './Menu';
import Auth from './Auth';
import ModeToggle from './ModeToggle';

function Header () {
    
    return (
        <header className="App-header">
            <a href="/" className="brand">
                <img src={logo} className="App-logo" alt="logo" />
                <h1> Shorten URL </h1>
            </a>
            <Auth />
            <ModeToggle />
        </header>
    )
}

export default Header;