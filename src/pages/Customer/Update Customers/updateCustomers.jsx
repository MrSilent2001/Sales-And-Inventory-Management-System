import './updateCustomers.css';
import React, { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import BasicTextField from "../../../components/Form Inputs/textfield";
import { Navigate } from "react-router-dom";
import axios from "axios";
import FileUpload from "../../../components/Form Inputs/fileUpload";
import {uploadFileToBlob} from "../../Supplier/Inventory Dashboard/productBlobStorage";
import CustomizedAlert from "../../../components/Alert/alert";
import BasicTextArea from "../../../components/Form Inputs/textArea";

function UpdateCustomers() {
    const [customer, setCustomer] = useState({});
    const [navigate, setNavigate] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        address: '',
        contactNo: '',
        email: '',
        profilePicture: ''
    });

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [customerImage, setCustomerImage] = useState(null);

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

    const handleFileChange = async (file) => {
        setCustomerImage(file);
        const imageUrl = await uploadFileToBlob(file);
        setFormData(prevState => ({
            ...prevState,
            profilePicture: imageUrl
        }));
    }

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
                console.log(customer)
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
                email: customer.email || '',
                profilePicture: customer.profilePicture || ''
            });
        }
    }, [customer]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = formData.profilePicture;
            if(customerImage){
                imageUrl = await uploadFileToBlob(customerImage);
            }
            await axios.put(`http://localhost:9000/customer/update/${id}`, {
                username: formData.username,
                address: formData.address,
                contactNo: formData.contactNo,
                email: formData.email,
                profilePicture: imageUrl
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(formData);
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
            <div className="UpdateCustomerOuter">
                <div className="UpdateCustomerInner">
                    <div className="UpdateCustomerProfile">
                        <div className="profileAvatar">
                            <Avatar src={formData.profilePicture}
                                    sx={{width: 275, height: 275, border: 2, borderRadius: 50, marginTop: '-0.8em'}}/>

                            <FileUpload
                                style={{marginTop: '1em'}}
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="UpdateCustomerForm">
                        <form onSubmit={handleSubmit}>
                            <div className="UpdateCustomerFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Name:</h5>
                                </div>
                                <div className="UpdateCustomerTextInput">
                                    <BasicTextField
                                        name="name"
                                        style={{width: '20em'}}
                                        value={formData.username}
                                        onChange={(e) => handleChange("username", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="UpdateCustomerFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Address:</h5>
                                </div>
                                <div className="UpdateCustomerTextInput">
                                    <BasicTextField
                                        name="address"
                                        style={{width: '20em'}}
                                        value={formData.address}
                                        onChange={(e) => handleChange("address", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="UpdateCustomerFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Contact No:</h5>
                                </div>
                                <div className="UpdateCustomerTextInput">
                                    <BasicTextField
                                        name={"contact"}
                                        style={{width: '20em'}}
                                        value={formData.contactNo}
                                        onChange={(e) => handleChange("contactNo", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="UpdateCustomerFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Email:</h5>
                                </div>
                                <div className="UpdateCustomerTextInput">
                                    <BasicTextField
                                        name="email"
                                        style={{width: '20em'}}
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            <div className="UpdateCustomerButtonField">
                                <div className="UpdateCustomerButtons">
                                    <CustomizedButton
                                        type="submit"
                                        hoverBackgroundColor="#2d3ed2"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#242F9B',
                                            border: '1px solid #242F9B',
                                            width: '8em',
                                            height: '2.5em',
                                            fontSize: '0.8em',
                                            padding: '0.5em 0.625em'
                                        }}>
                                        Update
                                    </CustomizedButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>

            <CustomizedAlert
                open={openSuccess}
                onClose={handleClickSuccess}
                severity="success"
                message="Profile Updated Successfully!"
            />

            <CustomizedAlert
                open={openError}
                onClose={handleClickError}
                severity="error"
                message="Something Went Wrong!"
            />
        </>
    )
}

export default UpdateCustomers;
