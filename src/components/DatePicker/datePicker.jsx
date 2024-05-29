import React from 'react';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function CustomDatePicker(props) {
    const { className, slotProps, required, onChange, style, ...otherProps } = props;

    const disablePastDates = (date) => {
        return date < dayjs().startOf('day');
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                className={className}
                slotProps={slotProps}
                required={required}
                sx={{ style }}
                onChange={onChange}
                disablePastDate={true}
                shouldDisableDate={disablePastDates}
                {...otherProps}
            />
        </LocalizationProvider>
    );
}

export default CustomDatePicker;
