import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSearch from '../components/HeroSearch';
import EventList from '../components/EventList';
import EventPreview from '../components/EventPreview';
import FilterBar from '../components/FilterBar';
import '../assets/styles/pages/home-page.scss'

const HomePage = () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    const [sortBy, setSortBy] = useState('');
    const [filters, setFilters] = useState('');
    const [categories, setCategories] = useState('');

    return (
        <>
            <Header />
            <HeroSearch
                country={country}
                setCountry={setCountry}
                city={city}
                setCity={setCity}
            />
	        <div className="home-page">
	            <div className="left">
	                <FilterBar
	                    sortBy={sortBy}
                        setSortBy={setSortBy}
	                    filters={filters}
	                    setFilters={setFilters}
	                    categories={categories}
	                    setCategories={setCategories}
	                />
	            </div>
	            <div className="right">
                    <EventList
                        country={country}
                        city={city}
                        sortBy={sortBy}
                        filters={filters}
                        categories={categories}
                    />
                </div>
	        </div>
	        <Footer />
	    </>
    );
};

export default HomePage;