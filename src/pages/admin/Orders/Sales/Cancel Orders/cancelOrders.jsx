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
import sendOrderStatusEmail from "../_Component/orderStatusChangedEmailSend";

function CancelOrder() {
    const [activeButton, setActiveButton] = useState(null);

    const [openSuccess, setOpenSuccess] = useState(false);
    //data fetching error Alert Variables
    const [dataErrorOpenSuccess, setDataErrorOpenSuccess] = useState(false);
    //IDNotExist fetching error Alert Variables
    const [IDNotExistErrorOpenSuccess, setIDNotExistErrorOpenSuccess] = useState(false);
    //IDNotExist fetching error Alert Variables
    const [orderAlreadyCancelledOpenSuccess, setOrderAlreadyCancelledOpenSuccess] = useState(false);
    //data Update error Alert Variables
    const [updateErrorOpenSuccess, setUpdateErrorOpenSuccess] = useState(false);

    const handleClickSuccess = () => {
        setOpenSuccess(true);
    };

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    };

    //Handle Data Error Alert Variable
    const dataErrorHandleCloseSuccess = () => {
        setDataErrorOpenSuccess(false);
    };

    const dataErrorHandleClickSuccess = () => {
        setDataErrorOpenSuccess(true);
    };

    //Handle IDNotExist Error Alert Variable
    const IDNotExistErrorHandleCloseSuccess = () => {
        setIDNotExistErrorOpenSuccess(false);
    };

    const IDNotExistErrorHandleClickSuccess = () => {
        setIDNotExistErrorOpenSuccess(true);
    };

    //Handle Order Already Cancelled Error Alert Variable
    const orderAlreadyCancelledHandleCloseSuccess = () => {
        setOrderAlreadyCancelledOpenSuccess(false);
    };

    const orderAlreadyCancelledHandleClickSuccess = () => {
        setOrderAlreadyCancelledOpenSuccess(true);
    };

    //Handle Update Data Error Alert Variable
    const updateErrorHandleCloseSuccess = () => {
        setUpdateErrorOpenSuccess(false);
    };

    const updateErrorHandleClickSuccess = () => {
        setUpdateErrorOpenSuccess(true);
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
        if (!orderId) {
            console.log('Order ID is empty. Fetch operation aborted.');
            makeEmptyFields();
            return;
        }

        try {
            const response = await axios.get(`http://localhost:9000/order/findOrder/${orderId}`,  {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.data || Object.keys(response.data).length === 0) {
                // throw new Error('Order ID does not exist.');
                makeEmptyFields();
                IDNotExistErrorHandleClickSuccess();
                return;

            }

            if (response.data.orderStatus === 'Cancelled') {
                // console.error('Order is already cancelled.');
                // makeEmptyFields();

                orderAlreadyCancelledHandleClickSuccess();
                // return;
            }


            setOrder(response.data);
            setOrderCancelReason(response.data.orderCancelReason);
        } catch (error) {
            console.error('Error fetching order:', error);
            makeEmptyFields();
            dataErrorHandleClickSuccess();
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
            handleClickSuccess();
            setOrderId('');

            sendOrderStatusEmail(orderId, token, orderCancelReason);
            if (response.status === 200) {
                // Optionally, you can fetch the order again to update the state
                // fetchOrderById(orderId);
            } else {
                // alert("Failed to update order details");
                updateErrorHandleClickSuccess();
            }
        } catch (error) {
            console.error('Error updating order:', error);
            // alert("Failed to update order details");
            updateErrorHandleClickSuccess();
        }
    };

    const makeEmptyFields = async () => {
        setOrder({
            orderId: '',
            orderReceiverName: '',
            orderItems: '',
            orderPrice: '',
            orderCancelReason: ''
        });

        setOrderCancelReason('');
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
                                        readOnly={true}
                                    />

                                </div>

                                <div className="textSection">

                                    <label className='label'>Items</label>

                                    <BasicTextField
                                        value={order.orderItems}
                                        disabled={!orderId}
                                        readOnly={true}
                                    />

                                </div>

                                <div className="textSection">

                                    <label className='label'>Amount</label>

                                    <BasicTextField
                                        value={order.orderPrice}
                                        disabled={!orderId}
                                        readOnly={true}
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

            <CustomizedAlert
                open={dataErrorOpenSuccess}
                onClose={dataErrorHandleCloseSuccess}
                severity="error"
                message="Error Fetching Data!"
            />

            <CustomizedAlert
                open={IDNotExistErrorOpenSuccess}
                onClose={IDNotExistErrorHandleCloseSuccess}
                severity="error"
                message="Order ID does not exist.!"
            />

            <CustomizedAlert
                open={updateErrorOpenSuccess}
                onClose={updateErrorHandleCloseSuccess}
                severity="error"
                message="Order Cacellation Failed!"
            />

            <CustomizedAlert
                open={orderAlreadyCancelledOpenSuccess}
                onClose={orderAlreadyCancelledHandleCloseSuccess}
                severity="warning"
                message="This Order is Alredy Cancelled!"
            />

            <Footer/>
        </>
    );
}

export default CancelOrder;