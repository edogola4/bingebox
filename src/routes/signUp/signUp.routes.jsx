
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

import "./signUp.styles.scss";

const defaultFormFields = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const AuthPage = () => {
    const navigate = useNavigate();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { name, email, password, confirmPassword } = formFields;
    const [passwordType, setPasswordType] = useState({
        password: "password",
        confirmPassword: "password",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const signInWithGoogle = async () => {
        try {
            await signInWithGooglePopup();
            setError(null);
            navigate('/profilepage');
        } catch (error) {
            setError("Google Sign-Up failed. Please try again.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { name });
            setError(null);
            resetFormFields();
            navigate('/profilepage');
        } catch (error) {
            switch(error.code) {
                case "auth/email-already-in-use":
                    setError("Email already in use");
                    break;
                default:
                    setError("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <Form
                signInWithGoogle={signInWithGoogle}
                handleSubmit={handleSubmit}
                text="Sign Up"
                google="Sign Up with Google"
            >
                {error && <p className="error-message">{error}</p>}
                <div className="form-inputs">
                    <FormInput
                        type="text"
                        placeholder="Username"
                        required
                        onChange={handleChange}
                        name="name"
                        value={name}
                        icon={<PersonRoundedIcon />}
                    />
                    <FormInput
                        type="email"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                        name="email"
                        value={email}
                        icon={<EmailRoundedIcon />}
                    />
                    <FormInput
                        type={passwordType.password}
                        placeholder="Password"
                        required
                        onChange={handleChange}
                        name="password"
                        value={password}
                        icon={
                            passwordType.password === "password" ? (
                                <VisibilityOffRoundedIcon onClick={() => togglePasswordVisibility("password")}/>
                            ) : (
                                <VisibilityRoundedIcon onClick={() => togglePasswordVisibility("password")} />
                            )
                        }
                    />
                    <FormInput
                        type={passwordType.confirmPassword}
                        placeholder="Confirm Password"
                        required
                        onChange={handleChange}
                        name="confirmPassword"
                        value={confirmPassword}
                        icon={
                            passwordType.confirmPassword === "password" ? (
                                <VisibilityOffRoundedIcon onClick={() => togglePasswordVisibility("confirmPassword")}/>
                            ) : (
                                <VisibilityRoundedIcon onClick={() => togglePasswordVisibility("confirmPassword")} />
                            )
                        }
                    />
                </div>
                {loading && <p>Signing up...</p>}
            </Form>
        </div>
    );
};

export default AuthPage;