import './SupplierProfile.css'
import * as React from "react";
import Avatar from '@mui/material/Avatar';
import Footer from "../../../layout/footer/footer";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import CustomizedButton from "../../../components/Button/button";
import {useNavigate} from "react-router-dom"; // Update: import useNavigate
import {useEffect, useState} from "react";
import axios from "axios";
import CustomizedAlert from "../../../components/Alert/alert";

function SupplierProfile() {
    const [supplier, setSupplier] = useState({});
    const [openError, setOpenError] = useState(false);
    const navigate = useNavigate(); // Update: use useNavigate

    const handleClickError = () => {
        setOpenError(true);
    };
    const handleCloseError = () => {
        setOpenError(false);
    };

    const handleNavigate = () => {
        navigate('/updateSupplier'); // Update: use navigate function
    };

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const id = parseInt(localStorage.getItem('id'));
        const fetchSupplier = async (id) => {
            try {
                const response = await axios.get(`http://localhost:9000/supplier/getSupplier/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSupplier(response.data);
                console.log(response.data);
            } catch (error) {
                handleClickError();
                console.error('Error fetching supplier:', error);
            }
        };
        fetchSupplier(id);
    }, []);

    return (
        <>
            <SupplierNavbar/>

            <div className="SupplierProfileOuter">
                <div className="SupplierProfileInner">
                    <div className="SupplierProfile">
                        <div className="profileAvatar">
                            <Avatar src="/broken-image.jpg"
                                    sx={{width: 230, height: 230, border: 2, borderRadius: 2, marginTop: '-0.8em'}}
                            />
                            <h3>{supplier.supplierName}</h3>
                            <h4 style={{textAlign:'left'}}>ID:{localStorage.getItem('id')}</h4>
                        </div>
                    </div>

                    <div className="SupplierProfileForm">
                        <form>
                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>Address:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{supplier.supplierAddress}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>Email:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{supplier.supplierEmail}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>Contact No:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{supplier.supplierContact}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>NIC:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{supplier.nic}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>Payment Method:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{supplier.paymentMethod || '-'}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>Payment Details:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{supplier.paymentDetails || '-'}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileButtonField">
                                <div className="SupplierProfileButtons">
                                    <CustomizedButton
                                        onClick={handleNavigate} // Update: onClick to navigate
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
                                            fontWeight: '550',
                                            marginTop: '0.625em',
                                            marginRight:'7.5em',
                                        }}>
                                        Edit Profile
                                    </CustomizedButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer/>

            <CustomizedAlert
                open={openError}
                onClose={handleCloseError}
                severity="error"
                message="Something Went Wrong!"
            />
        </>
    );
}

export default SupplierProfile;
