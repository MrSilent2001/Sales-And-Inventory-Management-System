import './update customers.css'
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";


const UploadButtons = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#bec0bf'),
    backgroundColor: '#bec0bf',
    '&:hover': {
        backgroundColor: '#2d3ed2'
    },
    '&.MuiButton-root': {
        width: '17.225em',
        height: '3.5em'
    },
    fontSize: '0.95em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));




const UpdateCustomerButtons = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#242F9B',
    '&:hover': {
        backgroundColor: '#2d3ed2'
    },
    '&.MuiButton-root': {
        width: '13.625em',
        height: '3.5em'
    },
    fontSize: '0.75em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));

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


function UpdateCustomers() {
    return (
        <div className="UpdateCustomersOuter">
            <div className="UpdateCustomersInner">

                <div className="customerProfile">
                    <h3>W A P Saman Perera</h3>
                <div className="avatar">
                    <Avatar src="/broken-image.jpg" sx={{ width: 230, height: 230, border: 2, borderRadius: 3 }} />
                 <div className='uploadButton'>
                 <UploadButtons>...Upload...</UploadButtons>
                 </div>
                 </div>


                    
                </div>

                <div className="UpdateCustomerForm">

                    <div className="formField">
                        <div className="textField">
                            <h5>Name</h5>
                        </div>
                        <div className="textInput">
                            <BasicTextFields></BasicTextFields>
                        </div>
                    </div>

                    <div className="formField">
                        <div className="textField">
                            <h5>Address</h5>
                        </div>
                        <div className="textInput">
                            <BasicTextFields></BasicTextFields>
                        </div>
                    </div>

                    <div className="formField">
                        <div className="textField">
                            <h5>Contact</h5>
                        </div>
                        <div className="textInput">
                            <BasicTextFields></BasicTextFields>
                        </div>
                    </div>

                    <div className="formField">
                        <div className="textField">
                            <h5>Email</h5>
                        </div>
                        <div className="textInput">
                            <BasicTextFields></BasicTextFields>
                        </div>
                    </div>

                    <div className="UpdateCustomerButtonField">
                        <div className="UpdateCustomerButtons">
                            <UpdateCustomerButtons>Update</UpdateCustomerButtons>
                        </div>
                    </div>



                </div>

            </div>

        </div>

    )
}

export default UpdateCustomers;