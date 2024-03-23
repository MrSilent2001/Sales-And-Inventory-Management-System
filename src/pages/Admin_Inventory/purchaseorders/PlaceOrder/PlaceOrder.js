import './PlaceOrder.css';
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

// Mock data for suppliers and items, replace with your actual data
const suppliers = [
    { code: 'S0001', name: 'Supplier 1' },
    { code: 'S0002', name: 'Supplier 2' },
    // ... more suppliers
];

const items = [
    { code: 'I0001', name: 'Item 1' },
    { code: 'I0002', name: 'Item 2' },
    { code: 'I0003', name: 'Item 3' },
    // ... more items
];

function Dropdown({ label, value, onChange, options }) {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id={`select-${label}-label`}>{label}</InputLabel>
                <Select
                    labelId={`select-${label}-label`}
                    id={`select-${label}`}
                    value={value}
                    label={label}
                    onChange={onChange}
                    sx={{
                        height: 40,
                        width: '40.8em',
                        fontSize: 10,
                        backgroundColor: 'white',
                        marginRight: '8px',
                    }}
                >
                    {options.map((option) => (
                        <MenuItem key={option.code} value={option.code}>{option.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

function InputField({ label }) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '25.5em',
                    "& .MuiInputBase-root": {
                        height: '2.5em',
                        backgroundColor: 'white'
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
            <TextField id={`outlined-${label}`} label={label} variant="outlined"  />
        </Box>
    );
}

const RefundRequestButtons = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#242F9B',
    '&:hover': {
        backgroundColor: '#2d3ed2'
    },
    '&.MuiButton-root': {
        width: '12.625em',
        height: '3.5em'
    },
    fontSize: '0.65em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));

function PlaceOrder() {
    const [supplierCode, setSupplierCode] = React.useState('');
    const [itemCode, setItemCode] = React.useState('');
    const [reason, setReason] = React.useState('');

    return (
        <div className="customerRefundRequestOuter">
            <div className="customerRefundRequestInner">

                <div className="customerRefundRequestTopic">
                    <h2>Inventory Order</h2>
                </div>

                <div className="refundRequestForm">
                <div className="formField">
                        <div className="textField">
                            <h5>Order Id</h5>
                        </div>
                        <div className="textInput">
                            <InputField  />
                        </div>
                    </div>

                    <div className="formField">
                        <div className="textField">
                            <h5>Supplier</h5>
                        </div>
                        <div className="textInput">
                            <Dropdown 
                                options={suppliers} 
                            />
                        </div>
                    </div>

                    
                    <div className="formField">
                        <div className="textField">
                            <h5>Delivery Address</h5>
                        </div>
                        <div className="textInput">
                            <InputField />
                        </div>
                    </div>
                    <div className="formField">
                        <div className="textField">
                            <h5>Email</h5>
                        </div>
                        <div className="textInput">
                            <InputField />
                        </div>
                    </div>
                    <div className="formField">
                        <div className="textField">
                            <h5>Contact Number</h5>
                        </div>
                        <div className="textInput">
                            <InputField />
                        </div>
                    </div>

                    <div className="formField">
                        <div className="textField">
                            <h5>Item</h5>
                        </div>
                        <div className="textInput">
                            <Dropdown 
                                value={itemCode}
                                onChange={(e) => setItemCode(e.target.value)} 
                                options={items} 
                            />
                        </div>
                    </div>

                    <div className="formField">
                        <div className="textField">
                            
                        </div>
                        <div className="textInput">
                            <InputField  />
                        </div>
                    </div>
                   

                    <div className="refundButtonField">
                        <div className="refundRequestButtons">
                            <RefundRequestButtons>Cancel </RefundRequestButtons>
                            <RefundRequestButtons>Place Order</RefundRequestButtons>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;

