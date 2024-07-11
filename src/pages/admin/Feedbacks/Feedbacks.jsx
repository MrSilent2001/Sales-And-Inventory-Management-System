import './Feedbacks.css';
import InventoryNavbar from "../../../layout/navbar/Inventory navbar/Inventory navbar";
import { useState } from "react";
import Footer from "../../../layout/footer/footer";
import CustomizedButton from "../../../components/Button/button";
import * as React from "react";
import ShopFeedbacks from "./Feedback Components/Shop Feedback/Shop Feedbacks";
import SupplierFeedbacks from "./Feedback Components/Supplier Feedback/Supplier Feedbacks";
import { Box } from '@mui/material';

function Feedbacks() {
    const [activeComponent, setActiveComponent] = useState('one');

    const showComponentCustomer = () => {
        setActiveComponent('one');
    };

    const showComponentSupplier = () => {
        setActiveComponent('two');
    };

    return (
        <div>
            <InventoryNavbar />

            <div className="feedbackOuter">
                <div className="feedbackTop">
                    <div className="feedbackTopic">
                        <h1>Tradeasy Feedbacks</h1>
                    </div>

                    <div className="feedbackButtons">
                        <div className="customerFeedbackButton">
                            <CustomizedButton
                                onClick={showComponentCustomer}
                                hoverBackgroundColor="#2d3ed2"
                                style={{
                                    backgroundColor: '#818bf3',
                                    width: '13.5em',
                                    height: '2.95em',
                                    fontSize: '0.8em',
                                    padding: '0.5em 0.625em',
                                }}
                            >
                                Customer Feedback
                            </CustomizedButton>
                        </div>

                        <div className="supplierFeedbackButton">
                            <CustomizedButton
                                onClick={showComponentSupplier}
                                hoverBackgroundColor="#2d3ed2"
                                style={{
                                    backgroundColor: '#818bf3',
                                    width: '13.5em',
                                    height: '2.95em',
                                    fontSize: '0.8em',
                                    padding: '0.5em 0.625em',
                                }}
                            >
                                Supplier Feedback
                            </CustomizedButton>
                        </div>
                    </div>
                </div>

                <div className="feedbackSectionOuter">
                    <Box sx={{ padding: 2 }}>
                        {activeComponent === 'one' && <ShopFeedbacks />}
                        {activeComponent === 'two' && <SupplierFeedbacks />}
                    </Box>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Feedbacks;
