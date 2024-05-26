import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MediaControlCard({ item, handleBodyClick }) {
    const { id, productName, productImage, productSellingPrice, discountRate, amount } = item;

    // Calculate the final price after discount if discountRate is present
    const finalPrice = discountRate ? productSellingPrice * (1 - discountRate / 100) : productSellingPrice;

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: 200, minHeight: 200 ,width: 600, marginTop: 4, marginLeft: 10, backgroundColor: 'whitesmoke' }} onClick={() => handleBodyClick(item)}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 160, height: 160, marginLeft: 4, marginTop: 2 }}
                    image={productImage[0]}
                />
                <CardContent sx={{ flex: '1 0 auto', marginLeft: 10 }}>
                    <Typography variant="subtitle1" color="text.primary" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', lineHeight: 2 }}>
                        Item Name : {productName}
                    </Typography>
                    {discountRate ? (
                        <Typography variant="subtitle1" color="text.primary" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', lineHeight: 2 }}>
                            <span style={{ textDecoration: 'line-through', color: 'gray' }}>Rs.{productSellingPrice.toFixed(2)}</span> Rs.{finalPrice.toFixed(2)}
                        </Typography>
                    ) : (
                        <Typography variant="subtitle1" color="text.primary" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', lineHeight: 2 }}>
                            Price : Rs.{finalPrice.toFixed(2)}
                        </Typography>
                    )}
                </CardContent>
            </Box>
        </Card>
    );
}
