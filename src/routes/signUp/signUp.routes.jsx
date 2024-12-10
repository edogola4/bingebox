import React, { useState } from "react";
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
