import React, { useEffect, useState } from 'react';
import "./orderDetails.css";
import Footer from "../../../../../layout/footer/footer";
import SalesNavbar from "../../../../../layout/navbar/Sales navbar/sales navbar";
import CustomizedButton from "../../../../../components/Button/button";
import BasicTextField from "../../../../../components/Form Inputs/textfield";
import axios from "axios";
import SalesOrderSidebar from "../../../../../layout/sidebar/salesOrderSidebar";
import CustomizedAlert from "../../../../../components/Alert/alert";
import { useFormik } from "formik";
import * as Yup from "yup";

function OrderDetails() {
    const [activeButton, setActiveButton] = useState(null);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [dataErrorOpenSuccess, setDataErrorOpenSuccess] = useState(false);
    const [IDNotExistErrorOpenSuccess, setIDNotExistErrorOpenSuccess] = useState(false);
    const [updateErrorOpenSuccess, setUpdateErrorOpenSuccess] = useState(false);
    const [orderAlreadyCancelledOpenSuccess, setOrderAlreadyCancelledOpenSuccess] = useState(false);
    const token = localStorage.getItem('accessToken');

    const orderSchema = Yup.object().shape({
        orderId: Yup.string().required('Order ID is required'),
        orderReceiverName: Yup.string().required('Receiver name is required'),
        orderReceiverAddress: Yup.string().required('Address is required'),
        // orderReceiverContact: Yup.string().required('Contact is required'),
        orderReceiverContact: Yup.string()
            .required('Contact number is required')
            .matches(/^[0-9]{10}$/, 'Must be a valid 10-digit phone number'),
    });

    const [originalOrderItems,setOriginalOrderItems] = useState('')

    const formik = useFormik({
        initialValues: {
            orderId: '',
            orderReceiverName: '',
            orderReceiverAddress: '',
            orderReceiverContact: '',
            orderItems: '',
            orderPrice: '',
            orderStatus: '',
        },
        validationSchema: orderSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const updatedOrder = {
                    orderReceiverName: values.orderReceiverName,
                    orderReceiverAddress: values.orderReceiverAddress,
                    orderReceiverContact: values.orderReceiverContact,
                    orderItems: originalOrderItems,
                    orderPrice: values.orderPrice,
                };
                const response = await axios.put(`http://localhost:9000/order/update/${values.orderId}`, updatedOrder, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    setOpenSuccess(true);
                    fetchOrderById(values.orderId);
                    resetForm();
                } else {
                    setUpdateErrorOpenSuccess(true);
                }
            } catch (error) {
                console.error('Error updating order:', error);
                setUpdateErrorOpenSuccess(true);
            }
        }
    });

    const fetchOrderById = async (orderId) => {
        if (!orderId) {
            console.log('Order ID is empty. Fetch operation aborted.');
            formik.resetForm();
            return;
        }

        try {
            const response = await axios.get(`http://localhost:9000/order/findOrder/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.data || Object.keys(response.data).length === 0) {
                setIDNotExistErrorOpenSuccess(true);
                // formik.resetForm();
                return;
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

            if (response.data.orderStatus === 'Cancelled') {
                setOrderAlreadyCancelledOpenSuccess(true);
            }

            setOriginalOrderItems(response.data.orderItems);

            const orderItemsWithName = response.data.orderItems.map(itemStr => {
                const item = JSON.parse(itemStr);
                const productName = products[item.id];
                return `ID ${item.id}:${productName} x ${item.amount}`;
            });
            const formattedOrderItems = orderItemsWithName.join(', ');

            formik.setValues({
                orderId: orderId,
                orderReceiverName: response.data.orderReceiverName,
                orderReceiverAddress: response.data.orderReceiverAddress,
                orderReceiverContact: response.data.orderReceiverContact,
                orderItems: formattedOrderItems,
                orderPrice: response.data.orderPrice,
                orderStatus: response.data.orderStatus,
            });
        } catch (error) {
            console.error('Error fetching order:', error);
            setDataErrorOpenSuccess(true);
        }
    };

    const handleCancel = async () => {
        formik.resetForm();
    };

    useEffect(() => {
        fetchOrderById(formik.values.orderId);
    }, [formik.values.orderId]);

    return (
        <>
            <SalesNavbar />
            <div className="orderDetailsOuter">
                <div className="body">
                    <div className="orderDetailsFilter">
                        <SalesOrderSidebar />
                    </div>
                    <div className="orderDetailsInner">
                        <div className="updateFormbox">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="textSection">
                                    <label className='label'>Order Id</label>
                                    <BasicTextField
                                        name="orderId"
                                        value={formik.values.orderId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                fetchOrderById(formik.values.orderId);
                                                e.preventDefault();
                                            }
                                        }}
                                        helperText={formik.touched.orderId && formik.errors.orderId ? formik.errors.orderId : ''}
                                        error={formik.touched.orderId && formik.errors.orderId ? true : false}
                                    />
                                </div>

                                <div className="textSection">
                                    <label className='label'>Receiver</label>
                                    <BasicTextField
                                        name="orderReceiverName"
                                        disabled={!formik.values.orderId}
                                        value={formik.values.orderReceiverName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={formik.touched.orderReceiverName && formik.errors.orderReceiverName ? formik.errors.orderReceiverName : ''}
                                        error={formik.touched.orderReceiverName && formik.errors.orderReceiverName ? true : false}
                                    />
                                </div>

                                <div className="textSection">
                                    <label className='label'>Address</label>
                                    <BasicTextField
                                        name="orderReceiverAddress"
                                        disabled={!formik.values.orderId}
                                        value={formik.values.orderReceiverAddress}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={formik.touched.orderReceiverAddress && formik.errors.orderReceiverAddress ? formik.errors.orderReceiverAddress : ''}
                                        error={formik.touched.orderReceiverAddress && formik.errors.orderReceiverAddress ? true : false}
                                    />
                                </div>

                                <div className="textSection">
                                    <label className='label'>Contact</label>
                                    <BasicTextField
                                        name="orderReceiverContact"
                                        disabled={!formik.values.orderId}
                                        value={formik.values.orderReceiverContact}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={formik.touched.orderReceiverContact && formik.errors.orderReceiverContact ? formik.errors.orderReceiverContact : ''}
                                        error={formik.touched.orderReceiverContact && formik.errors.orderReceiverContact ? true : false}
                                    />
                                </div>

                                <div className="textSection">
                                    <label className='label'>Items</label>
                                    <BasicTextField
                                        name="orderItems"
                                        disabled={true}
                                        readOnly={true}
                                        value={formik.values.orderItems}
                                        onChange={formik.handleChange}
                                    />
                                </div>

                                <div className="textSection">
                                    <label className='label'>Amount</label>
                                    <BasicTextField
                                        name="orderPrice"
                                        disabled={true}
                                        readOnly={true}
                                        value={formik.values.orderPrice}
                                        onChange={formik.handleChange}
                                    />
                                </div>

                                <div className="UpdateformButtons">
                                    <CustomizedButton
                                        type="submit"
                                        hoverBackgroundColor="#2d3ed2"
                                        disabled={formik.values.orderStatus === "Cancelled"}
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
                                            marginRight: '1em',
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
                                            marginRight: '4em',
                                            marginLeft: '1.5em',
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
            <Footer />

            <CustomizedAlert
                open={openSuccess}
                onClose={() => setOpenSuccess(false)}
                message="Order updated successfully!"
                severity="success"
            />

            <CustomizedAlert
                open={dataErrorOpenSuccess}
                onClose={() => setDataErrorOpenSuccess(false)}
                message="Data does not exist!"
                severity="error"
            />

            <CustomizedAlert
                open={IDNotExistErrorOpenSuccess}
                onClose={() => setIDNotExistErrorOpenSuccess(false)}
                message="Order ID does not exist!"
                severity="error"
            />

            <CustomizedAlert
                open={updateErrorOpenSuccess}
                onClose={() => setUpdateErrorOpenSuccess(false)}
                message="Error updating order!"
                severity="error"
            />

            <CustomizedAlert
                open={orderAlreadyCancelledOpenSuccess}
                onClose={() => setOrderAlreadyCancelledOpenSuccess(false)}
                message="Order is already cancelled!"
                severity="warning"
            />
        </>
    );
}

export default OrderDetails;
