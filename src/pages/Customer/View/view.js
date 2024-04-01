import './view.css';
import * as React from "react";
import Avatar from '@mui/material/Avatar';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";

function SearchBar(){
    return(
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '17.5em',
                    "& .MuiInputBase-root":{
                        height: '1.95em',
                        borderRadius: '1.5em',
                        /*backgroundColor: 'white'*/
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: '0.6em',
                        textAlign: 'center',
                    },
                },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="standard-basic" label="Search Here" variant="outlined" size="small"/>
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

function View() {
    return (
        <>
            <CustomerNavbar/>
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
                                <CustomizedButton
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '11em',
                                        height: '2.5em',
                                        fontSize: '0.85em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginTop: '0.625em',
                                        marginRight: '1.5em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    View Orders
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

export default View;