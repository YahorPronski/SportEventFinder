import { useState, useEffect } from 'react';
import * as EventService from '../services/EventService';
import EventPreview from '../components/EventPreview';

const EventList = ({ country, city, sortBy, filters, categories }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        EventService.getEvents(country, city, sortBy, filters, categories).then(setEvents);
    }, [country, city, sortBy, filters, categories]);

    return (
        <>
            {events.length > 0 ? (
                events.map((event) => (
                    <EventPreview
                        key={event.id}
                        title={event.name}
                        category={event.category.name}
                        location={event.location}
                        startDateTime={event.startDateTime}
                        ticketPrice={event.ticketPrice}
                        imageSrc={event.imageBase64 ? `data:image/jpg;base64,${event.imageBase64}` : null}
                    />
                ))
            ) : (
                <div className="no-events">
                    <p>No events available at the moment. Please check back later.</p>
                </div>
            )}
        </>
    );
};

export default EventList;
