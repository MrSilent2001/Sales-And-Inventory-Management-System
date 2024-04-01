import './Generated Customer Refund Request.css'
import * as React from "react";
import SalesNavbar from "../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../layout/footer/footer";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../../components/Button/button";

function GeneratedCustomerRefundRequest() {
    return (
        <>
            <SalesNavbar/>
            <div className="generatedCustomerRefundRequestOuter">
                <div className="generatedCustomerRefundRequestInner">

                    <div className="generatedRefundRequestTopic">
                        <h2>Generated Request</h2>
                    </div>

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

                    <div className="refundButtonField">
                        <div className="refundRequestButtons">
                            <Link to="/createrefund">
                                <CustomizedButton
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '9.5em',
                                        height: '2.75em',
                                        fontSize: '0.75em',
                                        fontFamily: 'inter',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginTop: '0.25em',
                                        marginLeft: '-3.5em',
                                        textTransform: 'none',
                                        textAlign: 'center',
                                    }}>
                                    Go Back
                                </CustomizedButton>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
            <Footer/>
        </>
    )
}

export default GeneratedCustomerRefundRequest;