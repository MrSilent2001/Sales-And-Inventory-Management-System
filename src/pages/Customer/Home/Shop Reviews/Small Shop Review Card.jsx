import React from 'react';
import { Box, Grid, Paper, Typography, Rating } from '@mui/material';
import PropTypes from 'prop-types';

const ReviewCard = ({ customerName, customerComment, starReviewCount }) => {
    return (
        <Paper elevation={1} sx={{
            padding: 2,
            margin: 1,
            borderRadius: 2,
            borderColor: 'lightgray',
            borderWidth: 1,
            borderStyle: 'solid',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
            width: 270,
            height: 130,
        }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '14px', marginTop: 2, marginBottom: 2 }}>
                {customerName}
            </Typography>
            <Typography variant="body2" component="div" sx={{ fontSize: '12px', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {customerComment}
            </Typography>
            <Rating name="read-only" value={starReviewCount} readOnly size="small" sx={{ marginTop: 1 }} />
        </Paper>
    );
}

ReviewCard.propTypes = {
    customerName: PropTypes.string.isRequired,
    customerComment: PropTypes.string.isRequired,
    starReviewCount: PropTypes.number.isRequired,
};

const ReviewsGrid = ({ reviews }) => {
    return (
        <Box>
            <Grid container spacing={0} sx={{ gap: '60px' }}> {/* Adjust the gap between cards */}
                {reviews.map((review, index) => (
                    <Grid item key={index}>
                        <ReviewCard
                            customerName={review.customerName}
                            customerComment={review.customerComment}
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
            customerName: PropTypes.string.isRequired,
            customerComment: PropTypes.string.isRequired,
            starReviewCount: PropTypes.string.isRequired, // Accept string in the input data
        })
    ).isRequired,
};

export default ReviewsGrid;
