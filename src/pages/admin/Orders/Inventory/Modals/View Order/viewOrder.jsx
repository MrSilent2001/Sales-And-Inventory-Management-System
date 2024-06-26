import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./viewOrder.css";
import CustomizedButton from "../../../../../../components/Button/button";
import CenteredModal from "../../../../../../components/Modal/modal";




function ViewOrder({ order, onClose }) {
    const [orderDetails, setOrderDetails] = useState({
        id: '',
        supplierName: '',
        Address: '',
        mail: '',
        contact_number: '',
        item: '',
        createdDate: '',
        status: ''
    });
    const [itemMapping, setItemMapping] = useState({});
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:9000/product/getAllProducts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const products = response.data.reduce((acc, product) => {
                    acc[product.id] = product.productName;
                    return acc;
                }, {});
                setItemMapping(products);
            } catch (err) {
                console.error('Failed to fetch products:', err);
            }
        };

        fetchProducts();
    }, [token]);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!order) return;

            try {
                const response = await axios.get(`http://localhost:9000/purchaseOrder/get/${order.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Order details response:", response.data);

                const itemWithName = itemMapping[response.data.items] || '';

                setOrderDetails({
                    id: response.data.id,
                    supplierName: response.data.supplierName,
                    Address: response.data.Address,
                    mail: response.data.mail,
                    contact_number: response.data.contact_number,
                    item: itemWithName,
                    createdDate: response.data.createdDate,
                    status: response.data.status
                });
                console.log("Fetched data", response.data);
            } catch (err) {
                console.error('Failed to fetch order details:', err);
            }
        };

        fetchOrderDetails();
    }, [order, itemMapping]);

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
                                {orderDetails.id}
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Supplier:</h5>
                            </div>
                            <div className="idInput">
                                {orderDetails.supplierName}
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Delivery Address:</h5>
                            </div>
                            <div className="idInput">
                                {orderDetails.Address}
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Email:</h5>
                            </div>
                            <div className="idInput">
                                {orderDetails.mail}
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Contact Number:</h5>
                            </div>
                            <div className="idInput">
                                {orderDetails.contact_number}
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Item:</h5>
                            </div>
                            <div className="idInput" id="items">
                                {orderDetails.item}
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Created date:</h5>
                            </div>
                            <div className="idInput">
                                {orderDetails.createdDate}
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Status:</h5>
                            </div>
                            <div className="idInput">
                                {orderDetails.status}
                            </div>
                        </div>

                        <div className="formFieldButtons">
                            <div className="saveButton">
                                <CustomizedButton
                                    onClick={onClose}
                                    hoverBackgroundColor="#2d3ed2"
                                    style={{
                                        backgroundColor: '#242F9B',
                                        border: '1px solid #242F9B',
                                        width: '9.5em',
                                        height: '2.5em',
                                        fontSize: '0.8em',
                                        padding: '0.5em 0.625em',
                                        marginTop: '0.625em',
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
