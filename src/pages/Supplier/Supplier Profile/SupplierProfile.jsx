import './SupplierProfile.css'
import * as React from "react";
import Avatar from '@mui/material/Avatar';
import Footer from "../../../layout/footer/footer";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import CustomizedButton from "../../../components/Button/button";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import CustomizedAlert from "../../../components/Alert/alert";

function SupplierProfile() {

    const [supplier, setSupplier] = useState({});
    const [openError, setOpenError] = useState(false);

    const handleClickError = () => {
        setOpenError(true);
    };
    const handleCloseError = () => {
        setOpenError(false);
    };

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const response = await axios.get('http://localhost:9000/supplier/getAllSuppliers');
                setSupplier(response.data);
                console.log(supplier[0])

            } catch (error) {
                handleClickError();
                console.error('Error fetching users:', error);
            }
        };
        fetchSupplier();
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
                            <h3>{localStorage.getItem('username')}</h3>
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
                                    <span>{"-"}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>Email:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{localStorage.getItem('email')}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>Contact No:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{localStorage.getItem('contactNo')}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>NIC:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{'-'}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>Payment Method:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{'-'}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>Payment Details:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{'-'}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileButtonField">
                                <div className="SupplierProfileButtons">
                                    <Link to={{ pathname: "/updateSupplier", state: { supplierData: supplier[0] } }}>
                                    <CustomizedButton
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
                                    </Link>
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
    )
}

export default SupplierProfile;