import React from 'react';
import { Alert, Snackbar } from "@mui/material";

function CustomizedAlert({ onClose, open, message, severity, style }) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            data-testid="customized-snackbar"
        >
            <Alert
                onClose={onClose}
                severity={severity}
                variant="filled"
                style={{
                    ...style,
                    width: '100%'
                }}
                data-testid="customized-alert"
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default CustomizedAlert;
