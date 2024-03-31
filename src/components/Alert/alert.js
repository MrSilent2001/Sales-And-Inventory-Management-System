import React from 'react';
import Alert from '@mui/material/Alert';

function CustomizedAlert({ variant, severity, onClose, children }) {
    return (
        <Alert variant={variant} severity={severity} onClose={onClose}>
            {children}
        </Alert>
    );
}

export default CustomizedAlert;
