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

function UpdateSupplier(props) {
    const [supplier, setSupplier] = useState({});
    const [navigate, setNavigate] = useState(false);
    const [formData, setFormData] = useState({
        supplierName: '',
        supplierAddress: '',
        supplierContact: '',
        supplierEmail: '',
        paymentMethod: '',
        paymentDetails: ''
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


    if (navigate) {
        return <Navigate to="/supplierProfile" />;
    }

    const id = parseInt(localStorage.getItem('id'));
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/supplier/getSupplier/${id}` , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSupplier(prevSupplier => ({
                    ...prevSupplier,
                    ...response.data
                }));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchSupplier();
    }, [id]);

    const handleNavigate = () => {
        setNavigate(true);
    };

    useEffect(() => {
        setFormData({
            supplierName: supplier.supplierName || '',
            supplierAddress: supplier.supplierAddress || '',
            supplierContact: supplier.supplierContact || '',
            supplierEmail: supplier.supplierEmail || '',
            paymentMethod: supplier.paymentMethod || '',
            paymentDetails: supplier.paymentDetails || ''
        });
    }, [supplier]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:9000/supplier/update/${id}`, {
                supplierName: formData.supplierName,
                supplierEmail: formData.supplierEmail,
                supplierAddress: formData.supplierAddress,
                supplierContact: formData.supplierContact,
                paymentMethod: formData.paymentMethod,
                paymentDetails: formData.paymentDetails,
                profilePicture: formData.profilePicture
            } , {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Supplier added successfully');
            handleClickSuccess();
            handleNavigate();

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
                        <div className="updateAvatar">
                            <Avatar src={formData.profilePicture || "/broken-image.jpg"}
                                    sx={{ width: 230, height: 230, border: 2, borderRadius: 2, marginTop: '-0.8em' }} />
                            <div className='uploadButton'>
                                <FileUpload style={{ width: "15em", top: "2em" }} />
                            </div>
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
                                        value={formData.supplierName}
                                        onChange={(e) => handleChange("supplierName", e.target.value)}
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
                                        value={formData.supplierAddress}
                                        onChange={(e) => handleChange("supplierAddress", e.target.value)}
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
                                        value={formData.supplierContact}
                                        onChange={(e) => handleChange("supplierContact", e.target.value)}
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
                                        value={formData.supplierEmail}
                                        onChange={(e) => handleChange("supplierEmail", e.target.value)}
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
                                    <BasicTextField
                                        name="paymentDetails"
                                        style={{ width: '20em' }}
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
                                            borderRadius: '0.35em',
                                            marginTop: '0.625em',
                                            marginRight: '7.5em',
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
