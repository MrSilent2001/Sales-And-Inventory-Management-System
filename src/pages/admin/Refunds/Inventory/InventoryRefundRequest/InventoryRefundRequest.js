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
                        width: '27em',
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

function BasicTextFields({id, variant, size, type}) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '17em',
                    "& .MuiInputBase-root":{
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
            <TextField id={id} variant={variant} size={size} type={type} margin='normal'/>
        </Box>
    );
}

const CancelButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#D41400'),
    backgroundColor: '#D41400',
    '&:hover': {
        backgroundColor: '#e03a26' // You can adjust the darken value as needed
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
    const [supplierCode, setSupplierCode] = React.useState('');
    const [itemCode, setItemCode] = React.useState('');
    const [reason, setReason] = React.useState('');

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
                                    <Dropdown
                                        label="Supplier"
                                        value={supplierCode}
                                        onChange={(e) => setSupplierCode(e.target.value)}
                                        options={suppliers}
                                    />
                                </div>
                            </div>

                            <div className="refundRequestformField">
                                <div className="refundRequestidField">
                                    <h5>Item:</h5>
                                </div>
                                <div className="refundRequestidInput">
                                    <Dropdown
                                        label="Item"
                                        value={itemCode}
                                        onChange={(e) => setItemCode(e.target.value)}
                                        options={items}
                                    />
                                </div>
                            </div>

                            <div className="refundRequestformField">
                                <div className="addSupplieridField">
                                    <h5>Quantity:</h5>
                                </div>
                                <div className="refundRequestidInput">
                                    <BasicTextFields label="Quantity"/>
                                </div>
                            </div>

                            <div className="refundRequestformField">
                                <div className="refundRequestidField">
                                    <h5>Reason:</h5>
                                </div>
                                <div className="refundRequestidInput">
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

                            <div className="refundRequestformField">
                                <div className="refundRequestidField">
                                    <h5>Total Price:</h5>
                                </div>
                                <div className="refundRequestidInput">
                                    <BasicTextFields label="Total Price"/>
                                </div>
                            </div>

                            <div className="refundRequestformFieldButtons">
                                <div className="addSupplierButton">
                                    <Link to="/InventoryGeneratedRequest">
                                        <CreateRequestButton>Create Request</CreateRequestButton>
                                    </Link>
                                </div>

                                <div className="refundRequestcancelButton">
                                    <CancelButton onClick={() => props.onClose(false)}>Cancel</CancelButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </CenteredModal>
    );
}

export default InventoryRefundRequest;

