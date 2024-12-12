/*import Logo from '../../assets/logo-full.png';

import BasicButton from '../button/button.component';
import FormBase from '../formBase/formBase.component';

import './form.styles.scss';

const Form = ({signInWithGoogle, text, rest, handleSubmit, children, google}) => {
    return (
        <form onSubmit={handleSubmit} className='form'>
            <div className='form__container'>
                <div className='form__content'>
                    <div className='logo__container'>
                        <img src={Logo} alt='logo'/>
                    </div>
                    {children}
                    <BasicButton signInWithGoogle={signInWithGoogle} text={text} google={google} />
                    {rest && (
                        <FormBase />
                    )}
                </div>
            </div>
        </form>
    )
}

export default Form;
*/
import React from "react";
import PropTypes from "prop-types";
import Logo from "../../assets/logo-full.png";

import BasicButton from "../button/button.component";
import FormBase from "../formBase/formBase.component";

import "./form.styles.scss";

const Form = ({
  signInWithGoogle,
  signInWithFacebook,
  signInWithApple,
  signInWithX,
  text = "Submit",
  google = "Sign in with Google",
  facebook = "Sign in with Facebook",
  apple = "Sign in with Apple",
  x = "Sign in with X",
  handleSubmit,
  children,
  rest = false,
  className = "",
}) => {
  return (
    <form 
      onSubmit={handleSubmit} 
      className={`form ${className}`} 
      aria-label="Form Container"
    >
      <div className="form__container">
        <div className="form__content">
          {/* Logo Section */}
          <div className="logo__container">
            <img 
              src={Logo} 
              alt="Application Logo" 
              className="form__logo" 
            />
          </div>

          {/* Form Fields */}
          <div className="form__fields">
            {children}
          </div>

          {/* Social Sign-In Buttons */}
          <div className="form__buttons">
            <BasicButton
              signInWithGoogle={signInWithGoogle}
              signInWithFacebook={signInWithFacebook}
              signInWithApple={signInWithApple}
              signInWithX={signInWithX}
              text={text}
              google={google}
              facebook={facebook}
              apple={apple}
              x={x}
            />
          </div>

          {/* Additional Base Form */}
          {rest && <FormBase />}
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithFacebook: PropTypes.func,
  signInWithApple: PropTypes.func,
  signInWithX: PropTypes.func,
  text: PropTypes.string,
  google: PropTypes.string,
  facebook: PropTypes.string,
  apple: PropTypes.string,
  x: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node,
  rest: PropTypes.bool,
  className: PropTypes.string,
};

export default Form;
