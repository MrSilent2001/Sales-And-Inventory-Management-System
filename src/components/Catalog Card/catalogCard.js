import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard({ item, onAddToCart }) {
    const addToCart = () => {
        onAddToCart(item); // Call the callback function with the item
    };

    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="250"
                    image={item.image}
                    alt={item.name}
                />
                <CardContent>
                    <Typography variant="body2" color="text.primary">
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                        {item.price ? `Rs ${item.price.toFixed(2)}` : 'Price not available'}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="contained" disableElevation sx={{ margin: 'auto', display: 'block' }}
                        onClick={addToCart}>
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
}
