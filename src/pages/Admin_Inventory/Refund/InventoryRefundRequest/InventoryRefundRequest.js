import './InventoryRefundRequest.css';
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import InventoryNavbar from "../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../layout/footer/footer";
import {Link} from "react-router-dom";

// Mock data for suppliers and items, replace with your actual data
const suppliers = [
    {code: 'S0001', name: 'Supplier 1'},
    {code: 'S0002', name: 'Supplier 2'},
    // ... more suppliers
];

const items = [
    {code: 'I0001', name: 'Item 1'},
    {code: 'I0002', name: 'Item 2'},
    {code: 'I0003', name: 'Item 3'},
    // ... more items
];

function Dropdown({label, value, onChange, options}) {
    return (
        <Box sx={{minWidth: 120}}>
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
                        backgroundColor: '#e9eeff',
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

function InputField({label}) {
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
            <TextField id={`outlined-${label}`} label={label} variant="outlined" margin='normal'/>
        </Box>
    );
}

const RefundRequestButtons = styled(Button)(({theme}) => ({
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

function InventoryRefundRequest() {
    const [supplierCode, setSupplierCode] = React.useState('');
    const [itemCode, setItemCode] = React.useState('');
    const [reason, setReason] = React.useState('');

    return (
        <>
            <InventoryNavbar/>
            <div className="customerRefundRequestOuter">
                <div className="customerRefundRequestInner">

                    <div className="customerRefundRequestTopic">
                        <h2>Refund Request</h2>
                    </div>

                    <div className="refundRequestForm">

                        <div className="formField">
                            <div className="textField">
                                <h5>Supplier</h5>
                            </div>
                            <div className="textInput">
                                <Dropdown
                                    label="Supplier"
                                    value={supplierCode}
                                    onChange={(e) => setSupplierCode(e.target.value)}
                                    options={suppliers}
                                />
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h5>Item</h5>
                            </div>
                            <div className="textInput">
                                <Dropdown
                                    label="Item"
                                    value={itemCode}
                                    onChange={(e) => setItemCode(e.target.value)}
                                    options={items}
                                />
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h5>Quantity</h5>
                            </div>
                            <div className="textInput">
                                <InputField label="Quantity"/>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h5>Reason</h5>
                            </div>
                            <div className="textInput">
                                <Dropdown
                                    label="Reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    options={[
                                        {code: 'defected', name: 'Defected Item'},
                                        {code: 'not-as-described', name: 'Not as Described'},
                                        {code: 'expired', name: 'Expired'}
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h5>Total Price</h5>
                            </div>
                            <div className="textInput">
                                <InputField label="Total Price"/>
                            </div>
                        </div>

                        <div className="refundButtonField">
                            <div className="refundRequestButtons">
                                <RefundRequestButtons>Cancel </RefundRequestButtons>

                                <Link to="/GeneratedRequest">
                                    <RefundRequestButtons>Create Request</RefundRequestButtons>
                                </Link>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default InventoryRefundRequest;

