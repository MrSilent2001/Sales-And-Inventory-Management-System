import './updateSupplier.css';
import * as React from "react";
import Avatar from '@mui/material/Avatar';
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import BasicTextField from "../../../components/Form Inputs/textfield";
import FileUpload from "../../../components/Form Inputs/fileUpload";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {uploadFileToBlob} from "../Inventory Dashboard/productBlobStorage";
import BasicTextArea from "../../../components/Form Inputs/textArea";

function UpdateSupplier(props) {
    const [supplier, setSupplier] = useState({});
    const [navigate, setNavigate] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        address: '',
        contactNo: '',
        email: '',
        paymentMethod: '',
        paymentDetails: '',
        profilePicture: ''
    });

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [supplierImage, setSupplierImage] = useState(null);

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

    const handleFileChange = async (file) => {
        setSupplierImage(file);
        const imageUrl = await uploadFileToBlob(file);
        setFormData(prevState => ({
            ...prevState,
            profilePicture: imageUrl
        }));
    }

    const id = parseInt(localStorage.getItem('id'));
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/supplier/getSupplier/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSupplier(prevSupplier => ({
                    ...prevSupplier,
                    ...response.data
                }));
                console.log(supplier);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchSupplier();
    }, [id]);

    useEffect(() => {
        setFormData({
            username: supplier.username || '',
            address: supplier.address || '',
            contactNo: supplier.contactNo || '',
            email: supplier.email || '',
            paymentMethod: supplier.paymentMethod || '',
            paymentDetails: supplier.paymentDetails || '',
            profilePicture: supplier.profilePicture || ''
        });
    }, [supplier]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = formData.profilePicture;
            if(supplierImage){
                imageUrl = await uploadFileToBlob(supplierImage);

            }
            await axios.put(`http://localhost:9000/supplier/update/${id}`, {
                username: formData.username,
                email: formData.email,
                address: formData.address,
                contactNo: formData.contactNo,
                paymentMethod: formData.paymentMethod,
                paymentDetails: formData.paymentDetails,
                profilePicture: imageUrl
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Supplier added successfully');
            handleClickSuccess();
            setNavigate(true);

        } catch (error) {
            console.error('Error adding user:', error);
            handleClickError();
        }
    };

    if (navigate) {
        return <Navigate to="/supplierProfile" />;
    }

    return (
        <>
            <SupplierNavbar />
            <div className="UpdateSupplierOuter">
                <div className="UpdateSupplierInner">
                    <div className="UpdateSupplierProfile">
                        <div className="profileAvatar">
                            <Avatar src={formData.profilePicture}
                                    sx={{ width: 275, height: 275, border: 2, borderRadius: 50, marginTop: '-0.8em' }} />

                            <FileUpload
                                style={{marginTop: '1em'}}
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className="UpdateSupplierForm">
                        <form onSubmit={handleSubmit}>
                            <div className="UpdateSupplierFormField">
                                <div className="UpdateSupplierTextField">
                                    <h5>Name</h5>
                                </div>
                                <div className="UpdateSupplierTextInput">
                                    <BasicTextField
                                        name="name"
                                        style={{ width: '20em' }}
                                        value={formData.username}
                                        onChange={(e) => handleChange("username", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="UpdateSupplierFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Address</h5>
                                </div>
                                <div className="UpdateSupplierTextInput">
                                    <BasicTextField
                                        name="address"
                                        style={{ width: '20em' }}
                                        value={formData.address}
                                        onChange={(e) => handleChange("address", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="UpdateSupplierFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Contact</h5>
                                </div>
                                <div className="UpdateSupplierTextInput">
                                    <BasicTextField
                                        name={"contact"}
                                        style={{ width: '20em' }}
                                        value={formData.contactNo}
                                        onChange={(e) => handleChange("contactNo", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="UpdateSupplierFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Email</h5>
                                </div>
                                <div className="UpdateSupplierTextInput">
                                    <BasicTextField
                                        name="email"
                                        style={{ width: '20em' }}
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="UpdateSupplierFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Payment Method</h5>
                                </div>
                                <div className="UpdateSupplierTextInput">
                                    <BasicTextField
                                        name="paymentMethod"
                                        style={{ width: '20em' }}
                                        value={formData.paymentMethod}
                                        onChange={(e) => handleChange("paymentMethod", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="UpdateSupplierFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Payment Details</h5>
                                </div>
                                <div className="UpdateSupplierTextInput">
                                    <BasicTextArea
                                        rows={3}
                                        name="paymentDetails"
                                        style={{ width: '20em', marginTop:'3em' }}
                                        value={formData.paymentDetails}
                                        onChange={(e) => handleChange("paymentDetails", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="UpdateSupplierButtonField">
                                <div className="UpdateSupplierButtons">
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
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em'
                                        }}>
                                        Update
                                    </CustomizedButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UpdateSupplier;
