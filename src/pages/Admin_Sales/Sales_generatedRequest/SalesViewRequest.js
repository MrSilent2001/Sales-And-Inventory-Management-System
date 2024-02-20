import React from 'react';
import './SalesViewRequest.css';
import { Container, Box, Button, Typography, Paper } from '@mui/material';

function SalesViewRequest() {
  return (
     <div className='outer'>
      <div className="generated-request" >
      <h2>Generated Request</h2>
      <div className='request-container' style={{display:"flex",width:"50%", height:"40vh",marginBottom:"2%"}}>
         <div className='="inner1' style={{width:"30%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
            <h4>Customer</h4>
            <h4>Contact</h4>
            <h4>Item</h4>
            <h4>Quantity</h4>
            <h4>Reason</h4>
            <h4>Total Price</h4>

         </div>
         <div className="inner2" style={{width:"70%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
         <span className="value">Silva Construction Suppliers (PVT) LTD.</span>
         <span className="value">095 69594</span>
         <span className="value">1001</span>
         <span className="value">250</span>
         <span className="value">Manufacturing Defects of the items and cannot be repaired</span>
         <span className="value">Rs.450,000.00</span>
         </div>
      </div>
      <Box sx={{ml:70}}>
            <Button
              variant="contained"
              onClick={() => {}} // Implement the logic for this button
              sx={{ 
                borderRadius: 1,
                backgroundColor: "#FF0000", 
                textTransform: "none",
                color: 'white', 
                marginRight: 1,
                padding:1
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
