import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Grid, Button, Typography, Box, CssBaseline } from '@mui/material';
import LoginAppBar from "../LoginAppbar/LoginAppBar";
import {Link} from "react-router-dom";

// Create a custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#23358a',
        },
        secondary: {
            main: '#ffffff',
        },
        text: {
            primary: '#ffffff', // White text for dark background
            secondary: '#000000', // Black text for light background
        },
        background: {
            default: '#ffffff', // White background
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h5: {
            fontWeight: 700,
            fontSize: '3rem',
        },
        body1: {
            fontSize: '1rem',
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight:'bold',
                    padding: '8px 50px',
                    borderRadius: '8px',
                },
            },
        },
    },
});

const LoginSelectionPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LoginAppBar/>
            <Container maxWidth="xl" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid container style={{ height: '100%', width: '100%' }}>
                    <Grid item xs={12} md={6} style={{ backgroundColor: '#1b3f7e', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ffffff', padding:'100px' }}>
                        <Box textAlign="center">
                            <Typography variant="h5" gutterBottom>
                                For Suppliers
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Welcome, suppliers! Start selling your products on our platform and reach millions of customers worldwide.
                            </Typography>
                            <Button variant="contained" color="secondary" size="large" component={Link} to="/supplierLoginSignup/login" style={{ marginBottom: '16px' }}>
                                Login
                            </Button>
                            <Typography variant="body2">
                                Don't have an account? <a href="/supplierLoginSignup/signup" style={{ color: '#ffffff', textDecoration: 'underline' }}>Sign Up</a>.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', color: '#000000', padding:'100px'}}>
                        <Box textAlign="center">
                            <Typography variant="h5" gutterBottom>
                                For Customers
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Welcome, customers! Explore our vast selection of products, enjoy exclusive deals, and shop with confidence..
                            </Typography>
                            <Button variant="outlined" color="primary" size="large" component={Link} to="/customerLoginSignup/login" style={{ marginBottom: '16px' }}>
                                Login
                            </Button>
                            <Typography variant="body2">
                                Don't have an account? <a href="/customerLoginSignup/signup" style={{ color: '#00796b', textDecoration: 'underline' }}>Sign up</a>.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default LoginSelectionPage;
