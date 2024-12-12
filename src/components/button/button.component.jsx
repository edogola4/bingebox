import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import AppleIcon from "@mui/icons-material/Apple";
import CircularProgress from "@mui/material/CircularProgress";

import "./button.styles.scss";

const BasicButton = ({
  signInWithGoogle = () => {},
  signInWithFacebook = () => {},
  signInWithTwitter = () => {},
  signInWithApple = () => {},
  text = "Submit",
  google = "Sign in with Google",
  facebook = "Sign in with Facebook",
  twitter = "Sign in with Twitter",
  apple = "Sign in with Apple",
  isSubmitting = false,
}) => {
  return (
    <div className="button-container">
      {/* Standard Button */}
      <Button
        type="submit"
        variant="contained"
        className={`button-container__standard ${
          isSubmitting ? "button-container__loading" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : text}
      </Button>

      {/* Google Sign-In */}
      <Button
        type="button"
        variant="contained"
        className="button-container__google"
        onClick={signInWithGoogle}
      >
        <GoogleIcon style={{ marginRight: "0.5rem" }} />
        {google}
      </Button>

      {/* Facebook Sign-In */}
      <Button
        type="button"
        variant="contained"
        className="button-container__facebook"
        onClick={signInWithFacebook}
      >
        <FacebookIcon style={{ marginRight: "0.5rem" }} />
        {facebook}
      </Button>

      {/* Twitter Sign-In */}
      <Button
        type="button"
        variant="contained"
        className="button-container__twitter"
        onClick={signInWithTwitter}
      >
        <TwitterIcon style={{ marginRight: "0.5rem" }} />
        {twitter}
      </Button>

      {/* Apple Sign-In */}
      <Button
        type="button"
        variant="contained"
        className="button-container__apple"
        onClick={signInWithApple}
      >
        <AppleIcon style={{ marginRight: "0.5rem" }} />
        {apple}
      </Button>
    </div>
  );
};

BasicButton.propTypes = {
  signInWithGoogle: PropTypes.func,
  signInWithFacebook: PropTypes.func,
  signInWithTwitter: PropTypes.func,
  signInWithApple: PropTypes.func,
  text: PropTypes.string,
  google: PropTypes.string,
  facebook: PropTypes.string,
  twitter: PropTypes.string,
  apple: PropTypes.string,
  isSubmitting: PropTypes.bool,
};

export default BasicButton;
