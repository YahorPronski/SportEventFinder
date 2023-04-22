import { useState, useRef } from "react";
import '../../../assets/styles/components/form/elements/file-upload.scss';

const FileUpload = ({ label, name, accept, onChange }) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === "dragenter" || event.type === "dragover") {
            setDragActive(true);
        } else if (event.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
        onChange(event);
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div className="file-upload" onDragEnter={handleDrag}>
            <input
                id="file-upload__input"
                type="file"
                name={name}
                accept={accept}
                ref={inputRef}
                onChange={onChange}/>
            <label
                id="file-upload__label"
                htmlFor="file-upload__input"
                className={dragActive ? "drag-active" : ""}>
                <div>
                    <p>Drag and drop your file here or</p>
                    <button
                        type="button"
                        className="file-upload__button"
                        onClick={onButtonClick}>
                        Upload a file
                    </button>
                </div>
            </label>
            {dragActive && (
                <div
                    className="file-upload__drag-element"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
