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
        items: '',
        amount: ''
    });

    useEffect(() => {
        if (!request) {
            console.error('Request is missing');
            return;
        }
        console.log('Request', request); // Debugging line to check the request ID
        console.log('Request ID:', request.inventory_id); // Debugging line to check the request ID
        const fetchRequestDetails = async () => {
            if (!request.inventory_id) {
                console.error('Request ID is missing');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:9000/refund/inventoryRefund/get/${request.inventory_id}`);
                console .log('Response:', response); // Debugging line to check the response
                setRequestDetails({
                    inventory_id: response.data.inventory_id,
                    supplier: response.data.supplier,
                    item: response.data.item,
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
    }, [request]);

    return (
        <CenteredModal>
            <div className="viewRequestOuter">
                <div className="viewRequestModel">
                    <h2>Inventory Refund Request</h2>
                    <div className="viewRequestForm">
                        <div className="formField">
                            <div className="idField">
                                <h5>Request Id:</h5>
                            </div>
                            <div className="idInput">
                                {requestDetails.inventory_id}
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Supplier:</h5>
                            </div>
                            <div className="idInput">
                                {requestDetails.supplier}
                            </div>
                        </div>

                        
                        <div className="formField">
                            <div className="idField">
                                <h5>Contact number:</h5>
                            </div>
                            <div className="idInput">
                                {requestDetails.phone}
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Items:</h5>
                            </div>
                            <div className="idInput">
                                {requestDetails.item}
                            </div>
                        </div>


                        <div className="formField">
                            <div className="idField">
                                <h5>Quantity:</h5>
                            </div>
                            <div className="idInput" id="items">
                                {requestDetails.quantity}
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Total amount:</h5>
                            </div>
                            <div className="idInput">
                                {requestDetails.price}
                            </div>
                        </div>

                        

                        <div className="formField">
                            <div className="idField">
                                <h5>Status:</h5>
                            </div>
                            <div className="idInput">
                                {requestDetails.status}
                            </div>
                        </div>

                        <div className="formField">
                            <div className="idField">
                                <h5>Created date::</h5>
                            </div>
                            <div className="idInput">
                                {requestDetails.createdDate}
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

export default ViewInventoryRequest;
