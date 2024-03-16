import React from 'react';
import './SalesViewRequest.css';
import { Container, Box, Button, Typography, Paper } from '@mui/material';

function SalesViewRequest() {
  return (
     <div className='outer'>
      <div className="generated-request" >
      <h2>Generated Request</h2>
      <div className="refundRequestDetails">

<div className="formField">
    <div className="textField">
        <h5>Customer</h5>
    </div>
    <div className="inputData">
        <h6>WAP Saman Perera</h6>
    </div>
</div>

<div className="formField">
    <div className="textField">
        <h5>Contact</h5>
    </div>
    <div className="inputData">
        <h6>0771112234</h6>
    </div>
</div>

<div className="formField">
    <div className="textField">
        <h5>Item</h5>
    </div>
    <div className="inputData">
        <h6>I0001</h6>
    </div>
</div>

<div className="formField">
    <div className="textField">
        <h5>Quantity</h5>
    </div>
    <div className="inputData">
        <h6>35</h6>
    </div>
</div>

<div className="formField">
    <div className="textField">
        <h5>Reason</h5>
    </div>
    <div className="inputData">
        <h6>Defected Items</h6>
    </div>
</div>

<div className="formField">
    <div className="textField">
        <h5>Total Price</h5>
    </div>
    <div className="inputData">
        <h6>Rs.120,000</h6>
    </div>
</div>

</div>
      
      <Box sx={{ml:50, mt:2}}>
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
              Accept
            </Button>
            <Button
              variant="contained"
              sx={{ 
                borderRadius: 1,
                backgroundColor: "#242F9B",
                textTransform: "none",
              }} 
            >
              Reject
            </Button>
          </Box>
    </div>

     </div>
  );
}

export default SalesViewRequest;
