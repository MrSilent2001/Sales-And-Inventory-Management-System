import React, { useState, useEffect } from 'react';
import './InventoryRefundRequest.css';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import CustomizedAlert from '../../../../../../components/Alert/alert';
import ComboBox from '../../../../../../components/Form Inputs/comboBox';


function BasicTextFields({ id, variant, size, type, value, onChange, error, helperText }) {
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
        backgroundColor: '#2d3ed2' // You can adjust the darken value as needed
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
    height: '100vh', // Make the container take the full height of the viewport
});

function InventoryRefundRequest(props) {
    const [supplier, setSupplier] = useState('');
    const [suppliers, setSuppliers] = useState([]);
    const [item, setItem] = useState('');
    const [items, setItems] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [reason, setReason] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setphone] = useState('');

    const [quantityError, setQuantityError] = useState('');
    const [priceError, setPriceError] = useState('');

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('error');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('http://localhost:9000/purchaseOrder/suppliersList');
                const formattedSuppliers = response.data.map(supplier => ({
                    value: supplier.id,
                    label: supplier.name
                }));
                setSuppliers(formattedSuppliers);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };
        fetchSuppliers();
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            if (supplier) {
                try {
                    const response = await axios.get(`http://localhost:9000/purchaseOrder/itemsList/${supplier}`);
                    const itemsArray = response.data.flatMap(item => item.split(',').map(i => i.trim()));
                    const formattedItems = itemsArray.map(item => ({
                        value: item,
                        label: item
                    }));
                    setItems(formattedItems);
                } catch (error) {
                    console.error('Error fetching items:', error);
                }
            }
        };
        fetchItems();
    }, [supplier]);

    useEffect(() => {
        const fetchSupplierDetails = async () => {
            if (supplier) {
                try {
                    const response = await axios.get(`http://localhost:9000/supplier/getSupplier/${supplier}`);
                    setphone(response.data.contactNo);
                } catch (error) {
                    console.error('Error fetching supplier details:', error);
                }
            }
        };
        fetchSupplierDetails();
    }, [supplier]);

    const validateField = (field, value) => {
        const regex = /^[1-9]\d*$/; // Positive integers
        if (!regex.test(value)) {
            if (field === 'quantity') {
                setQuantityError('Quantity must be a positive integer');
            } else if (field === 'price') {
                setPriceError('Total price must be a positive integer');
            }
        } else {
            if (field === 'quantity') {
                setQuantityError('');
            } else if (field === 'price') {
                setPriceError('');
            }
        }
    };

    const handleSubmit = async () => {
        if (!supplier || !item || !quantity || !reason || !price) {
            setAlertMessage('All fields are required to create a request.');
            setAlertSeverity('error');
            setAlertOpen(true);
            return;
        }

        validateField('quantity', quantity);
        validateField('price', price);

        if (quantityError || priceError) {
            return; // Do not submit if there are validation errors
        }

        const selectedSupplier = suppliers.find(s => s.value === supplier);
        const refundRequestData = {
            supplierId: selectedSupplier.value,
            supplierName: selectedSupplier.label,
            phone,
            item,
            quantity,
            reason,
            price
        };

        try {
            await axios.post('http://localhost:9000/refund/inventoryRefund/create', refundRequestData);
            console.log('Refund request submitted successfully');

            // Navigate to the target component and pass the state
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
                                <ComboBox
                                    label="Supplier"
                                    value={supplier}
                                    onChange={(e) => setSupplier(e.target.value)}
                                    options={suppliers}
                                    style={{ width: '17em', height: '2.5em', backgroundColor: '#e9eeff', marginRight: '8px' }}
                                />
                            </div>
                        </div>

                        <div className="refundRequestformField">
                            <div className="refundRequestidField">
                                <h5>Item:</h5>
                            </div>
                            <div className="refundRequestidInput">
                                <ComboBox
                                    label="Item"
                                    value={item}
                                    onChange={(e) => setItem(e.target.value)}
                                    options={items}
                                    style={{ width: '17em', height: '2.5em', backgroundColor: '#e9eeff', marginRight: '8px' }}
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
                                <ComboBox
                                    label="Reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    options={[
                                        { value: 'defected', label: 'Defected Item' },
                                        { value: 'not-as-described', label: 'Not as Described' },
                                        { value: 'expired', label: 'Expired' }
                                    ]}
                                    style={{ width: '17em', height: '2.5em', backgroundColor: '#e9eeff', marginRight: '8px' }}
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
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                        validateField('price', e.target.value);
                                    }}
                                    error={!!priceError}
                                    helperText={priceError}
                                />
                            </div>
                        </div>

                        <div className="refundRequestformFieldButtons">
                            <div className="addSupplierButton">
                                <CreateRequestButton onClick={handleSubmit}>Create Request</CreateRequestButton>
                            </div>

                            <div className="refundRequestcancelButton">
                                <CancelButton onClick={() => props.onClose(false)}>Cancel</CancelButton>
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
