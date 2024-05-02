import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import CustomizedButton from "../Button/button";

export default function MultiActionAreaCard({item,handleClick,buttonText}) {
    const productName = item.productName;
    const productPrice = item.productUnitPrice;
    const productImage = item.productImage[0];
    console.log(item.productImage[0])
    return (
        <Card sx={{ maxWidth: 320, width: 320, paddingTop: 5, paddingBottom:2 }}>
            <CardActionArea sx={{ paddingTop:2.5 }}>

                <CardMedia
                    component="img"
                    height="200"
                    image={productImage}
                    alt={productName}
                    sx={{
                        objectFit: 'contain'
                    }}
                />
                <CardContent>
                    <Typography variant="body2" color="text.primary">
                        {productName}
                    </Typography>
                    <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold', marginTop: '0.5em' }}>
                        Rs.{productPrice}
                    </Typography>
                </CardContent>

            </CardActionArea>

            <CardActions sx={{justifyContent: 'center'}}>

                <CustomizedButton
                    onClick={()=>handleClick(item)}
                    hoverBackgroundColor="#2d3ed2"
                    disableElevation
                    style={{
                        color: '#ffffff',
                        backgroundColor: '#242F9B',
                        border: '1px solid #242F9B',
                        width: '10em',
                        height: '3m',
                        fontSize: '0.78em',
                        fontFamily: 'inter',
                        borderRadius: '0.35em',
                        padding: '1em',
                        fontWeight: '500',
                        textTransform: 'none',
                        textAlign: 'center',
                    }}>
                    {buttonText}
                </CustomizedButton>
            </CardActions>
        </Card>
    );
}