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

    const handleNavigate = () => {
        navigate('/updateProfile');
    };

    return (
        <>
            <CustomerNavbar/>
            <div className="CustomerProfileOuter">
                <div className="CustomerProfileInner">
                    <div className="CustomerProfile">
                        <div className="profileAvatar">
                            <Avatar src={customer.profilePicture}
                                    sx={{width: 275, height: 275, border: 2, borderRadius: 50, marginTop: '-0.8em'}}
                            />
                            <h2>{customer.username}</h2>
                        </div>
                    </div>

                    <div className="CustomerProfileForm">
                        <form>
                            <div className="CustomerProfileFormField" style={{marginTop: '2em'}}>
                                <div className="CustomerProfileField">
                                    <span className="title">Customer Id:</span>
                                </div>
                                <div className="CustomerProfileInput">
                                    <span>{customer.id}</span>
                                </div>
                            </div>

                            <div className="CustomerProfileFormField">
                                <div className="CustomerProfileField">
                                    <span className="title">Address:</span>
                                </div>
                                <div className="CustomerProfileInput">
                                    <span>{customer.address}</span>
                                </div>
                            </div>

                            <div className="CustomerProfileFormField">
                                <div className="CustomerProfileField">
                                    <span className="title">E-mail:</span>
                                </div>
                                <div className="CustomerProfileInput">
                                    <span>{customer.email}</span>
                                </div>
                            </div>

                            <div className="CustomerProfileFormField">
                                <div className="CustomerProfileField">
                                    <span className="title">Contact No:</span>
                                </div>
                                <div className="CustomerProfileInput">
                                    <span>{customer.contactNo}</span>
                                </div>
                            </div>
                            <div className="CustomerProfileFormField">
                                <div className="CustomerProfileField">
                                    <span className="title">My Orders:</span>
                                </div>
                                <div className="CustomerProfileInput">
                                    <CustomizedButton
                                        onClick={() => navigate('/previousOrders')}
                                        hoverBackgroundColor="#0aaf0b"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#0a810a',
                                            width: '8.75em',
                                            height: '2.5em',
                                            fontSize: '0.8em',
                                            padding: '0.5em 0.625em',
                                            marginRight: '6em',
                                            marginLeft:'-5em'
                                        }}>
                                        View
                                    </CustomizedButton>
                                </div>
                            </div>

                            <div className="CustomerProfileButtonField">
                                <div className="CustomerProfileButtons">
                                    <CustomizedButton
                                        onClick={handleNavigate}
                                        hoverBackgroundColor="#2d3ed2"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#242F9B',
                                            border: '1px solid #242F9B',
                                            width: '9em',
                                            height: '2.5em',
                                            fontSize: '0.8em',
                                            padding: '0.5em 0.625em',
                                            marginTop: '2em',
                                            marginRight: '0em',
                                           
                                        }}>
                                        Edit Profile
                                    </CustomizedButton>

                                    <CustomizedButton
                                        onClick={handleDelete}
                                        hoverBackgroundColor="#f11717"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#960505',
                                            width: '9em',
                                            height: '2.5em',
                                            fontSize: '0.8em',
                                            padding: '0.5em 0.625em',
                                            marginLeft: '2.5em',
                                            marginTop: '2.1em',
                                            marginRight:'-5em',
                                        }}>
                                        Delete Profile
                                    </CustomizedButton>
                                </div>
                            </div>
                        </form>
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
