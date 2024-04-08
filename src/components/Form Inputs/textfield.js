import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicTextField({ id, variant, size, type }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
    setError(event.target.value === '');
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': {
          m: 1,
          width: '17.5em',
          "& .MuiInputBase-root": {
            height: '2.5em',
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
        id={id}
        variant={variant}
        size={size}
        type={type}
        margin='normal'
        required
        value={value}
        onChange={handleChange}
        error={error}
        helperText={error ? "This field is required" : ""}
        InputLabelProps={{
          shrink: true,
          error: error,
        }}
      />
    </Box>
  );
}
