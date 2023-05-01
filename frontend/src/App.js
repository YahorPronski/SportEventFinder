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
            <Unauthorized>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/events" element={<HomePage />} />
                    <Route path="*" element={<Navigate to={"/events"} />} />
                </Routes>
            </Unauthorized>
            <Authorized>
                <Routes>
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/profile/edit" element={<ProfileEditPage />} />
                    <Route path="/profile/password-edit" element={<PasswordEditPage />} />
                    <Route path="/events" element={<HomePage />} />
                    <Route path="*" element={<Navigate to={"/events"} />} />
                </Routes>
            </Authorized>
        </BrowserRouter>
    );
}

export default App;
