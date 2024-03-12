import './supplier profile.css';
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";


const SupplierProfileButtons = styled(Button)(({ theme }) => ({
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
                    "& .MuiInputBase-root": {
                        height: '2.5em',
                        backgroundColor: '#DBDFFD'
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
            <TextField id="outlined-basic" variant="outlined" margin='normal' />
        </Box>
    );
}

function SupplierProfile() {
    return (
        <div className="SupplierProfileOuter">
            <div className='searchButton'>
                <TextField id="filled-search" label="Search field" type="search" variant="filled" />
            </div>

            <div className="SupplierProfileInner">
                <div className="SupplierProfile">
                    <h3>Perera Holdings (PVT) LTD.</h3>
                    <div className="avatar">
                        <Avatar src="/broken-image.jpg" sx={{ width: 230, height: 230, border: 2, borderRadius: 3 }} />
                    </div>



                </div>

                <div className="SupplierProfileForm">

                <div className="formField">
                        <div className="textField">
                            <h5>Supplier ID</h5>
                        </div>
                        <div className="textInput">
                            <BasicTextFields></BasicTextFields>
                        </div>
                    </div>

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

                    <div className="SupplierProfileButtonField">
                        <div className="SupplierProfileButtons">
                            <SupplierProfileButtons>Update</SupplierProfileButtons>
                        </div>
                    </div>


                </div>

            </div>

        </div>

    )
}

export default SupplierProfile;



