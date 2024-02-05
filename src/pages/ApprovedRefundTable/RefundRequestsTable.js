// RefundRequestsTable.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Box, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility'; // This is the icon for viewing individual refund requests

const fetchRequests = () => {
  // Simulating fetching data from a database
  return Promise.resolve([
    { id: 1, name: 'John Doe', requestId: '0771112224', orderId: 'J0002', amount: 'Rs.50,000.00', status: 'Pending' },
    // Add more dummy data as needed
  ]);
};

const RefundRequestsTable = ({ onViewApproved }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests().then(data => {
      setRequests(data);
    });
  }, []);

  return (
    <Container className='inner_container' maxWidth="90%">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom component="div">
          Refund Requests
        </Typography>
        <Button
          variant="contained"
          startIcon={<VisibilityIcon />}
          onClick={onViewApproved}
          sx={{ marginBottom: 2 }}
        >
          View Approved Refunds
        </Button>
        <TableContainer component={Paper}>
          <Table aria-label="refund requests table">
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
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.name}</TableCell>
                  <TableCell>{request.requestId}</TableCell>
                  <TableCell>{request.orderId}</TableCell>
                  <TableCell>{request.amount}</TableCell>
                  <TableCell>{request.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default RefundRequestsTable;
