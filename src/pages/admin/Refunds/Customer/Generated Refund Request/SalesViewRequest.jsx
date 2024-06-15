import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SalesViewRequest.css';
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import CustomizedButton from "../../../../../components/Button/button";

// API call function to update refund status
const updateRefundStatus = async (id, status) => {
    try {
        const response = await axios.put('http://localhost:9000/refund/customerRefund/updateStatus', {
            id,
            status,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating refund status:', error);
        throw error;
    }
};

function SalesViewRequest() {
    const { id } = useParams();
    const [refundRequest, setRefundRequest] = useState(null);

    useEffect(() => {
        // Fetch the refund request details using the ID from the URL
        const fetchRefundRequest = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/refund/customerRefund/get/${id}`);
                setRefundRequest(response.data);
            } catch (error) {
                console.error('Error fetching refund request:', error);
            }
        };

        fetchRefundRequest();
    }, [id]);

    const handleAccept = async () => {
        try {
            const response = await updateRefundStatus(id, 'accepted');
            alert(`Order has been accepted: ${response.status}`);
        } catch (error) {
            alert('Error accepting the order');
        }
    };

    const handleReject = async () => {
        try {
            const response = await updateRefundStatus(id, 'rejected');
            alert(`Order has been rejected: ${response.status}`);
        } catch (error) {
            alert('Error rejecting the order');
        }
    };

    if (!refundRequest) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <SalesNavbar />
            <div className='outer'>
                <div className="generated-request">
                    <h2>Generated Request</h2>
                    <div className="refundRequestDetails">
                        <div className="formField">
                            <div className="textField">
                                <h5>Customer</h5>
                            </div>
                            <div className="inputData">
                                <h6>{refundRequest.customerName}</h6>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h5>Contact</h5>
                            </div>
                            <div className="inputData">
                                <h6>{refundRequest.contact}</h6>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h5>Item</h5>
                            </div>
                            <div className="inputData">
                                <h6>{refundRequest.item}</h6>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h5>Quantity</h5>
                            </div>
                            <div className="inputData">
                                <h6>{refundRequest.quantity}</h6>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h5>Reason</h5>
                            </div>
                            <div className="inputData">
                                <h6>{refundRequest.reason}</h6>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h5>Total Price</h5>
                            </div>
                            <div className="inputData">
                                <h6>{refundRequest.totalPrice}</h6>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex' }}>
                        <CustomizedButton
                            onClick={handleAccept}
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
                                marginTop: '1.5em',
                                marginRight: '1.5em',
                                textTransform: 'none',
                                textAlign: 'center',
                            }}>
                            Accept
                        </CustomizedButton>

                        <CustomizedButton
                            onClick={handleReject}
                            hoverBackgroundColor="#f11717"
                            style={{
                                color: '#ffffff',
                                backgroundColor: '#960505',
                                width: '6em',
                                height: '2.5em',
                                fontSize: '0.95em',
                                fontFamily: 'inter',
                                padding: '0.5em 0.625em',
                                borderRadius: '0.35em',
                                fontWeight: '550',
                                marginTop: '1.5em',
                                marginRight: '1.5em',
                                textTransform: 'none',
                                textAlign: 'center',
                            }}>
                            Reject
                        </CustomizedButton>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SalesViewRequest;
