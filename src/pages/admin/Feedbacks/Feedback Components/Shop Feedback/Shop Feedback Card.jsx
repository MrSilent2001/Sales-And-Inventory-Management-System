import React from 'react';
import { Box, Grid, Paper, Typography, Rating } from '@mui/material';
import PropTypes from 'prop-types';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const ShopFeedbackCard = ({ customerId, customerName, customerComment, date, starReviewCount }) => {
    return (
        <Paper elevation={1} sx={{
            padding: 2,
            borderRadius: 2,
            borderColor: 'lightgray',
            borderWidth: 1,
            borderStyle: 'solid',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
            width: '100%',
            maxWidth: 800,

        }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '14px', marginTop: 2, marginBottom: 2 }}>
                {customerName} (ID: {customerId})
            </Typography>
            <Typography variant="body2" component="div" sx={{ fontSize: '12px', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {customerComment}
            </Typography>
            <Typography variant="body2" component="div" sx={{fontSize: '11px', marginTop: 1.15, color: 'grey', fontWeight: 500}}>
                {formatDate(date)}
            </Typography>
            <Rating name="read-only" value={starReviewCount} readOnly size="small" sx={{ marginTop: 1 }} />
        </Paper>
    );
}

ReviewCard.propTypes = {
    customerId: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    customerComment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    starReviewCount: PropTypes.number.isRequired,
};

const ReviewsGrid = ({ reviews }) => {
    return (
        <Box>
            <Grid container spacing={2}> {/* Adjust the spacing between cards */}
                {reviews.map((review, index) => (
                    <Grid item key={index} xs={12}>
                        <ReviewCard
                            customerId={review.customerId}
                            customerName={review.customerName}
                            customerComment={review.customerComment}
                            date={review.date}
                            starReviewCount={+review.starReviewCount} // Convert string to number
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

ReviewsGrid.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            customerId: PropTypes.string.isRequired,
            customerName: PropTypes.string.isRequired,
            customerComment: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            starReviewCount: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ShopFeedbackCard;
