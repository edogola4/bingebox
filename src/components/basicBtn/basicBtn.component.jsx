import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

/**
 * A reusable and customizable Button component.
 * 
 * Props:
 * - `text`: The text displayed inside the button.
 * - `icon`: An optional icon component displayed alongside the text.
 * - `onClick`: Function to handle button clicks.
 * - `variant`: The Material-UI button variant (default is "contained").
 * - `customStyles`: Additional inline styles for customization.
 */
const BasicBtn = ({ text = 'Click Me', icon = null, onClick = () => {}, variant = 'contained', customStyles = {} }) => {
  return (
    <Button onClick={onClick} variant={variant} style={{ margin: '5px', ...customStyles }}>
      {icon}
      {text}
    </Button>
  );
};

// Define prop types for better validation and readability
BasicBtn.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  customStyles: PropTypes.object,
};

// Define default props to provide default behavior
BasicBtn.defaultProps = {
  text: 'Click Me',
  icon: null,
  onClick: () => {},
  variant: 'contained',
  customStyles: {},
};

export default BasicBtn;
