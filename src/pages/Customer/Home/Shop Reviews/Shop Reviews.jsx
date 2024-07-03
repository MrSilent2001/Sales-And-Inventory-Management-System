import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import axios from 'axios';
import CustomizedAlert from "../../../../components/Alert/alert";

function ShopReviewSubmitForm() {
    const [value, setValue] = useState(0);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const token = localStorage.getItem('accessToken');

    const [reviewSubmitOpenSuccess, setReviewSubmitOpenSuccess] = useState(false);
    const [reviewSubmitErrorOpenSuccess, setReviewSubmitErrorOpenSuccess] = useState(false);

    const reviewSubmitHandleCloseSuccess = () => {
        setReviewSubmitOpenSuccess(false);
    };

    const reviewSubmitErrorHandleCloseSuccess = () => {
        setReviewSubmitErrorOpenSuccess(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const reviewData = {
            customerName: name,
            starReviewCount: String(value),
            customerComment: comment,
        };

        try {
            console.log("formdata", reviewData);
            const response = await axios.post('http://localhost:9000/admin/createReview', reviewData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Review submitted successfully:', response.data);
            setReviewSubmitOpenSuccess(true);
            setName('');
            setComment('');
            setValue(0);
        } catch (error) {
            console.error('Error submitting review:', error);
            setReviewSubmitErrorOpenSuccess(true);
        }
    };

    return (
        <Paper elevation={0} sx={{ width: 800, marginLeft: 2, paddingRight: 4, marginTop: 4, marginBottom: 10 }}>
            <Box sx={{ padding: 5 }} component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "left",
                                alignContent: 'center',
                                fontWeight: 600,
                                fontSize: '0.92em'
                            }}
                        >
                            Name
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            required
                            id="name"
                            name="name"
                            label="Name"
                            fullWidth
                            size="small"
                            autoComplete="off"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            InputProps={{ style: { fontSize: '14px' } }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "left",
                                alignContent: 'center',
                                fontWeight: 600,
                                fontSize: '0.92em'
                            }}
                        >
                            Rate
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            sx={{ display: 'flex', alignItems: 'center' }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "left",
                                alignContent: 'center',
                                fontWeight: 600,
                                fontSize: '0.92em'
                            }}
                        >
                            Comment
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Comment"
                            multiline
                            fullWidth
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            InputProps={{ style: { fontSize: '14px' } }}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button type="submit" variant="contained" sx={{ color: "#fff", width: '100px', backgroundColor: '#242f9a', fontSize: '13px' }}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <CustomizedAlert
                open={reviewSubmitOpenSuccess}
                onClose={reviewSubmitHandleCloseSuccess}
                severity="success"
                message="Review Submitted Successfully!"
            />
            <CustomizedAlert
                open={reviewSubmitErrorOpenSuccess}
                onClose={reviewSubmitErrorHandleCloseSuccess}
                severity="error"
                message="Error Occurred!"
            />
        </Paper>
    );
}

export default ShopReviewSubmitForm;
