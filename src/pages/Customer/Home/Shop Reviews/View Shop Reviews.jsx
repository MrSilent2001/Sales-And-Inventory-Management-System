import React from 'react';
import './View Shop Reviews.css';
import { Box, Grid, Paper, Typography, Rating } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import CustomerNavbar from "../../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../../layout/footer/footer";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const ReviewsGrid = ({ reviews }) => {
    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={4} sx={{ justifyContent: 'center', width: '1300px' }}>
                {reviews.map((review, index) => (
                    <Grid item xs={12} sm={6} key={index} >
                        <Paper elevation={1} sx={{
                            padding: 2,
                            margin: 1,
                            borderRadius: 4,
                            border: '2px solid',
                            borderImage: 'linear-gradient(45deg, #00FFFF, #39FF14) 1',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                            maxWidth: 525,
                            height: 200,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                                {review.customerName}
                            </Typography>
                            <Typography variant="body2" component="div" sx={{ fontSize: '14px', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', width: '85%', textAlign: 'center' }}>
                                {review.customerComment}
                            </Typography>
                            <Typography variant="body3" component="div" sx={{ fontSize: '12px', marginTop: 1.45, color: 'gray', fontWeight: 500 }}>
                                {formatDate(review.date)}
                            </Typography>
                            <Rating name="read-only" value={+review.starReviewCount} readOnly size="small" sx={{ marginTop: 2 }} />
                        </Paper>
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
            date: PropTypes.string.isRequired,
            starReviewCount: PropTypes.string.isRequired,
        })
    ).isRequired,
};

function ViewShopReviews() {
    const location = useLocation();
    const { reviews } = location.state || { reviews: [] };

    console.log(reviews);

    return (
        <div>
            <CustomerNavbar/>

            <div className="allCustomerReviews">
                <div className="allCustomerReviewsTopic">
                    <h2>Customer Reviews</h2>
                </div>

                <div className="allCustomerReviewsPara">
                    <p>Thank you for your valuable feedback and positive reviews. Your satisfaction is our top priority, and we are pleased to know that our services and products have met your expectations. We appreciate your support and look forward to continuing to serve you with excellence. We can’t wait to have the pleasure of serving you again and continuing to exceed your expectations. Thank you for being such a wonderful part of our community!</p>
                </div>
                <ReviewsGrid reviews={reviews} />
            </div>

            <Footer/>
        </div>
    );
}

export default ViewShopReviews;
