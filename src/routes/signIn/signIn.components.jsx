import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import Form from "../../components/form/form.component";
import FormInput from "../../components/formInput/formInput.component";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

import "./signIn.styles.scss";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignIn = () => {
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [passwordType, setPasswordType] = useState("password");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { email, password } = formFields;

    const togglePassword = () => {
        setPasswordType((prevType) =>
            prevType === "password" ? "text" : "password"
        );
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => setFormFields(defaultFormFields);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            alert("Login Successful!");
            resetFormFields();
            navigate("/profilepage");
        } catch (error) {
            setError("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            await signInWithGooglePopup();
            navigate("/profilepage");
        } catch (error) {
            setError("Google sign-in failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin">
            <Form
                signInWithGoogle={signInWithGoogle}
                handleSubmit={handleSubmit}
                text="Login"
                google="Sign in with Google"
            >
                <div className="form__inputs">
                    {error && <p className="error-message">{error}</p>}
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
                        type={passwordType}
                        placeholder="Password"
                        required
                        onChange={handleChange}
                        name="password"
                        value={password}
                        icon={
                            passwordType === "password" ? (
                                <VisibilityOffRoundedIcon
                                    onClick={togglePassword}
                                />
                            ) : (
                                <VisibilityRoundedIcon
                                    onClick={togglePassword}
                                />
                            )
                        }
                    />
                </div>
                {loading && <p>Loading...</p>}
            </Form>
        </div>
    );
};

export default SignIn;
