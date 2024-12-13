
import './formInput.styles.scss';

const FormInput = ({ icon, label, errorMessage, ...otherProps }) => {
    return (
        <div className="form-group">
            {label && <label className="form-group__label">{label}</label>}
            <div className='form-group__input'>
                <input {...otherProps} className="form-group__input-field" />
                {icon && (
                    <div className='form-group__svg'>{icon}</div>
                )}
            </div>
            {errorMessage && <p className="form-group__error">{errorMessage}</p>}
        </div>
    )
}

export default FormInput;
