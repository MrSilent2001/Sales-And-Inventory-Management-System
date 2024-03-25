import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';



export default function MediaControlCard({item}) {
    // const {title, price, img} = item;
    const theme = useTheme();


    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: 230, width: 1000, marginTop: 4, marginLeft: 10, backgroundColor: 'whitesmoke' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 160, height: 160, marginLeft: 10, marginTop: 2 }}
                    image={item.img}

                />
                <CardContent sx={{ flex: '1 0 auto', marginLeft: 10 }}>
                    <Typography variant="subtitle1" color="text.primary" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', lineHeight: 2 }}>
                        Item Id :
                    </Typography>
                    <Typography variant="subtitle1" color="text.primary" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', lineHeight: 2 }}>
                        Item Name : {item.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.primary" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', lineHeight: 2 }}>
                        Quantity:
                    </Typography>
                    <Typography variant="subtitle1" color="text.primary" component="div" sx={{ textAlign: 'left', fontWeight: 'bold', lineHeight: 2 }}>
                        Price : {item.price}
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{ alignSelf: 'right', marginLeft: 100}}>
                <Button variant="contained" color="error">
                    Remove
                </Button>
            </Box>
        </Card>
    );


}

