import React, {useEffect, useState} from 'react';
import "./cancelOrders.css";
import BasicTextFields from '../../../../../components/Form Inputs/textfield';
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import {Link} from "react-router-dom";
import CustomizedButton from "../../../../../components/Button/button";
import axios from "axios";
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import SalesOrderSidebar from "../../../../../layout/sidebar/salesOrderSidebar";
import CustomizedAlert from "../../../../../components/Alert/alert";

function CancelOrder() {
    const [activeButton, setActiveButton] = useState(null);

    const [openSuccess, setOpenSuccess] = useState(false);

    const handleClickSuccess = () => {
        setOpenSuccess(true);
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    const handleButtonClick = (buttonText) => {
        setActiveButton(buttonText);
    };

    const [orderId, setOrderId] = useState('');
    const [orderCancelReason, setOrderCancelReason] = useState('');
    const [order, setOrder] = useState({
        orderId: '',
        orderReceiverName: '',
        orderItems: '',
        orderPrice: '',
        orderCancelReason: ''
    });

    const token = localStorage.getItem('accessToken');
    const fetchOrderById = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:9000/order/findOrder/${orderId}`,  {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrder(response.data);
            setOrderCancelReason(response.data.orderCancelReason);
        } catch (error) {
            console.error('Error fetching order:', error);
        }
    };

    const handleCancelOrder = async () => {
        try {
            const updatedOrder = {
                orderCancelReason: orderCancelReason,
                orderStatus:"Cancelled",
            };
            const response = await axios.put(`http://localhost:9000/order/update/${orderId}`, updatedOrder,  {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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

    const handleCancel = async () => {
        setOrderId('');
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
            <div className="cancelOrderOuter">
                <div className="body">
                    <div className="cancelOrderFilter">
                        <SalesOrderSidebar/>
                    </div>
                    <div className="cancelOrderInner">

                        <div className="cancelOrderformbox">
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
                                        value={order.orderReceiverName}
                                        disabled={!orderId}
                                    />

                                </div>

                                <div className="textSection">

                                    <label className='label'>Items</label>

                                    <BasicTextField
                                        value={order.orderItems}
                                        disabled={!orderId}
                                    />

                                </div>

                                <div className="textSection">

                                    <label className='label'>Amount</label>

                                    <BasicTextField
                                        value={order.orderPrice}
                                        disabled={!orderId}
                                    />

                                </div>

                                <div className="textSection">

                                    <label className='label'>Reasons</label>

                                    <BasicTextField
                                        value={orderCancelReason}
                                        onChange={(e) => setOrderCancelReason(e.target.value)}
                                        disabled={!orderId}
                                    />

                                </div>



                                <div className="formButtons">
                                    <CustomizedButton
                                        onClick={handleCancel}
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
                                            marginTop: '0.625em',
                                            marginRight: '1.5em',
                                            textTransform: 'none',
                                            textAlign: 'center',
                                        }}>
                                        Go Back
                                    </CustomizedButton>

                                    <CustomizedButton
                                        onClick={handleCancelOrder}
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
                                            marginTop: '0.625em',
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
                message="Order Cancelled Sucessfully!"
            />
            <Footer/>
            <Footer/>
        </>
    );
}

export default CancelOrder;