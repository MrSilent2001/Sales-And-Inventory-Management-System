import './SupplierProfile.css'
import * as React from "react";
import Avatar from '@mui/material/Avatar';
import Footer from "../../../layout/footer/footer";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import SearchBar from "../../../components/search bar/search bar";
import CustomizedButton from "../../../components/Button/button";


function SupplierProfile() {
    return (
        <>
            <SupplierNavbar/>

            <div className="supplierProfileManagementOuter">
                <div className="searchPanel">
                    <SearchBar/>
                </div>
                <div className="supplierProfileManagementInner">
                    <div className="supplier-profile">

                        <div className="avatar">
                            <h1>Perera Holdings Pvt. Ltd</h1>
                            <Avatar src="/broken-image.jpg" sx={{width: 230, height: 230, border: 2, borderRadius: 3}}/>
                            <h2>Saman Perera</h2>
                        </div>

                        <div className="supplier-profile-details">
                            <div className="supplierProfileManagementDetails">

                                <div className="formField">
                                    <div className="textField">
                                        <h4>Customer ID</h4>
                                    </div>
                                    <div className="inputData">
                                        <h5>CU0004</h5>
                                    </div>
                                </div>

                                <div className="formField">
                                    <div className="textField">
                                        <h4>Address</h4>
                                    </div>
                                    <div className="inputData">
                                        <h5>151/A, Colombo, SriLanka.</h5>
                                    </div>
                                </div>

                                <div className="formField">
                                    <div className="textField">
                                        <h4>E-mail</h4>
                                    </div>
                                    <div className="inputData">
                                        <h5>samanperera@gmail.com</h5>
                                    </div>
                                </div>

                                <div className="formField">
                                    <div className="textField">
                                        <h4>Contact</h4>
                                    </div>
                                    <div className="inputData">
                                        <h5>0771147935</h5>
                                    </div>
                                </div>

                            </div>
                            <div className='buttonStack'>
                                <CustomizedButton
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '11em',
                                        height: '2.5em',
                                        fontSize: '0.95em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginTop: '0.625em',
                                        marginRight: '7.5em',
                                        textTransform: 'none',
                                        textAlign: 'center',
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

export default SupplierProfile;