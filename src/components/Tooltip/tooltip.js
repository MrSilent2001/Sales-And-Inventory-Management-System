import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';

function CustomTooltip({title, children}) {
    return (
        <Tooltip title={title} arrow>
            {children}
        </Tooltip>
    );
}

export default CustomTooltip;
