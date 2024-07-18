import React, { useState, useEffect,useMemo } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Container,
    Modal
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InventoryNavbar from "../../../../../layout/navbar/Inventory navbar/Inventory navbar";
import Footer from "../../../../../layout/footer/footer";;
import ViewOrder from "../../../Orders/Inventory/Modals/View Order/viewOrder";
import CustomizedButton from "../../../../../components/Button/button";
import DynamicTable from '../../../../../components/Table/customizedTable2';
import PageLoader from "../../../../../components/Page Loader/pageLoader";



const PurchaseOrderDashboard = () => {
    const [viewOrderVisible, setViewOrderVisible] = useState(false);
    const [currentMonth, setCurrentMonth] = useState('');
    const [orders, setOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [inProgressOrders, setInProgressOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:9000/purchaseOrder/getAll', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        const fetchCurrentMonthName = async () => {
            try {
                const response = await axios.get('http://localhost:9000/purchaseOrder/getCurrentMonthName', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCurrentMonth(response.data);
            } catch (error) {
                console.error('Error fetching current month name:', error);
            }
        };

        const fetchOrderCounts = async () => {
            try {
                const totalResponse = await axios.get('http://localhost:9000/purchaseOrder/getCountOfOrdersByStatus/total', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const pendingResponse = await axios.get('http://localhost:9000/purchaseOrder/getCountOfOrdersByStatus/Pending', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const acceptedResponse = await axios.get('http://localhost:9000/purchaseOrder/getCountOfOrdersByStatus/Accepted', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const departedResponse = await axios.get('http://localhost:9000/purchaseOrder/getCountOfOrdersByStatus/Departed', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const completedResponse = await axios.get('http://localhost:9000/purchaseOrder/getCountOfOrdersByStatus/Received', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setTotalOrders(totalResponse.data);
                setInProgressOrders(pendingResponse.data + acceptedResponse.data + departedResponse.data);
                setCompletedOrders(completedResponse.data);
            } catch (error) {
                console.error('Error fetching order counts:', error);
            }
        };

        fetchOrders();
        fetchCurrentMonthName();
        fetchOrderCounts();
    }, []);

    const handleCancelOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:9000/purchaseOrder/delete/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleApproveOrder = async (orderId) => {
        // Implement the logic to approve the order here
        console.log('Approving order:', orderId);
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setViewOrderVisible(true);
    };

    const columns = useMemo(() => [
        { accessorKey: 'supplierName', header: 'Supplier', size: 50, align: 'center' },
        { accessorKey: 'Address', header: 'Address', size: 175, align: 'center' },
        { accessorKey: 'mail', header: 'Email', size: 60, align: 'center' },
        { accessorKey: 'contact_number', header: 'Contact', size: 50, align: 'center' },
        { accessorKey: 'status', header: 'Status', size: 50, align: 'center' },
        { accessorKey: 'actions', header: 'Actions', size: 120, align: 'center' }
    ], []);

    const dataWithActions = orders.filter(order => order.status === 'Pending' || order.status === 'Accepted').map(row => ({
        id: row.id,
        supplierName: row.supplierName,
        Address: row.Address,
        mail: row.mail,
        contact_number: row.contact_number,
        status: row.status,

        actions: (
            <div style={{ display: 'flex' }}>
                <CustomizedButton
                    onClick={() => handleViewOrder(row)}
                    hoverBackgroundColor="#242F9B"
                    style={{
                        color: 'white',
                        backgroundColor: '#242F9B',
                        width: '6.5em',
                        height: '2.75em',
                        fontSize: '0.8em',
                        padding: '0.5em 0.625em',
                        marginTop: '0.625em',
                    }}>
                    View
                </CustomizedButton>
                <CustomizedButton
                    onClick={() => handleCancelOrder(row.id)}
                    hoverBackgroundColor="#960505"
                    disabled={row.status !== 'Pending'}
                    style={{
                        color: 'white',
                        backgroundColor: row.status === 'Pending' ? '#960505' : '#B4B4B4',
                        width: '6.5em',
                        height: '2.75em',
                        fontSize: '0.8em',
                        padding: '0.5em 0.625em',
                        borderRadius: '0.35em',
                        marginTop: '0.625em',
                        marginLeft: '0.75em',
                    }}>
                    Cancel
                </CustomizedButton>
            </div>
        )
    }));

    const createToolbarButton = () => {
        const buttonStyle = {
            backgroundColor: '#242F9B',
            border: '1px solid #242F9B',
            width: '11em',
            height: '2.5em',
            fontSize: '0.75em',
            padding: '0.5em 0.625em',
            borderRadius: '0.35em',
            marginRight: '5.5em'
        };

        return (
            <Link to="/acceptedOrders">
                <CustomizedButton
                    onClick={() => setVisible(true)}
                    hoverBackgroundColor="#2d3ed2"
                    style={buttonStyle}
                >
                    Departed Orders
                </CustomizedButton>
            </Link>
        );
    };

    return (
        <>
            <InventoryNavbar />
            <Box sx={{ display: 'flex', height: '47em' }}>
                <Box sx={{ width: '15%', height: 'auto', bgcolor: '#646FD4', color: 'white', p: 2 }}>
                    <Card sx={{ mt: 10, mb: 6, bgcolor: '#B4D4FF', color: 'black', p: 1 }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ color: '#E74646', fontWeight: 'bold', mr: 6 }}>{currentMonth}</Typography>
                            <Typography variant="h6">Total Orders</Typography>
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{totalOrders}</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 6, bgcolor: '#B4D4FF', color: 'black', p: 1 }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ color: '#E74646', fontWeight: 'bold', mr: 6 }}>{currentMonth}</Typography>
                            <Typography variant="h6">In-Progress</Typography>
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{inProgressOrders}</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 6, bgcolor: '#B4D4FF', color: 'black', p: 1 }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ color: '#E74646', fontWeight: 'bold', mr: 6 }}>{currentMonth}</Typography>
                            <Typography variant="h6">Completed</Typography>
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{completedOrders}</Typography>
                        </CardContent>
                    </Card>
                </Box>

                <Container maxWidth={false} sx={{ bgcolor: '#DBDFFD', height: 'auto', padding: '1.5em 0', position: 'relative', paddingTop: '7em' }}>
                    {isLoading ? (
                        <PageLoader />
                    ) : (
                        <DynamicTable
                            columns={columns}
                            data={dataWithActions}
                            includeProfile={false}
                            tableWidth="100%"
                            enableFilters={false}
                            initialShowGlobalFilter={true}
                            renderToolbarItems={createToolbarButton}
                        />
                    )}

                    <Modal open={viewOrderVisible}>
                        <ViewOrder order={selectedOrder} onClose={() => setViewOrderVisible(false)} />
                    </Modal>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default PurchaseOrderDashboard;
