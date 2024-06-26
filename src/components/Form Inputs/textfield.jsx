import React from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function BasicTextField({ id, name, variant, size, type, style, value, onChange, error, onKeyDown, helperText, disabled, readOnly }) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '17.5em',
                    "& .MuiInputBase-root": {
                        height: '2em',
                        backgroundColor: '#e9eeff'
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: '0.5em',
                        textAlign: 'center',
                    },
                },
            }}
            autoComplete="off"
        >
            <TextField
                id={id || "outlined-required"}
                name={name}
                variant={variant}
                size={size}
                type={type}
                style={style}
                margin='normal'
                required
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                error={error}
                helperText={helperText}
                disabled={disabled}
                InputLabelProps={{
                    shrink: true,
                    error: error,
                }}
                InputProps={{
                    readOnly: readOnly
                }}
            />
        </Box>
    );
}
