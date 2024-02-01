import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Box, Button } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

// Mock function to simulate fetching data from a database
const fetchRefundRequests = () => {
  // Replace this with your actual database call
  return Promise.resolve([
    { id: 1, name: 'WAP Samane Perea', requestId: '0771112223', orderId: 'I0001', amount: 'Rs.100,000.00', status: 'Refunded' },
    // ... other rows
  ]);
};

const ApprovedRefundsTable = () => {
  const [refundRequests, setRefundRequests] = useState([]);

  useEffect(() => {
    fetchRefundRequests().then(data => {
      setRefundRequests(data);
    });
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Button startIcon={<ArrowBack />} size="large">
          Refund Request
        </Button>
        <Typography variant="h4" gutterBottom component="div">
          Approved Refunds
        </Typography>
        <TableContainer component={Paper}>
          <Table aria-label="approved refunds table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Request ID</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {refundRequests.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.requestId}</TableCell>
                  <TableCell>{row.orderId}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ApprovedRefundsTable;
