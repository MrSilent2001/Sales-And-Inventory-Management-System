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
import FileUpload from "../../../components/Form Inputs/fileUpload";
import BasicTextField from "../../../components/Form Inputs/textfield";

function SupplierProfile() {

    const [supplier, setSupplier] = useState('');
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
            {/*<div className="supplierProfileOuter">*/}
            {/*    <div className="supplierProfileInner">*/}
            {/*        <div className="supplier-profile">*/}
            {/*            <div className="supplierAvatar">*/}
            {/*                <Avatar src={supplier[0].profilePicture} sx={{width: 175, height: 175, borderRadius: 3}}/>*/}
            {/*                <h2>{supplier[0].supplierName}</h2>*/}
            {/*                <h3>Supplier Id: {supplier[0].id}</h3>*/}
            {/*            </div>*/}
            {/*        </div>*/}


            {/*        <div className="supplier-profile-details">*/}

            {/*            <div className="grid-item">Address</div>*/}
            {/*            <div className="grid-item">{supplier[0].supplierAddress}</div>*/}

            {/*            <div className="grid-item">E-mail</div>*/}
            {/*            <div className="grid-item">{supplier[0].supplierEmail}</div>*/}

            {/*            <div className="grid-item">NIC</div>*/}
            {/*            <div className="grid-item">{supplier[0].nic}</div>*/}

            {/*            <div className="grid-item">Contact No.</div>*/}
            {/*            <div className="grid-item">{supplier[0].supplierContact}</div>*/}

            {/*            <div className="grid-item">Payment Method:</div>*/}
            {/*            <div className="grid-item">{supplier[0].paymentMethod}</div>*/}

            {/*            <div className="grid-item">Payment Details</div>*/}
            {/*            <div className="grid-item">{supplier[0].paymentDetails}</div>*/}

            {/*            <div className="profile-Btn" style={{float: 'right'}}>*/}
            {/*                <Link to="/updateSupplier">*/}
            {/*                    <CustomizedButton*/}
            {/*                        hoverBackgroundColor="#2d3ed2"*/}
            {/*                        style={{*/}
            {/*                            color: '#ffffff',*/}
            {/*                            backgroundColor: '#242F9B',*/}
            {/*                            border: '1px solid #242F9B',*/}
            {/*                            width: '9.5em',*/}
            {/*                            height: '2.5em',*/}
            {/*                            fontSize: '0.95em',*/}
            {/*                            padding: '0.5em 0.625em',*/}
            {/*                            borderRadius: '0.35em',*/}
            {/*                            fontWeight: '550',*/}
            {/*                            marginTop: '2em',*/}
            {/*                            marginLeft: '25em'*/}
            {/*                        }}>*/}
            {/*                        Edit Details*/}
            {/*                    </CustomizedButton>*/}
            {/*                </Link>*/}
            {/*            </div>*/}


            {/*        </div>*/}
            {/*    </div>*/}


            {/*</div>*/}
            <div className="SupplierProfileOuter">
                <div className="SupplierProfileInner">

                    <div className="SupplierProfile">
                        <div className="profileAvatar">
                            <Avatar src="/broken-image.jpg"
                                    sx={{width: 230, height: 230, border: 2, borderRadius: 2, marginTop: '-0.8em'}}
                            />
                            <h3>{supplier[0].supplierName}</h3>
                            <h4 style={{textAlign:'left'}}>ID:{supplier[0].id}</h4>

                        </div>
                    </div>

                    <div className="SupplierProfileForm">
                        <form>
                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>Address:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{supplier[0].supplierAddress}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>Email:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{supplier[0].supplierEmail}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>Contact No:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{supplier[0].supplierContact}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>NIC:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{supplier[0].nic}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>Payment Method:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{supplier[0].paymentMethod}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileFormField">
                                <div className="SupplierProfileField">
                                    <h5>Payment Details:</h5>
                                </div>
                                <div className="SupplierProfileInput">
                                    <span>{supplier[0].paymentDetails}</span>
                                </div>
                            </div>

                            <div className="SupplierProfileButtonField">
                                <div className="SupplierProfileButtons">
                                    <Link to="/updateSupplier">
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