import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as EventService from '../services/EventService';
import '../assets/styles/components/hero-search.scss';
import logo from '../assets/images/logo.png';
import profile from '../assets/images/profile.png';
import search from '../assets/images/search.png';

const HeroSearch = ({ country, setCountry, city, setCity }) => {
    const [locations, setLocations] = useState({});

    useEffect(() => {
        EventService.getLocations().then((data) => {
            setLocations(data);
            setCountry(Object.keys(data)[0]);
            setCity(data[Object.keys(data)[0]][0]);
        });
    }, []);

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    return (
        <div className="hero-search">
            <div className="hero-search__container">
                <h2 className="hero-search__title">Explore for Sport Events</h2>
                <div className="hero-search__search-bar">
                    <img src={search} alt="search"/>
                    <input type="text" placeholder="Search for events"/>
                </div>
                <label className='hero-search__select'>Country:
                    <select name="country" value={country} onChange={handleCountryChange}>
                        {Object.keys(locations).map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </label>
                <label className='hero-search__select'>City:
                    <select name="city" value={city} onChange={handleCityChange}>
                        {locations[country] && locations[country].map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
}

export default HeroSearch;
