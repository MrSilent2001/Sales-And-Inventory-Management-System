import './view.css';
import * as React from "react";
import Avatar from '@mui/material/Avatar';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import SearchBar from "../../../components/search bar/search bar";
import { Link } from 'react-router-dom';


function BasicTextFields() {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': {
                    m: 1,
                    width: '20em',
                    "& .MuiInputBase-root": {
                        height: '2.5em',
                        backgroundColor: '#DBDFFD'
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: '0.5em',
                        textAlign: 'center',
                        marginLeft: "3em",
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
                <SearchBar/>
                </div>

                <div className="ViewOrdersInner">
                    <div className="customerProfile">

                        <h3 className='topicName'>W A P Saman Perera</h3>

                        <div className="avatar">
                            <Avatar src="/broken-image.jpg" sx={{ 
                                width: 250,
                                 height: 250,
                                  border: 2,
                                   borderRadius: 3 ,
                                   marginLeft:24,
                                   marginBottom:7,
                            
                            
                            }} />
                        </div>



                    </div>

                    <div className="ViewOrdersForm">

                        <div className="viewFormField">
                            <div className="viewTextField">
                                <h5>Customer ID</h5>
                            </div>
                            <div className="viewInputField">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="viewFormField">
                            <div className="viewTextField">
                                <h5>Name</h5>
                            </div>
                            <div className="viewInputField">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="viewFormField">
                            <div className="viewTextField">
                                <h5>Address</h5>
                            </div>
                            <div className="viewInputField">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="viewFormField">
                            <div className="viewTextField">
                                <h5>Contact</h5>
                            </div>
                            <div className="viewInputField">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="viewFormField">
                            <div className="viewTextField">
                                <h5>Email</h5>
                            </div>
                            <div className="viewInputField">
                                <BasicTextFields></BasicTextFields>
                            </div>
                        </div>

                        <div className="ViewOrdersButtonField">
                            <div className="ViewOrdersButtons">
                                <Link to="/AdminOrderHistory"><CustomizedButton
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
                                        marginLeft:'12em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    View Orders
                                </CustomizedButton>
                                </Link>
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