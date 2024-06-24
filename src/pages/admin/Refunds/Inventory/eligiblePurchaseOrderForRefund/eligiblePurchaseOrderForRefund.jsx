import './customerOrderHistory.css';
import * as React from 'react';
import CustomizedButton from '../../../../../components/Button/button';
import InventoryNavbar from '../../../../../layout/navbar/Inventory navbar/Inventory navbar';
import PageLoader from '../../../../../components/Page Loader/pageLoader';
import  Footer from "../../../../../layout/footer/footer";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import DynamicTable from '../../../../../components/Table/customizedTable2';
import CustomizedAlert from '../../../../../components/Alert/alert';

import {Button, Modal} from '@mui/material';

import InventoryRefundRequest from '../Modal/InventoryRefundRequest/InventoryRefundRequest';
import BackArrow from "../../../../../components/Icons/backArrow";
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from "react-router-dom";




function EligiblePurchaseOrdersForRefund() {
    const [isLoading, setIsLoading] = useState(false);
    const [eligiblePurchaseOrders, setEligiblePurchaseOrders] = useState([]);
    const [openError, setOpenError] = useState(false);
    const token = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    const columns = useMemo(() => [
        { accessorKey: 'orderId', header: 'Order Id', size: 5, align: 'center' },
        { accessorKey: 'productName', header: 'Product Name', size: 50, align: 'center' },
        { accessorKey: 'supplierName', header: 'Supplier Name', size: 20, align: 'center' },
        { accessorKey: 'total_amount', header: 'Total Amount', size: 50, align: 'center' },
        { accessorKey: 'createdDate', header: 'Order Date', size: 50, align: 'center' },
        {
            accessorKey: 'actions',
            header: 'Actions',
            size: 100,
            cellRenderer: ({ row }) => (
                <div style={{ display: 'flex' }}>
                    <CustomizedButton
                        onClick={() => handleRefund(row.original)}
                        hoverBackgroundColor="#2d3ed2"
                        disabled={row.original.eligibleForRefund === false}
                        style={{
                            color: '#ffffff',
                            backgroundColor: '#242F9B',
                            border: '1px solid #242F9B',
                            width: '10em',
                            height: '2.5em',
                            fontSize: '0.8em',
                            padding: '0.5em 0.625em',
                            marginTop: '0.625em'
                        }}>
                        Request Refund
                    </CustomizedButton>
                </div>
            ),
        }
    ], []);

    const handleClickError = () => {
        setOpenError(true);
    };

    const handleRefund = (order) => {
        const orderData = {
            orderId: order.id,
            productName: order.productName,
            sellingPrice: order.total_amount / order.quantity, // Assuming total_amount is the total price and quantity is the number of items
            itemCode: order.items // Adjust this according to the actual data structure if needed
        };
        console.log('Refund requested for order:', orderData);
        navigate('/createrefund', { state: orderData });
    };

    useEffect(() => {
        const fetchEligiblePurchaseOrders = async () => {
            setIsLoading(true);
            try {
                const [ordersResponse, refundsResponse, productsResponse] = await Promise.all([
                    axios.get('http://localhost:9000/purchaseOrder/getAll', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get('http://localhost:9000/refund/inventoryRefund/getAll', {
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

                const departedOrders = orders.filter(order => order.status === "Departed");
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                const recentDepartedOrders = departedOrders.filter(order => new Date(order.departedDate) >= sevenDaysAgo);

                const refundMap = refundRequests.reduce((acc, refund) => {
                    acc[refund.orderId] = true;
                    return acc;
                }, {});

                const eligibleOrders = recentDepartedOrders.filter(order => !refundMap[order.id])
                    .map(order => ({
                        id: order.id,
                        productName: products[order.items],
                        supplierName: order.supplierName,
                        total_amount: order.total_amount,
                        createdDate: order.createdDate,
                        quantity: order.quantity, // Assuming order has a quantity field
                        items: order.items,
                        eligibleForRefund: true
                    }));

                setEligiblePurchaseOrders(eligibleOrders);

            } catch (error) {
                handleClickError();
                console.error('Error fetching purchase orders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEligiblePurchaseOrders();
    }, [token]);

    return (
        <>
            <InventoryNavbar />
            <div className="eligiblePurchaseOrdersOuter">
                <div className="eligiblePurchaseOrdersInner">
                    <div className="searchContainer">
                        <Link to="/InventoryRefundRequestsTable">
                            <Button
                                startIcon={<BackArrow />}
                                size="large"
                                style={{
                                    color: "black",
                                    fontWeight: 'bold',
                                    textTransform: "none",
                                    fontSize: '1.25em'
                                }}
                            >
                                Eligible Purchase Orders for Refund
                            </Button>
                        </Link>
                    </div>
                    <div className="eligiblePurchaseOrders-dashboard">
                        {isLoading ? (
                            <PageLoader />
                        ) : (
                            <DynamicTable
                                columns={columns}
                                data={eligiblePurchaseOrders}
                                includeProfile={false}
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

export default EligiblePurchaseOrdersForRefund;
