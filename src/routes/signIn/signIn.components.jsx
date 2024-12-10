
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword 
} from "../../utils/firebase/firebase.utils";

import Form from "../../components/form/form.component";
import FormInput from '../../components/formInput/formInput.component';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

import './signIn.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = () => {
    const navigate = useNavigate();
    
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const [passwordType, setPasswordType] = useState('password');
    const [error, setError] = useState(null);

    const togglePassword = () => {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    
    const signInWithGoogle = async () => {
        try {
            await signInWithGooglePopup();
            setError(null);
            alert('Signed in Successfully!');
            navigate('/profilepage');
        } catch (error) {
            setError('Google Sign-In failed. Please try again.');
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            setError(null);
            alert('Login Successful!');
            resetFormFields();
            navigate('/profilepage');
        } catch (error) {
            switch(error.code) {
                case "auth/wrong-password":
                    setError("Incorrect password for email");
                    break;
                case "auth/user-not-found":
                    setError("No user associated with this email");
                    break;
                default:
                    setError("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="signin bg">
            <Form
                signInWithGoogle={signInWithGoogle}
                handleSubmit={handleSubmit} 
                text='Login'
                google='Sign in with Google'
            >
                {error && <p className="error-message">{error}</p>}
                <div className='form__inputs'>
                    <FormInput     
                        type='email' 
                        placeholder='Email' 
                        required
                        onChange={handleChange} 
                        name='email' 
                        value={email}
                        icon={<EmailRoundedIcon />}
                    />
                    
                    <FormInput 
                        type={passwordType} 
                        placeholder='Password' 
                        required 
                        onChange={handleChange} 
                        name='password' 
                        value={password}
                        icon={
                            passwordType === 'password' ? 
                            <VisibilityOffRoundedIcon onClick={togglePassword}/> :
                            <VisibilityRoundedIcon onClick={togglePassword} />
                        }
                    />
                </div>
            </Form>
        </div>
    )
}

export default SignIn;