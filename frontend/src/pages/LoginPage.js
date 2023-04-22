import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
//import useAuthContext from "../../context/useAuthContext";
//import * as AuthService from "../../services/authService";
import { Link } from 'react-router-dom';
import LoginForm from "../components/form/LoginForm";
import AlertMessage from "../components/AlertMessage";
import ImageText from "../components/ImageText";
import logo from '../assets/images/logo.png';
import '../assets/styles/pages/login-page.scss';

const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="login-section">
                <ImageText imgSrc={logo} imgAlt="logo">
                    Sign in to SportEventFinder
                </ImageText>
                <LoginForm />
                <AlertMessage>
                    New to SportEventFinder? <Link to="/register">Create an account.</Link>
                </AlertMessage>
            </div>
        </div>
    );
}

export default LoginPage;