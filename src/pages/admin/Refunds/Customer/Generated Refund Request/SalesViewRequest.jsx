import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SalesViewRequest.css';

import CustomizedButton from "../../../../../components/Button/button";
import SalesRefundDenialForm from '../Refund Denial Form/SalesRefundDenialForm';
import CustomizedAlert from '../../../../../components/Alert/alert';
import CenteredModal from '../../../../../components/Modal/modal';
import { useNavigate } from 'react-router-dom';

import { Modal, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

// Function to send email notification
const sendEmailNotification = async (refundRequest, id, status) => {
    const emailBody = status === 'accepted'
        ? `Your refund request with Order Id: ${id} has been accepted. Thank you!`
        : `Your refund request with Order Id: ${id} has been denied.`;
    
    try {
        await axios.post('http://localhost:9000/email/send', {
            receiverName: refundRequest.customerName,
            emailSubject: "Order Status Update!",
            emailBody,
            receiverEmail: refundRequest.contact,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
};

function SalesViewRequest({ id, open, handleClose }) {
    const [refundRequest, setRefundRequest] = useState(null);
    const [itemMapping, setItemMapping] = useState({});
    const [showDenialForm, setShowDenialForm] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
    const navigate = useNavigate();

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
            setAlert({ open: true, message: `Order has been accepted: ${response.status}`, severity: 'success' });
            sendEmailNotification(refundRequest, id, 'accepted');
            setTimeout(() => {
                handleClose();
                navigate('/viewRefundRequests');
            }, 500); 
        } catch (error) {
            setAlert({ open: true, message: 'Error accepting the order', severity: 'error' });
        }
    };

    const handleReject = () => {
        setShowDenialForm(true);
    };

    const handleAlertClose = () => {
        setAlert({ ...alert, open: false });
    };

    if (!refundRequest) {
        return <div>Loading...</div>;
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <CenteredModal>
                <div className={`outer ${showDenialForm ? 'dark-overlay' : ''}`}>
                    <div className="generated-request">
                        <IconButton
                            onClick={handleClose}
                            style={{ alignSelf: 'flex-start', margin: 0 }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <h2>Refund Request</h2>
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

                        {showDenialForm && <SalesRefundDenialForm id={id} contact={refundRequest.contact} setShowDenialForm={setShowDenialForm} setAlert={setAlert} handleClose={handleClose} />}

                        <CustomizedAlert
                            onClose={handleAlertClose}
                            open={alert.open}
                            message={alert.message}
                            severity={alert.severity}
                        />
                    </div>
                </div>
            </CenteredModal>
        </Modal>
    );
}

export default SalesViewRequest;
