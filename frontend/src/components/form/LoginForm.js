import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../../context/useAuthContext";
import * as AuthService from "../../services/AuthService";
import AlertMessage from "../AlertMessage";
import TextInput from "./elements/TextInput";
import SubmitButton from "./elements/SubmitButton";
import '../../assets/styles/components/form/login-form.scss';

const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { updateAuthContext } = useAuthContext();

    const [credentials, setCredentials] = useState({usernameOrEmail: '', password: ''});
    const [errorMessage, setErrorMessage] = useState('');
    const errorMessageRef = useRef(null);

    const registerSuccess = location.state?.registerSuccess;

    useEffect(() => {
        if (registerSuccess) {
            delete location.state.registerSuccess;
        }
    }, [registerSuccess, location]);

    useEffect(() => {
        if (errorMessage) {
            errorMessageRef.current.scrollIntoView();
        }
    }, [errorMessage]);

    const handleSubmit = () => {
        setErrorMessage("");
        if (!validateForm()) return;

        const onLoginSuccess = () => {
            updateAuthContext().then(() => navigate("/"));
        };

        const onLoginError = (error) => {
            if (error.response?.status === 401) {
                setCredentials(creds => ({...creds, password: ''}));
                setErrorMessage("Invalid username or password");
            } else {
                setErrorMessage("Unexpected error, try again later");
                console.log(error);
            }
        };

        AuthService.login(credentials, onLoginSuccess, onLoginError);
    };

    const handleInput = (event) => {
        setCredentials(creds => ({
            ...creds,
            [event.target.name]: event.target.value,
        }));
    };

    const validateForm = () => {
        const isBlank = (str) => !str || !str.trim().length;
        if (isBlank(credentials.usernameOrEmail) || isBlank(credentials.password)) {
            setErrorMessage("Please enter username/email and password");
            return false;
        }
        return true;
    };

    return (
        <>
            <form className="login-form">
                <TextInput
                    label="Username or Email"
                    name="usernameOrEmail"
                    value={credentials.usernameOrEmail}
                    onChange={handleInput}/>
                <TextInput
                    label="Password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInput}
                    hidden/>
                <SubmitButton text="Sign in" onClick={handleSubmit}/>
            </form>

            <div ref={errorMessageRef}>
                {errorMessage && <AlertMessage type="error">{errorMessage}</AlertMessage>}
            </div>

            {!errorMessage && registerSuccess &&
                <AlertMessage type="success">Registration successful! Please log in.</AlertMessage>
            }
        </>
    );
}

export default LoginForm;