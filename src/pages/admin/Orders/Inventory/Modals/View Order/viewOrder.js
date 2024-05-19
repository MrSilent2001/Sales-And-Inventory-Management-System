import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./viewOrder.css";
import CustomizedButton from "../../../../../../components/Button/button";
import CenteredModal from "../../../../../../components/Modal/modal";

function ViewOrder({ orderId, onClose }) {
    const [orderDetails, setOrderDetails] = useState({
        orderId: '',
        supplier: '',
        deliveryAddress: '',
        email: '',
        contactNumber: '',
        items: []
    });
   console.log(orderDetails);
   
    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!orderId) return;

            try {
                const response = await axios.get(`http://localhost:9000/purchaseOrder/get/${orderId}`);
                setOrderDetails(response.data);
                console.log(response.data); 
            } catch (err) {
                console.error('Failed to fetch order details:', err);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    return (
        <CenteredModal>
            <div className="viewOrderOuter">
                <div className="viewOrderModel">
                    <h2>Inventory Order</h2>
                    <div className="viewOrderForm">
                        <div className="formField">
                            <div className="idField">
                                <h5>Order Id:</h5>
                            </div>
                            <div className="idInput">
                                {orderDetails.orderId}
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Supplier:</h5>
                            </div>
                            <div className="idInput">
                                {orderDetails.supplier}
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Delivery Address:</h5>
                            </div>
                            <div className="idInput">
                                {orderDetails.deliveryAddress}
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Email:</h5>
                            </div>
                            <div className="idInput">
                                {orderDetails.email}
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Contact Number:</h5>
                            </div>
                            <div className="idInput">
                                {orderDetails.contactNumber}
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Items:</h5>
                            </div>
                            <div className="idInput" id="items">
                                {orderDetails.items.join(', ')}
                            </div>
                        </div>

                        <div className="formFieldButtons">
                            <div className="saveButton">
                                <CustomizedButton
                                    onClick={() => onClose(false)}
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '11em',
                                        height: '2.5em',
                                        fontSize: '0.95em',
                                        padding: '0.5em 0.625em',
                                        borderRadius: '0.35em',
                                        fontWeight: '550',
                                        marginTop: '0.625em',
                                        marginRight: '1.5em',
                                    }}>
                                    Go Back
                                </CustomizedButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CenteredModal>
    );
}

export default ViewOrder;
