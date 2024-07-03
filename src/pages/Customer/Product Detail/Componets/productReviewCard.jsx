import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader } from "@mui/material";
import Rating from "@mui/material/Rating";

export default function ProductReviewCard({ reviews }) {
    const { productReviewerName, productReviewDescription, productReviewedDate, productReviewStarCount } = reviews;

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            // height: 160,
            minHeight: 160,
            // minHeight: ,
            width: 900,
            marginTop: 1.5,
            marginLeft: 2,
            marginRight: 2,
            paddingLeft: 4,
            paddingBottom: 2,
            paddingTop: -1,
            backgroundColor: '#F5F5F5',
            alignItems: 'flex-start',
            boxShadow: 'none'
        }}>
            <CardContent>
                <CardHeader
                    title={
                        <Typography sx={{
                            fontSize: '1.2rem',
                            fontWeight: '500',
                            color: '#000', // Custom color for the title
                            marginTop:-1,
                        }}>
                            {productReviewerName}
                        </Typography>
                    }
                    subheader={
                        <Typography sx={{
                            fontSize: '0.7rem',
                            fontWeight: '520',
                            color: '#666' // Custom color for the subheader
                        }}>
                            {productReviewedDate}
                        </Typography>
                    }
                    sx={{ textAlign: 'left', paddingLeft: 0 }}
                />
                <Typography variant="body2" sx={{
                    marginTop:-1,
                    textAlign: 'left',
                    paddingLeft: 0,
                    fontSize: '0.9rem',
                    color: '#333' // Custom color for the body text
                }}>
                    {productReviewDescription}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-start', paddingLeft: 1.5, marginTop:-2 }}>
                <Rating name="read-only" value={productReviewStarCount} readOnly />
            </CardActions>
        </Card>
    );
}
