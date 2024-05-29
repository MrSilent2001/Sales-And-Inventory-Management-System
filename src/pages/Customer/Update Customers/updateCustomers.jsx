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
        username: '',
        address: '',
        contactNo: '',
        email: '',
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
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/customer/findCustomer/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCustomer(prevCustomer => ({
                    ...prevCustomer,
                    ...response.data
                }));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchCustomer();
    }, [id]);

    useEffect(() => {
        if (customer) {
            setFormData({
                username: customer.username || '',
                address: customer.address || '',
                contactNo: customer.contactNo || '',
                email: customer.email || ''
            });
        }
    }, [customer]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9000/customer/update/${id}`, {
                username: formData.username,
                address: formData.address,
                contactNo: formData.contactNo,
                email: formData.email,
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

    if (navigate) {
        return <Navigate to="/customerProfile" />;
    }

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
                                    value={formData.username}
                                    onChange={(e) => handleChange("username", e.target.value)}
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
                                    value={formData.address}
                                    onChange={(e) => handleChange("address", e.target.value)}
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
                                    value={formData.contactNo}
                                    onChange={(e) => handleChange("contactNo", e.target.value)}
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
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
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

                </div>

            </div>

            <Footer/>
        </>
    )
}

export default UpdateCustomers;
