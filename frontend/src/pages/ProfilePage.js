import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as UserService from '../services/UserService';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSearch from '../components/HeroSearch';
import EventPreview from '../components/EventPreview';
import FilterBar from '../components/FilterBar';
import '../assets/styles/pages/profile-page.scss';
import editIcon from '../assets/images/edit.png';

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [avatarSrc, setAvatarSrc] = useState('https://via.placeholder.com/250');

    useEffect(() => {
        UserService.getLoggedInUser().then(setUser);
    },[]);

    useEffect(() => {
        if (user.avatarBase64) {
            setAvatarSrc(`data:image/jpg;base64,${user.avatarBase64}`);
        }
    }, [user.avatarBase64]);

    return (
        <>
            <Header />
            <div className="profile-page">
	            <div className="profile">
	                <img className="profile__avatar" src={avatarSrc} alt="Event" />
	                <div className="profile__info">
	                    <h2 className="profile__full-name">{user.firstName} {user.lastName}</h2>
	                    <p className="profile__username">{user.username}</p>
	                    <br/>
	                    <p>{user.email}</p>
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