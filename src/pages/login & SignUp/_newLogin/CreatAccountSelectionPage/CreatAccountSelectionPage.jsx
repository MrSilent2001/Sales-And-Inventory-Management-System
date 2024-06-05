import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, Button, Grid, Box, Paper } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TreadeasyLogo from '../../../../assets/images/logo.png';
import LoginAppBar from "../LoginAppbar/LoginAppBar";

const theme = createTheme({
    palette: {
        primary: {
            main: '#133680',
        },
        secondary: {
            main: '#406dff'
        },
        background: {
            default: '#fff',
        },
    },
    typography: {
        h4: {
            fontWeight: 700,
            color: '#333',
            letterSpacing: '0.05em',
        },
        h6: {
            fontWeight: 600,
            color: '#555',
        },
        body2: {
            color: '#757575',
        },
    },
});

const StyledCard = styled(Card)(({ theme, selected }) => ({
    cursor: 'pointer',
    border: selected ? `2px solid ${theme.palette.primary.main}` : '1px solid #e0e0e0',
    boxShadow: selected ? '0 8px 16px rgba(0, 188, 212, 0.4)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s',
    backgroundColor: selected ? '#e0f7fa' : '#fff',
    // backgroundColor: '#fff',
    '&:hover': {
        boxShadow: '8px rgba(0, 0, 0, 0.15)',
        // transform: 'translateY(-5px)',
    },
}));

const CreatAccountSelectionPage = () => {
    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleCreateAccount = () => {
        if (selectedCard === 'supplier') {
            alert('Redirect to supplier');
        } else if (selectedCard === 'customer') {
            alert('Redirect to customer');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            {/*<LoginAppBar/>*/}
            <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', px: 2 }}>
                    <Container maxWidth="sm" sx={{ backgroundColor: '#fff', borderRadius: 4, py: 5 }}>
                        <Box textAlign="center" mb={5}>
                            <img src={TreadeasyLogo} alt="Logo" style={{ marginBottom: 20, height: 100 }} />
                            <Typography variant="h4" component="h1" gutterBottom>
                                How do you want to use Treadeasy?
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                We’ll personalize your setup experience accordingly.
                            </Typography>
                        </Box>
                        <Grid container spacing={3} justifyContent="center">
                            <Grid item xs={12}>
                                <StyledCard
                                    onClick={() => handleCardClick('hire')}
                                    selected={selectedCard === 'hire'}
                                >
                                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LocalShippingIcon sx={{ fontSize: 40, marginRight: 2, color: selectedCard === 'supplier' ? 'primary.main' : 'text.secondary' }} />
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width:'100%'}}>
                                            <Typography variant="h6" component="h2">
                                                I’m here as a Supplier
                                            </Typography>
                                            <Typography variant="body2">
                                                Selling parts and material
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                            <Grid item xs={12}>
                                <StyledCard
                                    onClick={() => handleCardClick('practice')}
                                    selected={selectedCard === 'practice'}
                                >
                                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                        <ShoppingCartIcon sx={{ fontSize: 40, marginRight: 2, color: selectedCard === 'customer' ? 'primary.main' : 'text.secondary' }} />
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width:'100%'}}>
                                            <Typography variant="h6" component="h2">
                                                I’m here as Customer
                                            </Typography>
                                            <Typography variant="body2">
                                                To buy items
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </StyledCard>
                            </Grid>
                        </Grid>
                        <Box textAlign="center" mt={5}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateAccount}
                                disabled={!selectedCard}
                                sx={{ borderRadius: '10px', px: 4, py: 1.5, fontSize: '0.9rem', fontWeight:'bold' }}
                            >
                                Create account
                            </Button>
                        </Box>
                    </Container>
                </Box>
                <Box sx={{ width: '30%', bgcolor: 'black', display: { xs: 'none', md: 'block' } }}></Box>
            </Box>
        </ThemeProvider>
    );
};

export default CreatAccountSelectionPage;
