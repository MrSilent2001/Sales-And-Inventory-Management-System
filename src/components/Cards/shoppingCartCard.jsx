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
        <Card sx={{ display: 'flex', flexDirection: 'column', minHeight: 160, height: 160, width: 800, marginTop: 4, marginLeft: 20, backgroundColor: 'white', boxShadow: 'none' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 100, height: 100, marginLeft: 10, marginTop: 3 }}
                    image={productImage[0]}
                />
                <CardContent sx={{ flex: '1 0 auto', marginLeft: 10 }}>
                    <Typography variant="subtitle2" sx={{ textAlign: 'left', fontWeight: 'bold', lineHeight: 2, color: 'gray' }}>
                        Reference : {id}
                    </Typography>
                    <Typography variant="h6" sx={{fontSize:17, textAlign: 'left', fontWeight: 'bold', lineHeight: 2, color: 'text.primary' }}>
                        {productName} x {amount}
                    </Typography>
                    <Typography variant="subtitle1" sx={{fontSize:14, textAlign: 'left', fontWeight: 'normal', lineHeight: 2, color: 'text.primary' }}>
                        Rs.{finalPrice.toFixed(2)}
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{ alignSelf: 'flex-end', marginLeft: 'auto', marginBottom: 2, paddingRight: 2 }}>
                <CustomizedButton
                    onClick={handleRemoveClick}
                    hoverBackgroundColor="#f11717"
                    style={{
                        color: '#ffffff',
                        backgroundColor: '#960505',
                        width: '10em',
                        height: '2.5em',
                        fontSize: '0.75em',
                        fontFamily: 'Inter',
                        padding: '0.5em 0.625em',
                        borderRadius: '0.35em',
                        fontWeight: '550',
                        marginBottom: '0.625em',
                        marginTop: '-1.225em',
                        marginRight: '1.225em',
                        textTransform: 'none',
                        textAlign: 'center',
                    }}>
                    Remove
                </CustomizedButton>
            </Box>
        </Card>
    );
}
