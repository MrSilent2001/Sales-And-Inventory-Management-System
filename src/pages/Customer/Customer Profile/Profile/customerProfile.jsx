// CustomerProfile.js

import './customerProfile.css';
import * as React from "react";
import Avatar from '@mui/material/Avatar';
import CustomerNavbar from "../../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../../layout/footer/footer";
import { Link, useNavigate } from "react-router-dom";
import CustomizedButton from "../../../../components/Button/button";
import { useEffect, useState } from "react";
import axios from "axios";
import DialogBox from "../../../../components/Dialog Box/DialogBox";

function CustomerProfile() {
    const [customer, setCustomer] = useState({});
    const [openError, setOpenError] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken');
    const id = localStorage.getItem('id');

    const handleClickError = () => {
        setOpenError(true);
    };

    const handleCloseError = () => {
        setOpenError(false);
    };

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleAgree = async() => {
        try {
            await axios.delete(`http://localhost:9000/customer/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            handleDialogClose();
            navigate('/');
        } catch (error) {
            handleClickError();
            console.error('Error deleting customer:', error);
        }
    };

    const handleDisagree = () => {
        handleDialogClose();
    };

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/customer/findCustomer/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setCustomer(response.data);
                console.log(response.data);

            } catch (error) {
                handleClickError();
                console.error('Error fetching customer:', error);
            }
        };
        fetchCustomer();
    }, [token, id]);

    const handleDelete = () => {
        handleDialogOpen();
    };

    return (
        <>
            <CustomerNavbar/>

            <div className="customerProfileManagementOuter">
                <div className="customerProfileManagementInner">

                    <div className="customer-profile">

                        <div className="avatar">
                            <Avatar src={customer.profilePicture}
                                    sx={{ width: 230, height: 230, border: 2, borderRadius: 3 }}
                            />
                            <h2 className='profileName'>{customer.customerName}</h2>
                        </div>

                        <div className="customer-profile-details">
                            <div className="customerProfileManagementDetails">

                                <div className="formField">
                                    <div className="textField">
                                        <h4>Customer ID</h4>
                                    </div>
                                    <div className="inputData">
                                        <h5>{customer.id}</h5>
                                    </div>
                                </div>

                                <div className="formField">
                                    <div className="textField">
                                        <h4>Address</h4>
                                    </div>
                                    <div className="inputData">
                                        <h5>{customer.address}</h5>
                                    </div>
                                </div>

                                <div className="formField">
                                    <div className="textField">
                                        <h4>E-mail</h4>
                                    </div>
                                    <div className="inputData">
                                        <h5>{customer.email}</h5>
                                    </div>
                                </div>

                                <div className="formField">
                                    <div className="textField">
                                        <h4>Contact</h4>
                                    </div>
                                    <div className="inputData">
                                        <h5>{customer.contactNo}</h5>
                                    </div>
                                </div>

                                <div className="formField">
                                    <div className="textField">
                                        <h4>My Orders</h4>
                                    </div>
                                    <div className="inputData">
                                        <CustomizedButton
                                            onClick={() => navigate('/previousOrders')}
                                            hoverBackgroundColor="#2d3ed2"
                                            style={{
                                                color: '#ffffff',
                                                backgroundColor: '#242F9B',
                                                border: '1px solid #242F9B',
                                                width: '4.5em',
                                                height: '2.25em',
                                                fontSize: '0.8em',
                                                padding: '0.5em 0.625em',
                                                borderRadius: '0.35em',
                                                fontWeight: '550',
                                                marginTop: '0.625em',
                                                marginRight: '1.5em'
                                            }}>
                                            View
                                        </CustomizedButton>
                                    </div>
                                </div>
                            </div>
                            <div className='buttonStack'>
                                <Link to="/updateProfile" state={{ customer }}>
                                    <CustomizedButton
                                        hoverBackgroundColor="#2d3ed2"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#242F9B',
                                            border: '1px solid #242F9B',
                                            width: '9.5em',
                                            height: '2.5em',
                                            fontSize: '0.85em',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em',
                                            marginTop: '0.625em',
                                            marginRight: '1.5em'
                                        }}>
                                        Update Profile
                                    </CustomizedButton>
                                </Link>

                                <CustomizedButton
                                    onClick={handleDelete}
                                    hoverBackgroundColor="#f11717"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#960505',
                                        width: '9.5em',
                                        height: '2.5em',
                                        fontSize: '0.85em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        marginTop: '0.625em',
                                        marginLeft: '1em',
                                    }}>
                                    Delete Profile
                                </CustomizedButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DialogBox
                open={openDialog}
                onClose={handleDialogClose}
                title="Delete your Profile?"
                content="Are you really want to delete your profile?"
                onAgree={handleAgree}
                onDisagree={handleDisagree}
            />
            <Footer/>
        </>
    );
}

export default CustomerProfile;
