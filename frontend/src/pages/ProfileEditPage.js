import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProfileEditForm from '../components/form/ProfileEditForm';
import '../assets/styles/pages/profile-edit-page.scss';

const ProfileEditPage = () => {
    return (
        <>
            <Header />
            <div className="profile-edit-page">
                <div className="profile-edit-section">
                    <ProfileEditForm />
                </div>
            </div>
	        <Footer />
	    </>
    );
};

export default ProfileEditPage;