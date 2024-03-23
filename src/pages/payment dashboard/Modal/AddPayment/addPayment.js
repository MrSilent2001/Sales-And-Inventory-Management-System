import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './addPayment.css'
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
function BasicTextFields() {
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
            <TextField id="outlined-basic" variant="outlined" margin='normal'/>
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

const SaveItemButton = styled(Button)(({ theme }) => ({
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
function AddPayment(props){
    
    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    return(
        <CenteredModal>
            <div className="addPaymentOuter">
                <div className="addPaymentModel">
                    <h2>Add Payment</h2>
                    <div className="addPaymentForm">
                        <div className="addPaymentformField">
                            <div className="addPaymentidField">
                                <h5>Supplier:</h5>
                            </div>
                            <div className="addPaymentidInput">
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
                                    <MenuItem value="Category01">Category 01</MenuItem>
                                    <MenuItem value="Category02">Category 02</MenuItem>
                                    <MenuItem value="Category03">Category 03</MenuItem>
                                </Select>
                            </div>
                        </div>

                        <div className="addPaymentformField">
                            <div className="addPaymentidField">
                                <h5>Item:</h5>
                            </div>
                            <div className="addPaymentidInput">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="addPaymentformField">
                            <div className="addPaymentidField">
                                <h5>Quantity:</h5>
                            </div>
                            <div className="addPaymentidInput">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="addPaymentformField">
                            <div className="addPaymentidField">
                                <h5>Address:</h5>
                            </div>
                            <div className="addPaymentidInput">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="addPaymentformField">
                            <div className="addPaymentidField">
                                <h5>Total Price:</h5>
                            </div>
                            <div className="addPaymentidInput">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>


                        <div className="addPaymentformFieldButtons">
                            <div className="addPaymentButton">
                                <SaveItemButton>Add Payment</SaveItemButton>
                            </div>
                            <div className="addPaymentcancelButton">
                                <CancelButton onClick={() => props.onClose(false)}>Cancel</CancelButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CenteredModal>
    )
}

export default AddPayment;