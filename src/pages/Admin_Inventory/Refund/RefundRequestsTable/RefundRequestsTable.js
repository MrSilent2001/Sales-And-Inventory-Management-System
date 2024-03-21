import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Typography, Paper } from '@mui/material';
import ReusableTable from '../../../../components/ReusableTable/ReusableTable';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  '& .MuiTableCell-root': {
    textAlign: 'center',
    paddingleft: '19rem',
  
    
  },
}));
const fetchRequests = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        // Mock data, adjust as per your requirement
        { name: 'John Doe', requestId: '1', orderId: 'A1', amount: '100.00', status: 'Pending' },
        { name: 'Jane Doe', requestId: '2', orderId: 'A2', amount: '200.00', status: 'Approved' },
        // Add more mocked data as needed
      ]);
    }, 1000); // Simulate a delay to mimic network request
  });
};

const RefundRequestsTable = ({ onViewApproved }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests().then(data => {
      setRequests(data);
    });
  }, []);

  const handleStatusButtonClick = requestId => {
    // Logic to handle the button click event
    console.log('Button for request ID', requestId, 'was clicked');
    // Here you would typically handle the transition to the request handling flow,
    // such as opening a modal, navigating to a details page, etc.
  };

  const transformedData = requests.map(request => ({
    Name: request.name,
    "Request ID": request.requestId,
    "Order ID": request.orderId,
    Amount: request.amount,
    Status: request.status === 'Pending' ? (
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleStatusButtonClick(request.requestId)}
      >
        View
      </Button>
    ) : (
      <Typography variant="body2" style={{ color: 'gray' }}>
        {request.status}
      </Typography>
    ),
  }));

  return (
    <Container className='inner_container' maxWidth="90%" sx={{backgroundColor: '#DBDFFD'}}>
      <Box sx={{ my: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 2,
            marginBottom: 2
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Refund Request
          </Typography>
          <Box>
            <Button
              variant="contained"
              onClick={() => {}} // Implement the logic for this button
              sx={{ 
                borderRadius: 1,
                backgroundColor: "#FF0000", 
                textTransform: "none",
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
                backgroundColor: "#242F9B",
                textTransform: "none",
              }} 
            >
              Approved Refunds
            </Button>
          </Box>
        </Box>
        <StyledPaper>
          <ReusableTable data={transformedData}  /> 
          
        </StyledPaper>
        <br/><br/>
      </Box>
    </Container>
  );
};

export default RefundRequestsTable;
