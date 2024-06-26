import * as React from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CustomizedButton from "../Button/button";

export default function MediaControlCard({ item, removeFromCart }) {
    const { id, productName, productImage, productSellingPrice, discountRate, amount } = item;

    // Calculate the final price after discount if discountRate is present
    const finalPrice = discountRate ? productSellingPrice * (1 - discountRate / 100) : productSellingPrice;

    const handleRemoveClick = () => {
        removeFromCart(id);
    }

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: 230, width: 1000, marginTop: 4, marginLeft: 10, backgroundColor: 'whitesmoke' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 160, height: 160, marginLeft: 10, marginTop: 2 }}
                    image={productImage[0]}
                />
                <CardContent sx={{ flex: '1 0 auto', marginLeft: 10 }}>
                    <Typography variant="subtitle1" color="text.primary" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', lineHeight: 2 }}>
                        Item Id : {id}
                    </Typography>
                    <Typography variant="subtitle1" color="text.primary" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', lineHeight: 2 }}>
                        Item Name : {productName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.primary" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', lineHeight: 2 }}>
                        Quantity: {amount}
                    </Typography>
                    <Typography variant="subtitle1" color="text.primary" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', lineHeight: 2 }}>
                        Price : Rs.{finalPrice.toFixed(2)}
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{ alignSelf: 'right', marginLeft: 100 }}>
                <CustomizedButton
                    onClick={handleRemoveClick}
                    hoverBackgroundColor="#f11717"
                    style={{
                        color: '#ffffff',
                        backgroundColor: '#960505',
                        width: '6em',
                        height: '2.5em',
                        fontSize: '0.95em',
                        fontFamily: 'inter',
                        padding: '0.5em 0.625em',
                        borderRadius: '0.35em',
                        fontWeight: '550',
                        marginTop: '0.625em',
                        textTransform: 'none',
                        textAlign: 'center',
                    }}>
                    Remove
                </CustomizedButton>
            </Box>
        </Card>
    );
}
