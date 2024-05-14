import React from 'react';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function CustomDatePicker(props) {
    const { className, slotProps, required, onChange, style, ...otherProps } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                className={className}
                slotProps={slotProps}
                required={required}
                style={style}
                onChange={onChange}
                {...otherProps}
            />
        </LocalizationProvider>
    );
}

export default CustomDatePicker;
