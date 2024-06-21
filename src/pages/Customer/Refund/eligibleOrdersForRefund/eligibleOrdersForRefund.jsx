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
        { accessorKey: 'orderId', header: 'Order Id', size: 10, align: 'center' },
        { accessorKey: 'orderItems', header: 'Ordered Items', size: 100, align: 'center', Cell: ({ value }) => <span>{value}</span> },
        { accessorKey: 'eligibleItems', header: 'Eligible Items for Refund', size: 170, align: 'center', Cell: ({ value }) => <span>{value}</span> },
        { accessorKey: 'orderPrice', header: 'Bill Amount', size: 70, align: 'center' },
        { accessorKey: 'orderDate', header: 'Date', size: 170, align: 'center' },
        { accessorKey: 'orderStatus', header: 'Order Status', size: 70, align: 'center' },
        {
            accessorKey: 'actions',
            header: '',
            size: 200,
            cellRenderer: ({ row }) => (
                <div style={{ display: 'flex' }}>
                    <CustomizedButton
                        onClick={() => handleRefund(row.original)}
                        hoverBackgroundColor="#2d3ed2"
                        disabled={row.original.eligibleItems === "No items for refund"}
                        style={{
                            color: '#ffffff',
                            backgroundColor: '#242F9B',
                            border: '1px solid #242F9B',
                            width: '12em',
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
                        Request Refund
                    </CustomizedButton>
                </div>
            ),
        }
    ], []);

    // const createRefundRequestButton = (row) => {
    //     const buttonStyle = {
    //         color: '#ffffff',
    //         backgroundColor: '#242F9B',
    //         border: '1px solid #242F9B',
    //         width: '12em',
    //         height: '2.5em',
    //         fontSize: '0.8em',
    //         padding: '0.5em 0.625em',
    //         borderRadius: '0.35em',
    //         fontWeight: '500',
    //         marginTop: '0.625em',
    //         textTransform: 'none',
    //         textAlign: 'center',
    //     };
    //     // console.log(eligibleOrders);
    //
    //     return (
    //         <CustomizedButton
    //             onClick={() => handleRefund()}
    //             hoverBackgroundColor="#2d3ed2"
    //             style={buttonStyle}
    //             // disabled={}
    //         >
    //             Request Refund
    //         </CustomizedButton>
    //     );
    // };

    const handleClickError = () => {
        setOpenError(true);
    };

    const handleRefund = (row) => {
        const orderId = row.orderId;
        console.log('Refund requested for order:', row.eligibleItems);
        // navigate('/createrefund', { state: { orderId } });

        if (!(row.eligibleItems === "No items for refund")){
            navigate('/createrefund', { state: { orderId } });

        }
    };

    // const handleRowClick = (row) => {
    //     const orderId = row.orderId;
    //     console.log(row.eligibleItems);
    //     if (row.eligibleItems){
    //         navigate('/createrefund', { state: { orderId } });
    //
    //     }
    // };

    useEffect(() => {
        const fetchEligibleOrders = async () => {
            setIsLoading(true);
            try {
                if (!customerId) {
                    console.error('Customer ID not found in token');
                    return;
                }

                const [ordersResponse, refundsResponse, productsResponse] = await Promise.all([
                    axios.get('http://localhost:9000/order/getAllOrders', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get('http://localhost:9000/refund/customerRefund/getAll', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get('http://localhost:9000/product/getAllProducts', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                const orders = ordersResponse.data;
                const refundRequests = refundsResponse.data;
                const products = productsResponse.data.reduce((acc, product) => {
                    acc[product.id] = product.productName;
                    return acc;
                }, {});

                const customerOrders = orders.filter(order => order.orderCustomerId === customerId);
                const departedOrders = customerOrders.filter(order => order.orderStatus === "Departed");
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                const eligibleOrders = departedOrders.filter(order => new Date(order.lastOrderStatusUpdatedDate) >= sevenDaysAgo);

                const refundMap = refundRequests.reduce((acc, refund) => {
                    if (!acc[refund.orderId]) {
                        acc[refund.orderId] = {};
                    }
                    if (!acc[refund.orderId][refund.item]) {
                        acc[refund.orderId][refund.item] = 0;
                    }
                    acc[refund.orderId][refund.item] += parseInt(refund.quantity);
                    return acc;
                }, {});

                const formattedOrders = eligibleOrders.map(order => {
                    const orderItemsWithName = order.orderItems.map(itemStr => {
                        const item = JSON.parse(itemStr);
                        const productName = products[item.id];
                        return `${productName} x ${item.amount}`;
                    });

                    const eligibleItemsWithName = order.orderItems.map(itemStr => {
                        const item = JSON.parse(itemStr);
                        const refundedQuantity = refundMap[order.orderId]?.[item.id] || 0;
                        const eligibleQuantity = item.amount - refundedQuantity;
                        if (eligibleQuantity > 0) {
                            const productName = products[item.id];
                            return `${productName} x ${eligibleQuantity}`;
                        }
                        return null;
                    }).filter(Boolean);

                    const formattedOrderItems = orderItemsWithName.join(', ');
                    const formattedEligibleItems = eligibleItemsWithName.join(', ');


                    return { ...order, orderItems: formattedOrderItems, eligibleItems: formattedEligibleItems.length > 0 ? formattedEligibleItems : "No items for refund" };

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
                                // createActions={createRefundRequestButton}
                                // onRowClick={handleRowClick}
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
