import * as React from 'react';
import { Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

export default function PageLoader() {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    );
}
