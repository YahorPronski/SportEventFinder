import { Link } from 'react-router-dom';
import '../assets/styles/components/hero-search.scss';
import SearchBar from './SearchBar';
import logo from '../assets/images/logo.png';
import profile from '../assets/images/profile.png';
import logout from '../assets/images/logout.png';

const Header = () => {
    return (
        <div className="hero-search">
            <div className="hero-search__container">
                <h2 className="hero-search__title">Explore for Sport Events</h2>
                <SearchBar />
            </div>
        </div>
    );
};

export default Header;