// import React from 'react';
// import { Select, MenuItem } from '@mui/material';
//
// const ComboBox = ({ value, onChange, options, style }) => {
//     return (
//         <Select
//             value={value}
//             onChange={onChange}
//             sx={{height: '2.5em', ...style}}
//         >
//             <MenuItem value="None">
//                 <em>None</em>
//             </MenuItem>
//
//             {options.map((option) => (
//                 <MenuItem key={option.value} value={option.value}>
//                     {option.label}
//                 </MenuItem>
//             ))}
//         </Select>
//     );
// };
//
// export default ComboBox;


import React from 'react';
import { Select, MenuItem } from '@mui/material';

const ComboBox = ({ value, onChange, options, style, defaultValue }) => {
    return (
        <Select
            value={value}
            onChange={onChange}
            sx={{ height: '2.5em', ...style }}
            defaultValue={defaultValue} // Set defaultValue directly in Select
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

