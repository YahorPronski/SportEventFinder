import { useState, useRef } from "react";
import '../../../assets/styles/components/form/elements/file-upload.scss';

const FileUpload = ({ label, accept, onUpload, onRemove }) => {
    const [fileUploadText, setFileUploadText] = useState('Drag and drop your file here or');
    const [uploadButtonText, setUploadButtonText] = useState('Upload a file');
    const [fileUploaded, setFileUploaded] = useState(false);

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
        handleChange(event);
    };

    const handleChange = (event) => {
        let uploadedFile = null;
        if (event.target.files && event.target.files[0]) {
            uploadedFile = event.target.files[0];
        } else if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
            uploadedFile = event.dataTransfer.files[0];
        }

        if (uploadedFile) {
            setFileUploaded(true);
            setFileUploadText(`Uploaded file: ${uploadedFile.name}`);
            setUploadButtonText('Upload another file');
            onUpload(uploadedFile);
        }
    };

    const onUploadButtonClick = () => {
        inputRef.current.click();
    };

    const onRemoveButtonClick = () => {
        inputRef.current.value = null;
        setFileUploaded(false);
        setFileUploadText('Drag and drop your file here or');
        setUploadButtonText('Upload a file');
        onRemove();
    };

    return (
        <div>
            <label>{label}</label>
            <div className="file-upload" onDragEnter={handleDrag}>
                <input
                    id="file-upload__input"
                    type="file"
                    accept={accept}
                    ref={inputRef}
                    onChange={handleChange}/>
                <label
                    id="file-upload__label"
                    className={dragActive ? "drag-active" : ""}>
                    <div>
                        <p>{fileUploadText}{fileUploaded &&
                            <span className="file-upload__button" onClick={onRemoveButtonClick}>remove</span>}
                        </p>
                        <p
                            className="file-upload__button"
                            onClick={onUploadButtonClick}>
                            {uploadButtonText}
                        </p>
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
        </div>
    );
};

export default FileUpload;
