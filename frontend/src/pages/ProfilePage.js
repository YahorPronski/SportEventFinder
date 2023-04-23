import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSearch from '../components/HeroSearch';
import EventPreview from '../components/EventPreview';
import FilterBar from '../components/FilterBar';
import '../assets/styles/pages/profile-page.scss';
import editIcon from '../assets/images/edit.png';

const ProfilePage = () => {
    return (
        <>
            <Header />
            <div className="profile-page">
	            <div className="profile">
	                <img className="profile__avatar" src="https://via.placeholder.com/250" alt="Event" />
	                <div className="profile__info">
	                    <h2 className="profile__full-name">Yahor Pronski</h2>
	                    <p className="profile__username">username</p>
	                    <br/>
	                    <p>Email: example@gmail.com</p>
	                    <br/>
	                    <Link to='/profile/password-edit'>Change password</Link>
	                </div>
	                <Link to='/profile/edit'>
	                    <img src={editIcon} alt="edit" />
	                </Link>
	            </div>
            </div>
	        <Footer />
	    </>
    );
};

export default ProfilePage;