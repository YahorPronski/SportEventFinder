//import '../../../assets/styles/components/form/fields/submitbutton.scss';

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