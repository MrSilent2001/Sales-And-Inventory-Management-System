import Button from "@mui/material/Button";
import React from "react";
import "./viewOrder.css";
import {styled} from "@mui/material/styles";


const GoBackButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#242F9B'),
    backgroundColor: '#249b54',
    '&:hover': {
        backgroundColor: '#2d3ed2' // You can adjust the darken value as needed
    },
    '&.MuiButton-root': {
        width: '11.625em',
        height: '2.75em'
    },
    fontSize: '0.625em',
    fontFamily: 'inter',
    padding: '1.75em 0.625em'
}));

const CenteredModal = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Make the container take the full height of the viewport
});


function ViewOrder(props){

    const orderDetails = {
        orderId: 'OID0001',
        supplier: 'S0001',
        deliveryAddress: '1234 Delivery Ln, City, State',
        email: 'customer@example.com',
        contactNumber: '0771112223',
        items: ['I0001', 'I0002', 'I0003']
    };

    return(
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
                                {orderDetails.items}
                            </div>
                        </div>

                        <div className="formFieldButtons">
                            <div className="saveButton">
                                <GoBackButton onClick={() => props.onClose(false)}>Go Back</GoBackButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CenteredModal>
    )
}

export default ViewOrder;