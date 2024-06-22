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


const PurchaseOrderDashboard = () => {

    const [viewOrderVisible, setViewOrderVisible] = useState(false);
    const [currentMonth, setCurrentMonth] = useState('');
    const [purchasedOrders, setPurchasedOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [inProgressOrders, setInProgressOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchPurchasedOrders = async () => {
            try {
                const response = await axios.get('http://localhost:9000/purchaseOrder/getAll');
                setPurchasedOrders(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching purchase orders:', error);
            }
        };

        const fetchCurrentMonthName = async () => {
            try {
                const response = await axios.get('http://localhost:9000/purchaseOrder/getCurrentMonthName');
                setCurrentMonth(response.data);
            } catch (error) {
                console.error('Error fetching current month name:', error);
            }
        };

        const fetchOrderCounts = async () => {
            try {
                const totalResponse = await axios.get('http://localhost:9000/purchaseOrder/getCountOfOrdersByStatus/total');
                const inProgressResponse = await axios.get('http://localhost:9000/purchaseOrder/getCountOfOrdersByStatus/pending');
                const completedResponse = await axios.get('http://localhost:9000/purchaseOrder/getCountOfOrdersByStatus/completed');

                setTotalOrders(totalResponse.data);
                setInProgressOrders(inProgressResponse.data);
                setCompletedOrders(completedResponse.data);
            } catch (error) {
                console.error('Error fetching order counts:', error);
            }
        };

        fetchPurchasedOrders();
        fetchCurrentMonthName();
        fetchOrderCounts();
    }, []);

    const handleCancelOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:9000/purchaseOrder/delete/${orderId}`);
            setPurchasedOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
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
        { accessorKey: 'actions', header: 'Actions', size: 120, align: 'center' }
    ], []);

    const dataWithActions = purchasedOrders.map(row => ({
        id: row.id,
        supplierName: row.supplierName,
        Address: row.Address,
        mail: row.mail,
        contact_number: row.contact_number,

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
                        borderRadius: '0.35em',
                        marginTop: '0.625em',
                        marginRight: '0.75em'
                    }}>
                    View
                </CustomizedButton>

                <CustomizedButton
                    onClick={() => handleCancelOrder(row.id)}
                    hoverBackgroundColor="#960505"
                    style={{
                        color: 'white',
                        backgroundColor: '#960505',
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

    return (
        <>
            <InventoryNavbar />
            <Box sx={{ display: 'flex', height: '37.5em' }}>
                {/* Sidebar */}
                <Box sx={{ width: '15%', height: 'auto', bgcolor: '#646FD4', color: 'white', p: 2 }}>
                    <Card sx={{ mb: 2, bgcolor: '#B4D4FF', color: 'black', p: 1 }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ color: '#E74646', fontWeight: 'bold', mr: 6 }}>{currentMonth}</Typography>
                            <Typography variant="h6">Total Orders</Typography>
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{totalOrders}</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2, bgcolor: '#B4D4FF', color: 'black', p: 1 }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ color: '#E74646', fontWeight: 'bold', mr: 6 }}>{currentMonth}</Typography>
                            <Typography variant="h6">In-Progress</Typography>
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{inProgressOrders}</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2, bgcolor: '#B4D4FF', color: 'black', p: 1 }}>
                        <CardContent>
                            <Typography variant="subtitle1" sx={{ color: '#E74646', fontWeight: 'bold', mr: 6 }}>{currentMonth}</Typography>
                            <Typography variant="h6">Completed</Typography>
                            <Typography variant="h6" sx={{ textAlign: 'center' }}>{completedOrders}</Typography>
                        </CardContent>
                    </Card>
                    
                 
                </Box>

                {/* Main Content */}
                <Container maxWidth={false} sx={{ bgcolor: '#DBDFFD', height: 'auto', padding: '1.5em 0', position: 'relative' }}>
                    <Link to="/acceptedOrders">
                        <CustomizedButton
                            hoverBackgroundColor="#242F9B"
                            style={{
                                color: 'white',
                                backgroundColor: '#242F9B',
                                width: '10em',
                                height: '2.75em',
                                fontSize: '0.8em',
                                padding: '0.5em 0.625em',
                                borderRadius: '0.35em',
                                position: 'absolute',
                                right: '0',
                                top: '5.75em', // Adjust based on your layout
                                marginRight: '3em',
                                marginBottom: '1em'
                            }}
                        >
                            Accepted Orders
                        </CustomizedButton>
                    </Link>
                        <DynamicTable
                            columns={columns}
                            data={dataWithActions}
                            includeProfile={false}
                            tableWidth="100%"  // Increase the width of the table
                            enableFilters={false}
                            initialShowGlobalFilter={true}  // Show the global search filter
                        />

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
