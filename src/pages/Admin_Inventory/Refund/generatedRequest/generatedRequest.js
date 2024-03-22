import React from 'react';
import './generatedRequest.css';
import InventoryNavbar from "../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../layout/footer/footer";
import {Link} from "react-router-dom";

function GeneratedRequest() {
    return (
        <>
            <InventoryNavbar/>
            <div className='outer'>
                <div className="generated-request">
                    <h2>Generated Request</h2>
                    <div className='request-container' style={{display: "flex", width: "50%", height: "40vh"}}>
                        <div className='="inner1' style={{
                            width: "30%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around"
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
                            justifyContent: "space-around"
                        }}>
                            <span className="value">Silva Construction Suppliers (PVT) LTD.</span>
                            <span className="value">1001</span>
                            <span className="value">250</span>
                            <span className="value">Manufacturing Defects of the items and cannot be repaired</span>
                            <span className="value">Rs.450,000.00</span>
                        </div>
                    </div>

                    <Link to="/RefundRequestsTable">
                        <button
                            type="button"
                            className="go-back-button"
                            style={{backgroundColor: "#242F9B", width: "20%", marginLeft: "47%", marginBottom: "3%"}}>
                            Go Back
                        </button>
                    </Link>
                </div>

            </div>
            <Footer/>
        </>
    );
}

export default GeneratedRequest;
