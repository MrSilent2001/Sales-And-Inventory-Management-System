import './Supplier Feedbacks.css';
import {Box, Grid, Paper, Rating, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const SupplierFeedbackCard = ({ sellerId, sellerName, sellerComment, date, starReviewCount}) => {
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
                        {sellerName} (Supplier ID - {sellerId})
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
                        {sellerComment}
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

SupplierFeedbackCard.propTypes = {
    sellerId: PropTypes.string.isRequired,
    sellerName: PropTypes.string.isRequired,
    sellerComment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    starReviewCount: PropTypes.number.isRequired,
};

const SupplierFeedbackGrid = ({ reviews }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                {reviews.map((review, index) => (
                    <Grid item key={index} xs={12}>
                        <SupplierFeedbackCard
                            sellerId={review.sellerId}
                            sellerName={review.sellerName}
                            sellerComment={review.sellerComment}
                            date={review.date}
                            starReviewCount={+review.starReviewCount}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

SupplierFeedbackGrid.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            sellerId: PropTypes.string.isRequired,
            sellerName: PropTypes.string.isRequired,
            sellerComment: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            starReviewCount: PropTypes.number.isRequired,
        })
    ).isRequired,
};

function SupplierFeedbacks(){
    const [allSupplierReviews, setAllSupplierReviews] = useState([]);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchSupplierReviews = async () => {
            try {
                const response = await axios.get('http://localhost:9000/admin/getAllSupplierFeedbacks', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAllSupplierReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchSupplierReviews();
    }, [token]);

    return (
        <div>
            <SupplierFeedbackGrid reviews={allSupplierReviews} />
        </div>
    );
}

export default SupplierFeedbacks;