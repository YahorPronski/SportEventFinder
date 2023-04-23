import { Link } from 'react-router-dom';
import '../../assets/styles/components/layout/header.scss';
import logo from '../../assets/images/logo.png';
import profile from '../../assets/images/profile.png';
import login from '../../assets/images/login.png';
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
                    <li>
                        <Link to="/logout">
                            <img src={logout} alt="logout" />
                            <p>Logout</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <img src={profile} alt="logo" />
                            <p>Profile</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/login">
                            <img src={login} alt="login" />
                            <p>Sign In</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;