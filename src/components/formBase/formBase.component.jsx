/*import { Link } from "react-router-dom";

import './formBase.styles.scss';

const FormBase = () => {
    return (
        <div className="form__rest">
            <div className='remember'>
                <input type='checkbox' />
                <label>Remember my login</label>
            </div>
            
            <div className='signup__form'>
                <p>Already on BingeBox? <Link to='/signin'>Sign in</Link></p>
            </div>
        </div>        
    )
}

export default FormBase;
*/


import { Link } from "react-router-dom";
import './formBase.styles.scss';

const FormBase = () => {
    return (
        <div className="form__rest">
            {/* Remember Me Section */}
            <div className='remember'>
                <input 
                    type='checkbox' 
                    id='rememberMe' 
                    className='remember__checkbox' 
                />
                <label 
                    htmlFor='rememberMe' 
                    className='remember__label'>
                    Remember my login
                </label>
            </div>
            
            {/* Sign-up Prompt Section */}
            <div className='signup__form'>
                <p className='signup__text'>
                    Already on BingeBox? 
                    <Link to='/signin' className='signup__link'>Sign in</Link>
                </p>
            </div>
        </div>        
    );
}

export default FormBase;