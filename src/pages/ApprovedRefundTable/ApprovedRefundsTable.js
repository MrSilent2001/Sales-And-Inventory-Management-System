// ApprovedRefundsTable.js
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, Box, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './ApprovedRefundsTable.css';

const ApprovedRefundsTable = ({ onBack }) => {
  const [refundRequests, setRefundRequests] = useState([]);

  useEffect(() => {
    fetchRefundRequests().then(data => {
      setRefundRequests(data);
    });
  }, []);

  return (
    <Container className='inner_container' maxWidth="90%">
      <Box sx={{ my: 4 }}>
        <Button 
          startIcon={<ArrowBackIosIcon/>} 
          variant='contained' 
          size="large" 
          style={{color:"black"}}
          onClick={onBack}  // Use the onBack prop here
        >
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

// simulate fetching data from a database
const fetchRefundRequests = () => {
  return Promise.resolve([
    { id: 1, name: 'WAP Samane Perea', requestId: '0771112223', orderId: 'I0001', amount: 'Rs.100,000.00', status: 'Refunded' },
    { id: 2, name: 'John Doe', requestId: '0771112224', orderId: 'I0002', amount: 'Rs.150,000.00', status: 'Refunded' },
    { id: 3, name: 'Jane Smith', requestId: '0771112225', orderId: 'I0003', amount: 'Rs.200,000.00', status: 'Refunded' },
    // ... add more records as needed
  ]);
}

export default ApprovedRefundsTable;
