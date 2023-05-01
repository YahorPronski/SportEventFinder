import { useEffect, useState } from 'react';
import * as EventService from '../services/EventService';
import Checkbox from './form/elements/Checkbox';
import RadioButton from './form/elements/RadioButton';
import '../assets/styles/components/filter-bar.scss';

const FilterBar = ({ sortBy, setSortBy, filters, setFilters, categories, setCategories }) => {
    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        EventService.getCategories().then((data) => {
            setAllCategories(data);
        });
    }, []);

    const handleRadioChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleFilterChange = (e) => {
        const filterName = e.target.name;
        if (e.target.checked) {
            setFilters([...filters, filterName]);
        } else {
            setFilters(filters.filter((filter) => filter !== filterName));
        }
    };

    const handleCategoryChange = (e) => {
        const categoryName = e.target.name;
        if (e.target.checked) {
            setCategories([...categories, categoryName]);
        } else {
            setCategories(categories.filter((category) => category !== categoryName));
        }
    };

    return (
        <div className="filter-bar">
            <h3 style={{ marginTop: 0 }}>Sort by</h3>
            <RadioButton
                label="Start date"
                name="sortByRadioGroup"
                value="startDateTime"
                checked={sortBy === 'startDateTime'}
                onChange={handleRadioChange}
            />
            <RadioButton
                label="Category name"
                name="sortByRadioGroup"
                value="category"
                checked={sortBy === 'category'}
                onChange={handleRadioChange}
            />
            <RadioButton
                label="Ticket price"
                name="sortByRadioGroup"
                value="ticketPrice"
                checked={sortBy === 'ticketPrice'}
                onChange={handleRadioChange}
            />

            <h3>Filter by</h3>
            <Checkbox label="Starts today" name="startsToday" onChange={handleFilterChange} />
            <Checkbox label="Free entrance" name="freeEntrance" onChange={handleFilterChange} />

            <h3>Categories</h3>
            {allCategories.map((category) => (
                <Checkbox
                    key={category}
                    label={category}
                    name={category}
                    onChange={handleCategoryChange}
                />
            ))}
        </div>
    );
};

export default FilterBar;
