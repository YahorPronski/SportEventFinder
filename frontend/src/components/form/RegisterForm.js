import { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
//import * as AuthService from "../../services/authService";
import TextInput from "./elements/TextInput";
import FileUpload from "./elements/FileUpload";
import SubmitButton from "./elements/SubmitButton";
import '../../assets/styles/components/form/register-form.scss';

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const RegisterForm = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
    });

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

        const onSuccess = () => {
            navigate("/login", {state : {registerSuccess: true}});
        };

        const onError = (error) => {
            if (error.response?.status === 409) {
                setErrorMessage("Username already exists");
            } else {
                setErrorMessage("Unexpected error, try again later");
            }
        };

        AuthService.register(userInfo, onSuccess, onError);
    };

    const handleInput = (event) => {
        setUserInfo(userInfo => ({
            ...userInfo,
            [event.target.name]: event.target.value,
        }));
    };

    const handleAvatarUpload = function(file) {
        console.log(`Avatar uploaded: ${file}`)
    };

    const handleAvatarRemove = function(event) {
        console.log(`Avatar removed`)
    };

    const validateForm = () => {
        const isBlank = (str) => !str || !str.trim().length;
        if (isBlank(userInfo.email) || isBlank(userInfo.username) || isBlank(userInfo.password)) {
            setErrorMessage("Not all required fields are filled");
            return false;
        }
        if (!emailRegex.test(userInfo.email)) {
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
        <div>
            <form className="register-form">
                <div className="field-set">
                    <div>
                        <TextInput
                            label="Email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleInput}
                            required />
                        <TextInput
                            label="Username"
                            name="username"
                            value={userInfo.username}
                            onChange={handleInput}
                            required />
                        <TextInput
                            label="Password"
                            name="password"
                            value={userInfo.password}
                            onChange={handleInput}
                            hidden
                            required />
                        <TextInput
                            label="Password Confirm"
                            name="passwordConfirm"
                            value={userInfo.passwordConfirm}
                            onChange={handleInput}
                            hidden
                            required />
                    </div>
                    <div>
                        <TextInput
                            label="First Name"
                            name="firstName"
                            value={userInfo.firstName}
                            onChange={handleInput} />
                        <TextInput
                            label="Last Name"
                            name="lastName"
                            value={userInfo.lastName}
                            onChange={handleInput} />
                        <FileUpload
                            label="Avatar"
                            accept="image/*"
                            onUpload={handleAvatarUpload}
                            onRemove={handleAvatarRemove} />
                    </div>
                </div>

                <SubmitButton text="Sign up" onClick={handleSubmit} />
            </form>

            <div ref={errorMessageRef}>
                {errorMessage && <Alert type="error">{errorMessage}</Alert>}
            </div>
        </div>
    );
}

export default RegisterForm;
