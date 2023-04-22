import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/components/header.scss';
import logo from '../../assets/images/logo.png';
import profile from '../../assets/images/profile.png';
import logout from '../../assets/images/logout.png';

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="header__logo">
                <img src={logo} alt="Logo" />
                <h1>Sport Event Finder</h1>
            </Link>
            <nav className="header__nav">
                <ul>
                    /*<li>
                        <Link to="/">
                            <img src={profile} alt="Logo" />
                            <p>Profile</p>
                        </Link>
                    </li>*/
                    <li>
                        <Link to="/login">
                            <img src={logout} alt="Logo" />
                            <p>Sign In</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;