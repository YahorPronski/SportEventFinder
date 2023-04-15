import React from 'react';
import '../assets/styles/components/filter-bar.scss';

const FilterBar = () => {
    return (
        <div className="filter-bar">
            <h3 style={{marginTop: 0}}>Sort by</h3>

            <label>
                <input type="checkbox" name="freeEntrance"/>
                Start date
            </label>
            <label>
                <input type="checkbox" name="freeEntrance"/>
                Sport Category
            </label>

            <h3>Filter by</h3>

            <label>
                <input type="checkbox" name="freeEntrance"/>
                Free entrance
            </label>
            <label>
                <input type="checkbox" name="freeEntrance"/>
                Location
            </label>

            <h3>Categories</h3>

            <label>
                <input type="checkbox" name="freeEntrance"/>
                Free entrance
            </label>
            <label>
                <input type="checkbox" name="freeEntrance"/>
                Free entrance
            </label>
            <label>
                <input type="checkbox" name="freeEntrance"/>
                Free entrance
            </label>
            <label>
                <input type="checkbox" name="freeEntrance"/>
                Free entrance
            </label>
            <label>
                <input type="checkbox" name="freeEntrance"/>
                Free entrance
            </label>

        </div>
    );
};

export default FilterBar;