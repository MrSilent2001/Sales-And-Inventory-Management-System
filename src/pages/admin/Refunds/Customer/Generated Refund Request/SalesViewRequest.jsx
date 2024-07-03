import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SalesViewRequest.css';
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import CustomizedButton from "../../../../../components/Button/button";
import SalesRefundDenialForm from '../Refund Denial Form/SalesRefundDenialForm';
import CustomizedAlert from '../../../../../components/Alert/alert';


const token = localStorage.getItem('accessToken');

// API call function to update refund status
const updateRefundStatus = async (id, status, denialReason = '') => {
    try {
        const response = await axios.put(`http://localhost:9000/refund/customerRefund/updateStatus`, {
            id,
            status,
            denialReason,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
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
    const [itemMapping, setItemMapping] = useState({});
    const [showDenialForm, setShowDenialForm] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: '', redirect: false });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:9000/product/getAllProducts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const products = response.data.reduce((acc, product) => {
                    acc[product.id] = product.productName;
                    return acc;
                }, {});
                setItemMapping(products);
            } catch (err) {
                console.error('Failed to fetch products:', err);
            }
        };

        fetchProducts();
    }, [token]);

    useEffect(() => {
        // Fetch the refund request details using the ID from the URL
        const fetchRefundRequest = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/refund/customerRefund/get/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const data = response.data;
                const itemWithName = itemMapping[data.item] || data.item;

                setRefundRequest({
                    ...data,
                    item: itemWithName
                });
            } catch (error) {
                console.error('Error fetching refund request:', error);
                setAlert({ open: true, message: 'Error fetching refund request', severity: 'error' });
            }
        };

        if (Object.keys(itemMapping).length) {
            fetchRefundRequest();
        }
    }, [id, itemMapping]);

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
                        {[
                            { label: 'Customer', value: refundRequest.customerName },
                            { label: 'Contact', value: refundRequest.contact },
                            { label: 'Item', value: refundRequest.item },
                            { label: 'Quantity', value: refundRequest.quantity },
                            { label: 'Reason', value: refundRequest.reason },
                            { label: 'Total Price', value: refundRequest.totalPrice }
                        ].map((field, index) => (
                            <div className="formField" key={index}>
                                <div className="textField">
                                    <h5>{field.label}</h5>
                                </div>
                                <div className="inputData">
                                    <h6>{field.value}</h6>
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
                                padding: '0.5em 0.625em',
                                marginTop: '1.5em',
                                marginRight: '1.5em',
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
                                padding: '0.5em 0.625em',
                                marginTop: '1.5em',
                                marginRight: '1.5em',
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
