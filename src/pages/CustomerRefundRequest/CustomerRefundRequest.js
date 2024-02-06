import React, { useState } from 'react';
import {
  Container, Typography, Box, TextField, Button, Grid, MenuItem
} from '@mui/material';
import './CustomerRefundRequest.css';
const CustomerRefundRequest = () => {
  const [formValues, setFormValues] = useState({
    supplier: '',
    item: '',
    quantity: '',
    reason: '',
    totalPrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCancel = () => {
    setFormValues({
      supplier: '',
      item: '',
      quantity: '',
      reason: '',
      totalPrice: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    // Add your form submission logic here
  };

  return (
    <Container maxWidth="90%" className="inner_container">
      <Box sx={{ bgcolor: 'background.paper', p: 4,}}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Refund Request
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={4}>
              <Typography>Supplier</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                select
                name="supplier"
                value={formValues.supplier}
                onChange={handleChange}
              >
                <MenuItem value="Supplier1">Supplier 1</MenuItem>
                <MenuItem value="Supplier2">Supplier 2</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={4}>
              <Typography>Item</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                select
                name="item"
                value={formValues.item}
                onChange={handleChange}
              >
                <MenuItem value="Item1">Item 1</MenuItem>
                <MenuItem value="Item2">Item 2</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={4}>
              <Typography>Quantity</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                name="quantity"
                value={formValues.quantity}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography>Reason</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                multiline
                rows={3}
                name="reason"
                value={formValues.reason}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography>Total Price</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                name="totalPrice"
                value={formValues.totalPrice}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="outlined" color="error" onClick={handleCancel}>
                  Cancel Request
                </Button>
                <Button variant="contained" type="submit">
                  Create Request
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CustomerRefundRequest;
