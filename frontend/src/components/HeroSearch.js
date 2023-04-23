import { Link } from 'react-router-dom';
import '../assets/styles/components/hero-search.scss';
import logo from '../assets/images/logo.png';
import profile from '../assets/images/profile.png';
import search from '../assets/images/search.png';

const HeroSearch = () => {
    return (
        <div className="hero-search">
            <div className="hero-search__container">
                <h2 className="hero-search__title">Explore for Sport Events</h2>
                <div className="hero-search__search-bar">
                    <img src={search} alt="search"/>
                    <input type="text" placeholder="Search for events"/>
                </div>
                <label className='hero-search__select'>Country:
                    <select name="country">
                        <option value="belarus">Belarus</option>
                        <option value="canada">Canada</option>
                        <option value="uk">UK</option>
                        <option value="france">France</option>
                        <option value="germany">Germany</option>
                    </select>
                </label>
                <label className='hero-search__select'>City:
                    <select name="city">
                        <option value="grodno">Grodno</option>
                        <option value="canada">Canada</option>
                        <option value="uk">UK</option>
                        <option value="france">France</option>
                        <option value="germany">Germany</option>
                    </select>
                </label>
            </div>
        </div>
    );
};

export default HeroSearch;