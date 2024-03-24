import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard({item,handleClick}) {
    const {title, price, img} = item;
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>

                <CardMedia
                    component="img"
                    height="250"
                    image={img}
                    alt="Hammer"
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

            <CardActions>
                <Button
                    variant="contained" disableElevation
                    sx={{margin: 'auto', display: 'block'}}
                    onClick={()=>handleClick(item)}
                >
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
}