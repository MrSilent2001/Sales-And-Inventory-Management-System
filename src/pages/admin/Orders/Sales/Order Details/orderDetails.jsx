import React, { useEffect, useState } from 'react';
import "./orderDetails.css";
import Footer from "../../../../../layout/footer/footer";
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import { Link } from "react-router-dom";
import CustomizedButton from "../../../../../components/Button/button";
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import axios from "axios";
import SalesOrderSidebar from "../../../../../layout/sidebar/salesOrderSidebar";
import CustomizedAlert from "../../../../../components/Alert/alert";

function OrderDetails() {
    const [activeButton, setActiveButton] = useState(null);
    const [orderId, setOrderId] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleClickSuccess = () => {
        setOpenSuccess(true);
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const [order, setOrder] = useState({
        orderId: '',
        orderReceiverName: '',
        orderReceiverAddress: '',
        orderReceiverContact: '',
        orderItems: '',
        orderPrice: '',
        orderStatus: '',
        orderCancelReason: ''
    });

    // Separate state variables for each text field
    const [receiverName, setReceiverName] = useState('');
    const [receiverAddress, setReceiverAddress] = useState('');
    const [receiverContact, setReceiverContact] = useState('');
    const [orderItems, setOrderItems] = useState('');
    const [orderPrice, setOrderPrice] = useState('');

    const fetchOrderById = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:9000/order/findOrder/${orderId}`);
            setReceiverName(response.data.orderReceiverName);
            setReceiverAddress(response.data.orderReceiverAddress);
            setReceiverContact(response.data.orderReceiverContact);
            setOrderItems(response.data.orderItems);
            setOrderPrice(response.data.orderPrice);
        } catch (error) {
            console.error('Error fetching order:', error);
        }
    };

    const handleCancel = async () => {
        setOrderId('');
        setReceiverName('');
        setReceiverAddress('');
        setReceiverContact('');
        setOrderItems('');
        setOrderPrice('');
    };

    const handleUpdateOrder = async () => {
        try {
            const updatedOrder = {
                orderReceiverName: receiverName,
                orderReceiverAddress: receiverAddress,
                orderReceiverContact: receiverContact,
                orderItems: orderItems,
                orderPrice: orderPrice
            };
            const response = await axios.put(`http://localhost:9000/order/update/${orderId}`, updatedOrder);
            if (response.status === 200) {
                handleClickSuccess();
                // Optionally, you can fetch the order again to update the state
                fetchOrderById(orderId);
            } else {
                alert("Failed to update order details");
            }
        } catch (error) {
            console.error('Error updating order:', error);
            alert("Failed to update order details");
        }
    };

    const handleEnterPress = async (event) => {
        if (event.key === 'Enter') {
            fetchOrderById(orderId);
            await event.preventDefault();
        }
    };

    const handleIdChange = (event) => {
        setOrderId(event.target.value);
    };

    useEffect(() => {
        fetchOrderById(orderId);
    }, [orderId]);


    return (
        <>
            <SalesNavbar/>
            <div className="orderDetailsOuter">
                <div className="body">
                    <div className="orderDetailsFilter">
                        <SalesOrderSidebar/>
                    </div>
                    <div className="orderDetailsInner">

                        <div className="updateFormbox">
                            <form>
                                <div className="textSection">
                                    <label className='label'>Order Id</label>
                                    <BasicTextField
                                        value={orderId}
                                        onChange={handleIdChange}
                                        onKeyDown={handleEnterPress}
                                        helperText={orderId === '' ? 'Please enter the ID' : ''}
                                        error={orderId === '' ? 'Please enter the ID' : ''}
                                    />
                                </div>

                                <div className="textSection">
                                    <label className='label'>Receiver</label>
                                    <BasicTextField
                                        disabled={!orderId}
                                        value={receiverName}
                                        onChange={(e) => setReceiverName(e.target.value)}
                                    />
                                </div>

                                <div className="textSection">
                                    <label className='label'>Address</label>
                                    <BasicTextField
                                        disabled={!orderId}
                                        value={receiverAddress}
                                        onChange={(e) => setReceiverAddress(e.target.value)}
                                    />
                                </div>

                                <div className="textSection">
                                    <label className='label'>Contact</label>
                                    <BasicTextField
                                        disabled={!orderId}
                                        value={receiverContact}
                                        onChange={(e) => setReceiverContact(e.target.value)}
                                    />
                                </div>

                                <div className="textSection">
                                    <label className='label'>Items</label>
                                    <BasicTextField
                                        disabled={!orderId}
                                        value={orderItems}
                                        onChange={(e) => setOrderItems(e.target.value)}
                                    />
                                </div>

                                <div className="textSection">
                                    <label className='label'>Amount</label>
                                    <BasicTextField
                                        disabled={!orderId}
                                        value={orderPrice}
                                        onChange={(e) => setOrderPrice(e.target.value)}
                                    />
                                </div>

                                <div className="UpdateformButtons">
                                    <CustomizedButton
                                        onClick={handleUpdateOrder}
                                        hoverBackgroundColor="#2d3ed2"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#242F9B',
                                            border: '1px solid #242F9B',
                                            width: '6em',
                                            height: '2.5em',
                                            fontSize: '0.95em',
                                            fontFamily: 'inter',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em',
                                            fontWeight: '550',
                                            marginTop: '-3em',
                                            marginRight: '1.5em',
                                            marginLeft: '6em',
                                            textTransform: 'none',
                                            textAlign: 'center',
                                        }}>
                                        Update
                                    </CustomizedButton>

                                    <CustomizedButton
                                        onClick={handleCancel}
                                        hoverBackgroundColor="#f11717"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#960505',
                                            width: '6em',
                                            height: '2.5em',
                                            fontSize: '0.95em',
                                            fontFamily: 'inter',
                                            padding: '0.5em 0.625em',
                                            borderRadius: '0.35em',
                                            fontWeight: '550',
                                            marginTop: '-3em',
                                            marginRight: '1.5em',
                                            textTransform: 'none',
                                            textAlign: 'center',
                                        }}>
                                        Cancel
                                    </CustomizedButton>
                                </div>

                            </form>


                        </div>

                    </div>
                </div>
            </div>
            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="Order Details Updated Succefully!"
            />
            <Footer/>
            <Footer/>
        </>
    );
}

export default OrderDetails;