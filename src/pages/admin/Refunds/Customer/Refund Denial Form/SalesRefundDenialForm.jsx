import React, { useState } from 'react';
import CustomizedButton from "../../../../../components/Button/button";

const SalesRefundDenialForm = () => {
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

          <CustomizedButton
              hoverBackgroundColor="#2d3ed2"
              style={{
                  color: '#ffffff',
                  backgroundColor: '#242F9B',
                  border: '1px solid #242F9B',
                  width: '6em',
                  height: '2.5em',
                  fontSize: '0.95em',
                  fontFamily: 'inter',
                  padding: '0.5em 0.625em',
                  borderRadius: '0.35em',
                  fontWeight: '550',
                  marginTop: '0.625em',
                  marginRight: '1.5em',
                  textTransform: 'none',
                  textAlign: 'center',
              }}>
              Submit
          </CustomizedButton>

      </div>
    </div>
  );
};

export default SalesRefundDenialForm;
