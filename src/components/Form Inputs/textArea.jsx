import React from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function BasicTextArea({ id, name, variant, size, type, style, value, onChange, error, onKeyDown, helperText, disabled, readOnly, rows, rowsMax }) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '17.5em',
                    "& .MuiInputBase-root": {
                        height: 'auto',
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
                multiline
                rows={2}
                maxRows={rowsMax}
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
