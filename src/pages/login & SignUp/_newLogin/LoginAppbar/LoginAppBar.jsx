import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TradeasyLogo from '../../../../assets/images/logo.png'; // Adjust the import according to your file structure
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom

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
                <Box>
                    <Button variant="outlined" color="primary" sx={{ mx: 1 }} component={Link} to="/create">
                        Sign Up
                    </Button>
                    <Button variant="contained" color="primary" component={Link} to="/loginSelect">
                        Login
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default LoginAppBar;
