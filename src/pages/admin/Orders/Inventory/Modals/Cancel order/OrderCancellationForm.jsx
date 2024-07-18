import React, { useState } from 'react';
import CustomizedButton from '../../../../../../components/Button/button';
import axios from 'axios';


const token = localStorage.getItem('accessToken');

// Function to update order status
const updateOrderStatus = async (id, status, orderCancelReason = '') => {
    try {
        const response = await axios.put(`http://localhost:9000/purchaseOrder/update`, {
            id,
            status,
            order_cancel_reason: orderCancelReason, // Ensure this field name matches the backend DTO and column name
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};

// Function to send email notification
const sendEmailNotification = async (contact, id, reason) => {
    try {
        await axios.post('http://localhost:9000/email/send', {
            receiverName: contact, // Assuming you have the contact name or email
            emailSubject: "Order Cancellation Notification",
            emailBody: `Your order with Order Id: ${id} has been cancelled for the following reason: ${reason}`,
            receiverEmail: contact // Assuming this is the contact email
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
};

const OrderCancellationForm = ({ order, setShowCancellationForm, onOrderCancelled }) => {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!reason.trim()) {
            setError('Cancellation reason is required');
            return;
        }

        try {
            // Update the order status
            const updatedOrder = await updateOrderStatus(order.id, 'Cancelled', reason); // Pass the reason

            // Send email notification asynchronously
            sendEmailNotification(order.mail, order.id, reason);

            // Notify parent component
            onOrderCancelled(updatedOrder);

            setShowCancellationForm(false);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                setError(`Error: ${error.response.data.message || 'cancelling the order'}`);
            } else if (error.request) {
                console.log(error.request);
                setError('No response received from the server');
            } else {
                console.log('Error', error.message);
                setError('Error setting up the request');
            }
        }
    };

    return (
        <div style={{ backgroundColor: '#DBDFFD', padding: '20px', height: '60%', width: '60%', margin: '3%', position: 'fixed', top: '10%', left: '20%', zIndex: 1000 }}>
            <div style={{ width: '80%', margin: '40px auto', padding: '20px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Cancellation Reason</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={reason}
                        onChange={(e) => { setReason(e.target.value); setError(''); }}
                        placeholder="Provide the reason for the cancellation of the order"
                        style={{ width: '80%', height: '150px', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '23%', marginLeft: '22em', marginTop: '1em' }}>
                        <CustomizedButton
                            type="submit"
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
                                textTransform: 'none',
                                textAlign: 'center',
                            }}>
                            Submit
                        </CustomizedButton>
                        <CustomizedButton
                            onClick={() => setShowCancellationForm(false)}
                            hoverBackgroundColor="#f11717"
                            style={{
                                color: '#ffffff',
                                backgroundColor: '#960505',
                                border: '1px solid #960505',
                                width: '6em',
                                height: '2.5em',
                                fontSize: '0.95em',
                                fontFamily: 'inter',
                                padding: '0.5em 0.625em',
                                borderRadius: '0.35em',
                                fontWeight: '550',
                                textTransform: 'none',
                                textAlign: 'center',
                            }}>
                            Cancel
                        </CustomizedButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderCancellationForm;
