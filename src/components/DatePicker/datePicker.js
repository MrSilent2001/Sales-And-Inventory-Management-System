import React from 'react';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

function CustomDatePicker(props) {
    const { className, slotProps, required, ...otherProps } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                className={className}
                slotProps={slotProps}
                required={required}
                {...otherProps}
            />
        </LocalizationProvider>
    );
}

export default CustomDatePicker;
