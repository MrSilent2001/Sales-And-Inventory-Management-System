import './Generated Customer Refund Request.css'
import * as React from "react";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

const GeneratedRefundRequestButtons = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#242F9B',
    '&:hover': {
        backgroundColor: '#2d3ed2'
    },
    '&.MuiButton-root': {
        width: '12.625em',
        height: '2.5em'
    },
    fontSize: '0.6em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));
function GeneratedCustomerRefundRequest(){
    return(
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
                        <GeneratedRefundRequestButtons>Go Back</GeneratedRefundRequestButtons>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default GeneratedCustomerRefundRequest;