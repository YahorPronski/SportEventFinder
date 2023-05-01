import { Link } from 'react-router-dom';
import ImageText from "../ImageText";
import '../../assets/styles/components/layout/footer.scss';
import logo from '../../assets/images/logo.png';
import facebook from '../../assets/images/social/facebook.png';
import twitter from '../../assets/images/social/twitter.png';
import instagram from '../../assets/images/social/instagram.png';
import linkedin from '../../assets/images/social/linkedin.png';

const Footer = () => {
    return (
        <footer className="footer">
            <ImageText imgSrc={logo} imgAlt="logo" size="small" align="left">
                Sport Event Finder
            </ImageText>
            <div>
                <p>
                    © 2023 All rights reserved<br/>
                    <a href="#">Terms of use & privacy policy</a>
                </p>
            </div>
            <div className="footer__contacts">
                <Link to='/'>
                    <img src={facebook} alt="facebook"/>
                </Link>
                <Link to='/'>
                    <img src={twitter} alt="twitter"/>
                </Link>
                <Link to='/'>
                    <img src={instagram} alt="instagram"/>
                </Link>
                <Link to='/'>
                    <img src={linkedin} alt="linkedin"/>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;