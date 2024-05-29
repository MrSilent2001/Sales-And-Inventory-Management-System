import './updateCustomers.css';
import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import BasicTextField from "../../../components/Form Inputs/textfield";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import FileUpload from "../../../components/Form Inputs/fileUpload";

function UpdateCustomers() {
    const [customer, setCustomer] = useState({});
    const [navigate, setNavigate] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        customerAddress: '',
        customerContact: '',
        customerEmail: '',
    });

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const handleClickSuccess = () => {
        console.log("Success message should be displayed.");
        setOpenSuccess(true);
    };

    const handleClickError = () => {
        setOpenError(true);
    };

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNavigate = () => {
        setNavigate(true);
    };

    const id = parseInt(localStorage.getItem('id'));
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (customer) {
            setFormData({
                customerName: customer.customerName || '',
                customerAddress: customer.customerAddress || '',
                customerContact: customer.customerContact || '',
                customerEmail: customer.customerEmail || ''
            });
        }
    }, [customer]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9000/customer/update/${id}`, {
                customerName: formData.customerName,
                customerAddress: formData.customerAddress,
                customerContact: formData.customerContact,
                customerEmail: formData.customerEmail,
                profilePicture: formData.profilePicture
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Customer updated successfully');
            handleClickSuccess();
            handleNavigate();

        } catch (error) {
            console.error('Error updating customer:', error);
            handleClickError();
        }
    };

    return (
        <>
            <CustomerNavbar/>
            <div className="UpdateCustomersOuter">
                <div className="UpdateCustomersInner">

                    <div className="UpdateCustomerProfile">
                        <div className="updateAvatar">
                            <Avatar src={formData.profilePicture || "/broken-image.jpg"}
                                    sx={{ width: 230, height: 230, border: 2, borderRadius: 2, marginTop: '-0.8em' }} />
                            <div className='uploadButton'>
                                <FileUpload style={{ width: "15em", top: "2em" }} />
                            </div>
                        </div>

                    </div>

                    <div className="UpdateCustomerForm">

                        <div className="UpdateCustomerFormField">
                            <div className="UpdateCustomerTextField">
                                <h5>Name</h5>
                            </div>
                            <div className="UpdateCustomerTextInput">
                                <BasicTextField
                                    name="name"
                                    style={{ width: '20em' }}
                                    value={formData.customerName}
                                    onChange={(e) => handleChange("customerName", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="UpdateCustomerFormField">
                            <div className="UpdateCustomerTextField">
                                <h5>Address</h5>
                            </div>
                            <div className="UpdateCustomerTextInput">
                                <BasicTextField
                                    name="address"
                                    style={{ width: '20em' }}
                                    value={formData.customerAddress}
                                    onChange={(e) => handleChange("customerAddress", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="UpdateCustomerFormField">
                            <div className="UpdateCustomerTextField">
                                <h5>Contact</h5>
                            </div>
                            <div className="UpdateCustomerTextInput">
                                <BasicTextField
                                    name="contact"
                                    style={{ width: '20em' }}
                                    value={formData.customerContact}
                                    onChange={(e) => handleChange("customerContact", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="UpdateCustomerFormField">
                            <div className="UpdateCustomerTextField">
                                <h5>Email</h5>
                            </div>
                            <div className="UpdateCustomerTextInput">
                                <BasicTextField
                                    name="email"
                                    style={{ width: '20em' }}
                                    value={formData.customerEmail}
                                    onChange={(e) => handleChange("customerEmail", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="UpdateCustomerButtonField">
                            <div className="UpdateCustomerButtons">
                                <CustomizedButton
                                    onClick={handleSubmit}
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '8em',
                                        height: '2.5em',
                                        fontSize: '0.95em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        marginTop: '0.625em',
                                    }}>
                                    Update
                                </CustomizedButton>
                            </div>
                        </div>

                    </div>

                    {navigate && <Navigate to="/customerProfile" />}

                </div>

            </div>

            <Footer/>
        </>
    )
}

export default UpdateCustomers;
