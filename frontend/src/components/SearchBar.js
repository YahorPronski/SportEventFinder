import React from 'react';
import '../assets/styles/components/search-bar.scss';
import search from '../assets/images/search.png';

const SearchBar = () => {
    return (
        <div className="search-bar">
            <img src={search} alt="search"/>
            <input type="text" placeholder="Search for events"/>
        </div>
    );
};

export default SearchBar;