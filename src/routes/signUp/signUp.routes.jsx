import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    signInWithGooglePopup,
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import Form from "../../components/form/form.component";
import FormInput from "../../components/formInput/formInput.component";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

import "./signUp.styles.scss"; // Ensure this file exists

const defaultFormFields = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const AuthPage = () => {
    const navigate = useNavigate();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const [passwordType, setPasswordType] = useState({
        password: "password",
        confirmPassword: "password",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const togglePasswordVisibility = (field) => {
        setPasswordType((prev) => ({
            ...prev,
            [field]: prev[field] === "password" ? "text" : "password",
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => setFormFields(defaultFormFields);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { name, email, password, confirmPassword } = formFields;

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { name });
            setError(null);
            resetFormFields();
            navigate("/profilepage");
        } catch (error) {
            const errorMessage =
                error.code === "auth/email-already-in-use"
                    ? "Email already in use. Please try logging in."
                    : "An unexpected error occurred. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const { user } = await signInWithGooglePopup();
            await createUserDocumentFromAuth(user);
            navigate("/profilepage");
        } catch (error) {
            setError("Google sign-in failed. Please try again.");
        }
    };

    return (
        <div className={`auth-container ${isDarkMode ? "dark-mode" : ""}`}>
            <div className="theme-toggle">
                <button onClick={toggleDarkMode}>
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                </button>
            </div>
            <Form
                signInWithGoogle={signInWithGoogle}
                handleSubmit={handleSubmit}
                text="Sign Up"
                google="Sign Up with Google"
            >
                <div className="form-inputs">
                    {error && <p className="error-message">{error}</p>}
                    <FormInput
                        type="text"
                        placeholder="Username"
                        required
                        onChange={handleChange}
                        name="name"
                        value={formFields.name}
                        icon={<PersonRoundedIcon />}
                    />
                    <FormInput
                        type="email"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                        name="email"
                        value={formFields.email}
                        icon={<EmailRoundedIcon />}
                    />
                    <FormInput
                        type={passwordType.password}
                        placeholder="Password"
                        required
                        onChange={handleChange}
                        name="password"
                        value={formFields.password}
                        icon={
                            passwordType.password === "password" ? (
                                <VisibilityOffRoundedIcon
                                    onClick={() => togglePasswordVisibility("password")}
                                />
                            ) : (
                                <VisibilityRoundedIcon
                                    onClick={() => togglePasswordVisibility("password")}
                                />
                            )
                        }
                    />
                    <FormInput
                        type={passwordType.confirmPassword}
                        placeholder="Confirm Password"
                        required
                        onChange={handleChange}
                        name="confirmPassword"
                        value={formFields.confirmPassword}
                        icon={
                            passwordType.confirmPassword === "password" ? (
                                <VisibilityOffRoundedIcon
                                    onClick={() => togglePasswordVisibility("confirmPassword")}
                                />
                            ) : (
                                <VisibilityRoundedIcon
                                    onClick={() => togglePasswordVisibility("confirmPassword")}
                                />
                            )
                        }
                    />
                </div>
                {loading && <p className="loading-message">Processing...</p>}
            </Form>
        </div>
    );
};

export default AuthPage;
