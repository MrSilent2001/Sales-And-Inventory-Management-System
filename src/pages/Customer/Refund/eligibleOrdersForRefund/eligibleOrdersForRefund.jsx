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
import {jwtDecode} from 'jwt-decode';

function EligibleOrdersForRefund() {
    const [isLoading, setIsLoading] = useState(false);
    const [eligibleOrders, setEligibleOrders] = useState([]);
    const [openError, setOpenError] = useState(false);

    const token = localStorage.getItem('accessToken');
    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;
   console.log(id);
    const columns = useMemo(() => [
        { accessorKey: 'orderId', header: 'Order Id', size: 75, align: 'center' },
        { accessorKey: 'orderItems', header: 'Ordered Items', size: 100, align: 'center' },
        { accessorKey: 'orderPrice', header: 'Bill Amount', size: 170, align: 'center' },
        { accessorKey: 'orderDate', header: 'Date', size: 170, align: 'center' },
        { accessorKey: 'orderStatus', header: 'Order Status', size: 170, align: 'center' },
        { accessorKey: 'refund', header: 'Refund', size: 100, align: 'center', Cell: ({ row }) => (
            <CustomizedButton
                onClick={() => handleRefund(row.original)}
                hoverBackgroundColor="#2d3ed2"
                style={{
                    color: '#ffffff',
                    backgroundColor: '#242F9B',
                    border: '1px solid #242F9B',
                    width: '6em',
                    height: '2.5em',
                    fontSize: '0.8em',
                    padding: '0.5em 0.625em',
                    borderRadius: '0.35em',
                    fontWeight: '500',
                    marginTop: '0.625em',
                    textTransform: 'none',
                    textAlign: 'center',
                }}
            >
                Refund
            </CustomizedButton>
        ) }
    ], []);

    const handleClickError = () => {
        setOpenError(true);
    };

    const handleRefund = (order) => {
        // Handle the refund logic here, maybe navigate to a refund request form
        console.log('Refund requested for order:', order);
        // For example, navigate to the refund request form and pass the order details
        // navigate('/refundRequest', { state: { order } });
    };

    useEffect(() => {
        const fetchEligibleOrders = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`http://localhost:9000/order/getAllOrdersByCustomerId/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const orders = response.data;

                // Filter orders made within the last 7 days
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

                const recentOrders = orders.filter(order => new Date(order.orderDate) >= sevenDaysAgo);

                setEligibleOrders(recentOrders);
            } catch (error) {
                handleClickError();
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEligibleOrders();
    }, [id, token]);

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
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer />

            <CustomizedAlert
                open={openError}
                onClose={handleClickError}
                severity="error"
                message="Something Went Wrong!"
            />
        </>
    );
}

export default EligibleOrdersForRefund;
