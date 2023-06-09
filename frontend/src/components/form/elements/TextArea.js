import '../../../assets/styles/components/form/elements/text-area.scss';

const TextArea = ({label, name, value, onChange, required}) => {
    const labelCss = required ? "required" : "";

    return (
        <div>
            <label className={labelCss}>{label}</label>
            <textarea
                className="text-area"
                name={name}
                value={value}
                onChange={onChange}/>
        </div>
    );
};

export default TextArea;