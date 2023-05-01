import RegisterForm from "../components/form/RegisterForm";
import AlertMessage from "../components/AlertMessage";
import ImageText from "../components/ImageText";
import logo from '../assets/images/logo.png';
import '../assets/styles/pages/register-page.scss';

const RegisterPage = () => {
    return (
        <div className="register-page">
            <div className="register-section">
                <ImageText imgSrc={logo} imgAlt="logo">
                    Sign up to SportEventFinder
                </ImageText>
                <RegisterForm />
            </div>
        </div>
    );
}

export default RegisterPage;