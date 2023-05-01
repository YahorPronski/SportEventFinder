import React from 'react';
import '../../../assets/styles/components/form/elements/radiobutton.scss';

const RadioButton = ({ label, name, value, checked, onChange }) => {
    return (
        <div className="radio-wrapper">
            <input
                className="radio-input"
                id={value}
                name={name}
                type="radio"
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <label className="radio-label" htmlFor={value}>
                <span></span>
                <span>{label}</span>
            </label>
            <svg className="inline-svg">
                <symbol id={`${name}-${value}-check`} viewBox="0 0 12 10">
                    <circle cx="6" cy="6" r="3"></circle>
                </symbol>
            </svg>
        </div>
    );
};

export default RadioButton;
