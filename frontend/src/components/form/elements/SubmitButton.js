import '../../../assets/styles/components/form/elements/submit-button.scss';

const SubmitButton = ({text, onClick}) => {
    return (
        <button
            type="button"
            className="submit-button"
            onClick={onClick}>
            {text}
        </button>
    );
};

export default SubmitButton;