import './customerProfile.css'
import * as React from "react";
import Avatar from '@mui/material/Avatar';
import CustomerNavbar from "../../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../../layout/footer/footer";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../../components/Button/button";

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
                                        <Link to="/customerprofiledetails">
                                            <CustomizedButton
                                                hoverBackgroundColor="#2d3ed2"
                                                style={{
                                                    color: '#ffffff',
                                                    backgroundColor: '#242F9B',
                                                    border: '1px solid #242F9B',
                                                    width: '4.5em',
                                                    height: '2.25em',
                                                    fontSize: '0.8em',
                                                    fontFamily: 'inter',
                                                    padding: '0.5em 0.625em',
                                                    borderRadius: '0.35em',
                                                    fontWeight: '550',
                                                    marginTop: '0.625em',
                                                    marginRight: '1.5em',
                                                    textTransform: 'none',
                                                    textAlign: 'center',
                                                }}>
                                                View
                                            </CustomizedButton>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='buttonStack'>
                                <Link to="/updateCustomers">
                                    <CustomizedButton
                                        hoverBackgroundColor="#2d3ed2"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#242F9B',
                                            border: '1px solid #242F9B',
                                            width: '9.5em',
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
                                        Update Profile
                                    </CustomizedButton>
                                </Link>

                                <CustomizedButton
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#960505',
                                        width: '9.5em',
                                        height: '2.5em',
                                        fontSize: '0.85em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginTop: '0.625em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    Delete Profile
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

export default CustomerProfile;