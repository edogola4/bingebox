 /*import React, { useState } from "react";
//import "./AuthForm.css"; // Ensure to include the CSS styles shared earlier
import "./signUp.styles.scss";


const AuthForm = ({ createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, navigate }) => {
    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const resetFormFields = () => {
        setFormFields({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, password, confirmPassword } = formFields;

        if (!name || !email || !password) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { name });
            alert("Account created successfully!");
            resetFormFields();
            navigate("/profilepage");
        } catch (error) {
            const errorMessage =
                error.code === "auth/email-already-in-use"
                    ? "Email already in use. Please login instead."
                    : "Something went wrong. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
        setError(""); // Clear error message on input change
    };

    return (
        <div className="auth-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-inputs">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formFields.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formFields.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formFields.password}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formFields.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                {loading && <p className="loading-message">Processing...</p>}
                {error && <p className="error-message">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Please wait..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
*/



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

