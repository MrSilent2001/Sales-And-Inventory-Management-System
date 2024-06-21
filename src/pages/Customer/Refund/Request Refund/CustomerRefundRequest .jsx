import './Customer Refund Request.css';
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Footer from "../../../../layout/footer/footer";
import { useNavigate } from "react-router-dom";
import CustomizedButton from "../../../../components/Button/button";
import CustomerNavbar from "../../../../layout/navbar/Customer navbar/Customer navbar";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useLocation } from 'react-router-dom';

function SelectItem({ value, onChange, error, items }) {
    return (
        <Box sx={{ minWidth: 80 }}>
            <FormControl fullWidth error={error}>
                <InputLabel
                    id="item-select-label"
                    sx={{
                        fontSize: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    Select Item
                </InputLabel>
                <Select
                    labelId="item-select-label"
                    id="item-select"
                    value={value}
                    label="Item"
                    onChange={onChange}
                    sx={{
                        height: 40,
                        width: '40.8em',
                        fontSize: 10,
                        backgroundColor: '#e9eeff',
                        marginRight: '8px',
                        '& .MuiInputLabel-root': {
                            fontSize: 4,
                        },
                    }}
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

function BasicTextFields({ name, value, onChange, error, disabled }) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '25.5em',
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
                id="outlined-basic"
                variant="outlined"
                margin='normal'
                name={name}
                value={value}
                onChange={onChange}
                error={error}
                helperText={error && "This field is required"}
                disabled={disabled}
            />
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
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '25.5em',
                    "& .MuiInputBase-root": {
                        height: '2.5em',
                        backgroundColor: '#e9eeff',
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
                id="outlined-basic"
                variant="outlined"
                margin='normal'
                name={name}
                value={value}
                onChange={onChange}
                error={error}
                helperText={error && "This field is required"}
                disabled={disabled}
                type="number"
                InputProps={{
                    endAdornment: (
                        <div>
                            <button type="button" onClick={handleIncrement} disabled={value >= max}>+</button>
                            <button type="button" onClick={handleDecrement} disabled={value <= 1}>-</button>
                        </div>
                    )
                }}
            />
        </Box>
    );
}

function SelectReason({ value, onChange, error }) {
    return (
        <Box sx={{ minWidth: 80 }}>
            <FormControl fullWidth error={error}>
                <InputLabel
                    id="reason-select-label"
                    sx={{
                        fontSize: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    Select
                </InputLabel>
                <Select
                    labelId="reason-select-label"
                    id="reason-select"
                    value={value}
                    label="Reason"
                    onChange={onChange}
                    sx={{
                        height: 40,
                        width: '40.8em',
                        fontSize: 10,
                        backgroundColor: '#e9eeff',
                        marginRight: '8px',
                        '& .MuiInputLabel-root': {
                            fontSize: 4,
                        },
                    }}
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
        contact: '',
        item: '',
        quantity: 1,
        reason: '',
        totalPrice: '',
    });
    const [items, setItems] = useState([]);
    const [maxQuantity, setMaxQuantity] = useState(0);
    const [productPrices, setProductPrices] = useState({});
    const [orderDate, setOrderDate] = useState()
    const [discounts, setDiscounts] = useState([]);
    const [errors, setErrors] = useState({
        contact: false,
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
                contact: decodedToken.contactNo,
            }));
        }

        const fetchOrderDetails = async () => {
            try {
                const orderResponse = await axios.get(`http://localhost:9000/order/findOrder/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setOrderDate(orderResponse.data.orderDate);

                const productResponse = await axios.get('http://localhost:9000/product/getAllProducts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const discountResponse = await axios.get('http://localhost:9000/discounts/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const products = productResponse.data.reduce((acc, product) => {
                    acc[product.id] = {
                        name: product.productName,
                        price: product.productSellingPrice,
                    };
                    return acc;
                }, {});

                const orderItems = orderResponse.data.orderItems.map((item) => {
                    const parsedItem = JSON.parse(item);
                    return {
                        id: parsedItem.id,
                        name: products[parsedItem.id].name,
                        amount: parsedItem.amount,
                    };
                });

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

    const handleChange = (event) => {
        const { name, value } = event.target;

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
            contact: !formData.contact,
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
                                <h5>Contact</h5>
                            </div>
                            <div className="customerTextField">
                                <BasicTextFields
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    error={errors.contact}
                                    disabled={true}
                                />
                            </div>
                        </div>

                        <div className="customerFormField">
                            <div className="customerTextField">
                                <h5>Item</h5>
                            </div>
                            <div className="customerTextField">
                                <SelectItem
                                    value={formData.item}
                                    onChange={(e) => handleChange({ target: { name: 'item', value: e.target.value } })}
                                    error={errors.item}
                                    items={items}
                                />
                            </div>
                        </div>

                        <div className="customerFormField">
                            <div className="customerTextField">
                                <h5>Quantity</h5>
                            </div>
                            <div className="customerTextField">
                                <QuantityField
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    error={errors.quantity}
                                    max={maxQuantity}
                                    disabled={formData.item === ''}
                                />
                            </div>
                        </div>

                        <div className="customerFormField">
                            <div className="customerTextField">
                                <h5>Reason</h5>
                            </div>
                            <div className="customerTextField">
                                <SelectReason
                                    value={formData.reason}
                                    onChange={(e) => handleChange({ target: { name: 'reason', value: e.target.value } })}
                                    error={errors.reason}
                                />
                            </div>
                        </div>

                        <div className="customerFormField">
                            <div className="customerTextField">
                                <h5>Total Price</h5>
                            </div>
                            <div className="customerTextField">
                                <BasicTextFields
                                    name="totalPrice"
                                    value={formData.totalPrice}
                                    onChange={handleChange}
                                    error={errors.totalPrice}
                                    disabled={true}
                                />
                            </div>
                        </div>

                        <div className="customerRefundButtonField">
                            <div className="customerRefundRequestButtons">
                                <button type="submit" style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}>
                                    <CustomizedButton
                                        hoverBackgroundColor="#2d3ed2"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#242F9B',
                                            border: '1px solid #000000',
                                            borderRadius: '10px',
                                            width: '240px',
                                            height: '40px',
                                            fontSize: '17px',
                                            fontWeight: 'bold',
                                            margin: '0',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        Request Refund
                                    </CustomizedButton>
                                </button>
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
