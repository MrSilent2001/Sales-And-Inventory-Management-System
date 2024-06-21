import './customerOrderHistory.css';
import * as React from 'react';
import CustomizedButton from "../../../../components/Button/button";
import CustomerNavbar from "../../../../layout/navbar/Customer navbar/Customer navbar";
import PageLoader from '../../../../components/Page Loader/pageLoader';
import Footer from "../../../../layout/footer/footer";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import DynamicTable from '../../../../components/Table/customizedTable2';
import CustomizedAlert from '../../../../components/Alert/alert';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

function EligibleOrdersForRefund() {
    const [isLoading, setIsLoading] = useState(false);
    const [eligibleOrders, setEligibleOrders] = useState([]);
    const [openError, setOpenError] = useState(false);
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwtDecode(token);
    const customerId = localStorage.getItem('id');
    const navigate = useNavigate();

    const columns = useMemo(() => [
        { accessorKey: 'orderId', header: 'Order Id', size: 75, align: 'center' },
        { accessorKey: 'orderItems', header: 'Ordered Items', size: 100, align: 'center', Cell: ({ value }) => <span>{value}</span> },
        { accessorKey: 'orderPrice', header: 'Bill Amount', size: 170, align: 'center' },
        { accessorKey: 'orderDate', header: 'Date', size: 170, align: 'center' },
        { accessorKey: 'orderStatus', header: 'Order Status', size: 170, align: 'center' },
    ], []);

    const createRefundRequestButton = () => {
        const buttonStyle = {
            color: '#ffffff',
            backgroundColor: '#242F9B',
            border: '1px solid #242F9B',
            width: '12em',
            height: '2.5em',
            fontSize: '0.8em',
            padding: '0.5em 0.625em',
            borderRadius: '0.35em',
            fontWeight: '500',
            marginTop: '0.625em',
            textTransform: 'none',
            textAlign: 'center',
        };

        return (
            <CustomizedButton
                onClick={() => handleRefund(eligibleOrders.orderId)}
                hoverBackgroundColor="#2d3ed2"
                style={buttonStyle}
            >
                Request Refund
            </CustomizedButton>
        );
    };

    const handleClickError = () => {
        setOpenError(true);
    };

    const handleRefund = (orderId) => {
        console.log('Refund requested for order:', orderId);
        // navigate(`/createrefund/${orderId}`);
        navigate('/createrefund', { state: { orderId } });
    };

    const handleRowClick = (row) => {
        const orderId = row.orderId;
        // navigate(`/createrefund/${orderId}`);
        navigate('/createrefund', { state: { orderId } });
    };

    useEffect(() => {
        const fetchEligibleOrders = async () => {
            setIsLoading(true);
            try {
                if (!customerId) {
                    console.error('Customer ID not found in token');
                    return;
                }

                const response = await axios.get(`http://localhost:9000/order/getAllOrders`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const orders = response.data;

                const customerOrders = orders.filter(order => order.orderCustomerId === customerId);

                const departedOrders = customerOrders.filter(order => order.orderStatus === "Departed");

                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

                const recentCustomerOrders = departedOrders.filter(order => new Date(order.lastOrderStatusUpdatedDate) >= sevenDaysAgo);

                const refundResponse = await axios.get('http://localhost:9000/refund/customerRefund/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const refundRequests = refundResponse.data.map(refund => refund.orderId);

                const eligibleOrders = recentCustomerOrders.filter(order => !refundRequests.includes(order.orderId));

                const productsResponse = await axios.get('http://localhost:9000/product/getAllProducts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const products = productsResponse.data.reduce((acc, product) => {
                    acc[product.id] = product.productName;
                    return acc;
                }, {});

                const formattedOrders = eligibleOrders.map(order => {
                    const orderItemsWithName = order.orderItems.map(itemStr => {
                        const item = JSON.parse(itemStr);
                        const productName = products[item.id];
                        return `${productName} x ${item.amount}`;
                    });
                    const formattedOrderItems = orderItemsWithName.join(', ');
                    return { ...order, orderItems: formattedOrderItems };
                });

                setEligibleOrders(formattedOrders);

            } catch (error) {
                handleClickError();
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEligibleOrders();
    }, [customerId, token]);

    return (
        <>
            <CustomerNavbar />
            <div className="CustomerOrdersOuter">
                <div className="CustomerOrdersInner">
                    <div className="customerOrdersTopicWithTextfield">
                        <div className="customerOrdersTopic">
                            <h2>Eligible Orders for Refund</h2>
                        </div>
                    </div>
                    <div className='orderHistory'>
                        {isLoading ? (
                            <PageLoader />
                        ) : (
                            <DynamicTable
                                columns={columns}
                                data={eligibleOrders}
                                includeProfile={false}
                                createActions={createRefundRequestButton}
                                onRowClick={handleRowClick}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer />

            <CustomizedAlert
                open={openError}
                onClose={() => setOpenError(false)}
                severity="error"
                message="Something Went Wrong!"
            />
        </>
    );
}

export default EligibleOrdersForRefund;
