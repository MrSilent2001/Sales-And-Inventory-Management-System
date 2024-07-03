import React, { useState, useEffect } from 'react';
import './InventoryRefundRequest.css';
import axios from 'axios';
import CustomizedAlert from '../../../../../../components/Alert/alert';
import ComboBox from '../../../../../../components/Form Inputs/comboBox';
import BasicTextField from '../../../../../../components/Form Inputs/textfield';
import CenteredModal from '../../../../../../components/Modal/modal';
import CustomizedButton from '../../../../../../components/Button/button';
import { useNavigate } from 'react-router-dom';


function InventoryRefundRequest({ order, onClose }) {
    const navigate = useNavigate(); 
    const [supplier, setSupplier] = useState(order.supplierName);
    const [item, setItem] = useState(order.productName);
    const [quantity, setQuantity] = useState('');
    const [reason, setReason] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [supplierId, setSupplierId] = useState(order.supplierId);
    const [itemCode, setItemCode] = useState(order.items); 

    const [quantityError, setQuantityError] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

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

        if (quantityError) {
            return; // Do not submit if there are validation errors
        }
        console.log(order);
        const refundRequestData = {
            orderId: order.order_id,
            supplierName: supplier,
            supplierId: supplierId,
            supplierMail:order.mail,
            item: itemCode, // Sending item code
            productName: item, // Sending product name
            quantity,
            price: totalPrice, // Total price as per backend requirement
            reason
        };

        try {
            await axios.post('http://localhost:9000/refund/inventoryRefund/create', refundRequestData);
            console.log('Refund request submitted successfully:', refundRequestData);
            setAlertMessage('Refund request submitted successfully.');
            setAlertSeverity('success');
            setAlertOpen(true);
            setTimeout(() => {
                navigate('/InventoryGeneratedRequest', { state: { refundRequestData } }); 
            }, 500);
        } catch (error) {
            console.error('Error submitting refund request:', error);
            setAlertMessage('Error submitting refund request');
            setAlertSeverity('error');
            setAlertOpen(true);
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
                                <BasicTextField
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
                                <BasicTextField
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
                                <BasicTextField
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
                                <ComboBox
                                    label="Reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    options={[
                                        { value: 'defected', label: 'Defected Item' },
                                        { value: 'not-as-described', label: 'Not as Described' },
                                        { value: 'expired', label: 'Expired' }
                                    ]}
                                    style={{ width: '17.5em', height: '2.5em', backgroundColor: '#e9eeff', marginRight: '8px' }}
                                />
                            </div>
                        </div>

                        <div className="refundRequestformField">
                            <div className="refundRequestidField">
                                <h5>Total Price:</h5>
                            </div>
                            <div className="refundRequestidInput">
                                <BasicTextField
                                    id="total-price"
                                    variant="outlined"
                                    size="small"
                                    type="number"
                                    value={totalPrice}
                                    onChange={(e) => setTotalPrice(e.target.value)}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="refundRequestformFieldButtons">
                            <div className="addSupplierButton">
                                <CustomizedButton 
                                    variant="contained"
                                    size="medium"
                                    style={{ backgroundColor: '#242F9B', width: '11.625em', height: '2.75em', fontSize: '0.625em', padding: '1.75em 0.625em' }}
                                    hoverBackgroundColor="#2d3ed2"
                                    onClick={handleSubmit}
                                >
                                    Create Request
                                </CustomizedButton>
                            </div>

                            <div className="refundRequestcancelButton">
                                <CustomizedButton 
                                    variant="contained"
                                    size="medium"
                                    style={{ backgroundColor: '#e03a26', width: '11.625em', height: '2.75em', fontSize: '0.625em', padding: '1.75em 0.625em' }}
                                    hoverBackgroundColor="#e03a26"
                                    onClick={onClose}
                                >
                                    Cancel
                                </CustomizedButton>
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
