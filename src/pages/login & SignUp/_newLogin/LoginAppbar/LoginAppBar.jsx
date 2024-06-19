import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TradeasyLogo from '../../../../assets/images/logo.png'; // Adjust the import according to your file structure

const LoginAppBar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'white', height: "6em" }} elevation={0}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={TradeasyLogo} alt="Treadeasy Logo" style={{ height: '50px', marginRight: '10px' }} />
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#000' }}>
                        Treadeasy
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default LoginAppBar;
