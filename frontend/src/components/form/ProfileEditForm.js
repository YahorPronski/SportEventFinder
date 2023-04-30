import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import AlertMessage from "../AlertMessage";
import TextInput from "./elements/TextInput";
import FileUpload from "./elements/FileUpload";
import SubmitButton from "./elements/SubmitButton";
import '../../assets/styles/components/form/profile-edit-form.scss';

const EMAIL_REGEX = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const ProfileEditForm = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        avatarBase64: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const errorMessageRef = useRef(null);

    useEffect(() => {
        UserService.getLoggedInUser().then(setUserInfo);
    },[]);

    useEffect(() => {
        if (errorMessage) {
            errorMessageRef.current.scrollIntoView();
        }
    }, [errorMessage]);

    const handleSubmit = () => {
        setErrorMessage("");
        if (!validateForm()) return;

        const onSuccess = () => {
            navigate("/profile");
        };

        const onError = (error) => {
            if (error.response?.status === 409) {
                setErrorMessage("Email already exists");
            } else if (error.response?.status === 422) {
                setErrorMessage("Username already exists");
            } else {
                setErrorMessage("Unexpected error, try again later");
            }
        };

        UserService.updateUserInfo(userInfo, onSuccess, onError);
    };

    const handleInput = (event) => {
        setUserInfo(userInfo => ({
            ...userInfo,
            [event.target.name]: event.target.value,
        }));
    };

    const handleAvatarUpload = function(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setUserInfo(userInfo => ({
                ...userInfo,
                avatarBase64: reader.result.split(',').pop(),
            }));
        };
    };

    const handleAvatarRemove = function(event) {
        setUserInfo(userInfo => ({
            ...userInfo,
            avatarBase64: '',
        }));
    };

    const validateForm = () => {
        const isBlank = (str) => !str || !str.trim().length;
        if (isBlank(userInfo.email) || isBlank(userInfo.username)) {
            setErrorMessage("Not all required fields are filled");
            return false;
        }
        if (!EMAIL_REGEX.test(userInfo.email)) {
            setErrorMessage("Email is not valid");
            return false;
        }
        if (userInfo.password !== userInfo.passwordConfirm) {
            setErrorMessage("Password mismatch");
            return false;
        }
        return true;
    };

    return (
        <>
            <form className="profile-edit-form">
                <TextInput
                    label="Username"
                    name="username"
                    value={userInfo.username}
                    onChange={handleInput}
                    required/>
                <TextInput
                    label="Email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInput}
                    required/>
                <TextInput
                    label="First name"
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={handleInput}/>
                <TextInput
                    label="Last name"
                    name="lastName"
                    value={userInfo.lastName}
                    onChange={handleInput}/>
                <FileUpload
                    label="Avatar"
                    accept="image/*"
                    onUpload={handleAvatarUpload}
                    onRemove={handleAvatarRemove} />
                <SubmitButton text="Save changes" onClick={handleSubmit}/>
            </form>
            <div ref={errorMessageRef}>
                {errorMessage && <AlertMessage type="error">{errorMessage}</AlertMessage>}
            </div>
        </>
    );
}

export default ProfileEditForm;