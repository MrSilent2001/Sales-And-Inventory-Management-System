import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from "react";
import "./placeOrder.css";
import {styled} from "@mui/material/styles";
import Box from '@mui/material/Box';

function BasicTextFields({id, variant, size, type}) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '17.5em',
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

const PlaceOrderButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#249b54',
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

const AddItemsButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#242F9B',
    '&:hover': {
        backgroundColor: '#2d3ed2' // You can adjust the darken value as needed
    },
    '&.MuiButton-root': {
        width: '7.625em',
        height: '3.75em'
    },
    fontSize: '0.5em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));
function PlaceOrder(props){
    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const placeOrder = () =>{
        console.log("Order Placed Successfully");
        alert("Order Placed Successfully");
    }

    return(
        <CenteredModal>
            <div className="placeOrderOuter">
                <div className="placeOrderModel">
                    <h2>Inventory Order</h2>
                    <div className="placeOrderForm">
                        <div className="formField">
                            <div className="idField">
                                <h5>Order Id:</h5>
                            </div>
                            <div className="idInput">
                                <BasicTextFields id="outlined-required" size="small"/>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Supplier:</h5>
                            </div>
                            <div className="idInput">
                                <Select
                                    className="supplierInput"
                                    id="demo-select-small"
                                    value={category}
                                    onChange={handleChange}
                                    size="small"
                                    style={{width:"17.5em",left:"-.5em"}}
                                >
                                    <MenuItem value="None">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Category01">Primary</MenuItem>
                                    <MenuItem value="Category02">Secondary</MenuItem>
                                </Select>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Delivery Address:</h5>
                            </div>
                            <div className="idInput">
                                <BasicTextFields id="outlined-required" size="small" type="email"/>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Email:</h5>
                            </div>
                            <div className="idInput">
                                <BasicTextFields id="outlined-required" size="small" type="email"/>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Contact Number:</h5>
                            </div>
                            <div className="idInput">
                                <BasicTextFields id="outlined-required" size="small"/>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Items:</h5>
                            </div>
                            <div className="idInput" id="items">
                                <div>
                                    <Select
                                        className="supplierInput"
                                        id="demo-select-small"
                                        value={category}
                                        onChange={handleChange}
                                        size="small"
                                        style={{width:"10.5em",left:"-.5em"}}
                                    >
                                        <MenuItem value="None">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Item01">Item01</MenuItem>
                                        <MenuItem value="Item02">Item02</MenuItem>
                                        <MenuItem value="Item03">Item03</MenuItem>
                                        <MenuItem value="Item04">Item04</MenuItem>
                                    </Select>
                                </div>
                                <div>
                                   <AddItemsButton>Add Items</AddItemsButton>
                                </div>
                            </div>
                        </div>
                        <div className="formField">
                            <div className="idField">

                            </div>
                            <div className="idInput">
                                <BasicTextFields id="outlined-required" size="small"/>
                            </div>
                        </div>


                        <div className="formFieldButtons">
                            <div className="saveButton">
                                <PlaceOrderButton onClick={placeOrder}>Place Order</PlaceOrderButton>
                            </div>

                            <div className="cancelButton">
                                <CancelButton onClick={() => props.onClose(false)}>Cancel</CancelButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CenteredModal>
    )
}

export default PlaceOrder;