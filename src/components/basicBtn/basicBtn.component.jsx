

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const BasicBtn = ({ 
  text = 'Click Me', 
  icon = null, 
  functions = () => {}, 
  variant = 'contained', 
  color = 'primary' 
}) => {
  return (
    <Button 
      onClick={functions} 
      variant={variant} 
      color={color}
    >
      {icon}
      {text}
    </Button>
  );
};

BasicBtn.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.node,
  functions: PropTypes.func,
  variant: PropTypes.string,
  color: PropTypes.string,
};

export default BasicBtn;

