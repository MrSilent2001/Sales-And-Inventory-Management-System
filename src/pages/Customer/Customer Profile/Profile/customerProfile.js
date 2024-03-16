import './customerProfile.css'
import * as React from "react";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import CustomerNavbar from "../../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../../layout/footer/footer";

const DeleteButtons = styled(Button)(({theme}) => ({
    color: theme.palette.getContrastText('#FF0800'),
    backgroundColor: '#FF0800',
    '&:hover': {
        backgroundColor: '#CA3433'
    },
    '&.MuiButton-root': {
        width: '10em',
        height: '1.5em'
    },
    fontSize: '0.75em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em',
    marginRight: '2em'
}));

const CustomerProfileManagementButtons = styled(Button)(({theme}) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#242F9B',
    '&:hover': {
        backgroundColor: '#2d3ed2'
    },
    '&.MuiButton-root': {
        width: '10em',
        height: '1.5em'
    },
    fontSize: '0.75em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em',
    marginRight: '-2em'
}));

function CustomerProfile() {
    return (
        <>
            <CustomerNavbar/>

            <div className="customerProfileManagementOuter">
                <div className="customerProfileManagementInner">

                    <div className="customer-profile">

                        <div className="avatar">
                            <Avatar src="/broken-image.jpg" sx={{width: 230, height: 230, border: 2, borderRadius: 3}}/>
                            <h2>Saman Perera</h2>
                        </div>

                        <div className="customer-profile-details">
                            <div className="customerProfileManagementDetails">

                                <div className="formField">
                                    <div className="textField">
                                        <h4>Customer ID</h4>
                                    </div>
                                    <div className="inputData">
                                        <h5>CU0004</h5>
                                    </div>
                                </div>

                                <div className="formField">
                                    <div className="textField">
                                        <h4>Address</h4>
                                    </div>
                                    <div className="inputData">
                                        <h5>151/A, Colombo, SriLanka.</h5>
                                    </div>
                                </div>

                                <div className="formField">
                                    <div className="textField">
                                        <h4>E-mail</h4>
                                    </div>
                                    <div className="inputData">
                                        <h5>samanperera@gmail.com</h5>
                                    </div>
                                </div>

                                <div className="formField">
                                    <div className="textField">
                                        <h4>Contact</h4>
                                    </div>
                                    <div className="inputData">
                                        <h5>0771147935</h5>
                                    </div>
                                </div>

                                <div className="formField">
                                    <div className="textField">
                                        <h4>Previous Orders</h4>
                                    </div>
                                    <div className="inputData">
                                        <CustomerProfileManagementButtons>View Orders</CustomerProfileManagementButtons>
                                    </div>
                                </div>
                            </div>
                            <div className='buttonStack'>
                                <DeleteButtons>Delete Profile</DeleteButtons>
                                <CustomerProfileManagementButtons>Update Profile</CustomerProfileManagementButtons>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <Footer/>
        </>
    )
}

export default CustomerProfile;