import './Customer Refund Request.css'
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Footer from "../../../../layout/footer/footer";
import SalesNavbar from "../../../../layout/navbar/Sales navbar/sales navbar";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../../components/Button/button";
import CustomerNavbar from "../../../../layout/navbar/Customer navbar/Customer navbar";

function SelectItem() {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box sx={{minWidth: 80}}>
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

function SelectReason() {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box sx={{minWidth: 80}}>
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
                    <MenuItem value={10}>Defected Item</MenuItem>
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
            <TextField id="outlined-basic" variant="outlined" margin='normal'/>
        </Box>
    );
}

function CustomerRefundRequest() {
    return (
        <>
            <CustomerNavbar></CustomerNavbar>
            <div className="customerRefundRequestOuter">
                <div className="customerRefundRequestInner">

                    <div className="customerRefundRequestTopic">
                        <h2>Refund Request</h2>
                    </div>

                    <div className="customerRefundRequestForm">

                        <div className="customerFormField">
                            <div className="customerTextField">
                                <h5>Contact</h5>
                            </div>
                            <div className="customerTextField">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="customerFormField">
                            <div className="customerTextField">
                                <h5>Item</h5>
                            </div>
                            <div className="customerTextField">
                                <SelectItem></SelectItem>
                            </div>
                        </div>

                        <div className="customerFormField">
                            <div className="customerTextField">
                                <h5>Quantity</h5>
                            </div>
                            <div className="customerTextField">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="customerFormField">
                            <div className="customerTextField">
                                <h5>Reason</h5>
                            </div>
                            <div className="customerTextField">
                                <SelectReason></SelectReason>
                            </div>
                        </div>

                        <div className="customerFormField">
                            <div className="customerTextField">
                                <h5>Total Price</h5>
                            </div>
                            <div className="customerTextField">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="customerRefundButtonField">
                            <div className="customerRefundRequestButtons">
                                <Link to="/generatedrefund">
                                    <CustomizedButton
                                        hoverBackgroundColor="#2d3ed2"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#242F9B',
                                            border: '1px solid #242F9B',
                                            width: '10em',
                                            height: '2.85em',
                                            fontSize: '0.75em',
                                            fontFamily: 'inter',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em',
                                            fontWeight: '500',
                                            marginTop: '0.625em',
                                            textTransform: 'none',
                                            textAlign: 'center',
                                        }}>
                                        Create Request
                                    </CustomizedButton>
                                </Link>

                                <CustomizedButton
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#ff0000',
                                        width: '10em',
                                        height: '2.85em',
                                        fontSize: '0.75em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '500',
                                        marginTop: '0.625em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    Cancel Request
                                </CustomizedButton>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default CustomerRefundRequest;