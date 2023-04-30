import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import AlertMessage from "../AlertMessage";
import TextInput from "./elements/TextInput";
import FileUpload from "./elements/FileUpload";
import SubmitButton from "./elements/SubmitButton";
import '../../assets/styles/components/form/password-edit-form.scss';

const PasswordEditForm = () => {
    const navigate = useNavigate();

    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
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
            navigate("/profile");
        };

        const onError = (error) => {
            if (error.response?.status === 400) {
                setErrorMessage("Wrong old password");
            } else {
                setErrorMessage("Unexpected error, try again later");
            }
        };

        UserService.updateUserPassword({
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword,
        }, onSuccess, onError);
    };

    const handleInput = (event) => {
        setPasswords(passwords => ({
            ...passwords,
            [event.target.name]: event.target.value,
        }));
    };

    const validateForm = () => {
        const isBlank = (str) => !str || !str.trim().length;
        if (isBlank(passwords.oldPassword) || isBlank(passwords.newPassword) || isBlank(passwords.newPasswordConfirm)) {
            setErrorMessage("Not all required fields are filled");
            return false;
        }
        if (passwords.newPassword !== passwords.newPasswordConfirm) {
            setErrorMessage("New password mismatch");
            return false;
        }
        return true;
    };

    return (
        <>
            <form className="password-edit-form">
                <TextInput
                    label="Old password"
                    name="oldPassword"
                    value={passwords.oldPassword}
                    onChange={handleInput}
                    hidden
                    required/>
                <TextInput
                    label="New Password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handleInput}
                    hidden
                    required/>
                <TextInput
                    label="Confirm New Password"
                    name="newPasswordConfirm"
                    value={passwords.newPasswordConfirm}
                    onChange={handleInput}
                    hidden
                    required/>
                <SubmitButton text="Save changes" onClick={handleSubmit}/>
            </form>
            <div ref={errorMessageRef}>
                {errorMessage && <AlertMessage type="error">{errorMessage}</AlertMessage>}
            </div>
        </>
    );
}

export default PasswordEditForm;