import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import CustomizedButton from "../Button/button";

export default function MultiActionAreaCard({item,handleClick}) {
    const {title, price, img} = item;
    return (
        <Card sx={{ maxWidth: 300, width: 300 }}>
            <CardActionArea>

                <CardMedia
                    component="img"
                    height="250"
                    image={img}
                    alt={title}
                />
                <CardContent>
                    <Typography variant="body2" color="text.primary">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                        Rs.{price}
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
                    }}>
                    Add to Cart
                </CustomizedButton>
            </CardActions>
        </Card>
    );
}