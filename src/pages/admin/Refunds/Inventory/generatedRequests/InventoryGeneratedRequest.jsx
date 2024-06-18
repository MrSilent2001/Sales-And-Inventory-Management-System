
import React from 'react';
import './generatedRequest.css';
import InventoryNavbar from "../../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../../layout/footer/footer";
import {Link, useLocation} from "react-router-dom";
import CustomizedButton from "../../../../../components/Button/button";

function InventoryGeneratedRequest() {
    const location = useLocation();
    const { refundRequestData } = location.state || {};

    return (
        <>
            <InventoryNavbar/>
            <div className='generateRequestsOuter'>
                <div className="generated-request-inner">
                    <h2>Generated Request</h2>
                    <div className='request-container' style={{display: "flex", width: "50%", height: "100%"}}>
                        <div className='inner1' style={{
                            width: "30%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            
                        }}>
                            <h4>Supplier</h4>
                            <h4>Item</h4>
                            <h4>Quantity</h4>
                            <h4>Reason</h4>
                            <h4>Total Price</h4>
                        </div>
                        <div className="inner2" style={{
                            width: "70%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                           
                        }}>
                            <span className="value">{refundRequestData?.supplierName || 'N/A'}</span>
                            <span className="value">{refundRequestData?.item || 'N/A'}</span>
                            <span className="value">{refundRequestData?.quantity || 'N/A'}</span>
                            <span className="value">{refundRequestData?.reason || 'N/A'}</span>
                            <span className="value">{refundRequestData?.price || 'N/A'}</span>
                        </div>
                    </div>

                    <Link to="/InventoryRefundRequestsTable">
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
                                marginTop: '2.625em',
                                marginBottom: '4.625em',
                                textTransform: 'none',
                                textAlign: 'center',
                            }}>
                            Go Back
                        </CustomizedButton>
                    </Link>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default InventoryGeneratedRequest;