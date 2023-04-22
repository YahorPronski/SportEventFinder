import '../assets/styles/components/image-text.scss';

const sizeStyleMap = {
    small: "small",
    medium: "medium",
    big: "big",
};

const ImageText = ({imgSrc, imgAlt, size, children}) => {
    const sizeCss = sizeStyleMap[size] || sizeStyleMap.medium;
    const wrapperCss = `image-text ${sizeCss}`;

    return (
        <div className={wrapperCss}>
            <img className="image-text__image" src={imgSrc} alt={imgAlt} />
            <span className="image-text__text">{children}</span>
        </div>
    );
};

export default ImageText;