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
            height: 230,
            width: 1200,
            marginTop: 3,
            marginLeft: 10,
            paddingLeft: 4,
            backgroundColor: 'whitesmoke',
            alignItems: 'flex-start',
        }}>
            <CardContent>
                <CardHeader
                    title={productReviewerName}
                    subheader={productReviewedDate}
                    sx={{ textAlign: 'left',paddingLeft: 0, }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', paddingLeft: 0, }}>
                    {productReviewDescription}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-start', paddingLeft: 1.5, }}> {/* Align actions to the left */}
                <Rating name="read-only" value={productReviewStarCount} readOnly />
            </CardActions>
        </Card>
    );
}
