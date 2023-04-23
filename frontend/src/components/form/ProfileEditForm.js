import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
//import useAuthContext from "../../context/useAuthContext";
//import * as AuthService from "../../services/authService";
import TextInput from "./elements/TextInput";
import FileUpload from "./elements/FileUpload";
import SubmitButton from "./elements/SubmitButton";
import '../../assets/styles/components/form/profile-edit-form.scss';

const ProfileEditForm = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    //const { updateAuthContext } = useAuthContext();

    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [errorMessage, setErrorMessage] = useState('');
    const errorMessageRef = useRef(null);

    useEffect(() => {
        if (errorMessage) {
            errorMessageRef.current.scrollIntoView();
        }
    }, [errorMessage]);

    const handleSubmit = () => {
        setErrorMessage("");
        if (!validateForm()) return;

        /*const onSuccess = () => {
            updateAuthContext().then(() => navigate("/profile"));
        };

        const onError = (error) => {
            if (error.response?.status === 401) {
                setCredentials(creds => ({...creds, password: ''}));
                setErrorMessage("Invalid username or password");
            } else {
                setErrorMessage("Unexpected error, try again later");
            }
        };

        AuthService.login(credentials, onSuccess, onError)*/
    };

    const handleInput = (event) => {
        setCredentials(creds => ({
            ...creds,
            [event.target.name]: event.target.value,
        }));
    };

    const validateForm = () => {
        const isBlank = (str) => !str || !str.trim().length;
        if (isBlank(credentials.username) || isBlank(credentials.password)) {
            setErrorMessage("Please enter username and password");
            return false;
        }
        return true;
    };

    const handleAvatarUpload = function(file) {
        console.log(`Avatar uploaded: ${file}`)
    };

    const handleAvatarRemove = function(event) {
        console.log(`Avatar removed`)
    };

    return (
        <>
            <form className="profile-edit-form">
                <TextInput
                    label="First name"
                    name="firstName"
                    value={credentials.username}
                    onChange={handleInput}/>
                <TextInput
                    label="Last name"
                    name="username"
                    value={credentials.username}
                    onChange={handleInput}/>
                <TextInput
                    label="Username"
                    name="username"
                    value={credentials.username}
                    onChange={handleInput}/>
                <TextInput
                    label="Email"
                    name="password"
                    value={credentials.password}
                    onChange={handleInput}
                    hidden/>
                <FileUpload
                    label="Avatar"
                    accept="image/*"
                    onUpload={handleAvatarUpload}
                    onRemove={handleAvatarRemove} />
                <SubmitButton text="Save changes" onClick={handleSubmit}/>
            </form>
        </>
    );
}

export default ProfileEditForm;