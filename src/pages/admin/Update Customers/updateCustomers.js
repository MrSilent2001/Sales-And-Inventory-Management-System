import './updateCustomers.css'
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Avatar from '@mui/material/Avatar';
import CustomerNavbar from "../../../layout/navbar/Customer navbar/Customer navbar";
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BasicTextField from "../../../components/Form Inputs/textfield";

const Notify=() =>  toast("Profile is SUCCESSFULLY UPDATED!");


const UploadButtons = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#bec0bf'),
    backgroundColor: '#bec0bf',
    '&:hover': {
        backgroundColor: '#676767'
    },
    '&.MuiButton-root': {
        width: '16em',
        height: '2em',
    },
    fontSize: '0.95em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em',
    marginTop:'2.5em',
}));



function UpdateCustomers() {
    return (
        <>
            <CustomerNavbar/>
            <div className="UpdateCustomersOuter">
                <div className="UpdateCustomersInner">

                    <div className="UpdateCustomerProfile">
                        <h3 className='UpdateTopicName'>W A P Saman Perera</h3>
                        <div className="updateAvatar">
                            <Avatar src="/broken-image.jpg" sx={{ width: 230, height: 230, border: 2, borderRadius: 2,marginTop:'-0.8em' }} />
                            <div className='uploadButton'>
                                <UploadButtons>...Upload...</UploadButtons>
                            </div>
                        </div>



                    </div>

                    <div className="UpdateCustomerForm">

                        <div className="UpdateCustomerFormField">
                            <div className="UpdateCustomerTextField">
                                <h5>Name</h5>
                            </div>
                            <div className="UpdateCustomerTextInput">
                                <BasicTextField></BasicTextField>
                            </div>
                        </div>

                        <div className="UpdateCustomerFormField">
                            <div className="UpdateCustomerTextField">
                                <h5>Address</h5>
                            </div>
                            <div className="UpdateCustomerTextInput">
                                <BasicTextField></BasicTextField>
                            </div>
                        </div>

                        <div className="UpdateCustomerFormField">
                            <div className="UpdateCustomerTextField">
                                <h5>Contact</h5>
                            </div>
                            <div className="UpdateCustomerTextInput">
                                <BasicTextField/>
                            </div>
                        </div>

                        <div className="UpdateCustomerFormField">
                            <div className="UpdateCustomerTextField">
                                <h5>Email</h5>
                            </div>
                            <div className="UpdateCustomerTextInput">
                                <BasicTextField ></BasicTextField>
                            </div>
                        </div>

                        <div className="UpdateCustomerButtonField">
                            <div className="UpdateCustomerButtons">

                                <CustomizedButton
                                   onClick={Notify}
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
                                        textTransform: 'none',
                                        textAlign: 'center',
                                        marginLeft:'8.5em',
                                    }}>
                                    Update
                                </CustomizedButton>
                                <ToastContainer
                                  position="top-center"
                                  autoClose={5000}
                                  hideProgressBar={false}
                                  newestOnTop={false}
                                  closeOnClick
                                  rtl={false}
                                  pauseOnFocusLoss
                                  draggable
                                  pauseOnHover
                                  theme="dark"
                                />
                            </div>
                        </div>



                    </div>

                </div>

            </div>

            <Footer/>
        </>
    )
}

export default UpdateCustomers;