import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Box } from '@mui/material';
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export default function MultiActionAreaCard({ item, handleClick, handleBodyClick, handleImageClick }) {
    const { productName, productSellingPrice, productImage, discountRate, productQuantity } = item;

    // Calculate the final price after discount if discountRate is not null
    const finalPrice = discountRate ? productSellingPrice * (1 - discountRate / 100) : productSellingPrice;

    const CustomButton = styled(Button)(({ theme }) => ({
        color: '#242f9a',
        backgroundColor: 'rgba(36,47,154,0.14)',
        border: '1px solid #242f9a',
        width: '12em',
        height: '2.5em',
        fontSize: '0.95em',
        fontFamily: 'inter',
        padding: '0.5em 0.625em',
        borderRadius: '0.35em',
        fontWeight: '550',
        marginTop: '0.625em',
        marginBottom: '1em',
        textTransform: 'none',
        textAlign: 'center',
        '&:hover': {
            backgroundColor: '#242f9a',
            color: '#FFFFFF',
        },
    }));

    const OutOfStockButton = styled(Button)(({ theme }) => ({
        color: '#ffffff',
        backgroundColor: '#f44336',
        border: '1px solid #f44336',
        width: '12em',
        height: '2.5em',
        fontSize: '0.95em',
        fontFamily: 'inter',
        padding: '0.5em 0.625em',
        borderRadius: '0.35em',
        fontWeight: '550',
        marginTop: '0.625em',
        marginBottom: '1em',
        textTransform: 'none',
        textAlign: 'center',
        cursor: 'not-allowed',
        '&.Mui-disabled': {
            color: '#ffffff', // Ensure the text remains white when disabled
            backgroundColor: '#f44336',
        },
    }));

    return (
        <Card sx={{ maxWidth: 300, width: 300, minHeight: 400 }}>
            <CardActionArea
                onClick={() => handleBodyClick(item)}
                sx={{ opacity: productQuantity === 0 ? 1 : 1 }}
            >
                <CardMedia
                    component="img"
                    height="250"
                    image={productImage[0]}
                    alt={productName}
                    onClick={(e) => {
                        if (productQuantity > 0) {
                            e.stopPropagation();
                            handleImageClick(item);
                        }
                    }}
                    sx={{ pointerEvents: productQuantity === 0 ? 'none' : 'auto' }}
                />
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '4.5em' }}>
                    <Typography variant="body2" color="text.primary">
                        {productName}
                    </Typography>
                    {discountRate && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'gray' }}>
                                Rs.{productSellingPrice.toFixed(2)}
                            </Typography>
                            <Box
                                sx={{
                                    backgroundColor: '#4CAF50',
                                    color: '#FFFFFF',
                                    padding: '0.2em 0.5em',
                                    marginLeft: '0.5em',
                                    borderRadius: '0.2em',
                                    fontWeight: 'bold',
                                }}
                            >
                                {`${discountRate}% OFF`}
                            </Box>
                        </Box>
                    )}
                    <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                        Rs.{finalPrice.toFixed(2)}
                    </Typography>
                    {/*{productQuantity === 0 && (*/}
                    {/*    <Typography variant="body2" color="error" sx={{ fontWeight: 'bold' }}>*/}
                    {/*        Out of Stock*/}
                    {/*    </Typography>*/}
                    {/*)}*/}
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: 'center' }}>
                {productQuantity > 0 ? (
                    <CustomButton onClick={() => handleClick(item)}>Add to Cart</CustomButton>
                ) : (
                    <OutOfStockButton disabled>Out of Stock</OutOfStockButton>
                )}
            </CardActions>
        </Card>
    );
}
