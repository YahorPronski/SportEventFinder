import '../../../assets/styles/components/form/elements/checkbox.scss';

const Checkbox = ({ label, name, onChange }) => {
    return (
        <div className="checkbox-wrapper">
            <input
                className="checkbox-input"
                id={name}
                name={name}
                type="checkbox"
                onChange={onChange}
            />
            <label className="checkbox-label" htmlFor={name}>
                <span>
                    <svg width="12px" height="10px">
                        <use xlinkHref={`#${name}-check`}></use>
                    </svg>
                </span>
                <span>{label}</span>
            </label>
            <svg className="inline-svg">
                <symbol id={`${name}-check`} viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
            </svg>
        </div>
    );
};

export default Checkbox;