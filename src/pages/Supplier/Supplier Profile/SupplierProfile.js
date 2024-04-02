import './SupplierProfile.css'
import * as React from "react";
import Avatar from '@mui/material/Avatar';
import Footer from "../../../layout/footer/footer";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import SearchBar from "../../../components/search bar/search bar";
import CustomizedButton from "../../../components/Button/button";
import suppliers from "../../../data/data.json";

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

                        <div className="avatar">
                            <h1>Perera Holdings Pvt. Ltd</h1>
                            <Avatar src="/broken-image.jpg" sx={{width: 230, height: 230, border: 2, borderRadius: 3}}/>
                            <h2>Saman Perera</h2>
                        </div>

                        <div className="supplier-profile-details">
                            <div className="supplierProfileManagementDetails">

                                <div className="supplierFormField">
                                    <div className="supplierTextField">
                                        <h3>Supplier ID</h3>
                                    </div>
                                    <div className="supplierInputData">
                                        <h4>{suppliers.suppliers[0].supplierId}</h4>
                                    </div>
                                </div>

                                <div className="supplierFormField">
                                    <div className="supplierTextField">
                                        <h3>Address</h3>
                                    </div>
                                    <div className="supplierInputData">
                                        <h4>{suppliers.suppliers[0].address}</h4>
                                    </div>
                                </div>

                                <div className="supplierFormField">
                                    <div className="supplierTextField">
                                        <h3>E-mail</h3>
                                    </div>
                                    <div className="supplierInputData">
                                        <h4>{suppliers.suppliers[0].email}</h4>
                                    </div>
                                </div>

                                <div className="supplierFormField">
                                    <div className="supplierTextField">
                                        <h3>Contact</h3>
                                    </div>
                                    <div className="supplierInputData">
                                        <h4>{suppliers.suppliers[0].contact}</h4>
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
                                        width: '9.5em',
                                        height: '2.5em',
                                        fontSize: '0.95em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginLeft: '7.5em',
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