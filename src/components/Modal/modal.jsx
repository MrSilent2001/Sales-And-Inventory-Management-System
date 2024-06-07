// import { Box } from '@mui/material';
// const CenteredModal = ({ children, style}) => {
//     return (
//         <Box
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             height="100vh"
//             style={style}
//         >
//                 {children}
//         </Box>
//     );
// };
//
// export default CenteredModal;

import React, { forwardRef } from 'react';
import { Box } from '@mui/material';

const CenteredModal = forwardRef(({ children, style }, ref) => {
    return (
        <Box
            ref={ref}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            style={style}
        >
            {children}
        </Box>
    );
});

export default CenteredModal;
