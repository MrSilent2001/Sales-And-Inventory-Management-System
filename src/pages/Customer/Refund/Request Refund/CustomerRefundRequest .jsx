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
import {jwtDecode} from 'jwt-decode';



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
                    Select
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
                    {items.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
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

function BasicTextFields({ name, value, onChange, error }) {
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
            />
        </Box>
    );
}

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
                    contact: decoded.contactNo || ''
                }));
            } catch (error) {
                console.error('Invalid token:', error);
            }
        }

        if (order) {
            //const itemsArray = order.orderItems.split(','); // Extracting and splitting items
            const itemsArray = "item1,item2,item3".split(','); // Extracting and splitting items

            setItems(itemsArray); // Setting the items array in state
            setFormData((prevFormData) => ({
                ...prevFormData,
                customerId: order.orderCustomerId,
                customerName: order.customerName,
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

    return (
        <>
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
                                <BasicTextFields
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    error={errors.quantity}
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
                                            border: '1px solid #242F9B',
                                            width: '12em',
                                            height: '3.5em',
                                            fontSize: '1em',
                                            fontFamily: 'inter',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em',
                                            fontWeight: '500',
                                            marginTop: '0.625em',
                                            textTransform: 'none',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Create Request
                                    </CustomizedButton>
                                </button>
                                <button type="button" style={{ background: 'none', border: 'none', padding: 0 }}>
                                    <CustomizedButton
                                        hoverBackgroundColor="#f11717"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#ff0000',
                                            border: '1px solid #ff0000',
                                            width: '12em',
                                            height: '3.5em',
                                            fontSize: '1em',
                                            fontFamily: 'inter',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em',
                                            fontWeight: '500',
                                            marginTop: '0.625em',
                                            textTransform: 'none',
                                            textAlign: 'center',
                                            marginLeft: '0.5em'
                                        }}
                                        onClick={onClose}
                                    >
                                        Cancel Request
                                    </CustomizedButton>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
         
        </>
    );
}

export default CustomerRefundRequest;
