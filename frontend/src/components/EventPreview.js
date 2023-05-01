import '../assets/styles/components/event-preview.scss';

const EventPreview = ({title, category, location, startDateTime, ticketPrice, imageSrc}) => {
    return (
        <div className="event-preview">
            <img src={imageSrc ? imageSrc : 'https://via.placeholder.com/150'} alt="Event" />
            <div className="event-info">
                <h2>{title}</h2>
                <p style={{marginBottom: '10px'}}>{category}</p>
                <p>{location.country}, {location.city}, {location.address}</p>
                <p>{startDateTime}</p>
                <p>{ticketPrice > 0 ? `${ticketPrice}$` : 'Free entrance'}</p>
            </div>
        </div>
    );
};

export default EventPreview;