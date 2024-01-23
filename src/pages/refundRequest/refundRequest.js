import React, { useState } from 'react';
import './refundRequest.css';
import Button from '@mui/material/Button';
const RefundRequestForm = () => {
  // State for each input field
  const [contact, setContact] = useState('');
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the refund request here
    console.log({ contact, item, quantity, reason, totalPrice });
  };

  // Function to handle form cancellation
  const handleCancel = () => {
    // Clear the form or navigate away
    setContact('');
    setItem('');
    setQuantity('');
    setReason('');
    setTotalPrice('');
  };

  return (
    <div className="refund-request-form">
      <form onSubmit={handleSubmit}>
        <div className="heading_outer"><h1>Refund Request</h1></div>
        <div className='outer' style={{display:"flex",width:"50vw",height:"500px"}}>
         <div className='="inner1' style={{width:"30%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
            <h4>Contact</h4>
            <h4>Item</h4>
            <h4>Quantity</h4>
            <h4>Reason</h4>
            <h4>Total Price</h4>
         </div>
         <div className="inner2" style={{width:"70%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-around"}}>
           <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} /> 
           <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
           <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
           <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} />
           <input type="text" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} />
         </div>
      </div>
     
        <div className="buttons" style={{width:"27%"}}>
          <Button variant="contained" onClick={handleCancel} style={{backgroundColor:"#242F9B"}}>create request</Button> 
          <Button variant="contained " style={{backgroundColor:"#242F9B"}}>cancel request</Button>
        </div>
      </form>
      </div>

  );
};

export default RefundRequestForm;
