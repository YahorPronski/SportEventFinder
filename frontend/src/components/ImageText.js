import { Link } from 'react-router-dom';
import '../assets/styles/components/image-text.scss';

const sizeStyleMap = {
    small: "small",
    medium: "medium",
    big: "big",
};

const alignStyleMap = {
    left: "left",
    center: "center",
    right: "right",
};

const ImageText = ({imgSrc, imgAlt, size, align, link, children}) => {
    const sizeCss = sizeStyleMap[size] || sizeStyleMap.medium;
    const alignCss = alignStyleMap[align] || alignStyleMap.center;
    const wrapperCss = `image-text ${sizeCss} ${alignCss}`;

    if (link) {
        return (
            <Link to={link} className={wrapperCss}>
                <img className="image-text__image" src={imgSrc} alt={imgAlt} />
                <span className="image-text__text">{children}</span>
            </Link>
        );
    } else {
        return (
            <div className={wrapperCss}>
                <img className="image-text__image" src={imgSrc} alt={imgAlt} />
                <span className="image-text__text">{children}</span>
            </div>
        );
    }
};

export default ImageText;