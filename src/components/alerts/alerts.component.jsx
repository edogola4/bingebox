import React from 'react';
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types';

/**
 * A reusable and customizable Alert component.
 * 
 * Props:
 * - `type`: Severity of the alert (error, warning, info, success).
 * - `text`: The message displayed in the alert.
 * - `customStyles`: Additional inline styles for customization.
 */
const Alerts = ({ type = 'info', text = 'Something happened!', customStyles = {} }) => {
  return (
    <Alert severity={type} style={{ margin: '10px 0', ...customStyles }}>
      {text}
    </Alert>
  );
};

// Define prop types for better validation and readability
Alerts.propTypes = {
  type: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  text: PropTypes.string,
  customStyles: PropTypes.object,
};

// Define default props to provide default behavior
Alerts.defaultProps = {
  type: 'info',
  text: 'This is a default alert message.',
  customStyles: {},
};

export default Alerts;
