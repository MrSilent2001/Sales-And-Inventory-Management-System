import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import CustomizedButton from "../Button/button";

export default function MultiActionAreaCard({ item, handleClick, handleBodyClick, handleImageClick }) {
    const { productName, productSellingPrice, productImage, discountRate, productQuantity } = item;

    // Calculate the final price after discount if discountRate is not null
    const finalPrice = discountRate ? productSellingPrice * (1 - discountRate / 100) : productSellingPrice;

    return (
        <Card sx={{ maxWidth: 300, width: 300 }}>
            <CardActionArea
                onClick={() => {
                    if (productQuantity > 0) handleBodyClick(item);
                }}
                disabled={productQuantity === 0}
                // sx={{ opacity: productQuantity === 0 ? 0.5 : 1 }}
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
                <CardContent>
                    <Typography variant="body2" color="text.primary">
                        {productName}
                    </Typography>
                    {discountRate && (
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'gray' }}>
                            Rs.{productSellingPrice.toFixed(2)}
                        </Typography>
                    )}
                    <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                        Rs.{finalPrice.toFixed(2)}
                    </Typography>
                    {productQuantity === 0 && (
                        <Typography variant="body2" color="error" sx={{ fontWeight: 'bold' }}>
                            Out of Stock
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
            {productQuantity > 0 && ( // Render button only if productQuantity is greater than zero
                <CardActions sx={{ justifyContent: 'center' }}>
                    <CustomizedButton
                        onClick={() => handleClick(item)}
                        hoverBackgroundColor="#2d3ed2"
                        disableElevation
                        style={{
                            color: '#ffffff',
                            backgroundColor: '#242F9B',
                            border: '1px solid #242F9B',
                            width: '11em',
                            height: '2.5em',
                            fontSize: '0.95em',
                            fontFamily: 'inter',
                            padding: '0.5em 0.625em',
                            borderRadius: '0.35em',
                            fontWeight: '550',
                            margin: 'auto',
                            textTransform: 'none',
                            textAlign: 'center',
                        }}
                    >
                        Add to Cart
                    </CustomizedButton>
                </CardActions>
            )}
        </Card>
    );
}
