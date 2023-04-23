import Checkbox from './form/elements/Checkbox';
import '../assets/styles/components/filter-bar.scss';

const FilterBar = () => {
    return (
        <div className="filter-bar">
            <h3 style={{marginTop: 0}}>Sort by</h3>

            <Checkbox label="Start date" name="startDateSort" />
            <Checkbox label="Sport category" name="sportCategorySort" />
            <Checkbox label="Ticket price" name="ticketPriceSort" />

            <h3>Filter by</h3>

            <Checkbox label="Starts today" name="startsTodayFilter" />
            <Checkbox label="Free entrance" name="freeEntranceFilter" />

            <h3>Categories</h3>

            <Checkbox label="Football" name="footballCategory" />
            <Checkbox label="Basketball" name="basketballCategory" />
            <Checkbox label="Volleyball" name="volleyballCategory" />
            <Checkbox label="Tennis" name="tennisCategory" />
            <Checkbox label="Hockey" name="hockeyCategory" />
            <Checkbox label="Baseball" name="baseballCategory" />
            <Checkbox label="Golf" name="golfCategory" />
            <Checkbox label="Boxing" name="boxingCategory" />
            <Checkbox label="Swimming" name="swimmingCategory" />
            <Checkbox label="Gymnastics" name="gymnasticsCategory" />
        </div>
    );
};

export default FilterBar;