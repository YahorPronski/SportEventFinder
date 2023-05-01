import API from '../services/API';

export const getEvents = async (country, city, sortBy, filters, categories) => {
    try {
        const params = new URLSearchParams();

        if (country) params.append('country', country);
        if (city) params.append('city', city);
        if (sortBy) params.append('sortBy', sortBy);
        if (filters) {
            if (filters.includes('startsToday')) params.append('startsToday', true);
            if (filters.includes('freeEntrance')) params.append('freeEntrance', true);
        }
        if (categories && categories.length > 0) params.append('categories', categories.join(','));

        return (await API.get('events', { params })).data;
    } catch (error) {
        console.log(error);
    }
};

export const getLocations = async () => {
    try {
        return (await API.get('locations')).data;
    } catch (error) {
        console.log(error);
    }
};

export const getCategories = async () => {
    try {
        return (await API.get('categories')).data;
    } catch (error) {
        console.log(error);
    }
};
