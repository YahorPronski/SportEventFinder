import '../../../assets/styles/components/form/elements/file-upload.scss';

const FileUpload = ({label, accept, onChange, required}) => {
    const labelCss = required ? "required" : "";

    return (
        <div>
            <label className={labelCss}>{label}</label>
            <input
                className="file-upload"
                type="file"
                accept={accept}
                onChange={onChange}/>
        </div>
    );
};

export default FileUpload;