import React, { useState } from 'react';
import CustomizedButton from "../../../../../components/Button/button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem('accessToken');

const SalesRefundDenialForm = ({ id, contact, setShowDenialForm, setAlert, handleClose }) => {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');

    // Function to update refund status
    const updateRefundStatus = async (id, status, denialReason = '') => {
        try {
            const response = await axios.put(`http://localhost:9000/refund/customerRefund/updateStatus`, {
                id,
                status,
                denialReason,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error updating refund status:', error);
            throw error;
        }
    };

    // Function to send email notification
    const sendEmailNotification = async (contact, id, reason) => {
        try {
            await axios.post('http://localhost:9000/email/send', {
                receiverName: contact, // Assuming you have the contact name or email
                emailSubject: "Refund Request Denied",
                emailBody: `Your refund request with Order Id: ${id} has been denied for the following reason: ${reason}`,
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!reason.trim()) {
            setError('Denial reason is required');
            return;
        }

        try {
            // Update the refund status
            const response = await updateRefundStatus(id, 'rejected', reason);

            // Send email notification asynchronously
            sendEmailNotification(contact, id, reason);

            // Set the alert and navigate to viewRefundRequests
            setAlert({ open: true, message: `Order has been rejected: ${response.status}`, severity: 'success' });

            setTimeout(() => {
                setShowDenialForm(false);
                handleClose();
                navigate('/viewRefundRequests');
            }, 500); 
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                setError(`Error: ${error.response.data.message || 'rejecting the order'}`);
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
        <>
            <div style={{ backgroundColor: '#DBDFFD', padding: '20px', height: '62%', width: '40%',borderRadius: '1em', margin: '3%', position: 'fixed', top: '10%', left: '26%', zIndex: 1000 }}>
                <div style={{ width: '80%', margin: '40px auto', padding: '20px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Reasons</h2>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={reason}
                            onChange={(e) => { setReason(e.target.value); setError(''); }}
                            placeholder="Provide the reasons for the denial of the refund request"
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
                                    marginRight: '1em'
                                }}>
                                Submit
                            </CustomizedButton>
                            <CustomizedButton
                                onClick={() => setShowDenialForm(false)}
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
        </>
    );
};

export default SalesRefundDenialForm;
