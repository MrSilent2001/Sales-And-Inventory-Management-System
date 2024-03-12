import './view orders.css';
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";


const ViewOrdersButtons = styled(Button)(({ theme }) => ({
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
    padding: '1.75em 0.625em',
    marginRight:'5em'

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

function ViewOrders() {
    return (

        /* <div className="container">
             <div className='searchButton'>
             <TextField id="filled-search" label="Search field" type="search" variant="filled" />
             </div> */
        <div className="ViewOrdersOuter">
            <div className='searchButton'>
                <TextField id="filled-search" label="Search field" type="search" variant="filled" />
            </div>

            <div className="ViewOrdersInner">
                <div className="customerProfile">
                    
                    <h3>W A P Saman Perera</h3>
                    
                    <div className="avatar">
                        <Avatar src="/broken-image.jpg" sx={{ width: 230, height: 230, border: 2, borderRadius: 3 }} />
                    </div>



                </div>

                <div className="ViewOrdersForm">

                <div className="formField">
                        <div className="textField">
                            <h5>Customer ID</h5>
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

                    <div className="ViewOrdersButtonField">
                        <div className="ViewOrdersButtons">
                            <ViewOrdersButtons>View Orders</ViewOrdersButtons>
                        </div>
                    </div>









                </div>

            </div>

        </div>
        //   </div> 

    )
}

export default ViewOrders;



