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

export default function ProductReviewSubmitForm({ productId, submitAlert }) {
    const [value, setValue] = useState(2);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const token = localStorage.getItem('accessToken');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const reviewData = {
            productId: String(productId),
            productReviewerName: name,
            productReviewDescription: description,
            productReviewStarCount: String(value),
            productReviewedDate: new Date().toISOString().split('T')[0] // Format the date as YYYY-MM-DD
        };



        try {
            console.log("formdata",reviewData);
            const response = await axios.post('http://localhost:9000/product/review/create', reviewData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Review submitted successfully:', response.data);
            submitAlert();
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <Paper elevation={3} sx={{ marginRight: "36%", marginLeft: "4%" }}>
            <Box sx={{ padding: 5 }} component="form" onSubmit={handleSubmit}>
                <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
                    Submit a Review
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: 700
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
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: 700
                            }}
                        >
                            Review
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Content"
                            multiline
                            fullWidth
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: 700
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
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} />
                    <Grid item xs={12} sm={5} />
                    <Grid item xs={12} sm={4}>
                        <Button type="submit" variant="contained" sx={{ color: "#ffff" }}>
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={5} />
                </Grid>
            </Box>
        </Paper>
    );
}
