import React from 'react';
import { Select, MenuItem } from '@mui/material';

const ComboBox = ({ value, onChange, options, style, defaultValue }) => {
    return (
        <Select
            value={value}
            onChange={onChange}
            sx={{ height: '2.5em', ...style }}
            defaultValue={defaultValue}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    );
};

export default ComboBox;

