import './SupplierProfile.css'
import * as React from "react";
import Avatar from '@mui/material/Avatar';
import Footer from "../../../layout/footer/footer";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import SearchBar from "../../../components/search bar/search bar";
import CustomizedButton from "../../../components/Button/button";
import suppliers from "../../../data/data.json";
import {Link} from "react-router-dom";

function SupplierProfile() {
    return (
        <>
            <SupplierNavbar/>
            <div className="supplierProfileManagementOuter">
                <div className="supplierSearchPanel">
                    <SearchBar/>
                </div>
                <div className="supplierProfileManagementInner">
                    <div className="supplier-profile">
                        <div className="supplierAvatar">
                            <Avatar src="/broken-image.jpg" sx={{width: 225, height: 225, borderRadius: 3}}/>
                            <h1>Perera Holdings Pvt. Ltd</h1>
                        </div>

                        <div className="supplier-profile-details">
                            <div className="grid-item">Supplier ID</div>
                            <div className="grid-item">{suppliers.suppliers[0].supplierId}</div>

                            <div className="grid-item">Address</div>
                            <div className="grid-item">{suppliers.suppliers[0].address}</div>

                            <div className="grid-item">E-mail</div>
                            <div className="grid-item">{suppliers.suppliers[0].email}</div>

                            <div className="grid-item">Contact No.</div>
                            <div className="grid-item">{suppliers.suppliers[0].contact}</div>

                            <div  style={{marginLeft: '2.5em'}}>
                                    <Link to="/updateSupplier">
                                        <CustomizedButton
                                            hoverBackgroundColor="#2d3ed2"
                                            style={{
                                                color: '#ffffff',
                                                backgroundColor: '#242F9B',
                                                border: '1px solid #242F9B',
                                                width: '9.5em',
                                                height: '2.5em',
                                                fontSize: '0.95em',
                                                fontFamily: 'inter',
                                                padding: '0.5em 0.625em',
                                                borderRadius: '0.35em',
                                                fontWeight: '550',
                                                marginTop: '2em',
                                                marginLeft: '10em',
                                                textTransform: 'none',
                                                textAlign: 'center',
                                            }}>
                                            Edit Details
                                        </CustomizedButton>
                                    </Link>
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