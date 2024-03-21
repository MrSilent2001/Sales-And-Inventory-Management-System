import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {productsArray} from '../../pages/Inventory/Cart/productStore';

export default function MultiActionAreaCard(props) {
    const product = props.product;
    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="250"
                    image="https://www.freepik.com/free-photo/view-steel-hammer-construction-work-with-nails_49590265.htm#fromView=search&page=1&position=1&uuid=81ef6240-3a70-4a0a-b8b5-ccc299956ee7"
                    alt="Hammer"
                />

                <CardContent >
                    <Typography variant="body2" color="text.primary">
                        {product.name}
                    </Typography>

                    <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold'}}>
                        Rs {product.price}
                    </Typography>

                </CardContent>
            </CardActionArea>

            <CardActions>
                <Button variant="contained"
                        disableElevation
                        sx={{margin: 'auto', display: 'block'}}
                        onClick={()=>{
                            alert("Item has been added to the Cart");
                        }}
                >
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
}