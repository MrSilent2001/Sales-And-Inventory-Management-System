// RefundRequestsTable.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Box, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility'; // This is the icon for viewing individual refund requests
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const fetchRequests = () => {

  return Promise.resolve([
    { id: 1, name: 'John Doe', requestId: '0771112224', orderId: 'J0002', amount: 'Rs.50,000.00', status: 'Pending' },
    
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
    <Container className='inner_container' maxWidth="90%"a>
          <Box sx={{ my: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 2,
            backgroundColor: '##D41400', 
            marginBottom: 2
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Refund Request
          </Typography>
          <Box>
            {}
            
            {}
            <Button
              variant="contained"
              onClick={() => {}}
              sx={{ 
                borderRadius: 1,
                backgroundColor:"#FF0000", 
                textTransform:"none",
                color: 'white', 
                marginRight: 1,
              }} 
            >
              Refunds Request
            </Button>
            <Button
              variant="contained"
              onClick={onViewApproved}
              sx={{ 
                borderRadius: 1,
                backgroundColor:"#242F9B",
                textTransform:"none",
                
              }} 
            >
              Approved Refunds
            </Button>
          </Box>
        </Box>
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
