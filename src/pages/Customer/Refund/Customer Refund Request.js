import './Customer Refund Request.css'
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

function SelectItem(){

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return(
        <Box sx={{ minWidth: 80 }}>
            <FormControl fullWidth>
                <InputLabel
                    id="demo-simple-select-label"
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
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
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
                    <MenuItem value={10}>I0001</MenuItem>
                    <MenuItem value={20}>I0002</MenuItem>
                    <MenuItem value={30}>I0003</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

function SelectReason(){

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return(
        <Box sx={{ minWidth: 80 }}>
            <FormControl fullWidth>
                <InputLabel
                    id="demo-simple-select-label"
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
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
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
                    <MenuItem value={10} >Defected Item</MenuItem>
                    <MenuItem value={20}>No as Described</MenuItem>
                    <MenuItem value={30}>Expired</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

function BasicTextFields() {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '25.5em',
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
            <TextField id="outlined-basic" variant="outlined" margin='normal'/>
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
function CustomerRefundRequest(){
    return(
        <div className="customerRefundRequestOuter">
            <div className="customerRefundRequestInner">

                <div className="customerRefundRequestTopic">
                    <h2>Refund Request</h2>
                </div>

                <div className="refundRequestForm">

                    <div className="formField">
                        <div className="textField">
                            <h5>Inventory Id</h5>
                        </div>
                        <div className="textInput">
                            <BasicTextFields></BasicTextFields>
                        </div>
                    </div>

                    <div className="formField">
                        <div className="textField">
                            <h5>Item</h5>
                        </div>
                        <div className="textInput">
                            <SelectItem></SelectItem>
                        </div>
                    </div>

                    <div className="formField">
                        <div className="textField">
                            <h5>Quantity</h5>
                        </div>
                        <div className="textInput">
                            <BasicTextFields></BasicTextFields>
                        </div>
                    </div>

                    <div className="formField">
                        <div className="textField">
                            <h5>Reason</h5>
                        </div>
                        <div className="textInput">
                            <SelectReason></SelectReason>
                        </div>
                    </div>

                    <div className="formField">
                        <div className="textField">
                            <h5>Total Price</h5>
                        </div>
                        <div className="textInput">
                            <BasicTextFields></BasicTextFields>
                        </div>
                    </div>

                    <div className="refundButtonField">
                        <div className="refundRequestButtons">
                            <RefundRequestButtons>Cancel Request</RefundRequestButtons>
                            <RefundRequestButtons>Create Request</RefundRequestButtons>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CustomerRefundRequest;