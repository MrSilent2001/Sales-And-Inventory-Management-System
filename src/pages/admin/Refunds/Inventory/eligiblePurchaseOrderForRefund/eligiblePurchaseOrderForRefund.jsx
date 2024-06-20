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
import {jwtDecode} from 'jwt-decode';
import {Button, Modal} from '@mui/material';
import Box from '@mui/material/Box';
import InventoryRefundRequest from '../Modal/InventoryRefundRequest/InventoryRefundRequest';
import {Link} from "react-router-dom";
import BackArrow from "../../../../../components/Icons/backArrow";


const EligibleOrderForRefund = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [eligibleOrders, setEligibleOrders] = useState([]);
    const [openError, setOpenError] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const id = localStorage.getItem('id');
    const token = localStorage.getItem('accessToken');

    const columns = useMemo(() => [
        { accessorKey: 'orderId', header: 'Order Id', size: 75, align: 'center' },
        { accessorKey: 'orderItems', header: 'Ordered Items', size: 100, align: 'center' },
        { accessorKey: 'orderPrice', header: 'Bill Amount', size: 75, align: 'center' },
        { accessorKey: 'orderDate', header: 'Date', size: 75, align: 'center' },
        { accessorKey: 'orderStatus', header: 'Order Status', size: 75, align: 'center' },
        { accessorKey: 'actions', header: 'Actions', size: 150, align: 'center' }
    ], []);

    const handleClickError = () => {
        setOpenError(true);
    };

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedOrder(null);
    };

    useEffect(() => {
        const fetchEligibleOrders = async () => {
            setIsLoading(true);
            try {
                const productsResponse = await axios.get('http://localhost:9000/product/getAllProducts', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const products = productsResponse.data.reduce((acc, product) => {
                    acc[product.id] = product.productName;
                    return acc;
                }, {});

                const response = await axios.get('http://localhost:9000/purchaseOrder/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const filteredOrders = response.data.filter(order => {
                    const orderDate = new Date(order.orderDate);
                    const currentDate = new Date();
                    const sevenDaysAgo = new Date();
                    sevenDaysAgo.setDate(currentDate.getDate() - 7);
                    return order.orderCustomerId === id && orderDate >= sevenDaysAgo;
                });

                const ordersWithNamesAndFormattedItems = filteredOrders.map(order => {
                    const orderItemsWithName = order.orderItems.map(itemId => products[itemId]);
                    const formattedOrderItems = orderItemsWithName.join(', ');
                    return { ...order, orderItems: formattedOrderItems };
                });

                console.log(ordersWithNamesAndFormattedItems);
                setEligibleOrders(ordersWithNamesAndFormattedItems);
            } catch (error) {
                handleClickError();
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEligibleOrders();
    }, []);

    const createActions = (order) => (
        <CustomizedButton
            hoverBackgroundColor="#2d3ed2"
            style={{
                color: '#ffffff',
                backgroundColor: '#242F9B',
                border: '1px solid #242F9B',
                width: '11em',
                height: '1.75em',
                fontSize: '0.8em',
                padding: '0.5em 0.625em',
                borderRadius: '0.35em',
                marginTop: '0.625em'
            }}
            onClick={() => handleOpenModal(order)}
        >
            Request Refund
        </CustomizedButton>
    );

    const dataWithActions = eligibleOrders.map(order => ({
        ...order,
        actions: createActions(order)
    }));

    return (
        <>
            <InventoryNavbar/>
            <div className="eligibleOrdersDashboardOuter">
                <div className="eligibleOrdersDashboardInner">
                    <div className="searchContainer">
                        <Link to="/InventoryRefundRequestsTable">
                            <Button
                                startIcon={<BackArrow/>}
                                size="large"
                                style={{
                                    color: "black",
                                    fontWeight: 'bold',
                                    textTransform: "none",
                                    fontSize: '1.25em'
                                }}
                            >
                                Eligible Orders for Refund
                            </Button>
                        </Link>
                    </div>
                    <div className="eligibleOrders-dashboard">
                        {isLoading ? (
                            <PageLoader />
                        ) : (
                            <DynamicTable
                                columns={columns}
                                data={dataWithActions}
                                includeProfile={false}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Footer/>

            <CustomizedAlert
                open={openError}
                onClose={handleClickError}
                severity="error"
                message="Something Went Wrong!"
            />

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box className="modalBox">
                    {selectedOrder && <InventoryRefundRequest order={selectedOrder} onClose={handleCloseModal}/>}
                </Box>
            </Modal>
        </>
    );
}

export default EligibleOrderForRefund;
