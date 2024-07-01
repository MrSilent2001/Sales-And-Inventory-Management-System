import React, { useState, useEffect } from 'react';
import './InventoryRefundRequest.css';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

import axios from 'axios';
import CustomizedAlert from '../../../../../../components/Alert/alert';
import ComboBox from '../../../../../../components/Form Inputs/comboBox';

import { useNavigate, useLocation } from "react-router-dom";




function BasicTextFields({ id, variant, size, type, value, onChange, error, helperText, disabled }) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '17em',
                    "& .MuiInputBase-root": {
                        height: '2.5em',
                        backgroundColor: '#e9eeff'
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: '0.5em',
                        textAlign: 'center',
                    },
                },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id={id}
                variant={variant}
                size={size}
                type={type}
                value={value}
                onChange={onChange}
                error={error}
                helperText={helperText}
                margin='normal'
                disabled={disabled}
            />
        </Box>
    );
}

const CancelButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#D41400'),
    backgroundColor: '#D41400',
    '&:hover': {
        backgroundColor: '#e03a26'
    },
    '&.MuiButton-root': {
        width: '11.625em',
        height: '2.75em'
    },
    fontSize: '0.625em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));

const CreateRequestButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#242F9B',
    '&:hover': {
        backgroundColor: '#2d3ed2' 
    },
    '&.MuiButton-root': {
        width: '11.625em',
        height: '2.75em'
    },
    fontSize: '0.625em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));

const CenteredModal = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', 
});

function InventoryRefundRequest() {
    const location = useLocation();
    const order = location.state;

    const [supplier, setSupplier] = useState(order.supplierName);
    const [item, setItem] = useState(order.productName);
    const [quantity, setQuantity] = useState('');
    const [reason, setReason] = useState('');
    const [price, setPrice] = useState(order.productSellingPrice);
    const [totalPrice, setTotalPrice] = useState(0);

    const [quantityError, setQuantityError] = useState('');
    const [priceError, setPriceError] = useState('');

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const navigate = useNavigate();

    const validateField = (field, value) => {
        const regex = /^[1-9]\d*$/; // Positive integers
        if (!regex.test(value)) {
            if (field === 'quantity') {
                setQuantityError('Quantity must be a positive integer');
            }
        } else {
            if (field === 'quantity') {
                if (parseInt(value) > parseInt(order.quantity)) {
                    setQuantityError(`Quantity cannot be greater than ${order.quantity}`);
                } else {
                    setQuantityError('');
                    setTotalPrice(value * order.productSellingPrice); // Update total price
                }
            }
        }
    };

    const handleSubmit = async () => {
        if (!supplier || !item || !quantity || !reason || !totalPrice) {
            setAlertMessage('All fields are required to create a request.');
            setAlertSeverity('error');
            setAlertOpen(true);
            return;
        }

        validateField('quantity', quantity);

        if (quantityError || priceError) {
            return; // Do not submit if there are validation errors
        }

        const refundRequestData = {
            orderId: order.order_id,
            productName: item,
            productSellingPrice: price,
            quantity,
            reason,
            totalPrice
        };

        try {
            // Simulate successful submission
            console.log('Refund request submitted successfully:', refundRequestData);
            navigate('/InventoryGeneratedRequest', { state: { refundRequestData } });
        } catch (error) {
            console.error('Error submitting refund request:', error);
        }
    };

    return (
        <CenteredModal>
            <div className="refundRequestOuter">
                <div className="refundRequestModel">
                    <h2>Refund Request</h2>
                    <div className="refundRequestForm">
                        <div className="refundRequestformField">
                            <div className="refundRequestidField">
                                <h5>Supplier:</h5>
                            </div>
                            <div className="refundRequestidInput">
                                <BasicTextFields
                                    id="supplier"
                                    variant="outlined"
                                    size="small"
                                    type="text"
                                    value={supplier}
                                    onChange={(e) => setSupplier(e.target.value)}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="refundRequestformField">
                            <div className="refundRequestidField">
                                <h5>Item:</h5>
                            </div>
                            <div className="refundRequestidInput">
                                <BasicTextFields
                                    id="item"
                                    variant="outlined"
                                    size="small"
                                    type="text"
                                    value={item}
                                    onChange={(e) => setItem(e.target.value)}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="refundRequestformField">
                            <div className="addSupplieridField">
                                <h5>Quantity:</h5>
                            </div>
                            <div className="refundRequestidInput">
                                <BasicTextFields
                                    id="quantity"
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => {
                                        setQuantity(e.target.value);
                                        validateField('quantity', e.target.value);
                                    }}
                                    error={!!quantityError}
                                    helperText={quantityError}
                                />
                            </div>
                        </div>

                        <div className="refundRequestformField">
                            <div className="refundRequestidField">
                                <h5>Reason:</h5>
                            </div>
                            <div className="refundRequestidInput">
                                <BasicTextFields
                                    id="reason"
                                    variant="outlined"
                                    size="small"
                                    type="text"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="refundRequestformField">
                            <div className="refundRequestidField">
                                <h5>Total Price:</h5>
                            </div>
                            <div className="refundRequestidInput">
                                <BasicTextFields
                                    id="total-price"
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    value={totalPrice}
                                    onChange={(e) => setTotalPrice(e.target.value)}
                                    error={!!priceError}
                                    helperText={priceError}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="refundRequestformFieldButtons">
                            <div className="addSupplierButton">
                                <CreateRequestButton onClick={handleSubmit}>Create Request</CreateRequestButton>
                            </div>

                            <div className="refundRequestcancelButton">
                                <CancelButton onClick={() => navigate(-1)}>Cancel</CancelButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CustomizedAlert
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                message={alertMessage}
                severity={alertSeverity}
            />
        </CenteredModal>
    );
}

export default InventoryRefundRequest;
