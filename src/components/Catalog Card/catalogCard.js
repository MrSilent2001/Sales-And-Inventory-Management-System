import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

// Functional component representing a card with action area
export default function MultiActionAreaCard({ item, handleClick }) {
    // Destructuring item to extract title, price, and img
    const { title, price, img } = item;

    return (
        <Card sx={{ maxWidth: 300, width: 300 }}>
            {/* Action area for the card */}
            <CardActionArea>
                {/* Media area to display image */}
                <CardMedia
                    component="img"
                    height="250"
                    image={img}
                    alt="Product Image"
                />
                {/* Content area for the card */}
                <CardContent>
                    {/* Title of the product */}
                    <Typography variant="body2" color="text.primary">
                        {title}
                    </Typography>
                    {/* Price of the product */}
                    <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                        Rs.{price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {/* Actions section for the card */}
            <CardActions>
                {/* Button to add the product to cart */}
                <Button
                    variant="contained" disableElevation
                    sx={{ margin: 'auto', display: 'block' }}
                    onClick={() => handleClick(item)}
                >
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
}
