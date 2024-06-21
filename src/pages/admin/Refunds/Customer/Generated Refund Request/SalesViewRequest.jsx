import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SalesViewRequest.css';
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import CustomizedButton from "../../../../../components/Button/button";
import SalesRefundDenialForm from '../Refund Denial Form/SalesRefundDenialForm';
import CustomizedAlert from '../../../../../components/Alert/alert';


// API call function to update refund status
const updateRefundStatus = async (id, status, denialReason = '') => {
    try {
        const response = await axios.put(`http://localhost:9000/refund/customerRefund/updateStatus`, {
            id,
            status,
            denialReason,
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
    const [showDenialForm, setShowDenialForm] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: '', redirect: false });

    useEffect(() => {
        // Fetch the refund request details using the ID from the URL
        const fetchRefundRequest = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/refund/customerRefund/get/${id}`);
                setRefundRequest(response.data);
            } catch (error) {
                console.error('Error fetching refund request:', error);
                setAlert({ open: true, message: 'Error fetching refund request', severity: 'error' });
            }
        };

        fetchRefundRequest();
    }, [id]);

    const handleAccept = async () => {
        try {
            const response = await updateRefundStatus(id, 'accepted');
            setAlert({ open: true, message: `Order has been accepted: ${response.status}`, severity: 'success', redirect: true });
        } catch (error) {
            setAlert({ open: true, message: 'Error accepting the order', severity: 'error' });
        }
    };

    const handleReject = () => {
        setShowDenialForm(true);
    };

    if (!refundRequest) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <SalesNavbar />
            <div className={`outer ${showDenialForm ? 'dark-overlay' : ''}`}>
                <div className="generated-request">
                    <h2>Generated Request</h2>
                    <div className="refundRequestDetails">
                        {['Customer', 'Contact', 'Item', 'Quantity', 'Reason', 'Total Price'].map((field, index) => (
                            <div className="formField" key={index}>
                                <div className="textField">
                                    <h5>{field}</h5>
                                </div>
                                <div className="inputData">
                                    <h6>{refundRequest[field.toLowerCase().replace(' ', '')]}</h6>
                                </div>
                            </div>
                        ))}
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
                                border: '1px solid #960505',
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

            {showDenialForm && <SalesRefundDenialForm id={id} setShowDenialForm={setShowDenialForm} setAlert={setAlert} />}

            <CustomizedAlert
                onClose={() => {
                    setAlert({ ...alert, open: false });
                    if (alert.redirect) {
                        window.location.href = '/viewRefundRequests';
                    }
                }}
                open={alert.open}
                message={alert.message}
                severity={alert.severity}
            />
        </>
    );
}

export default SalesViewRequest;
