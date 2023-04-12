import React from 'react';
import Header from '../components/Header';
import HeroSearch from '../components/HeroSearch';
import EventPreview from '../components/EventPreview';
import '../assets/styles/st.scss'

const HomePage = () => {
    return (
        <>
            <Header />
            <HeroSearch />
	        <div className="event-list">
                <EventPreview />
                <EventPreview />
		        <EventPreview />
		        <EventPreview />
	        </div>
	    </>
    );
};

export default HomePage;