import './updateSupplier.css'
import * as React from "react";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import SupplierNavbar from "../../../layout/navbar/Supplier Navbar/Supplier Navbar";
import BasicTextField from "../../../components/Form Inputs/textfield";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function UpdateSupplier() {
    return (
        <>
            <SupplierNavbar/>
            <div className="UpdateSupplierOuter">
                <div className="UpdateSupplierInner">

                    <div className="UpdateSupplierProfile">
                        <h3 className='UpdateTopicName'>W A P Saman Perera</h3>
                        <div className="updateAvatar">
                            <Avatar src="/broken-image.jpg"
                                    sx={{width: 230, height: 230, border: 2, borderRadius: 2, marginTop: '-0.8em'}}/>
                            <div className='uploadButton'>
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} style={{width:"15em",top:"2em"}}>
                                    Upload Image
                                    <VisuallyHiddenInput type="file" />
                                </Button>
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
                                    <BasicTextField/>
                                </div>
                            </div>

                            <div className="UpdateSupplierFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Address</h5>
                                </div>
                                <div className="UpdateSupplierTextInput">
                                    <BasicTextField/>
                                </div>
                            </div>

                            <div className="UpdateSupplierFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Contact</h5>
                                </div>
                                <div className="UpdateSupplierTextInput">
                                    <BasicTextField/>
                                </div>
                            </div>

                            <div className="UpdateSupplierFormField">
                                <div className="UpdateCustomerTextField">
                                    <h5>Email</h5>
                                </div>
                                <div className="UpdateSupplierTextInput">
                                    <BasicTextField/>
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
                                            fontSize: '0.95em',
                                            fontFamily: 'inter',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em',
                                            fontWeight: '550',
                                            marginTop: '0.625em',
                                            marginRight:'5em',
                                            textTransform: 'none',
                                            textAlign: 'center',
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