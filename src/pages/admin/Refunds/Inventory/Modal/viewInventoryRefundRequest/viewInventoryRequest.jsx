import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./viewInventoryRequest.css";
import CustomizedButton from "../../../../../../components/Button/button";
import CenteredModal from "../../../../../../components/Modal/modal";



function ViewInventoryRequest({ request, onClose }) {
    const [requestDetails, setRequestDetails] = useState({
        id: '',
        supplier: '',
        Address: '',
        mail: '',
        contact_number: '',
        item: '',
        amount: '',
        quantity: '',
        status: '',
        createdDate: ''
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
        const fetchRequestDetails = async () => {
            if (!request) return;

            try {
                const response = await axios.get(`http://localhost:9000/refund/inventoryRefund/get/${request.inventory_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const itemWithName = itemMapping[response.data.item] || '';

                setRequestDetails({
                    inventory_id: response.data.inventory_id,
                    supplier: response.data.supplierName,
                    item: itemWithName,
                    quantity: response.data.quantity,
                    phone: response.data.phone,
                    price: response.data.price,
                    status: response.data.status,
                    createdDate: response.data.createdDate
                });
                console.log("Fetched data", response.data);
            } catch (err) {
                console.error('Failed to fetch request details:', err);
            }
        };

        fetchRequestDetails();
    }, [request, itemMapping, token]);

    return (
        <CenteredModal>
            <div className="viewInventoryRefundRequestOuter">
                <div className="viewInventoryRefundRequestModel">
                    <h2>Refund Request</h2>
                    <div className="viewInventoryRefundRequestForm">
                        <div className="viewInventoryRefundformField">
                            <div className="idField">
                                <h5>Request Id:</h5>
                            </div>
                            <div className="idInput">
                                {requestDetails.inventory_id}
                            </div>
                        </div>

                        <div className="viewInventoryRefundformField">
                            <div className="idField">
                                <h5>Supplier:</h5>
                            </div>
                            <div className="idInput">
                                {requestDetails.supplier}
                            </div>
                        </div>

                        <div className="viewInventoryRefundformField">
                            <div className="idField">
                                <h5>Contact number:</h5>
                            </div>
                            <div className="idInput">
                                {requestDetails.phone}
                            </div>
                        </div>

                        <div className="viewInventoryRefundformField">
                            <div className="idField">
                                <h5>Item:</h5>
                            </div>
                            <div className="idInput" id="items">
                                {requestDetails.item}
                            </div>
                        </div>

                        <div className="viewInventoryRefundformField">
                            <div className="idField">
                                <h5>Quantity:</h5>
                            </div>
                            <div className="idInput">
                                {requestDetails.quantity}
                            </div>
                        </div>

                        <div className="viewInventoryRefundformField">
                            <div className="idField">
                                <h5>Total amount:</h5>
                            </div>
                            <div className="idInput">
                                {requestDetails.price}
                            </div>
                        </div>

                        <div className="viewInventoryRefundformField">
                            <div className="idField">
                                <h5>Status:</h5>
                            </div>
                            <div className="idInput">
                                {requestDetails.status}
                            </div>
                        </div>

                        <div className="viewInventoryRefundformField">
                            <div className="idField">
                                <h5>Created date:</h5>
                            </div>
                            <div className="idInput">
                                {requestDetails.createdDate}
                            </div>
                        </div>

                        <div className="viewInventoryRefundButtons">
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

export default ViewInventoryRequest;
