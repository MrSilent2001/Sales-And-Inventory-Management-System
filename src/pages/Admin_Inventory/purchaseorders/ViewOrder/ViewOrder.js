// ViewOrder.js
import React from 'react';
import './ViewOrder.css';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

export default function ViewOrder() {
  // This data would be passed as props or fetched from an API in a real app
  const orderDetails = {
    orderId: 'OID0001',
    supplier: 'S0001',
    deliveryAddress: '1234 Delivery Ln, City, State',
    email: 'customer@example.com',
    contactNumber: '0771112223',
    items: ['I0001', 'I0002', 'I0003']
  };

  return (
    <div className="viewOrder-container">
      
      <Card className="order-details">
        <h2>Purchased Order</h2>
        <div className="detail">
          <span>Order Id</span>
          <span className='order_data'>{orderDetails.orderId}</span>
        </div>
        <div className="detail">
          <span>Supplier</span>
          <span className='order_data'>{orderDetails.supplier}</span>
        </div>
        <div className="detail">
          <span>Delivery Address</span>
          <span className='order_data'>{orderDetails.deliveryAddress}</span>
        </div>
        <div className="detail">
          <span>Email</span>
          <span className='order_data'>{orderDetails.email}</span>
        </div>
        <div className="detail">
          <span>Contact Number</span>
          <span className='order_data'>{orderDetails.contactNumber}</span>
        </div>
        <div className="detail">
          <span>Items</span>
          <span className='order_data'>{orderDetails.items.join(', ')}</span>
        </div>
        <div className="actions">
          <Button variant="contained" color="primary">
            Go back
          </Button>
          
        </div>
      </Card>
    </div>
  );
}
