import React from 'react';
import Header from '../components/layout/Header';
import HeroSearch from '../components/HeroSearch';
import EventPreview from '../components/EventPreview';
import FilterBar from '../components/FilterBar';
import '../assets/styles/pages/home-page.scss'

const HomePage = () => {
    return (
        <>
            <Header />
            <HeroSearch />
	        <div className="main-container">
	            <div className="left">
	                <FilterBar />
	            </div>
	            <div className="right">
                    <EventPreview />
                    <EventPreview />
                    <EventPreview />
                    <EventPreview />
                </div>
	        </div>
	    </>
    );
};

export default HomePage;