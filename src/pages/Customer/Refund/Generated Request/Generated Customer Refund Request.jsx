import './Generated Customer Refund Request.css';
import React from "react";
import Footer from "../../../../layout/footer/footer";
import { Link, useLocation } from "react-router-dom";
import CustomizedButton from "../../../../components/Button/button";
import CustomerNavbar from "../../../../layout/navbar/Customer navbar/Customer navbar";

function GeneratedCustomerRefundRequest() {
    const location = useLocation();
    const { formData } = location.state || {
        customerName: '',
        contact: '',
        item: '',
        quantity: '',
        reason: '',
        totalPrice: ''
    };

    return (
        <>
            <CustomerNavbar />
            <div className="generatedCustomerRefundRequestOuter">
                <div className="generatedCustomerRefundRequestInner">
                    <div className="generatedRefundRequestTopic">
                        <h2>Generated Request</h2>
                    </div>

                    <div className="customerRefundRequestDetails">
                        <div className="customerRefundFormField">
                            <div className="customerRefundTextField">
                                <h5>Customer</h5>
                            </div>
                            <div className="customerRefundInputData">
                                <h6>{formData.customerName}</h6>
                            </div>
                        </div>

                        <div className="customerRefundFormField">
                            <div className="customerRefundTextField">
                                <h5>Contact</h5>
                            </div>
                            <div className="customerRefundInputData">
                                <h6>{formData.contact}</h6>
                            </div>
                        </div>

                        <div className="customerRefundFormField">
                            <div className="customerRefundTextField">
                                <h5>Item</h5>
                            </div>
                            <div className="customerRefundInputData">
                                <h6>{formData.item}</h6>
                            </div>
                        </div>

                        <div className="customerRefundFormField">
                            <div className="customerRefundTextField">
                                <h5>Quantity</h5>
                            </div>
                            <div className="customerRefundInputData">
                                <h6>{formData.quantity}</h6>
                            </div>
                        </div>

                        <div className="customerRefundFormField">
                            <div className="customerRefundTextField">
                                <h5>Reason</h5>
                            </div>
                            <div className="customerRefundInputData">
                                <h6>{formData.reason}</h6>
                            </div>
                        </div>

                        <div className="customerRefundFormField">
                            <div className="customerRefundTextField">
                                <h5>Total Price</h5>
                            </div>
                            <div className="customerRefundInputData">
                                <h6>{formData.totalPrice}</h6>
                            </div>
                        </div>
                    </div>

                    <div className="refundButtonField">
                        <div className="refundRequestButtons">
                            <Link to="/refundRequests">
                                <CustomizedButton
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        color: '#ffffff',
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '9.5em',
                                        height: '2.75em',
                                        fontSize: '0.75em',
                                        padding: '0.5em 0.625em',
                                        marginTop: '0.25em',
                                    }}
                                >
                                    Go Back
                                </CustomizedButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default GeneratedCustomerRefundRequest;
