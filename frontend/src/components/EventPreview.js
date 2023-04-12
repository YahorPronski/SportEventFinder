import React from 'react';

const EventPreview = () => {
    return (
        <div className="event-preview">
            <img src="https://via.placeholder.com/150" alt="Event" />
            <div className="event-info">
                <h2>Event name</h2>
                <p>Date and time</p>
                <p>Location</p>
                <p>Sport category</p>
                <p>Ticket price</p>
            </div>
        </div>
    );
};

export default EventPreview;