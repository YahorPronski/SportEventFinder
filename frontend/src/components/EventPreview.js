import '../assets/styles/components/event-preview.scss';

const EventPreview = () => {
    return (
        <div className="event-preview">
            <img src="https://via.placeholder.com/150" alt="Event" />
            <div className="event-info">
                <h2>Металлург-Жлобин - Неман (Экстралига / Плей-офф)</h2>
                <p>Hockey</p>
                <p>Belarus, Grodno, Communal st. 3A (Ice Palace of Sports)</p>
                <p>21/07/2023 18:00</p>
                <p>5$</p>
            </div>
        </div>
    );
};

export default EventPreview;