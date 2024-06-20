import './Customer Refund Request.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomizedButton from "../../../../components/Button/button";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import CenteredModal from "../../../../components/Modal/modal";
import ComboBox from "../../../../components/Form Inputs/comboBox";
import BasicTextField from "../../../../components/Form Inputs/textfield";
import CustomizedAlert from "../../../../components/Alert/alert";

function CustomerRefundRequest({ order, onClose }) {
    const [formData, setFormData] = useState({
        customerId: '',
        customerName: '',
        contact: '',
        item: '',
        quantity: '',
        reason: '',
        totalPrice: ''
    });

    const [errors, setErrors] = useState({
        contact: false,
        item: false,
        quantity: false,
        reason: false,
        totalPrice: false
    });

    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    customerId: decoded.id || '',
                    contact: decoded.contactNo || '',
                    customerName: decoded.username || '',
                }));
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }

        if (order) {
            const itemsArray = "item1,item2,item3".split(','); // Hardcoded items for demonstration
            setItems(itemsArray.map(item => ({ value: item, label: item }))); // Setting the items array in state
            setFormData((prevFormData) => ({
                ...prevFormData,
                orderId: order.orderId,
                item: '', // Initially setting item to an empty string
                quantity: order.quantity,
                totalPrice: order.orderPrice
            }));
        }
    }, [order]);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {
            contact: !formData.contact,
            item: !formData.item,
            quantity: !formData.quantity,
            reason: !formData.reason,
            totalPrice: !formData.totalPrice
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some(error => error);
        if (hasError) {
            return;
        }
        console.log('Form data:', formData);

        axios.post('http://localhost:9000/refund/customerRefund/create', formData)
            .then(response => {
                console.log('Refund request created:', response.data);
                navigate('/generatedrefund', { state: { formData } });
                onClose();
            })
            .catch(error => {
                console.error('Error creating refund request:', error.response ? error.response.data : error.message);
            });
    };

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const handleClickSuccess = () => {
        setOpenSuccess(true);
    };

    const handleClickError = () => {
        setOpenError(true);
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    return (
        <CenteredModal>
            <form onSubmit={handleSubmit}>
                <div className="customerRefundRequestsOuter">
                    <div className="customerRefundRequestsModel">
                        <h2>Add Discounts</h2>
                        <div className="customerRefundRequestsForm">
                            <div className="customerRefundRequestsFormField">
                                <div className="customerRefundRequestsLabelField">
                                    <h5>Contact:</h5>
                                </div>
                                <div className="customerRefundRequestsInput">
                                    <BasicTextField
                                        disabled={true}
                                        name="contact"
                                        size="small"
                                        type="text"
                                        value={formData.contact}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            {errors.contact && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.contact}</span>}

                            <div className="customerRefundRequestsFormField">
                                <div className="customerRefundRequestsLabelField">
                                    <h5>Item Name:</h5>
                                </div>
                                <div className="customerRefundRequestsInput">
                                    <ComboBox
                                        value={formData.item}
                                        onChange={(e) => handleChange({ target: { name: 'item', value: e.target.value } })}
                                        options={items || []}
                                        style={{ width: '17.25em', height: '2em', marginRight: '0.5em' }}
                                        defaultValue=""
                                    />
                                </div>
                            </div>
                            {errors.item && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.item}</span>}

                            <div className="customerRefundRequestsFormField">
                                <div className="customerRefundRequestsLabelField">
                                    <h5>Quantity:</h5>
                                </div>
                                <div className="customerRefundRequestsInput">
                                    <BasicTextField
                                        disabled={true}
                                        name="quantity"
                                        size="small"
                                        type="text"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            {errors.quantity && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.quantity}</span>}

                            <div className="customerRefundRequestsFormField">
                                <div className="customerRefundRequestsLabelField">
                                    <h5>Reason:</h5>
                                </div>
                                <div className="customerRefundRequestsInput">
                                    <ComboBox
                                        value={formData.reason}
                                        onChange={(e) => handleChange({
                                            target: {
                                                name: 'reason',
                                                value: e.target.value
                                            }
                                        })}
                                        options={[
                                            { value: 'reason1', label: 'Reason 1' },
                                            { value: 'reason2', label: 'Reason 2' },
                                            { value: 'reason3', label: 'Reason 3' }
                                        ]}
                                        style={{ width: '17.25em', height: '2em', marginRight: '0.5em' }}
                                        defaultValue=""
                                    />
                                </div>
                            </div>
                            {errors.reason && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.reason}</span>}

                            <div className="customerRefundRequestsFormField">
                                <div className="customerRefundRequestsLabelField">
                                    <h5>Total Amount: </h5>
                                </div>
                                <div className="customerRefundRequestsInput">
                                    <BasicTextField
                                        name="totalPrice"
                                        value={formData.totalPrice}
                                        onChange={handleChange}
                                        error={errors.totalPrice}
                                    />
                                </div>
                            </div>
                            {errors.totalPrice && <span style={{
                                color: 'red',
                                fontSize: '0.8em',
                                padding: '0 0 0.5em 0.5em'
                            }}>{errors.totalPrice}</span>}
                        </div>
                        <div className="customerRefundRequestsFormFieldButtons">
                            <div className="customerRefundRequestsButton">
                                <CustomizedButton
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#242F9B',
                                        width: '7.5em',
                                        height: '2.75em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        marginTop: '0.625em'
                                    }}
                                    type="submit"
                                >
                                    Create
                                </CustomizedButton>
                            </div>
                            <div className="customerRefundRequestsButton">
                                <CustomizedButton
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#960505',
                                        width: '7.5em',
                                        height: '2.75em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        marginTop: '0.625em',
                                        marginRight: '0.625em'
                                    }}
                                    onClick={onClose}
                                >
                                    Cancel
                                </CustomizedButton>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="Supplier Added Successfully!"
            />

            <CustomizedAlert
                open={openError}
                onClose={handleCloseError}
                severity="error"
                message="Something Went Wrong!"
            />
        </CenteredModal>
    );
}

export default CustomerRefundRequest;
