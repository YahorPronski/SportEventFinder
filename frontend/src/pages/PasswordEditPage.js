import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PasswordEditForm from '../components/form/PasswordEditForm';
import '../assets/styles/pages/password-edit-page.scss';

const PasswordEditPage = () => {
    return (
        <>
            <Header />
            <div className="password-edit-page">
                <div className="password-edit-section">
	                <PasswordEditForm />
	            </div>
            </div>
	        <Footer />
	    </>
    );
};

export default PasswordEditPage;