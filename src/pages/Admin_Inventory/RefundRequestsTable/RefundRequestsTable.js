// RefundRequestsTable.js
import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Typography, Paper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ReusableTable from '../../../components/ReusableTable/ReusableTable';

const fetchRequests = () => {
  
  return Promise.resolve([
    { name: 'John Doe', requestId: '0771112224', orderId: 'J0002', amount: 'Rs.50,000.00', status: 'Pending' },
    { name: 'John Doe', requestId: '0771112224', orderId: 'I0002', amount: 'Rs.150,000.00', status: '2024/01/16' },
    { name: 'Jane Smith', requestId: '0771112225', orderId: 'I0003', amount: 'Rs.200,000.00', status: '2024/01/17' },
    
  ]);
};

const RefundRequestsTable = ({ onViewApproved }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests().then(data => {
      setRequests(data);
    });
  }, []);

  // Transform data to match the ReusableTable format
  const transformedData = requests.map(request => ({
    Name: request.name,
    "Request ID": request.requestId,
    "Order ID": request.orderId,
    Amount: request.amount,
    Status: request.status
  }));

  return (
    <Container className='inner_container' maxWidth="90%">
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
        <Paper>
          <ReusableTable data={transformedData} />
        </Paper>
      </Box>
    </Container>
  );
};

export default RefundRequestsTable;
