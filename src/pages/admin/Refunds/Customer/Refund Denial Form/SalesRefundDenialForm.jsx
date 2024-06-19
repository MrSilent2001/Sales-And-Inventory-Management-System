import React, { useState } from 'react';
import CustomizedButton from "../../../../../components/Button/button";
import axios from 'axios';


const SalesRefundDenialForm = ({ id, setShowDenialForm, setAlert }) => {
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!reason.trim()) {
            setError('Denial reason is required');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:9000/refund/customerRefund/updateStatus`, {
                id,
                status: 'rejected',
                denialReason: reason,
            });
            setAlert({ open: true, message: `Order has been rejected: ${response.status}`, severity: 'success' });
            setTimeout(() => {
                window.location.href = '/viewRefundRequests';
            },0); // 2 seconds delay
            setShowDenialForm(false);
        } catch (error) {
            setError('Error rejecting the order');
        }
    };

    return (
        <div style={{ backgroundColor: '#DBDFFD', padding: '20px', height: '80%', width: '60%', margin: '3%', position: 'fixed', top: '10%', left: '20%', zIndex: 1000 }}>
            <div style={{ width: '80%', margin: '40px auto', padding: '20px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Reasons</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={reason}
                        onChange={(e) => { setReason(e.target.value); setError(''); }}
                        placeholder="Provide the reasons for the denial of the refund request"
                        style={{ width: '100%', height: '150px', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
    );
};

export default SalesRefundDenialForm;
