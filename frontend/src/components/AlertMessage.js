import '../assets/styles/components/alert-message.scss';

const typeStyleMap = {
    default: "default",
    success: "success",
    error: "error",
};

const AlertMessage = ({type, children}) => {
    const typeCss = typeStyleMap[type] || typeStyleMap.default;
    const wrapperCss = `alert-message ${typeCss}`;

    return <div className={wrapperCss}>{children}</div>;
};

export default AlertMessage;
