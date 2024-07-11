import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Rating } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Shop Feedbacks.css';

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
            maxWidth: '100em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '80px',
            height: 'auto',
        }}>
            <div className="cardContent">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: '600', fontSize: '13px', marginBottom: 2, marginLeft: 3, marginTop: 1 }}>
                        {customerName} (ID - {customerId})
                    </Typography>
                    <Typography
                        variant="body2"
                        component="div"
                        sx={{
                            fontSize: '12px',
                            marginBottom: 2,
                            width: '100%',
                            maxWidth: 720,
                            margin: '0 auto'
                        }}
                    >
                        {customerComment}
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ fontSize: '11px', color: 'grey', fontWeight: 500 }}>
                        {formatDate(date)}
                    </Typography>
                    <Rating name="read-only" value={starReviewCount} readOnly size="small" sx={{ marginBottom: 0, marginLeft: 10, marginRight: 4 }} />
                </Box>
            </div>
        </Paper>
    );
}

ShopFeedbackCard.propTypes = {
    customerId: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    customerComment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    starReviewCount: PropTypes.number.isRequired,
};

const ShopFeedbackGrid = ({ reviews }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                {reviews.map((review, index) => (
                    <Grid item key={index} xs={12}>
                        <ShopFeedbackCard
                            customerId={review.customerId}
                            customerName={review.customerName}
                            customerComment={review.customerComment}
                            date={review.date}
                            starReviewCount={+review.starReviewCount}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

ShopFeedbackGrid.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            customerId: PropTypes.string.isRequired,
            customerName: PropTypes.string.isRequired,
            customerComment: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            starReviewCount: PropTypes.number.isRequired,
        })
    ).isRequired,
};

function ShopFeedbacks() {
    const [allShopReviews, setAllShopReviews] = useState([]);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchCustomerReviews = async () => {
            try {
                const response = await axios.get('http://localhost:9000/admin/getAllShopReviews', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAllShopReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchCustomerReviews();
    }, [token]);

    return (
        <div>
            <ShopFeedbackGrid reviews={allShopReviews} />
        </div>
    );
}

export default ShopFeedbacks;
