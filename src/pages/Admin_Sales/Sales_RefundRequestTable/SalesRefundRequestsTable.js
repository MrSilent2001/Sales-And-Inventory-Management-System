import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Typography, Paper } from '@mui/material';
import ReusableTable from '../../../components/Reusable Table/Reusable Table';
import InventoryNavbar from "../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../layout/footer/footer";

const fetchRequests = () => {
  return Promise.resolve([
    { name: 'John Doe', requestId: '0771112224', orderId: 'J0002'},
    { name: 'John Doe', requestId: '0771112224', orderId: 'I0002'},
    { name: 'Jane Smith', requestId: '0771112225', orderId: 'I0003'},
    { name: 'John Doe', requestId: '0771112224', orderId: 'J0002'},
    { name: 'John Doe', requestId: '0771112224', orderId: 'I0002'},
    { name: 'Jane Smith', requestId: '0771112225', orderId: 'I0003'},
    { name: 'John Doe', requestId: '0771112224', orderId: 'J0002'},
    { name: 'John Doe', requestId: '0771112224', orderId: 'I0002'},
    { name: 'Jane Smith', requestId: '0771112225', orderId: 'I0003'},
  ]);
};

const SalesRefundRequestsTable = ({ onViewApproved }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests().then(data => {
      setRequests(data);
    });
  }, []);

  const handleStatusButtonClick = requestId => {
    console.log('Button for request ID', requestId, 'was clicked');
  };

  // Transform data to match the ReusableTable format
  const transformedData = requests.map(request => ({
    Name: request.name,
    "Request ID": request.requestId,
    "Order ID": request.orderId,
    Status: (
      <Box display="flex" justifyContent="flex-end"> 
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleStatusButtonClick(request.requestId)}
          sx={{backgroundColor:"#242F9B",width:'30%'}}
        >
          View
        </Button>
      </Box>
    )
  }));

  return (
      <>
          <InventoryNavbar/>
          <Container className='inner_container' maxWidth="90%">
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
          <Footer/>
      </>
  );
};

export default SalesRefundRequestsTable;
