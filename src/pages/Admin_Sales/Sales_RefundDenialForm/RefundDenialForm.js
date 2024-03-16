import React, { useState } from 'react';
import { Container, Box, Button, Typography, Paper } from '@mui/material';

const RefundDenialForm = () => {
  const [reason, setReason] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the reason for denial here or send it to a server
    console.log(reason);
  };

  return (
    <div style={{ backgroundColor: '#DBDFFD', padding: '20px', height:'70%',margin:'3%'}}>
      <div style={{ width:'50%', margin: '40px auto', padding: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Reasons</h2>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Provide the reasons of the denial of refund request"
          style={{ width: '100%', height: '150px', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <Box>
            <Button
              variant="contained"
              sx={{ 
                borderRadius: 1,
                backgroundColor:"#242F9B",
                textTransform:"none",
                ml:77,
                mt:1
              }} 
            >
              Submit
            </Button>
        </Box>    
      </div>
    </div>
  );
};

export default RefundDenialForm;
