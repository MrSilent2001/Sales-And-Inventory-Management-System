import React from 'react';
import { CssBaseline, Container, Box, Button, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoginAppBar from "../LoginAppbar/LoginAppBar";
import { Link } from 'react-router-dom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000', // Dark blue
        },
        background: {
            default: '#ffffff', // White background
            paper: '#f4f4f4', // Light grey background for cards
        },
        text: {
            primary: '#333333', // Dark text
            secondary: '#666666', // Grey text
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
        h1: {
            fontSize: '4rem',
            fontWeight: 800,
        },
        body1: {
            fontSize: '1.2rem',
            lineHeight: 1.6,
        },
        button: {
            fontSize: '1rem',
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: '700',
                    borderRadius: '10px',
                    padding: '10px 50px',
                },
                containedPrimary: {
                    background: '#1e3a8a',
                    boxShadow: '0 2px 4px rgba(30, 58, 138, 0.2)',
                },
                outlinedPrimary: {
                    borderColor: '#1e3a8a',
                    color: '#1e3a8a',
                    '&:hover': {
                        backgroundColor: '#1e3a8a20',
                    },
                },
            },
        },
    },
});

function LandingPage() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LoginAppBar/>

            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        textAlign: 'center',
                        padding: 4,
                    }}
                >
                    <Typography variant="h1" component="h1" gutterBottom sx={{ color: theme.palette.primary.main }}>
                        Welcome to Tradeasy
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{ maxWidth: '600px', mb: 3, color: theme.palette.text.primary }}>
                        Discover the best products at unbeatable prices. Shop now and experience seamless online shopping like never before.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" color="primary" sx={{ mx: 1 }} component={Link} to="/adminLoginSignup/">
                            Login
                        </Button>
                        <Button variant="outlined" color="primary" sx={{ mx: 1 }} component={Link} to="/adminLoginSignup">
                            Sign Up
                        </Button>
                    </Box>
                    <Typography variant="body1" sx={{ mt: 4, color: theme.palette.text.secondary }}>
                        Join our community of over 1 million satisfied customers worldwide.
                    </Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default LandingPage;
