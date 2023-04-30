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
                <ProfileEditForm />
            </div>
	        <Footer />
	    </>
    );
};

export default ProfileEditPage;