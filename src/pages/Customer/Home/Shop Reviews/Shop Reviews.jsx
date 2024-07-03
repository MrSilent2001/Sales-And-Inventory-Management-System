import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import axios from 'axios';

function ShopReviewSubmitForm({ shopId, submitAlert, submitErrorAlert }) {
    const [value, setValue] = useState(0); // Set default value of stars to 0
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const token = localStorage.getItem('accessToken');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const reviewData = {
            shopId: String(shopId),
            reviewerName: name,
            reviewComment: comment,
            starRating: String(value),
            reviewDate: new Date().toISOString().split('T')[0] // Format the date as YYYY-MM-DD
        };

        try {
            console.log("formdata", reviewData);
            const response = await axios.post('http://localhost:9000/shop/review/create', reviewData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Review submitted successfully:', response.data);
            submitAlert();

        } catch (error) {
            console.error('Error submitting review:', error);
            submitErrorAlert();
        }
    };

    return (
        <Paper elevation={0} sx={{ width: 800, marginLeft: 2, paddingRight: 4, marginTop: 4, marginBottom: 10 }}>
            <Box sx={{ padding: 5 }} component="form" onSubmit={handleSubmit}>
                {/*<Typography variant="h2" gutterBottom sx={{ paddingBottom: 5, fontSize: '1.5em', fontWeight: 550 }}>
                    Submit a Shop Review
                </Typography>*/}
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
                            InputProps={{ style: { fontSize: '18px' } }}
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
                            InputProps={{ style: { fontSize: '18px' } }}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button type="submit" variant="contained" sx={{ color: "#fff", width: '100px', backgroundColor: '#242f9a', fontSize: '13px' }}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}

export default ShopReviewSubmitForm;
