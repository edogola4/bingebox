import { useState, useEffect } from "react";
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
import Tooltip from "@mui/material/Tooltip";

import { motion } from "framer-motion"; // Animation library
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
  const [redirectCountdown, setRedirectCountdown] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

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

  const validateField = (name, value) => {
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address.";
    }
    if (name === "password" && value.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (name === "confirmPassword" && value !== password) {
      return "Passwords do not match.";
    }
    return null;
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (password.length < 10) return "Moderate";
    return "Strong";
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
      setError(null);
      navigate("/profilepage");
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
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { name });
      setError(null);
      resetFormFields();
      setRedirectCountdown(5);
    } catch (error) {
      switch (error.code) {
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

  useEffect(() => {
    if (redirectCountdown !== null) {
      const timer = setInterval(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);
      setTimeout(() => navigate("/profilepage"), 5000);
      return () => clearInterval(timer);
    }
  }, [redirectCountdown]);

  const progress = Object.keys(formFields).reduce(
    (acc, key) => (formFields[key] ? acc + 25 : acc),
    0
  );

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="form-wrapper"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 60 }}
      >
        <h2 className="form-title">Create Your Account</h2>
        <p className="form-subtitle">Join us and enjoy personalized features</p>
        <button onClick={toggleTheme} className="theme-toggle">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <Form
          signInWithGoogle={signInWithGoogle}
          handleSubmit={handleSubmit}
          text="Sign Up"
          google="Sign Up with Google"
        >
          {error && (
            <motion.p
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}
          
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
              onChange={(e) => {
                handleChange(e);
                setError(validateField("email", e.target.value));
              }}
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
                <Tooltip title="Toggle Password Visibility">
                  {passwordType.password === "password" ? (
                    <VisibilityOffRoundedIcon
                      className="password-toggle"
                      onClick={() => togglePasswordVisibility("password")}
                    />
                  ) : (
                    <VisibilityRoundedIcon
                      className="password-toggle"
                      onClick={() => togglePasswordVisibility("password")}
                    />
                  )}
                </Tooltip>
              }
            />
            <div className="password-strength">
              <p>Password Strength: {checkPasswordStrength(password)}</p>
            </div>
            <FormInput
              type={passwordType.confirmPassword}
              placeholder="Confirm Password"
              required
              onChange={handleChange}
              name="confirmPassword"
              value={confirmPassword}
              icon={
                <Tooltip title="Toggle Password Visibility">
                  {passwordType.confirmPassword === "password" ? (
                    <VisibilityOffRoundedIcon
                      className="password-toggle"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                    />
                  ) : (
                    <VisibilityRoundedIcon
                      className="password-toggle"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                    />
                  )}
                </Tooltip>
              }
            />
          </div>
          {loading && <p className="loading-message">Signing up...</p>}
          {redirectCountdown !== null && (
            <p>You will be redirected in {redirectCountdown} seconds...</p>
          )}
        </Form>
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </motion.div>
    </motion.div>
  );
};

export default AuthPage;
