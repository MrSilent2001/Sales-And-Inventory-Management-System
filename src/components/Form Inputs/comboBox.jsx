import React from 'react';
import { Select, MenuItem, Box } from '@mui/material';

const getOptionStyles = (backgroundColor, borderColor, textColor) => ({
    backgroundColor,
    color: textColor,
    borderRadius: '0.5em',
    padding: '0.5em 1em',
    // margin: '0.2em 0',
    // marginLeft:'-1em',
    height: '1.35em',
    // width : '108%',
    textAlign: 'center',
    fontSize: '0.9em',
    fontFamily: 'inter',
    fontWeight: 'normal',
    border: `1px solid ${borderColor}`,
    '&:hover': {
        backgroundColor: backgroundColor.replace('0.1', '0.15'), // Slightly increase opacity on hover
    },
});

const ComboBox = ({ value, onChange, options, style, defaultValue }) => {
    const renderValue = (selected) => {
        const selectedOption = options.find(option => option.value === selected);
        return selectedOption ? (
            <Box sx={{
                ...getOptionStyles(`rgba(${selectedOption.rgb}, 0.1)`, `rgba(${selectedOption.rgb}, 0)`, `rgba(${selectedOption.rgb}, 1)`),
                marginLeft:'-1em',
                width : '108%'
            }}>
                {selectedOption.label}
            </Box>

        ) : null;
    };

    return (
        <Select
            value={value}
            onChange={onChange}
            sx={{ height: '2.5em', ...style }}
            defaultValue={defaultValue}
            renderValue={renderValue}
        >
            {options.map((option) => (
                <MenuItem
                    key={option.value}
                    value={option.value}
                >
                    <Box sx={{
                        ...getOptionStyles(`rgba(${option.rgb}, 0.1)`, `rgba(${option.rgb}, 0)`, `rgba(${option.rgb}, 1)`),
                        margin: '0.2em 0',
                        width : '100%'
                    }}>
                        {option.label}
                    </Box>
                </MenuItem>
            ))}
        </Select>
    );
};

export default ComboBox;
