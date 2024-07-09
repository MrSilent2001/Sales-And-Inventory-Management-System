import './Customer Refund Request.css';
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Footer from "../../../../layout/footer/footer";
import { useNavigate } from "react-router-dom";
import CustomizedButton from "../../../../components/Button/button";
import CustomerNavbar from "../../../../layout/navbar/Customer navbar/Customer navbar";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import BasicTextField from "../../../../components/Form Inputs/textfield";
import BasicTextArea from "../../../../components/Form Inputs/textArea";

function SelectItem({ value, onChange, error, items }) {
    return (
        <Box sx={{ minWidth: 80 }}>
            <FormControl fullWidth error={error}>
                <Select
                    labelId="item-select-label"
                    id="item-select"
                    value={value}
                    onChange={onChange}
                    style={{ width: '17.25em', height: '2em', marginRight: '0.5em' }}
                >
                    {items.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

function QuantityField({ name, value, onChange, max, error, disabled }) {
    const handleIncrement = () => {
        if (value < max) {
            onChange({ target: { name, value: value + 1 } });
        }
    };

    const handleDecrement = () => {
        if (value > 1) {
            onChange({ target: { name, value: value - 1 } });
        }
    };

    return (
        <BasicTextField
            name={name}
            size="small"
            value={value}
            onChange={onChange}
            error={error}
            disabled={disabled}
            InputProps={{
                endAdornment: (
                    <div>
                        <button type="button" onClick={handleIncrement} disabled={value >= max}>+</button>
                        <button type="button" onClick={handleDecrement} disabled={value <= 1}>-</button>
                    </div>
                )
            }}
        />
    );
}

function SelectReason({ value, onChange, error }) {
    return (
        <Box sx={{ minWidth: 80 }}>
            <FormControl fullWidth error={error}>
                <Select
                    labelId="reason-select-label"
                    id="reason-select"
                    value={value}
                    onChange={onChange}
                    style={{ width: '17.25em', height: '2em', marginRight: '0.5em' }}
                >
                    <MenuItem value="Defective Item">Defective Item</MenuItem>
                    <MenuItem value="Not as Described">Not as Described</MenuItem>
                    <MenuItem value="Expired">Expired</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

function CustomerRefundRequest() {
    const [formData, setFormData] = useState({
        customerId: '',
        customerName: '',
        email: '',
        accountDetails: '',
        item: '',
        quantity: 1,
        reason: '',
        totalPrice: '',
    });
    const [items, setItems] = useState([]);
    const [maxQuantity, setMaxQuantity] = useState(0);
    const [productPrices, setProductPrices] = useState({});
    const [orderDate, setOrderDate] = useState();
    const [discounts, setDiscounts] = useState([]);
    const [errors, setErrors] = useState({
        email: false,
        accountDetails: false,
        item: false,
        quantity: false,
        reason: false,
        totalPrice: false,
    });
    const navigate = useNavigate();
    const location = useLocation();
    const { orderId } = location.state || {};

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            setFormData((prevData) => ({
                ...prevData,
                customerId: decodedToken.id,
                customerName: decodedToken.username,
                email: decodedToken.email,
            }));
        }

        const fetchOrderDetails = async () => {
            try {
                const [orderResponse, productResponse, refundResponse, discountResponse] = await Promise.all([
                    axios.get(`http://localhost:9000/order/findOrder/${orderId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    axios.get('http://localhost:9000/product/getAllProducts', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    axios.get('http://localhost:9000/refund/customerRefund/getAll', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    axios.get('http://localhost:9000/discounts/getAll', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                ]);

                setOrderDate(orderResponse.data.orderDate);

                const products = productResponse.data.reduce((acc, product) => {
                    acc[product.id] = {
                        name: product.productName,
                        price: product.productSellingPrice,
                    };
                    return acc;
                }, {});

                const refundRequests = refundResponse.data.reduce((acc, refund) => {
                    if (!acc[refund.orderId]) {
                        acc[refund.orderId] = {};
                    }
                    if (!acc[refund.orderId][refund.item]) {
                        acc[refund.orderId][refund.item] = 0;
                    }
                    acc[refund.orderId][refund.item] += parseInt(refund.quantity);
                    return acc;
                }, {});

                const orderItems = orderResponse.data.orderItems.map((item) => {
                    const parsedItem = JSON.parse(item);
                    const refundedQuantity = refundRequests[orderId]?.[parsedItem.id] || 0;
                    const eligibleQuantity = parsedItem.amount - refundedQuantity;

                    if (eligibleQuantity > 0) {
                        return {
                            id: parsedItem.id,
                            name: products[parsedItem.id].name,
                            amount: eligibleQuantity,
                        };
                    }

                    return null;
                }).filter(Boolean);

                setItems(orderItems);
                setProductPrices(products);
                setDiscounts(discountResponse.data);

            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    const handleChange = (eventOrData) => {
        const isEvent = eventOrData.target !== undefined;
        const { name, value } = isEvent ? eventOrData.target : eventOrData;

        if (name === 'item') {
            const selectedItem = items.find((item) => item.id === value);
            setMaxQuantity(selectedItem ? selectedItem.amount : 0);
        }

        const updatedFormData = {
            ...formData,
            [name]: value,
        };

        if (name === 'item' || name === 'quantity') {
            const itemPrice = productPrices[updatedFormData.item]?.price || 0;
            let totalPrice = itemPrice * updatedFormData.quantity;
            console.log(orderDate)

            const applicableDiscount = discounts.find((discount) =>
                parseInt(discount.productId) === parseInt(updatedFormData.item) &&
                new Date(discount.startDate) <= new Date(orderDate) &&
                new Date(orderDate) <= new Date(discount.endDate)
            );

            if (applicableDiscount) {
                const discountAmount = totalPrice * (applicableDiscount.discountRate / 100);
                totalPrice -= discountAmount;
            }

            updatedFormData.totalPrice = totalPrice.toFixed(2);
        }

        setFormData(updatedFormData);
    };

    const handleSubmit = (event) => {
        const token = localStorage.getItem('accessToken');
        event.preventDefault();

        const newErrors = {
            email: !formData.email,
            accountDetails: !formData.accountDetails,
            item: !formData.item,
            quantity: !formData.quantity,
            reason: !formData.reason,
            totalPrice: !formData.totalPrice,
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some((error) => error);
        if (hasError) {
            return;
        }

        console.log('Submitting form with data:', formData);
        axios.post('http://localhost:9000/refund/customerRefund/create', { ...formData, orderId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                axios.post('http://localhost:9000/email/send', {
                    receiverName: formData.customerName,
                    emailSubject: "Refund Request Submitted",
                    emailBody: `Your refund request for the item ${formData.item} with quantity ${formData.quantity} has been submitted. Total refund amount is ${formData.totalPrice}. Reason: ${formData.reason}.`,
                    receiverEmail: formData.email
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Refund request created:', response.data);
                navigate('/generatedrefund', { state: { formData } });
            })
            .catch((error) => {
                console.error('Error creating refund request:', error.response ? error.response.data : error.message);
            });
    };

    return (
        <>
            <CustomerNavbar />
            <div className="customerRefundRequestOuter">
                <div className="customerRefundRequestInner">
                    <div className="customerRefundRequestTopic">
                        <h2>Refund Request</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="customerRefundRequestForm">
                        <div className="customerFormField">
                            <div className="customerTextField">
                                <h5>Email:</h5>
                            </div>
                            <div className="customerTextField">
                                <BasicTextField
                                    name="email"
                                    size="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    disabled={true}
                                />
                            </div>
                        </div>

                        <div className="customerFormField">
                            <div className="customerTextField">
                                <h5>Account Details: </h5>
                            </div>
                            <div className="customerTextField">
                                <BasicTextArea
                                    rows={3}
                                    name="accountDetails"
                                    style={{ width: '17.5em', marginTop: '1em' }}
                                    onChange={(e) => handleChange({ name: 'accountDetails', value: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="customerFormField">
                            <div className="customerTextField">
                                <h5>Item:</h5>
                            </div>
                            <div className="customerTextField">
                                <SelectItem
                                    value={formData.item}
                                    onChange={(e) => handleChange({ name: 'item', value: e.target.value })}
                                    error={errors.item}
                                    items={items}
                                />
                            </div>
                        </div>

                        <div className="customerFormField">
                            <div className="customerTextField">
                                <h5>Quantity:</h5>
                            </div>
                            <div className="customerTextField">
                                <QuantityField
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={(e) => handleChange({ name: 'quantity', value: parseInt(e.target.value) })}
                                    error={errors.quantity}
                                    max={maxQuantity}
                                    disabled={formData.item === ''}
                                />
                            </div>
                        </div>

                        <div className="customerFormField">
                            <div className="customerTextField">
                                <h5>Reason:</h5>
                            </div>
                            <div className="customerTextField">
                                <SelectReason
                                    value={formData.reason}
                                    onChange={(e) => handleChange({ name: 'reason', value: e.target.value })}
                                    error={errors.reason}
                                />
                            </div>
                        </div>

                        <div className="customerFormField">
                            <div className="customerTextField">
                                <h5>Total Price:</h5>
                            </div>
                            <div className="customerTextField">
                                <BasicTextField
                                    name="totalPrice"
                                    size="small"
                                    type="number"
                                    value={formData.totalPrice}
                                    onChange={handleChange}
                                    error={errors.totalPrice}
                                    disabled={true}
                                />
                            </div>
                        </div>

                        <div className="customerRefundButtonField">
                            <div className="customerRefundRequestButtons">
                                <CustomizedButton
                                    onClick={() => navigate(-1)}
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        backgroundColor: '#960505',
                                        width: '9.5em',
                                        height: '2.5em',
                                        fontSize: '0.8em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        margin: '2em 2.5em 0 0'
                                    }}>
                                    Cancel
                                </CustomizedButton>
                                <CustomizedButton
                                    type="submit"
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '9.5em',
                                        height: '2.5em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                    }}>
                                    Request
                                </CustomizedButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CustomerRefundRequest;
