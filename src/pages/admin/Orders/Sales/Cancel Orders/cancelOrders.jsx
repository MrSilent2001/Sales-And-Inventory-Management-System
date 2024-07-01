import React, { useEffect, useState } from 'react';
import "./cancelOrders.css";
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import Footer from "../../../../../layout/footer/footer";
import CustomizedButton from "../../../../../components/Button/button";
import axios from "axios";
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import SalesOrderSidebar from "../../../../../layout/sidebar/salesOrderSidebar";
import CustomizedAlert from "../../../../../components/Alert/alert";
import sendOrderStatusEmail from "../_Component/orderStatusChangedEmailSend";
import { useFormik } from 'formik';
import * as Yup from 'yup';

function CancelOrder() {
    const [activeButton, setActiveButton] = useState(null);

    //Successful Alert Variables
    const [openSuccess, setOpenSuccess] = useState(false);
    const [dataErrorOpenSuccess, setDataErrorOpenSuccess] = useState(false);
    const [IDNotExistErrorOpenSuccess, setIDNotExistErrorOpenSuccess] = useState(false);
    const [orderAlreadyCancelledOpenSuccess, setOrderAlreadyCancelledOpenSuccess] = useState(false);
    const [updateErrorOpenSuccess, setUpdateErrorOpenSuccess] = useState(false);

    const handleClickSuccess = () => setOpenSuccess(true);
    const handleCloseSuccess = () => setOpenSuccess(false);
    const dataErrorHandleCloseSuccess = () => setDataErrorOpenSuccess(false);
    const dataErrorHandleClickSuccess = () => setDataErrorOpenSuccess(true);
    const IDNotExistErrorHandleCloseSuccess = () => setIDNotExistErrorOpenSuccess(false);
    const IDNotExistErrorHandleClickSuccess = () => setIDNotExistErrorOpenSuccess(true);
    const orderAlreadyCancelledHandleCloseSuccess = () => setOrderAlreadyCancelledOpenSuccess(false);
    const orderAlreadyCancelledHandleClickSuccess = () => setOrderAlreadyCancelledOpenSuccess(true);
    const updateErrorHandleCloseSuccess = () => setUpdateErrorOpenSuccess(false);
    const updateErrorHandleClickSuccess = () => setUpdateErrorOpenSuccess(true);

    const [order, setOrder] = useState({
        orderId: '',
        orderReceiverName: '',
        orderItems: '',
        orderPrice: '',
        orderCancelReason: '',
        orderStatus: ''
    });

    const token = localStorage.getItem('accessToken');

    const fetchOrderById = async (orderId) => {
        if (!orderId) {
            console.log('Order ID is empty. Fetch operation aborted.');
            makeEmptyFields();
            return;
        }

        try {
            const response = await axios.get(`http://localhost:9000/order/findOrder/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.data || Object.keys(response.data).length === 0) {
                clearFields();
                IDNotExistErrorHandleClickSuccess();
                return;
            }

            if (response.data.orderStatus === 'Cancelled') {
                orderAlreadyCancelledHandleClickSuccess();
            }

            const productsResponse = await axios.get('http://localhost:9000/product/getAllProducts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const products = productsResponse.data.reduce((acc, product) => {
                acc[product.id] = product.productName;
                return acc;
            }, {});

            const orderItemsWithName = response.data.orderItems.map(itemStr => {
                const item = JSON.parse(itemStr);
                const productName = products[item.id];
                return `${productName}(${item.id}) x ${item.amount}`;
            });
            const formattedOrderItems = orderItemsWithName.join(', ');

            setOrder({
                orderId: response.data.orderId,
                orderReceiverName: response.data.orderReceiverName,
                orderItems: formattedOrderItems,
                orderPrice: response.data.orderPrice,
                orderCancelReason: response.data.orderCancelReason,
                orderStatus: response.data.orderStatus
            });
            formik.setFieldValue('orderCancelReason', response.data.orderCancelReason);
        } catch (error) {
            console.error('Error fetching order:', error);
            makeEmptyFields();
            dataErrorHandleClickSuccess();
        }
    };

    const handleCancelOrder = async (values) => {
        try {
            const updatedOrder = {
                orderCancelReason: values.orderCancelReason,
                orderStatus: "Cancelled",
            };
            const response = await axios.put(`http://localhost:9000/order/update/${values.orderId}`, updatedOrder, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            handleClickSuccess();
            formik.resetForm();

            sendOrderStatusEmail(values.orderId, token, values.orderCancelReason);
            if (response.status === 200) {
                // Optionally, you can fetch the order again to update the state
                // fetchOrderById(orderId);
            } else {
                updateErrorHandleClickSuccess();
            }
        } catch (error) {
            console.error('Error updating order:', error);
            updateErrorHandleClickSuccess();
        }
    };

    const makeEmptyFields = () => {
        setOrder({
            orderId: '',
            orderReceiverName: '',
            orderItems: '',
            orderPrice: '',
            orderCancelReason: '',
            orderStatus: ''
        });
        formik.resetForm();
    };

    const clearFields = () => {
        setOrder({
            orderReceiverName: '',
            orderItems: '',
            orderPrice: '',
            orderCancelReason: '',
            orderStatus: ''
        });
        // formik.resetForm();
    };

    const formik = useFormik({
        initialValues: {
            orderId: '',
            orderCancelReason: ''
        },
        validationSchema: Yup.object({
            orderId: Yup.string().required('Order ID is required'),
            orderCancelReason: Yup.string().required('Cancel reason is required')
        }),
        onSubmit: handleCancelOrder
    });

    const handleEnterPress = async (event) => {
        if (event.key === 'Enter') {
            fetchOrderById(formik.values.orderId);
            event.preventDefault();
        }
    };

    useEffect(() => {
        fetchOrderById(formik.values.orderId);
    }, [formik.values.orderId]);

    return (
        <>
            <SalesNavbar />
            <div className="cancelOrderOuter">
                <div className="body">
                    <div className="cancelOrderFilter">
                        <SalesOrderSidebar />
                    </div>
                    <div className="cancelOrderInner">
                        <div className="cancelOrderformbox">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="textSection">
                                    <label className='label'>Order Id</label>
                                    <BasicTextField
                                        value={formik.values.orderId}
                                        onChange={formik.handleChange}
                                        onKeyDown={handleEnterPress}
                                        name="orderId"
                                        helperText={formik.touched.orderId && formik.errors.orderId ? formik.errors.orderId : ''}
                                        error={formik.touched.orderId && Boolean(formik.errors.orderId)}
                                    />
                                </div>

                                <div className="textSection">
                                    <label className='label'>Receiver</label>
                                    <BasicTextField
                                        value={order.orderReceiverName}
                                        disabled={true}
                                        readOnly={true}
                                    />
                                </div>

                                <div className="textSection">
                                    <label className='label'>Items</label>
                                    <BasicTextField
                                        value={order.orderItems}
                                        disabled={true}
                                        readOnly={true}
                                    />
                                </div>

                                <div className="textSection">
                                    <label className='label'>Amount</label>
                                    <BasicTextField
                                        value={order.orderPrice}
                                        disabled={true}
                                        readOnly={true}
                                    />
                                </div>

                                <div className="textSection">
                                    <label className='label'>Reasons</label>
                                    <BasicTextField
                                        value={formik.values.orderCancelReason}
                                        onChange={formik.handleChange}
                                        name="orderCancelReason"
                                        helperText={formik.touched.orderCancelReason && formik.errors.orderCancelReason ? formik.errors.orderCancelReason : ''}
                                        error={formik.touched.orderCancelReason && Boolean(formik.errors.orderCancelReason)}
                                        disabled={!formik.values.orderId}
                                    />
                                </div>

                                <div className="formButtons">
                                    <CustomizedButton
                                        onClick={makeEmptyFields}
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
                                        type="submit"
                                        hoverBackgroundColor="#f11717"
                                        style={{
                                            color: '#ffffff',
                                            backgroundColor: '#960505',
                                            width: '9em',
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
                                        Cancel Order
                                    </CustomizedButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            <CustomizedAlert
                open={openSuccess}
                onClose={handleCloseSuccess}
                severity="success"
                message="Order Cancelled Successfully"
            />
            <CustomizedAlert
                open={dataErrorOpenSuccess}
                onClose={dataErrorHandleCloseSuccess}
                severity="error"
                message="Error Occurred While Fetching Data"
            />
            <CustomizedAlert
                open={IDNotExistErrorOpenSuccess}
                onClose={IDNotExistErrorHandleCloseSuccess}
                severity="error"
                message="Order Id Does Not Exist"
            />
            <CustomizedAlert
                open={orderAlreadyCancelledOpenSuccess}
                onClose={orderAlreadyCancelledHandleCloseSuccess}
                severity="warning"
                message="Order Already Cancelled"
            />
            <CustomizedAlert
                open={updateErrorOpenSuccess}
                onClose={updateErrorHandleCloseSuccess}
                severity="error"
                message="Error Updating Order"
            />
        </>
    );
}

export default CancelOrder;
