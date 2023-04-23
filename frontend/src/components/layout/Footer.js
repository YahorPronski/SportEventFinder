import ImageText from "../ImageText";
import '../../assets/styles/components/layout/footer.scss';
import logo from '../../assets/images/logo.png';

const Footer = () => {
    return (
        <footer className="footer">
            <ImageText imgSrc={logo} imgAlt="logo" size="small" align="left">
                Sport Event Finder
            </ImageText>
            <div>
                <p className="center">
                    © 2022 All rights reserved<br/>
                    <a href="#">Terms of use & privacy policy</a>
                </p>
            </div>
            <div>
                Contacts
            </div>
        </footer>
    );
};

export default Footer;