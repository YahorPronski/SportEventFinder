import { Link } from 'react-router-dom';
import useAuthContext from "../../context/useAuthContext";
import * as AuthService from "../../services/AuthService";
import Authorized from "../../context/Authorized";
import Unauthorized from "../../context/Unauthorized";
import ImageText from "../ImageText";
import '../../assets/styles/components/layout/header.scss';
import logo from '../../assets/images/logo.png';
import profile from '../../assets/images/profile.png';
import login from '../../assets/images/login.png';
import logout from '../../assets/images/logout.png';

const Header = () => {
    const { updateAuthContext } = useAuthContext();

    const handleLogout = () => {
        AuthService.logout();
        updateAuthContext();
    };

    return (
        <header className="header">
            <ImageText imgSrc={logo} imgAlt="logo" size="small" align="left" link="/">
                Sport Event Finder
            </ImageText>
            <nav className="header__nav">
                <ul>
                    <Authorized>
                        <li>
                            <a href="#" onClick={handleLogout}>
                                <img src={logout} alt="logout" />
                                <p>Logout</p>
                            </a>
                        </li>
                        <li>
                            <Link to="/profile">
                                <img src={profile} alt="logo" />
                                <p>Profile</p>
                            </Link>
                        </li>
                    </Authorized>
                    <Unauthorized>
                        <li>
                            <Link to="/login">
                                <img src={login} alt="login" />
                                <p>Sign In</p>
                            </Link>
                        </li>
                    </Unauthorized>
                </ul>
            </nav>
        </header>
    );
};

export default Header;