import './updateSupplier.css'
import * as React from "react";
import Avatar from '@mui/material/Avatar';
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import BasicTextField from "../../../components/Form Inputs/textfield";
import FileUpload from "../../../components/Form Inputs/fileUpload";

function UpdateSupplier() {
    return (
        <>
            <SupplierNavbar/>
            <div className="UpdateSupplierOuter">
                <div className="UpdateSupplierInner">

                    <div className="UpdateSupplierProfile">
                        <div className="updateAvatar">
                            <Avatar src="/broken-image.jpg"
                                    sx={{width: 230, height: 230, border: 2, borderRadius: 2, marginTop: '-0.8em'}}/>
                            <div className='uploadButton'>
                                <FileUpload style={{width:"15em",top:"2em"}}/>
                            </div>
                        </div>
                    </div>

                    <div className="UpdateSupplierForm">
                        <form>
                            <div className="UpdateSupplierFormField">
                                <div className="UpdateSupplierTextField">
                                    <h5>Name</h5>
                                </div>
                                <div className="UpdateSupplierTextInput">
                                    <BasicTextField style={{width:'20em'}}/>
                                </div>
                            </div>

                            <div className="UpdateSupplierFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Address</h5>
                                </div>
                                <div className="UpdateSupplierTextInput">
                                    <BasicTextField style={{width:'20em'}}/>
                                </div>
                            </div>

                            <div className="UpdateSupplierFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Contact</h5>
                                </div>
                                <div className="UpdateSupplierTextInput">
                                    <BasicTextField style={{width:'20em'}}/>
                                </div>
                            </div>

                            <div className="UpdateSupplierFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Email</h5>
                                </div>
                                <div className="UpdateSupplierTextInput">
                                    <BasicTextField style={{width:'20em'}}/>
                                </div>
                            </div>

                            <div className="UpdateSupplierFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Payment Method</h5>
                                </div>
                                <div className="UpdateSupplierTextInput">
                                    <BasicTextField style={{width:'20em'}}/>
                                </div>
                            </div>

                            <div className="UpdateSupplierFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Payment Details</h5>
                                </div>
                                <div className="UpdateSupplierTextInput">
                                    <BasicTextField style={{width:'20em'}}/>
                                </div>
                            </div>

                            <div className="UpdateSupplierButtonField">
                                <div className="UpdateSupplierButtons">
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
                                        Update
                                    </CustomizedButton>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

            </div>

            <Footer/>
        </>
    )
}

export default UpdateSupplier;