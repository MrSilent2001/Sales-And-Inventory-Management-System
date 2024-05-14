import React from 'react';
import './SalesViewRequest.css';
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import CustomizedButton from "../../../../../components/Button/button";

function SalesViewRequest() {
    return (
        <>
            <SalesNavbar/>
            <div className='outer'>
                <div className="generated-request">
                    <h2>Generated Request</h2>
                    <div className="refundRequestDetails">

                        <div className="formField">
                            <div className="textField">
                                <h5>Customer</h5>
                            </div>
                            <div className="inputData">
                                <h6>WAP Saman Perera</h6>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h5>Contact</h5>
                            </div>
                            <div className="inputData">
                                <h6>0771112234</h6>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h5>Item</h5>
                            </div>
                            <div className="inputData">
                                <h6>I0001</h6>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h5>Quantity</h5>
                            </div>
                            <div className="inputData">
                                <h6>35</h6>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h5>Reason</h5>
                            </div>
                            <div className="inputData">
                                <h6>Defected Items</h6>
                            </div>
                        </div>

                        <div className="formField">
                            <div className="textField">
                                <h5>Total Price</h5>
                            </div>
                            <div className="inputData">
                                <h6>Rs.120,000</h6>
                            </div>
                        </div>

                    </div>

                    <div style={{display:'flex'}}>
                        <CustomizedButton
                            hoverBackgroundColor="#2d3ed2"
                            style={{
                                color: '#ffffff',
                                backgroundColor: '#242F9B',
                                border: '1px solid #242F9B',
                                width: '6em',
                                height: '2.5em',
                                fontSize: '0.95em',
                                fontFamily: 'inter',
                                padding: '0.5em 0.625em',
                                borderRadius: '0.35em',
                                fontWeight: '550',
                                marginTop: '1.5em',
                                marginRight: '1.5em',
                                textTransform: 'none',
                                textAlign: 'center',
                            }}>
                            Accept
                        </CustomizedButton>

                        <CustomizedButton
                            onClick={() =>{alert("Order has been Cancelled")}}
                            hoverBackgroundColor="#f11717"
                            style={{
                                color: '#ffffff',
                                backgroundColor: '#960505',
                                width: '6em',
                                height: '2.5em',
                                fontSize: '0.95em',
                                fontFamily: 'inter',
                                padding: '0.5em 0.625em',
                                borderRadius: '0.35em',
                                fontWeight: '550',
                                marginTop: '1.5em',
                                marginRight: '1.5em',
                                textTransform: 'none',
                                textAlign: 'center',
                            }}>
                            Reject
                        </CustomizedButton>
                    </div>
                </div>

            </div>
            <Footer/>
        </>
    );
}

export default SalesViewRequest;
