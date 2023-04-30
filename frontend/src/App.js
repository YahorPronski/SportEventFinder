import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import PasswordEditPage from "./pages/PasswordEditPage";
import Authorized from "./context/Authorized";
import Unauthorized from "./context/Unauthorized";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Unauthorized redirect="/"><LoginPage /></Unauthorized>} />
                <Route path="/register" element={<Unauthorized redirect="/"><RegisterPage /></Unauthorized>} />
                <Route path="/profile" element={<Authorized redirect="/login"><ProfilePage /></Authorized>} />
                <Route path="/profile/edit" element={<Authorized redirect="/login"><ProfileEditPage /></Authorized>} />
                <Route path="/profile/password-edit" element={<Authorized redirect="/login"><PasswordEditPage /></Authorized>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
